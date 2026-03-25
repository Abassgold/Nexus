'use client';
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getServices } from "@/fetchApi/Boosting";
import axios from "axios";

const faqs = [
  {
    question: "INSTAGRAM",
    answer: "FloZap is an all-in-one platform that allows you to buy virtual numbers, eSIMs, sell your USDT crypto, exchange gift cards for cash, and pay for various services securely and conveniently.",
  },
  {
    question: "FACEBOOK",
    answer: "Login to your FloZap account, go to the Virtual Number section, choose your preferred country and app service (WhatsApp, Telegram, etc.), and purchase instantly.",
  },
  {
    question: "TIKTOK",
    answer: "Yes, you can sell your USDT (Tether) securely at competitive rates and receive payment quickly into your preferred bank account or wallet.",
  },
  {
    question: "YOUTUBE",
    answer: "Absolutely. FloZap offers eSIMs for data and calls, allowing you to stay connected globally without the need for physical SIM cards.",
  },
  {
    question: "X/TWITTER",
    answer: "Yes. FloZap allows you to exchange various gift cards for cash easily and securely with fast payout times.",
  },
  {
    question: "TELEGRAM",
    answer: "Yes, FloZap prioritizes your security with advanced encryption, secure payment gateways, and strict compliance with industry standards to protect your data and transactions.",
  },
    {
    question: "DISCORD",
    answer: "Yes, FloZap prioritizes your security with advanced encryption, secure payment gateways, and strict compliance with industry standards to protect your data and transactions.",
  },  {
    question: "LINKEDIN",
    answer: "Yes, FloZap prioritizes your security with advanced encryption, secure payment gateways, and strict compliance with industry standards to protect your data and transactions.",
  },  {
    question: "SNAPCHAT",
    answer: "Yes, FloZap prioritizes your security with advanced encryption, secure payment gateways, and strict compliance with industry standards to protect your data and transactions.",
  },  {
    question: "SPOTIFY",
    answer: "Yes, FloZap prioritizes your security with advanced encryption, secure payment gateways, and strict compliance with industry standards to protect your data and transactions.",
  },  {
    question: "WEBSITE",
    answer: "Yes, FloZap prioritizes your security with advanced encryption, secure payment gateways, and strict compliance with industry standards to protect your data and transactions.",
  },  {
    question: "OTHER",
    answer: "Yes, FloZap prioritizes your security with advanced encryption, secure payment gateways, and strict compliance with industry standards to protect your data and transactions.",
  }, 
];



const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
useEffect(()=>{
    const fetchServices = async () => {
        const {data} = await axios.get('/api/boosting');
    console.log(data)
  };

  fetchServices();
}, [])
  return (
    <section id="faq" className=" ">
      <div className="max-w-280 mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-[#8a8a8a]  ">
          Boost Your Accounts
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className=" cursor-pointer shadow-md overflow-hidden border rounded-sm bg-surface-secondary border-b border-border-subtle text-accent">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 cursor-pointer py-4 text-left  font-medium text-sm sm:text-base  focus:outline-none"
              >
                <span>{faq.question}</span>
                <span>{openIndex === index ? "-" : "+"}</span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4  text-sm sm:text-base cursor-pointer"
                  >
                    <div>{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
