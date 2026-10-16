import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MapPin, Calendar, Building2, Tag, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { categories } from '@/lib/data';
import { useEffect, useState } from 'react';
import { supabase, type Project } from '@/lib/supabase';

const serviceLabel = (slug: string, t: (k: string) => string) => {
  const key = slug === 'fire-alarm' ? 'firealarm' : slug === 'pa-systems' ? 'pa' : slug === 'fiber-optics' ? 'fiber' : slug === 'it-support' ? 'itsupport' : slug === 'access-control' ? 'accesscontrol' : slug.replace(/-/g, '');
  return t(`service.${key}.title`);
};

export default function PortfolioPage() {
  const { slug } = useParams();
  const { t, lang, dir } = useI18n();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // If slug exists, show project detail
  if (slug) {
    return <ProjectDetail slug={slug} />;
  }

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (data) setProjects(data);
        setLoading(false);
      });
  }, []);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-900 via-gray-900 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
            {t('portfolio.title')}
          </h1>
          <p className="mt-4 text-xl text-gray-400">{t('portfolio.subtitle')}</p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 lg:top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('portfolio.all')}
            </button>
            {categories.map((cat) => {
              const key = cat.slug === 'fire-alarm' ? 'firealarm' : cat.slug === 'pa-systems' ? 'pa' : cat.slug === 'fiber-optics' ? 'fiber' : cat.slug === 'it-support' ? 'itsupport' : cat.slug === 'access-control' ? 'accesscontrol' : cat.slug.replace(/-/g, '');
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all ${
                    activeCategory === cat.slug
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(`service.${key}.title`)}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">{t('portfolio.noprojects')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={lang === 'en' ? project.title_en : project.title_ar}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      {serviceLabel(project.category, t)}
                    </span>
                    {project.featured && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                        ★
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                      {lang === 'en' ? project.title_en : project.title_ar}
                    </h3>
                    <p className="mt-1.5 text-sm text-gray-600 line-clamp-2">
                      {lang === 'en' ? project.description_en : project.description_ar}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                      {project.location_en && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {lang === 'en' ? project.location_en : project.location_ar}
                        </span>
                      )}
                      {project.year && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {project.year}
                        </span>
                      )}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                      {t('portfolio.viewproject')}
                      <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ProjectDetail({ slug }: { slug: string }) {
  const { t, lang, dir } = useI18n();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()
      .then(({ data, error }) => {
        if (data) setProject(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-20">
        <div className="text-center">
          <p className="text-2xl text-gray-900 font-bold">{t('project.notfound')}</p>
          <Link to="/portfolio" className="mt-4 inline-flex items-center gap-2 text-blue-600 font-semibold">
            <ArrowLeft className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            {t('project.back')}
          </Link>
        </div>
      </div>
    );
  }

  const scope = lang === 'en' ? project.scope_en : project.scope_ar;
  const images = project.images || [];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          {images.length > 0 && (
            <img src={images[0]} alt="" className="w-full h-full object-cover opacity-30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link to="/portfolio" className="hover:text-blue-400">{t('nav.portfolio')}</Link>
            <span>/</span>
            <span className="text-white">{serviceLabel(project.category, t)}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
              {serviceLabel(project.category, t)}
            </span>
            <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-sm font-medium rounded-full">
              {t('project.sample')}
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight max-w-3xl">
            {lang === 'en' ? project.title_en : project.title_ar}
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl leading-relaxed">
            {lang === 'en' ? project.description_en : project.description_ar}
          </p>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-12 lg:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {project.client_type_en && (
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                <Building2 className="w-5 h-5 text-blue-600 mb-2" />
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('project.client')}</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">
                  {lang === 'en' ? project.client_type_en : project.client_type_ar}
                </div>
              </div>
            )}
            {project.location_en && (
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                <MapPin className="w-5 h-5 text-blue-600 mb-2" />
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('project.location')}</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">
                  {lang === 'en' ? project.location_en : project.location_ar}
                </div>
              </div>
            )}
            {project.year && (
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
                <Calendar className="w-5 h-5 text-blue-600 mb-2" />
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t('project.year')}</div>
                <div className="text-sm font-semibold text-gray-900 mt-1">{project.year}</div>
              </div>
            )}
            <div className="p-5 rounded-xl bg-gray-50 border border-gray-100">
              <Tag className="w-5 h-5 text-blue-600 mb-2" />
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('project.category')}</div>
              <div className="text-sm font-semibold text-gray-900 mt-1">
                {serviceLabel(project.category, t)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {images.length > 0 && (
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-8">
              {t('project.gallery')}
            </h2>

            <div className="grid lg:grid-cols-3 gap-4">
              {/* Main image */}
              <div className="lg:col-span-2">
                <img
                  src={images[activeImage]}
                  alt=""
                  className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover rounded-2xl"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative overflow-hidden rounded-xl transition-all ${
                      activeImage === i ? 'ring-2 ring-blue-600' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-24 lg:h-28 object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Scope of Work */}
      {scope && scope.length > 0 && (
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-8">
              {t('project.scope')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {scope.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            {t('service.getquote')}
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
