import React, { useState } from 'react';
import { MdLocationOn } from "react-icons/md";
import faqData from '../components/faqData.json'
import { FaPhone } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [formError, setFormError] = useState("");
    const [expandedQuestionIndex, setExpandedQuestionIndex] = useState(null); // State for FAQ
    const navigate = useNavigate();

    const handleToggleFAQ = (index) => {
        setExpandedQuestionIndex(expandedQuestionIndex === index ? null : index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullName = e.target['full-name'].value.trim();
        const message = e.target['message'].value.trim();

        if (!fullName || !message) {
            setFormError("Full Name and Message are required.");
            return;
        }

        setFormError("");
        setShowSuccessAlert(true);
        try {
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    if (showSuccessAlert) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-950">
                <div className="rounded-lg bg-stone-900 px-16 py-14">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-green-400 p-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-8 w-8 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h3 className="my-4 text-center text-3xl font-semibold text-gray-100">
                        Thank You!
                    </h3>
                    <p className="w-[230px] text-center font-normal text-gray-100">
                        Your message has been sent successfully. We will get back to you shortly.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="hero bg-stone-900 min-h-screen flex items-center justify-center">
            <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto p-5">
                {/* Heading Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-100">Have Some Questions?</h1>
                    <div className="contact-icons flex flex-col sm:flex-row items-center justify-center mt-5 space-y-3 sm:space-y-0 sm:space-x-6">
                        <div className="flex items-center">
                            <MdLocationOn className='text-2xl text-white mr-2' />
                            <span className="text-lg font-medium text-gray-50">Sobuj Bangla Restaurant</span>
                        </div>
                        <div className="flex items-center">
                            <FaPhone className='text-xl text-white mr-2' />
                            <span className="text-lg font-medium text-gray-50">+880 1234 567890</span>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-stone-950 text-gray-50 rounded-lg shadow-lg p-6 mb-10 max-h-80 overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                    {faqData.map((faq, index) => (
                        <div key={index} className="mb-4">
                            <button
                                className="w-full text-left font-semibold text-gray-200 hover:text-white"
                                onClick={() => handleToggleFAQ(index)}
                            >
                                {faq.question}
                            </button>
                            {expandedQuestionIndex === index && (
                                <div className="mt-2 text-gray-300">
                                    {faq.answer}
                                </div>
                            )}
                            <hr className="mt-2 border-gray-700" />
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="bg-stone-950 text-gray-50 rounded-lg shadow-lg p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col sm:flex-row justify-start items-center mb-5">
                            <label 
                                htmlFor="full-name" 
                                className="text-lg font-semibold sm:mb-0 mb-2 w-full sm:w-auto sm:mr-4">
                                Full Name:
                            </label>
                            <input 
                                type="text" 
                                id="full-name" 
                                placeholder="Enter your full name" 
                                className="w-full sm:w-[65%] px-4 py-2 border text-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div className="mb-5">
                            <label 
                                htmlFor="subject" 
                                className="text-lg font-semibold mb-2 block">
                                Subject:
                            </label>
                            <input 
                                type="text" 
                                id="subject" 
                                placeholder="Mention your area of concern" 
                                className="w-full px-4 py-2 border text-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        <div className="mb-5">
                            <label 
                                htmlFor="message" 
                                className="text-lg font-semibold mb-2 block">
                                Questions / Message:
                            </label>
                            <textarea 
                                id="message" 
                                rows="5" 
                                placeholder="Write your message here" 
                                className="w-full px-4 py-2 border text-gray-50 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                        </div>

                        {formError && <p className="text-red-500 text-center mb-4">{formError}</p>}

                        <div className="text-center">
                            <button 
                                type="submit" 
                                className="px-6 py-2 text-lg font-bold text-white bg-black rounded-lg hover:bg-white hover:text-black hover:border hover:border-black transition-all">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
