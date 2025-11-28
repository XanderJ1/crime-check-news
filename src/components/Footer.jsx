"use client";
import { useState } from "react";
import Link from "next/link";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        if (email) {
            alert(`Thank you for subscribing with: ${email}`);
            setEmail("");
        }
    };

    return (
        <footer className="bg-slate-900 text-white">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand Section */}
                    <div className="flex flex-col">
                        <img className="w-20 h-20 mb-4" src="/logo.png" alt="Logo" />
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Dedication to crime prevention, advocacy, justice reform, and support
                            for vulnerable groups
                        </p>
                    </div>

                    {/* Learn More Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Learn More</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    About CrimeCheck
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    Events
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    Volunteer
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                                    Contact us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Get in Touch Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Get in touch</h3>
                        <div className="space-y-4 text-slate-400 text-sm">
                            <a href="tel:+233242074276">+233 242 074 276</a>
                            <p>info@crimecheckfoundationgh.org</p>
                            <p>Old barrier, Kasoa</p>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Join our newsletter</h3>
                        <div className="flex mb-10">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                                required
                                className="flex-1 px-4 py-3 bg-transparent border border-slate-700 rounded-l text-white text-sm placeholder-slate-500 focus:outline-none focus:border-slate-600"
                            />
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="px-6 py-3 bg-transparent border border-slate-700 border-l-0 rounded-r text-white text-sm hover:bg-slate-800 transition-colors"
                            >
                                Submit
                            </button>
                        </div>

                        <h3 className="text-lg font-semibold mb-5">Social</h3>
                        <div className="flex gap-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="w-10 h-10 flex items-center justify-center hover:-translate-y-1 transition-transform"
                            >
                                <i className="pi pi-facebook text-xl"></i>
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 flex items-center justify-center hover:-translate-y-1 transition-transform"
                            >
                                <i className="pi pi-instagram text-xl"></i>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="flex items-center hover:-translate-y-1 transition-transform"
                            >
                                <i className="pi pi-twitter text-xl"></i>
                            </a>
                            <a
                                href="https://www.youtube.com/@Meenabreastcancertv"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="w-10 h-10 flex items-center justify-center hover:-translate-y-1 transition-transform"
                            >
                                <i className="pi pi-youtube text-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-slate-800">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        ©2025 Crime CheckFoundation. All rights reserved.
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                            Privacy policy
                        </a>
                        <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">
                            Terms and conditions
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;