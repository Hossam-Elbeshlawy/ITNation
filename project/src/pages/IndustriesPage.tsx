import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { industryImages } from '@/lib/images';

const industries = [
  { key: 'corporate' },
  { key: 'retail' },
  { key: 'healthcare' },
  { key: 'education' },
  { key: 'industrial' },
  { key: 'hospitality' },
  { key: 'residential' },
  { key: 'banking' },
];

export default function IndustriesPage() {
  const { t, lang, dir } = useI18n();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-900 via-gray-900 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
            {t('industries.title')}
          </h1>
          <p className="mt-4 text-xl text-gray-400">{t('industries.subtitle')}</p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((industry) => {
              const imgs = industryImages[industry.key] || [];
              return (
                <div
                  key={industry.key}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all"
                >
                  <div className="grid sm:grid-cols-2">
                    <div className="relative h-56 sm:h-full overflow-hidden">
                      <img
                        src={imgs[0]}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col justify-center">
                      <h3 className="text-xl font-bold text-gray-900">
                        {t(`industry.${industry.key}.title`)}
                      </h3>
                      <p className="mt-3 text-gray-600 leading-relaxed text-sm">
                        {t(`industry.${industry.key}.desc`)}
                      </p>
                      <Link
                        to="/contact"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        {t('hero.cta2')}
                        <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            {t('section.cta.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-600">{t('section.cta.subtitle')}</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
          >
            {t('section.cta.button')}
            <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>
    </div>
  );
}
