import { Link } from 'react-router-dom';
import {
  Camera, Network, ShieldCheck, Flame, Fingerprint, Phone, Volume2, Cable, MonitorCog,
  ArrowRight, CheckCircle2, Award, Users, Building2, Wrench, Star,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { services } from '@/lib/data';
import { serviceImages, industryImages, siteImages } from '@/lib/images';
import { useEffect, useState } from 'react';
import { supabase, type Project } from '@/lib/supabase';

const iconMap: Record<string, typeof Camera> = {
  Camera, Network, ShieldCheck, Flame, Fingerprint, Phone, Volume2, Cable, MonitorCog,
};

const industries = [
  { key: 'corporate', icon: Building2 },
  { key: 'retail', icon: Building2 },
  { key: 'healthcare', icon: Building2 },
  { key: 'education', icon: Building2 },
  { key: 'industrial', icon: Building2 },
  { key: 'hospitality', icon: Building2 },
  { key: 'residential', icon: Building2 },
  { key: 'banking', icon: Building2 },
];

export default function HomePage() {
  const { t, lang, dir } = useI18n();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setFeaturedProjects(data);
        }
      });
  }, []);

  const serviceLabel = (slug: string) => {
    const key = slug === 'fire-alarm' ? 'firealarm' : slug === 'pa-systems' ? 'pa' : slug === 'fiber-optics' ? 'fiber' : slug === 'it-support' ? 'itsupport' : slug === 'access-control' ? 'accesscontrol' : slug.replace(/-/g, '');
    return t(`service.${key}.title`);
  };

  const whyItems = [
    { icon: Award, titleEn: 'Certified Expertise', titleAr: 'خبرة معتمدة', descEn: 'Our engineers hold industry certifications from leading technology vendors.', descAr: 'مهندسونا يحملون شهادات معتمدة من كبرى شركات التقنية.' },
    { icon: Wrench, titleEn: 'End-to-End Delivery', titleAr: 'تسليم متكامل', descEn: 'From design and procurement to installation and maintenance — one partner.', descAr: 'من التصميم والتوريد إلى التركيب والصيانة — شريك واحد.' },
    { icon: Star, titleEn: 'Proven Track Record', titleAr: 'سجل موثوق', descEn: 'Hundreds of successful projects delivered across Egypt for diverse industries.', descAr: 'مئات المشاريع الناجحة المنجزة في جميع أنحاء مصر لقطاعات متنوعة.' },
    { icon: Users, titleEn: 'Dedicated Support', titleAr: 'دعم مخصص', descEn: '24/7 support with rapid response times and preventive maintenance contracts.', descAr: 'دعم على مدار الساعة مع استجابة سريعة وعقود صيانة وقائية.' },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={siteImages.hero}
            alt="IT infrastructure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-600/30"
              >
                {t('hero.cta1')}
                <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20 backdrop-blur-sm"
              >
                {t('hero.cta2')}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-6">
              {[
                { value: '250+', label: t('stats.projects') },
                { value: '12+', label: t('stats.years') },
                { value: '80+', label: t('stats.clients') },
                { value: '25+', label: t('stats.team') },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              {t('section.services.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {t('section.services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon] || Camera;
              const slug = service.slug;
              const key = slug === 'fire-alarm' ? 'firealarm' : slug === 'pa-systems' ? 'pa' : slug === 'fiber-optics' ? 'fiber' : slug === 'it-support' ? 'itsupport' : slug === 'access-control' ? 'accesscontrol' : slug.replace(/-/g, '');
              const imgs = serviceImages[slug] || [];
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={imgs[0]}
                      alt={service.slug}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
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
                      <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              {t('section.why.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {lang === 'en' ? item.titleEn : item.titleAr}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {lang === 'en' ? item.descEn : item.descAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 lg:py-28 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                {t('section.portfolio.title')}
              </h2>
              <p className="mt-4 text-lg text-gray-400 max-w-xl">
                {t('section.portfolio.subtitle')}
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
            >
              {t('section.portfolio.viewall')}
              <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.slug}`}
                  className="group relative bg-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
                >
                  <div className="relative h-56 overflow-hidden">
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={lang === 'en' ? project.title_en : project.title_ar}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {serviceLabel(project.category)}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                      {lang === 'en' ? project.title_en : project.title_ar}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-400 line-clamp-2">
                      {lang === 'en' ? project.description_en : project.description_ar}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                      {project.location_en && (
                        <span>{lang === 'en' ? project.location_en : project.location_ar}</span>
                      )}
                      {project.year && <span>• {project.year}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { img: serviceImages.cctv[0], cat: 'cctv', titleEn: 'Corporate Tower Surveillance', titleAr: 'مراقبة برج مؤسسي' },
                { img: serviceImages.networking[0], cat: 'networking', titleEn: 'Data Center Network Infrastructure', titleAr: 'بنية شبكة مركز بيانات' },
                { img: serviceImages.firealarm[0], cat: 'fire-alarm', titleEn: 'Hospital Fire Safety System', titleAr: 'نظام أمان حريق لمستشفى' },
              ].map((p, i) => (
                <div key={i} className="group relative bg-gray-800 rounded-2xl overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <img src={p.img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {serviceLabel(p.cat)}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white text-lg">{lang === 'en' ? p.titleEn : p.titleAr}</h3>
                    <span className="mt-2 inline-block text-xs text-gray-500">{t('project.sample')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              {t('section.industries.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((industry) => {
              const imgs = industryImages[industry.key] || [];
              return (
                <Link
                  key={industry.key}
                  to="/industries"
                  className="group relative aspect-[4/5] rounded-xl overflow-hidden"
                >
                  <img
                    src={imgs[0]}
                    alt={industry.key}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm lg:text-base">
                      {t(`industry.${industry.key}.title`)}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={siteImages.about} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/85"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
            {t('section.cta.title')}
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            {t('section.cta.subtitle')}
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-600/30"
          >
            {t('section.cta.button')}
            <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>
    </div>
  );
}
