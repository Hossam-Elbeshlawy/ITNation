import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useI18n } from '@/i18n/I18nContext';

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/about', label: t('nav.about') },
    { to: '/services', label: t('nav.services'), hasDropdown: true },
    { to: '/portfolio', label: t('nav.portfolio') },
    { to: '/industries', label: t('nav.industries') },
    { to: '/maintenance', label: t('nav.maintenance') },
    { to: '/brands', label: t('nav.brands') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const serviceLinks = [
    { slug: 'cctv', label: t('service.cctv.title') },
    { slug: 'networking', label: t('service.networking.title') },
    { slug: 'cybersecurity', label: t('service.cybersecurity.title') },
    { slug: 'fire-alarm', label: t('service.firealarm.title') },
    { slug: 'access-control', label: t('service.accesscontrol.title') },
    { slug: 'intercom', label: t('service.intercom.title') },
    { slug: 'pa-systems', label: t('service.pa.title') },
    { slug: 'fiber-optics', label: t('service.fiber.title') },
    { slug: 'it-support', label: t('service.itsupport.title') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-white text-sm">
              IT
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-base lg:text-lg tracking-tight">IT Nation</span>
              <span className="text-blue-400 text-[10px] lg:text-xs font-medium tracking-wide">Integrated Systems</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setServicesOpen(true)}
                onMouseLeave={() => item.hasDropdown && setServicesOpen(false)}
              >
                <Link
                  to={item.to}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                    isActive(item.to)
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {item.hasDropdown && servicesOpen && (
                  <div className="absolute top-full pt-2 left-1/2 -translate-x-1/2">
                    <div className="w-64 bg-white rounded-xl shadow-2xl shadow-black/20 overflow-hidden border border-gray-100">
                      <div className="grid grid-cols-1 gap-0.5 p-2">
                        {serviceLinks.map((s) => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            className="px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              {lang === 'en' ? 'عربي' : 'EN'}
            </button>

            <Link
              to="/contact"
              className="hidden md:inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {t('hero.cta2')}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
          <nav className="px-4 py-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.to}>
                <Link
                  to={item.to}
                  className={`block px-3 py-2.5 text-base font-medium rounded-lg ${
                    isActive(item.to)
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
                {item.hasDropdown && (
                  <div className="pl-4 space-y-0.5 mt-1">
                    {serviceLinks.map((s) => (
                      <Link
                        key={s.slug}
                        to={`/services/${s.slug}`}
                        className="block px-3 py-2 text-sm text-gray-400 hover:text-blue-400 rounded-lg"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-3 py-2.5 text-base font-medium text-gray-300 w-full"
            >
              <Globe className="w-5 h-5" />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>

            <Link
              to="/contact"
              className="block px-3 py-3 mt-2 bg-blue-600 text-white text-center font-semibold rounded-lg"
            >
              {t('hero.cta2')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
