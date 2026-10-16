import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { supabase } from '@/lib/supabase';
import { services } from '@/lib/data';

export default function ContactPage() {
  const { t, lang } = useI18n();
  const [formType, setFormType] = useState<'quotation' | 'site-survey' | 'maintenance'>('quotation');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const { error } = await supabase.from('contact_submissions').insert({
      form_type: formType,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      company: formData.company || null,
      service: formData.service || null,
      message: formData.message,
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    }
  };

  const formTabs = [
    { key: 'quotation' as const, label: t('contact.form.quotation') },
    { key: 'site-survey' as const, label: t('contact.form.sitesurvey') },
    { key: 'maintenance' as const, label: t('contact.form.maintenance') },
  ];

  const serviceKey = (s: string) => {
    return s === 'fire-alarm' ? 'firealarm' : s === 'pa-systems' ? 'pa' : s === 'fiber-optics' ? 'fiber' : s === 'it-support' ? 'itsupport' : s === 'access-control' ? 'accesscontrol' : s.replace(/-/g, '');
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-900 via-gray-900 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
            {t('contact.title')}
          </h1>
          <p className="mt-4 text-xl text-gray-400">{t('contact.subtitle')}</p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex flex-col sm:flex-row gap-2 mb-6">
                {formTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => { setFormType(tab.key); setStatus('idle'); }}
                    className={`flex-1 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                      formType === tab.key
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8">
                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-lg font-semibold text-gray-900">{t('contact.form.success')}</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                    >
                      {lang === 'en' ? 'Send Another Request' : 'إرسال طلب آخر'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {status === 'error' && (
                      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                        <p className="text-sm text-red-700">{t('contact.form.error')}</p>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          {t('contact.form.name')} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          {t('contact.form.email')} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          {t('contact.form.phone')}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          {t('contact.form.company')}
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        {t('contact.form.service')}
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                      >
                        <option value="">{t('contact.form.select')}</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.slug}>
                            {t(`service.${serviceKey(s.slug)}.title`)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        {t('contact.form.message')} *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all disabled:opacity-60"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {lang === 'en' ? 'Sending...' : 'جار الإرسال...'}
                        </>
                      ) : (
                        <>
                          {t('contact.form.submit')}
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-2xl p-6 lg:p-8 text-white">
                <h3 className="text-lg font-bold mb-6">{t('contact.info.title')}</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{t('contact.info.phone')}</div>
                      <div className="font-semibold mt-0.5" dir="ltr">+20 100 000 0000</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{t('contact.info.email')}</div>
                      <div className="font-semibold mt-0.5">info@itnation-eg.com</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{t('contact.info.address')}</div>
                      <div className="font-semibold mt-0.5">{t('contact.info.address.val')}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{t('contact.info.hours')}</div>
                      <div className="font-semibold mt-0.5 text-sm">{t('contact.info.hours.val')}</div>
                    </div>
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/201000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 rounded-2xl bg-[#25D366] hover:bg-[#1da851] transition-colors text-white text-center font-semibold"
              >
                {lang === 'en' ? 'Chat on WhatsApp' : 'تواصل عبر واتساب'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
