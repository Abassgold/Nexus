import axios from "axios"


const getCountriesOptions = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_HERO_SMS_URL}?action=getCountries1`,
    params: { action: 'getCountries' }
};
const serviceListOptions = {
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_HERO_SMS_URL}?action=getServicesList`,
    params: { action: 'getServicesList' }
};



export const FetchServer = async () => {
    try {
        const countries = await axios.request(getCountriesOptions);
        const serviceList = await axios.request(serviceListOptions);

        return { countries: countries.data, serviceList: serviceList.data.services };
    } catch (error) {
        console.error(error);
        return { countries: [], serviceList: [] }
    }
}







