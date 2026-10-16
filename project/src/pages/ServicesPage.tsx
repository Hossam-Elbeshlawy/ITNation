import { Link, useParams } from 'react-router-dom';
import {
  Camera, Network, ShieldCheck, Flame, Fingerprint, Phone, Volume2, Cable, MonitorCog,
  ArrowRight, CheckCircle2, ArrowLeft,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { services, serviceDetails } from '@/lib/data';
import { serviceImages } from '@/lib/images';
import { useEffect, useState } from 'react';
import { supabase, type Project } from '@/lib/supabase';

const iconMap: Record<string, typeof Camera> = {
  Camera, Network, ShieldCheck, Flame, Fingerprint, Phone, Volume2, Cable, MonitorCog,
};

export default function ServicesPage() {
  const { slug } = useParams();
  const { t, lang, dir } = useI18n();
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  const serviceKey = (s: string) => {
    return s === 'fire-alarm' ? 'firealarm' : s === 'pa-systems' ? 'pa' : s === 'fiber-optics' ? 'fiber' : s === 'it-support' ? 'itsupport' : s === 'access-control' ? 'accesscontrol' : s.replace(/-/g, '');
  };

  // If no slug, show all services
  if (!slug) {
    return (
      <div className="bg-white">
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-900 via-gray-900 to-black"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
              {t('section.services.title')}
            </h1>
            <p className="mt-4 text-xl text-gray-400">{t('section.services.subtitle')}</p>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const Icon = iconMap[service.icon] || Camera;
                const key = serviceKey(service.slug);
                const imgs = serviceImages[service.slug] || [];
                return (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={imgs[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {t(`service.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">
                        {t(`service.${key}.desc`)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                        {t('service.learnmore')}
                        <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Individual service page
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-2xl text-gray-900 font-bold">Service not found</p>
          <Link to="/services" className="mt-4 inline-flex items-center gap-2 text-blue-600 font-semibold">
            <ArrowLeft className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            {t('nav.services')}
          </Link>
        </div>
      </div>
    );
  }

  const key = serviceKey(service.slug);
  const Icon = iconMap[service.icon] || Camera;
  const imgs = serviceImages[service.slug] || [];
  const details = serviceDetails[service.slug];

  useEffect(() => {
    if (service) {
      supabase
        .from('projects')
        .select('*')
        .eq('published', true)
        .eq('category', service.category)
        .order('created_at', { ascending: false })
        .limit(4)
        .then(({ data }) => {
          if (data) setRelatedProjects(data);
        });
    }
  }, [service]);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src={imgs[0]} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/services" className="hover:text-blue-400">{t('nav.services')}</Link>
            <span>/</span>
            <span className="text-white">{t(`service.${key}.title`)}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
              {t(`service.${key}.title`)}
            </h1>
          </div>
          <p className="mt-6 text-lg text-gray-300 max-w-3xl leading-relaxed">
            {t(`service.${key}.desc`)}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-8">
                {lang === 'en' ? 'What We Deliver' : 'ما نقدمه'}
              </h2>
              <ul className="space-y-4">
                {details?.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{lang === 'en' ? f.en : f.ar}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
              >
                {t('service.getquote')}
                <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {imgs.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className={`rounded-2xl w-full object-cover ${i % 2 === 0 ? 'h-64' : 'h-64 mt-8'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-8">
              {t('service.related.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    {project.images && project.images.length > 0 && (
                      <img src={project.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                      {lang === 'en' ? project.title_en : project.title_ar}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
