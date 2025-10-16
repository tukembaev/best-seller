import Link from "next/link";
import {useTranslations} from 'next-intl'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react'

const Footer = () => {
    const t = useTranslations('common')

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const linkSections = [
        {
            title: t('footer.products'),
            links: [
                { text: t('footer.earphones'), path: '/shop?category=earphones', icon: null },
                { text: t('footer.headphones'), path: '/shop?category=headphones', icon: null },
                { text: t('footer.smartphones'), path: '/shop?category=smartphones', icon: null },
                { text: t('footer.laptops'), path: '/shop?category=laptops', icon: null },
            ]
        },
        {
            title: t('footer.website'),
            links: [
                { text: t('nav.home'), path: '/', icon: null },
                { text: t('footer.privacy'), path: '/privacy', icon: null },
                { text: t('footer.plusMember'), path: '/pricing', icon: null },
                { text: t('footer.createStore'), path: '/create-store', icon: null },
            ]
        },
        {
            title: t('footer.contact'),
            links: [
                { text: "+996 770 220 555", path: 'tel:+996770220555', icon: Phone },
                { text: "info@bestseller.kg", path: 'mailto:info@bestseller.kg', icon: Mail },
                { text: "Bishkek, Kyrgyzstan", path: '/contact', icon: MapPin }
            ]
        }
    ];

    const socialIcons = [
        { icon: Facebook, link: "https://www.facebook.com", color: "hover:text-blue-600" },
        { icon: Instagram, link: "https://www.instagram.com", color: "hover:text-pink-600" },
        { icon: Twitter, link: "https://twitter.com", color: "hover:text-blue-400" },
        { icon: Linkedin, link: "https://www.linkedin.com", color: "hover:text-blue-700" },
    ]

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>
            
            <div className="container-custom relative">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid lg:grid-cols-4 gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg gold-glow">
                                    <span className="text-black font-bold text-xl">T</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-white tracking-wider">TREWATCH</span>
                                    <span className="text-sm text-yellow-500 -mt-1 font-medium tracking-widest">PREMIUM TIMEPIECES</span>
                                </div>
                            </div>
                            
                            <p className="text-gray-300 leading-relaxed max-w-sm">
                                Discover the world's most prestigious timepieces. From classic elegance to modern innovation, we bring you the finest watches from renowned brands.
                            </p>
                            
                            {/* Social Links */}
                            <div className="flex items-center space-x-4">
                                {socialIcons.map((item, i) => (
                                    <Link 
                                        href={item.link} 
                                        key={i} 
                                        className={`flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-yellow-500 rounded-lg transition-all duration-300 text-gray-300 hover:text-black transform hover:scale-110`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <item.icon size={18} />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Link Sections */}
                        <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
                            {linkSections.map((section, index) => (
                                <div key={index} className="space-y-6">
                                    <h3 className="text-lg font-bold text-yellow-500 border-b border-gray-700 pb-2 tracking-wide">
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-3">
                                        {section.links.map((link, i) => (
                                            <li key={i}>
                                                <Link 
                                                    href={link.path} 
                                                    className="group flex items-center space-x-2 text-gray-300 hover:text-yellow-500 transition-colors duration-200"
                                                >
                                                    {link.icon && <link.icon size={16} className="text-gray-400" />}
                                                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                                                        {link.text}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © 2024 TREWATCH. All rights reserved. Premium timepieces for discerning collectors.
                        </p>
                        
                        {/* Back to Top Button */}
                        <button 
                            onClick={scrollToTop}
                            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 gold-glow"
                        >
                            <span>Back to Top</span>
                            <ArrowUp size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;