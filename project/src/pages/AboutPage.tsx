import { Link } from 'react-router-dom';
import { Target, Eye, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

export default function AboutPage() {
  const { t, lang, dir } = useI18n();

  const values = [
    { key: 'value1', icon: Award },
    { key: 'value2', icon: Users },
    { key: 'value3', icon: Target },
    { key: 'value4', icon: CheckCircle2 },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-black"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
            {t('about.title')}
          </h1>
          <p className="mt-4 text-xl text-gray-400">{t('about.subtitle')}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                {t('about.story')}
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                {t('about.story.text')}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600">250+</div>
                  <div className="text-sm text-gray-600 mt-1">{t('stats.projects')}</div>
                </div>
                <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="text-3xl font-bold text-gray-900">12+</div>
                  <div className="text-sm text-gray-600 mt-1">{t('stats.years')}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/5354506/pexels-photo-5354506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt=""
                className="rounded-2xl w-full h-64 object-cover"
              />
              <img
                src="https://images.pexels.com/photos/4682189/pexels-photo-4682189.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt=""
                className="rounded-2xl w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 lg:p-10 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t('about.mission')}</h3>
              <p className="mt-4 text-gray-600 leading-relaxed text-lg">
                {t('about.mission.text')}
              </p>
            </div>
            <div className="p-8 lg:p-10 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t('about.vision')}</h3>
              <p className="mt-4 text-gray-600 leading-relaxed text-lg">
                {t('about.vision.text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              {t('about.values')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.key} className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 flex items-center justify-center mb-4">
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{t(`about.${v.key}`)}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {t(`about.${v.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
            {t('section.cta.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-400">{t('section.cta.subtitle')}</p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
          >
            {t('section.cta.button')}
            <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>
    </div>
  );
}
