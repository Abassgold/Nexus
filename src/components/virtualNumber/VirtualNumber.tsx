'use client';
import axios, { AxiosError } from "axios";
import { ShoppingCart } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { trackTikTokEvent } from "@/lib/tiktok";
import PurchaseNumberModal from "./Modal";
import { getToken } from "@/lib/token";
import { countryTypes, serviceListType } from "./types";
import { useNotification } from "../notification/NotificationContext";


interface ServerProps {
    countries: countryTypes[];
    services: serviceListType[];
    savedNumberStr?: string | null;
}

interface NumberInfo {
    number: string;
    activationId: string;
    provider: string;
    cost: string;
    name: string;
    country: string;
}

interface OtpType {
    ok: boolean;
    msg?: string;
    code: string;
    status: 'pending' | 'completed' | 'cancelled';
}

interface GetNumberResponse {
    ok: boolean;
    msg?: string;
    data?: NumberInfo;
}

interface PriceType {
    countryId: number;
    cost: number;
    stock: number;
    name: string;
    serviceID: string;
    country: string;
}

interface PriceResponse {
    ok: boolean;
    msg?: string;
    price: PriceType;
}

type rentalCancelType = {
    ok: boolean;
    msg?: string;
};

const POLLING_DURATION = 10 * 60 * 1000;
const SESSION_KEYS = {
    numberInfo: 'numberInfo1',
    otp: 'otp',
    startTime: 'pollStartTime',
};

