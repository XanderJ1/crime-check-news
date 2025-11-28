"use client";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="max-w-[1600px] mx-auto pt-4 px-4">
            <div className="flex items-center justify-between gap-4">
                {/* Logo */}
                <Link className="flex-shrink-0" href="/">
                    <img src="/logo.png" alt="Crime Check News" className="h-12 w-12 md:h-16 md:w-16" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block">
                    <ul className="flex gap-6 items-center">
                        <li><Link className="text-gray-700 font-bold hover:text-gray-900 transition-colors" href="/">Home</Link></li>
                        <li><Link className="text-gray-700 font-bold hover:text-gray-900 transition-colors" href="/news">News</Link></li>
                        <li><Link className="text-gray-700 font-bold hover:text-gray-900 transition-colors" href="/politics">Politics</Link></li>
                        <li><Link className="text-gray-700 font-bold hover:text-gray-900 transition-colors" href="/sports">Sports</Link></li>
                        <li><Link className="text-gray-700 font-bold hover:text-gray-900 transition-colors" href="/business">Business</Link></li>
                        <li><Link className="text-gray-700 font-bold hover:text-gray-900 transition-colors" href="/lifestyle">Lifestyle</Link></li>
                        <li><Link className="text-gray-700 font-bold hover:text-gray-900 transition-colors" href="/entertainment">Entertainment</Link></li>
                        <li><Link className="text-gray-700 font-bold hover:text-gray-900 transition-colors" href="/arts">Arts</Link></li>
                        <li><Link className="text-gray-700 font-bold hover:text-gray-900 transition-colors" href="/international">International</Link></li>
                    </ul>
                </nav>

                {/* Desktop Search */}
                <input
                    className="hidden md:block border px-3 py-1 border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="text"
                    placeholder="Search"
                />

                {/* Subscribe Button */}
                <Link
                    className="hidden sm:block flex-shrink-0 rounded-xl px-4 py-2 font-bold border border-gray-700 bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                    href="/subscribe"
                >
                    Subscribe
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="lg:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded-md transition-colors"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <nav className="pt-4 pb-2">
                    <ul className="flex flex-col gap-3">
                        <li><Link className="block text-gray-700 font-bold hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors" href="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                        <li><Link className="block text-gray-700 font-bold hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors" href="/news" onClick={() => setIsMenuOpen(false)}>News</Link></li>
                        <li><Link className="block text-gray-700 font-bold hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors" href="/politics" onClick={() => setIsMenuOpen(false)}>Politics</Link></li>
                        <li><Link className="block text-gray-700 font-bold hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors" href="/sports" onClick={() => setIsMenuOpen(false)}>Sports</Link></li>
                        <li><Link className="block text-gray-700 font-bold hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors" href="/business" onClick={() => setIsMenuOpen(false)}>Business</Link></li>
                        <li><Link className="block text-gray-700 font-bold hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors" href="/lifestyle" onClick={() => setIsMenuOpen(false)}>Lifestyle</Link></li>
                        <li><Link className="block text-gray-700 font-bold hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors" href="/entertainment" onClick={() => setIsMenuOpen(false)}>Entertainment</Link></li>
                        <li><Link className="block text-gray-700 font-bold hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors" href="/arts" onClick={() => setIsMenuOpen(false)}>Arts</Link></li>
                        <li><Link className="block text-gray-700 font-bold hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md transition-colors" href="/international" onClick={() => setIsMenuOpen(false)}>International</Link></li>
                    </ul>

                    {/* Mobile Search */}
                    <input
                        className="w-full mt-4 border px-3 py-2 border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-400"
                        type="text"
                        placeholder="Search"
                    />

                    {/* Mobile Subscribe Button (shown only on very small screens) */}
                    <Link
                        className="sm:hidden block mt-4 text-center rounded-xl px-4 py-2 font-bold border border-gray-700 bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                        href="/subscribe"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Subscribe
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;