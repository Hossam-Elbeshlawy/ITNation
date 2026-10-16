import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { brands } from '@/lib/data';
import {
  Camera, Network, Wifi, ShieldCheck, Flame, Fingerprint, Cable, Server, MonitorCog,
} from 'lucide-react';

const iconMap: Record<string, typeof Camera> = {
  Camera, Network, Wifi, ShieldCheck, Flame, Fingerprint, Cable, Server, MonitorCog,
};

export default function BrandsPage() {
  const { t, dir } = useI18n();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-900 via-gray-900 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
            {t('section.brands.title')}
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
            {t('section.brands.title') === 'Technology Partners' ? 'We partner with the world\'s leading technology vendors to deliver best-in-class solutions.' : 'نتعاون مع كبرى شركات التقنية العالمية لتقديم حلول من الدرجة الأولى.'}
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {brands.map((brand, i) => {
              const Icon = iconMap[brand.icon] || Camera;
              return (
                <div
                  key={i}
                  className="group flex flex-col items-center justify-center p-8 rounded-2xl bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-50 group-hover:to-blue-100 flex items-center justify-center mb-4 transition-all">
                    <Icon className="w-7 h-7 text-gray-700 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-center">{brand.name}</h3>
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