const VirtualNumber = ({ countries, services, savedNumberStr: initialNumberStr }: ServerProps) => {

    const priority = ['USA', 'USA(virtual)', 'United Kingdom', 'Canada', 'Australia', 'France', 'Spain'];
    const sorted = [...countries].sort((a, b) => {
        const aPriority = priority.indexOf(a.eng);
        const bPriority = priority.indexOf(b.eng);
        if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
        if (aPriority !== -1) return -1;
        if (bPriority !== -1) return 1;
        return a.eng.localeCompare(b.eng);
    });

    const router = useRouter();
      const { notify } = useNotification();
    const pathname = usePathname();
    const prevPathname = useRef(pathname);
    const hasInitialized = useRef(false);
    const isPollingActive = useRef(false);
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);
    const countdownInterval = useRef<NodeJS.Timeout | null>(null);
    const otpRef = useRef<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [numberInfo, setNumberInfo] = useState<NumberInfo | null>(null);
    const [otp, setOtp] = useState<string | null>(null);
    const [timeoutRemaining, setTimeoutRemaining] = useState('00:00');

    const [hideServices, setHideServices] = useState(false);
    const [searchCountries, setSearchCountries] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<countryTypes | null>(null);
    const [selectedService, setSelectedService] = useState<serviceListType | null>(null);
    const [searchServices, setSearchServices] = useState('');
    const [price, setPrice] = useState<PriceType | null>(null);
    const [priceLoading, setPriceLoading] = useState(false);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const clearSessionStorage = () => {
        sessionStorage.removeItem(SESSION_KEYS.numberInfo);
        sessionStorage.removeItem(SESSION_KEYS.otp);
        sessionStorage.removeItem(SESSION_KEYS.startTime);
    };

    const updateOtp = useCallback((code: string | null) => {
        otpRef.current = code;
        setOtp(code);
    }, []);

    const clearPolling = useCallback(() => {
        isPollingActive.current = false;
        if (pollingInterval.current) clearInterval(pollingInterval.current);
        if (countdownInterval.current) clearInterval(countdownInterval.current);
        pollingInterval.current = null;
        countdownInterval.current = null;
    }, []);

    const clearInfo = useCallback(() => {
        clearPolling();
        clearSessionStorage();
        setTimeoutRemaining('00:00');
        setNumberInfo(null);
        updateOtp(null);
        setLoading(false);
    }, [clearPolling, updateOtp]);

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const cancelRental = useCallback(async (activationId: string) => {
        const [mins] = timeoutRemaining.split(':').map(Number);
        if (mins > 4) {
            notify('Please wait at least 6 minutes before cancelling.', 'info')
            return;
        }
        return clearInfo();
        setIsCancelling(true);
        try {
            const { data } = await axios.get<rentalCancelType>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/cancel-server1/${activationId}`,
                { headers: { Authorization: `Bearer ${getToken()}` } }
            );
            if (data.ok) {
                clearInfo();
                notify(data.msg!, 'success')
            } else {
                notify(data.msg!, 'error')
            }
        } catch {
            notify('Error cancelling rental.', 'error')
        } finally {
            setIsCancelling(false);
        }
    }, [clearInfo, timeoutRemaining]);

    const markAsDone = useCallback(async (activation?: string) => {
        const activationId = numberInfo?.activationId ?? activation;
        if (!activationId) return;
        await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/mark-server1`,
            { activationId }
        );
        clearInfo();
    }, [numberInfo, clearInfo]);

    const pollForSMS = useCallback(async (activationId: string, initialRemainingTime?: number) => {
        if (isPollingActive.current) return;
        isPollingActive.current = true;

        const startTime = Date.now();
        const endTime = startTime + (initialRemainingTime ?? POLLING_DURATION);

        if (!initialRemainingTime) {
            sessionStorage.setItem(SESSION_KEYS.startTime, startTime.toString());
        }

        if (countdownInterval.current) clearInterval(countdownInterval.current);

        countdownInterval.current = setInterval(async () => {
            const timeLeft = endTime - Date.now();
            if (timeLeft <= 0) {
                clearInterval(countdownInterval.current!);
                countdownInterval.current = null;
                isPollingActive.current = false;
                clearSessionStorage();
                setTimeoutRemaining('00:00');
                setNumberInfo(null);
                updateOtp(null);
                setLoading(false);
                notify('Timeout: No response after 5 minutes.', 'error');
                await cancelRental(activationId);
            } else {
                setTimeoutRemaining(formatTime(timeLeft));
            }
        }, 1000);

        const poll = async (): Promise<void> => {
            if (!isPollingActive.current) return;
            try {
                const { data } = await axios.get<OtpType>(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/server1/${activationId}`,
                    { headers: { Authorization: `Bearer ${getToken()}` } }
                );

                if (data.status === 'completed') {
                    updateOtp(data.code);
                    sessionStorage.setItem(SESSION_KEYS.otp, data.code);
                    return;
                }

                if (data.status === 'cancelled') {
                    clearInfo();
                    notify('Activation cancelled.', 'error');
                    return;
                }
                await delay(5000);
                return poll();
            } catch (error) {
                console.error('Polling error:', error);
                clearInfo();
            }
        };

        poll();
    }, [cancelRental, clearInfo, updateOtp]);

    const purchaseNumber = async (item: PriceType) => {
        setLoading(true);
        try {
            const { data } = await axios.post<GetNumberResponse>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/server1/sms`,
                { ...item },
                { headers: { Authorization: `Bearer ${getToken()}` } }
            );

            if (!data.ok) {
                notify(data?.msg ?? 'Error Occurred', 'error');
                setLoading(false);
                return;
            }

            const info = data.data ?? null;
            setNumberInfo(info);

            if (info) {
                sessionStorage.setItem(SESSION_KEYS.numberInfo, JSON.stringify(info));
                await pollForSMS(info.activationId);
            } else {
                setLoading(false);
            }

        } catch (error: unknown) {
            const err = error as AxiosError;
            if (err.status === 401) return router.push('/login');
            if (err.status === 403) return router.push('/account-suspended');
            notify('Error occurred while trying to rent a number', 'error');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const savedNumberStr = initialNumberStr ?? sessionStorage.getItem(SESSION_KEYS.numberInfo);
        const savedOtp = sessionStorage.getItem(SESSION_KEYS.otp);
        const savedStartTime = sessionStorage.getItem(SESSION_KEYS.startTime);

        if (savedOtp) updateOtp(savedOtp);

        trackTikTokEvent("ViewContent", {
            contents: [{ content_id: "virtual_number", content_type: "product", content_name: "Virtual SMS Number (OTP)" }],
        });

        if (!savedNumberStr || !savedStartTime) return;

        try {
            const parsedNumber = JSON.parse(savedNumberStr) as NumberInfo;
            const elapsed = Date.now() - parseInt(savedStartTime, 10);
            const remainingTime = POLLING_DURATION - elapsed;

            if (remainingTime <= 0) {
                clearSessionStorage();
                setTimeoutRemaining('00:00');
                return;
            }

            setNumberInfo(parsedNumber);
            setLoading(true);
            setTimeoutRemaining(formatTime(remainingTime));

            if (!savedOtp) {
                pollForSMS(parsedNumber.activationId, remainingTime);
            }

        } catch {
            clearSessionStorage();
        }

    }, [pollForSMS, updateOtp, initialNumberStr]);

    useEffect(() => {
        if (prevPathname.current === pathname) return;
        prevPathname.current = pathname;
        clearInfo();
    }, [pathname, clearInfo]);

    const addPrices = async (serviceID: string, serviceName: string) => {
        setPriceLoading(true);
        try {
            const { data } = await axios.post<PriceResponse>(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/virtual-numbers/server1/price`,
                { serviceID, countryCode: selectedCountry?.id }
            );

            if (data?.price) {
                setPrice({
                    countryId: data.price.countryId,
                    cost: data.price.cost,
                    stock: data.price.stock,
                    serviceID: data.price.serviceID,
                    name: serviceName,
                    country: selectedCountry?.eng || '',
                });
            } else {
                setPrice(null);
            }
        } catch {
            setPrice(null);
        } finally {
            setPriceLoading(false);
        }
    };

    const selectCountry = (country: countryTypes) => {
        setSelectedCountry(country);
        setSelectedService(null);
        setHideServices(true);
        setPrice(null);
    };

    const selectService = (service: serviceListType) => {
        setSelectedService(service);
        setPrice(null);
        addPrices(service.code, service.name);
    };

    const filteredCountries = sorted.filter(c =>
        c.eng.toLowerCase().includes(searchCountries.toLowerCase())
    );

    const filteredServices = services.filter(s =>
        s.name.toLowerCase().includes(searchServices.toLowerCase())
    );
    return (
        <>
            <section className='bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl animate-fade-in flex flex-col'>
                {loading && (
                    <PurchaseNumberModal
                        service={numberInfo?.name}
                        country={numberInfo?.country}
                        number={numberInfo?.number}
                        otp={otp || ''}
                        timeout={timeoutRemaining}
                        onClose={clearInfo}
                        markAsDone={() => markAsDone()}
                        canCel={() => cancelRental(numberInfo?.activationId ?? '')}
                        isCancelling={isCancelling}
                    />
                )}

                {/* Country Selection */}
                <div className="bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl mb-2 text-txt-secondary">
                    <div className='p-2'>
                        <h1 className='py-2'>1. Select country</h1>
                        {selectedCountry ? (

                            <div className="flex items-center justify-between p-2   bg-surface-tertiary border border-border-subtle text-txt-secondary text-sm rounded-sm py-2.5">
                                <p>{selectedCountry.eng}</p>
                                <button
                                    onClick={() => {
                                        setSelectedCountry(null);
                                        setSelectedService(null);
                                        setHideServices(false);
                                        setPrice(null);
                                    }}
                                    className="text-red-500 text-xl font-bold px-2 cursor-pointer"
                                >×</button>
                            </div>
                        ) : (
                            <>
                                <input
                                    value={searchCountries}
                                    onChange={(e) => setSearchCountries(e.target.value)}
                                    placeholder='Search country'
                                    type="text"
                                    className='w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted'
                                />
                                <div className="max-h-120 overflow-y-auto my-2 border-zinc-200 rounded-md py-2">
                                    <ul>
                                        {filteredCountries.map((country, index) => (
                                            <li key={index} className='my-2'>
                                                <label className='flex items-center gap-2 p-2 w-full cursor-pointer  bg-surface-tertiary border border-border-subtle text-txt-secondary text-sm rounded-sm py-2.5'>
                                                    <input
                                                        type="radio"
                                                        name="country"
                                                        value={country.eng}
                                                        onChange={() => selectCountry(country)}
                                                        className="accent-blue-500"
                                                    />
                                                    <p>{country.eng}</p>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Service Selection */}
                <div className='p-2 bg-surface-secondary border border-border-subtle rounded-sm shadow-2xl scroll-mt-24 text-txt-secondary'>
                    <h1 className='py-2'>2. Select service</h1>

                    <input
                        value={searchServices}
                        onChange={(e) => setSearchServices(e.target.value)}
                        placeholder='Search service'
                        type="text"
                        className='w-full bg-surface-tertiary border border-border-subtle text-txt-primary text-sm rounded-sm py-2.5 pl-10 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all placeholder:text-txt-muted'
                        disabled={!!selectedService}
                    />

                    {selectedService ? (
                        <div className='my-4 pt-8 pb-4 px-4 relative   bg-surface-secondary border border-border-subtle rounded-sm'>
                            {priceLoading ? (
                                <p>Loading prices...</p>
                            ) : price !== null ? (
                                <>
                                    <button
                                        disabled={loading}
                                        onClick={() => purchaseNumber(price)}
                                        className="flex w-full items-center justify-between text-[14px] cursor-pointer  gap-3 bg-accent text-surface-primary rounded-sm py-2 px-3 transition-colors"
                                    >
                                        <h2 className='text-[12px] font-semibold'>{selectedService.name}</h2>
                                        <p className="text-[11px]">Stock: {price.stock ?? 0}</p>
                                        <div className="flex gap-1 items-center">
                                            <p>₦{price.cost.toLocaleString()}</p>
                                            <ShoppingCart size={16} />
                                        </div>
                                    </button>
                                    <div className="bg-yellow-100 my-3 text-yellow-800 p-3 rounded-md text-sm">
                                        <strong>Note:</strong> Kindly click on the <strong>price above</strong> to receive your number and code. Turn your VPN <strong>on or off</strong> if needed to get your SMS. No code? You&apos;ll get a <strong>full refund</strong>. We aren&apos;t responsible for issues after you receive your code, such as account bans on WhatsApp, Telegram or other platforms.
                                    </div>
                                </>
                            ) : (
                                <p>No price available</p>
                            )}
                            <button
                                onClick={() => { setSelectedService(null); setPrice(null); }}
                                className='text-red-500 text-xl font-bold px-2 absolute top-0 right-1 cursor-pointer'
                            >×</button>
                        </div>
                    ) : (
                        <div className="max-h-120 overflow-y-auto my-2 border-zinc-200 rounded-md py-2">
                            {hideServices && (
                                <ul>
                                    {filteredServices.map((service, index) => (
                                        <li key={index} className='my-2'>
                                            <button
                                                type="button"
                                                onClick={() => selectService(service)}
                                                className='flex items-center justify-between rounded-md p-1 border border-zinc-200 w-full cursor-pointer'
                                            >
                                                <div className='flex items-center gap-2'>
                                                    <input type="radio" name="service" readOnly />
                                                    <p>{service.name}</p>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default VirtualNumber;