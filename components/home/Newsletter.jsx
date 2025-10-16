'use client'
import React, { useState } from 'react'
import Title from '../shared/Title'
import { useTranslations } from 'next-intl'
import { Mail, Send, CheckCircle } from 'lucide-react'

const Newsletter = () => {
    const t = useTranslations('common')
    const [email, setEmail] = useState('')
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) return
        
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsSubscribed(true)
            setIsLoading(false)
            setEmail('')
        }, 1000)
    }

    return (
        <section className="section-padding bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}></div>
            </div>
            
            <div className="container-custom relative">
                <div className="text-center space-y-8">
                    {/* Title */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/50"></div>
                            <Mail size={24} className="text-white/80" />
                            <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/50"></div>
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            {t('newsletter.title')}
                        </h2>
                        
                        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            {t('newsletter.subtitle')}
                        </p>
                    </div>

                    {/* Newsletter Form */}
                    <div className="max-w-md mx-auto">
                        {!isSubscribed ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20 shadow-xl">
                                    <div className="flex-1 flex items-center px-4">
                                        <Mail size={20} className="text-white/60 mr-3" />
                                        <input 
                                            className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg"
                                            type="email" 
                                            placeholder={t('newsletter.emailPlaceholder')}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <span>{t('newsletter.subscribe')}</span>
                                                <Send size={16} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                                <div className="flex items-center justify-center space-x-3 text-white">
                                    <CheckCircle size={24} className="text-green-400" />
                                    <span className="text-lg font-semibold">Successfully subscribed!</span>
                                </div>
                                <p className="text-white/80 text-center mt-2">
                                    Thank you for joining our newsletter. You'll receive updates soon!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
                                <span className="text-white font-bold">📧</span>
                            </div>
                            <h3 className="text-white font-semibold">Weekly Updates</h3>
                            <p className="text-white/70 text-sm">Get the latest product news</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
                                <span className="text-white font-bold">🎁</span>
                            </div>
                            <h3 className="text-white font-semibold">Exclusive Offers</h3>
                            <p className="text-white/70 text-sm">Special discounts for subscribers</p>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
                                <span className="text-white font-bold">⚡</span>
                            </div>
                            <h3 className="text-white font-semibold">Early Access</h3>
                            <p className="text-white/70 text-sm">Be first to see new arrivals</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter