'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { trackContactFormSubmit } from '@/lib/gaEvents';
import { 
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    ChatBubbleLeftRightIcon,
    PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function ContactForm() {
    const t = useTranslations('contactPage.form');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        // Crear el contenido del email
        const subjectLine = `[ABC Kids Contact] ${formData.subject || 'General Inquiry'} - ${formData.name}`;
        const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message:
${formData.message}
        `.trim();
        // Abrir el cliente de correo con mailto
        const mailtoLink = `mailto:abckidzdirector@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        // Simular envío y resetear
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setTimeout(() => {
                setSent(false);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            }, 3000);
        }, 500);
        trackContactFormSubmit();
    };

    const subjects = [
        { value: 'general', label: t('subjects.general') },
        { value: 'tour', label: t('subjects.tour') },
        { value: 'enrollment', label: t('subjects.enrollment') },
        { value: 'programs', label: t('subjects.programs') },
        { value: 'other', label: t('subjects.other') }
    ];

    return (
        <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl border border-navy-900/5 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-accent/10 to-transparent rounded-bl-[100px]" />
            
            <div className="relative">
                {/* Header */}
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-semibold mb-4">
                        <EnvelopeIcon className="w-4 h-4" />
                        {t('badge')}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-3">
                        {t('title')}
                    </h2>
                    <p className="text-navy-900/60 text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name Input */}
                        <div className="group">
                            <label htmlFor="name" className="block text-sm font-bold text-navy-900 mb-2">
                                {t('name')} <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <UserIcon className="h-5 w-5 text-navy-900/30 group-focus-within:text-accent transition-colors duration-200" />
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    disabled={sent || sending}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-navy-900/10 rounded-xl text-navy-900 placeholder-navy-900/40 focus:outline-none focus:ring-0 focus:border-accent focus:bg-white transition-all duration-200"
                                    placeholder={t('namePlaceholder')}
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="group">
                            <label htmlFor="email" className="block text-sm font-bold text-navy-900 mb-2">
                                {t('email')} <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <EnvelopeIcon className="h-5 w-5 text-navy-900/30 group-focus-within:text-accent transition-colors duration-200" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    disabled={sent || sending}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-navy-900/10 rounded-xl text-navy-900 placeholder-navy-900/40 focus:outline-none focus:ring-0 focus:border-accent focus:bg-white transition-all duration-200"
                                    placeholder={t('emailPlaceholder')}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Phone and Subject Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Phone Input */}
                        <div className="group">
                            <label htmlFor="phone" className="block text-sm font-bold text-navy-900 mb-2">
                                {t('phone')} <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <PhoneIcon className="h-5 w-5 text-navy-900/30 group-focus-within:text-accent transition-colors duration-200" />
                                </div>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                    disabled={sent || sending}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-navy-900/10 rounded-xl text-navy-900 placeholder-navy-900/40 focus:outline-none focus:ring-0 focus:border-accent focus:bg-white transition-all duration-200"
                                    placeholder={t('phonePlaceholder')}
                                />
                            </div>
                        </div>

                        {/* Subject Select */}
                        <div className="group">
                            <label htmlFor="subject" className="block text-sm font-bold text-navy-900 mb-2">
                                {t('subject')} <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <ChatBubbleLeftRightIcon className="h-5 w-5 text-navy-900/30 group-focus-within:text-accent transition-colors duration-200" />
                                </div>
                                <select
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    required
                                    disabled={sent || sending}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-navy-900/10 rounded-xl text-navy-900 focus:outline-none focus:ring-0 focus:border-accent focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                                >
                                    <option value="">{t('subjectPlaceholder')}</option>
                                    {subjects.map((subject) => (
                                        <option key={subject.value} value={subject.value}>
                                            {subject.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-navy-900/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Textarea */}
                    <div className="group">
                        <label htmlFor="message" className="block text-sm font-bold text-navy-900 mb-2">
                            {t('message')} <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            disabled={sent || sending}
                            rows={5}
                            className="w-full px-4 py-4 bg-gray-50/50 border-2 border-navy-900/10 rounded-xl text-navy-900 placeholder-navy-900/40 focus:outline-none focus:ring-0 focus:border-accent focus:bg-white transition-all duration-200 resize-none"
                            placeholder={t('messagePlaceholder')}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={sent || sending}
                        className="w-full relative overflow-hidden group bg-linear-to-r from-accent to-yellow-400 text-navy-900 font-bold py-5 px-8 rounded-xl shadow-lg shadow-accent/25 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] disabled:hover:scale-100"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/30 to-transparent" />
                        
                        <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
                            {sent ? (
                                <>
                                    <CheckCircleIcon className="w-6 h-6" />
                                    {t('sent')}
                                </>
                            ) : sending ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t('sending')}
                                </>
                            ) : (
                                <>
                                    <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    {t('submit')}
                                </>
                            )}
                        </span>
                    </button>

                    <p className="text-sm text-navy-900/50 text-center">
                        {t('disclaimer')}
                    </p>
                </form>
            </div>
        </div>
    );
}
