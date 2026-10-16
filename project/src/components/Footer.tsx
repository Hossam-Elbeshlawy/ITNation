import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';
import { services } from '@/lib/data';

export default function Footer() {
  const { t, lang, setLang } = useI18n();

  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-white text-sm">
                IT
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-base">IT Nation</span>
                <span className="text-blue-400 text-xs font-medium">Integrated Systems</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">{t('footer.about')}</p>
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t('footer.quicklinks')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/portfolio" className="hover:text-blue-400 transition-colors">{t('nav.portfolio')}</Link></li>
              <li><Link to="/industries" className="hover:text-blue-400 transition-colors">{t('nav.industries')}</Link></li>
              <li><Link to="/maintenance" className="hover:text-blue-400 transition-colors">{t('nav.maintenance')}</Link></li>
              <li><Link to="/brands" className="hover:text-blue-400 transition-colors">{t('nav.brands')}</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/admin" className="hover:text-blue-400 transition-colors">{t('nav.admin')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t('footer.services')}
            </h3>
            <ul className="space-y-2 text-sm">
              {services.map((s) => {
                const key = s.slug === 'fire-alarm' ? 'firealarm' : s.slug === 'pa-systems' ? 'pa' : s.slug === 'fiber-optics' ? 'fiber' : s.slug === 'it-support' ? 'itsupport' : s.slug === 'access-control' ? 'accesscontrol' : s.slug.replace(/-/g, '');
                return (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="hover:text-blue-400 transition-colors">
                      {t(`service.${key}.title`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                <span dir="ltr">+20 100 000 0000</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                <span>info@itnation-eg.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                <span>{t('contact.info.address.val')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-blue-400 shrink-0" />
                <span>{t('contact.info.hours.val')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} IT Nation Integrated Systems. {t('footer.rights')}
          </p>
          <p className="text-xs text-gray-600">{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
