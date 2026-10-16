import { Link } from 'react-router-dom';
import { ShieldCheck, Wrench, ArrowRight, CheckCircle2, Calendar, Clock, FileText, Headphones } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { siteImages } from '@/lib/images';

const preventiveFeatures = [
  { en: 'Quarterly on-site inspections', ar: 'فحص دوري ربع سنوي في الموقع' },
  { en: 'Camera lens cleaning and calibration', ar: 'تنظيف ومعايرة عدسات الكاميرات' },
  { en: 'System health and performance reports', ar: 'تقارير صحة وأداء النظام' },
  { en: 'Firmware and software updates', ar: 'تحديثات البرامج الثابتة والبرمجيات' },
  { en: 'Backup verification and storage check', ar: 'التحقق من النسخ الاحتياطي وفحص التخزين' },
  { en: 'Priority response on service calls', ar: 'استجابة ذات أولوية لطلبات الخدمة' },
];

const correctiveFeatures = [
  { en: '24/7 emergency repair hotline', ar: 'خط إصلاح طوارئ على مدار الساعة' },
  { en: 'On-site engineer dispatch within 24 hours', ar: 'إرسال مهندس للموقع خلال 24 ساعة' },
  { en: 'Fault diagnosis and root cause analysis', ar: 'تشخيص الأعطال وتحليل السبب الجذري' },
  { en: 'Genuine spare parts replacement', ar: 'استبدال بقطع غيار أصلية' },
  { en: 'System restoration and testing', ar: 'استعادة النظام واختباره' },
  { en: 'Post-repair performance report', ar: 'تقرير أداء بعد الإصلاح' },
];

const generalFeatures = [
  { icon: Calendar, en: 'Scheduled Site Visits', ar: 'زيارات مجدولة للموقع' },
  { icon: Clock, en: 'Rapid Response SLA', ar: 'اتفاقية استجابة سريعة' },
  { icon: FileText, en: 'Detailed Service Reports', ar: 'تقارير خدمة مفصلة' },
  { icon: Headphones, en: 'Dedicated Account Manager', ar: 'مدير حساب مخصص' },
];

export default function MaintenancePage() {
  const { t, lang, dir } = useI18n();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-900 via-gray-900 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
            {t('maintenance.title')}
          </h1>
          <p className="mt-4 text-xl text-gray-400">{t('maintenance.subtitle')}</p>
        </div>
      </section>

      {/* Two Types */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Preventive */}
            <div className="relative bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img src={siteImages.networking} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('maintenance.preventive.title')}</h3>
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <p className="text-gray-600 leading-relaxed">{t('maintenance.preventive.desc')}</p>
                <h4 className="mt-6 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  {t('maintenance.features')}
                </h4>
                <ul className="mt-4 space-y-3">
                  {preventiveFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{lang === 'en' ? f.en : f.ar}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Corrective */}
            <div className="relative bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img src={siteImages.itsupport} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('maintenance.corrective.title')}</h3>
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <p className="text-gray-600 leading-relaxed">{t('maintenance.corrective.desc')}</p>
                <h4 className="mt-6 font-semibold text-gray-900 text-sm uppercase tracking-wide">
                  {t('maintenance.features')}
                </h4>
                <ul className="mt-4 space-y-3">
                  {correctiveFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{lang === 'en' ? f.en : f.ar}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* General Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {generalFeatures.map((f, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white border border-gray-100">
                <div className="w-12 h-12 mx-auto rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{lang === 'en' ? f.en : f.ar}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            {t('maintenance.contact')}
          </h2>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
          >
            {t('hero.cta2')}
            <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>
    </div>
  );
}
