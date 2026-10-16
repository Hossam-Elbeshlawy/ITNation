import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'en' | 'ar';

type Translations = Record<string, { en: string; ar: string }>;

const t: Translations = {
  // Nav
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.about': { en: 'About', ar: 'من نحن' },
  'nav.services': { en: 'Services', ar: 'الخدمات' },
  'nav.portfolio': { en: 'Portfolio', ar: 'مشاريعنا' },
  'nav.industries': { en: 'Industries', ar: 'القطاعات' },
  'nav.maintenance': { en: 'Maintenance', ar: 'الصيانة' },
  'nav.contact': { en: 'Contact', ar: 'تواصل معنا' },
  'nav.brands': { en: 'Brands', ar: 'الشركاء' },
  'nav.admin': { en: 'Admin', ar: 'الإدارة' },

  // Hero
  'hero.badge': { en: 'Egyptian IT & Low-Current Systems Integrator', ar: 'متكامل أنظمة تقنية المعلومات والتيار الخفيف في مصر' },
  'hero.title': { en: 'Engineering Security, Connectivity & Infrastructure', ar: 'هندسة الأمن والاتصال والبنية التحتية' },
  'hero.subtitle': {
    en: 'From CCTV and cybersecurity to fiber optics and fire alarms — we design, install, and maintain mission-critical systems for businesses across Egypt.',
    ar: 'من كاميرات المراقبة والأمن السيبراني إلى الألياف الضوئية وأنظمة إنذار الحريق — نصمم ونركب ونحافظ على الأنظمة الحرجة للشركات في جميع أنحاء مصر.',
  },
  'hero.cta1': { en: 'View Our Projects', ar: 'شاهد مشاريعنا' },
  'hero.cta2': { en: 'Request a Quote', ar: 'اطلب عرض سعر' },

  // Stats
  'stats.projects': { en: 'Projects Delivered', ar: 'مشروع منجز' },
  'stats.years': { en: 'Years of Experience', ar: 'سنوات خبرة' },
  'stats.clients': { en: 'Active Clients', ar: 'عميل نشط' },
  'stats.team': { en: 'Certified Engineers', ar: 'مهندس معتمد' },

  // Sections
  'section.services.title': { en: 'Our Services', ar: 'خدماتنا' },
  'section.services.subtitle': { en: 'Comprehensive low-current and IT infrastructure solutions', ar: 'حلول شاملة للتيار الخفيف والبنية التحتية لتقنية المعلومات' },
  'section.why.title': { en: 'Why Choose IT Nation', ar: 'لماذا تختار آي تي نيشون' },
  'section.portfolio.title': { en: 'Featured Projects', ar: 'مشاريع مميزة' },
  'section.portfolio.subtitle': { en: 'A selection of our recent integration work', ar: 'مختارات من أحدث أعمال التكامل' },
  'section.portfolio.viewall': { en: 'View All Projects', ar: 'عرض كل المشاريع' },
  'section.industries.title': { en: 'Industries We Serve', ar: 'القطاعات التي نخدمها' },
  'section.brands.title': { en: 'Technology Partners', ar: 'شركاء التقنية' },
  'section.cta.title': { en: 'Ready to Start Your Project?', ar: 'جاهز لبدء مشروعك؟' },
  'section.cta.subtitle': { en: 'Get a free consultation and site survey from our engineering team.', ar: 'احصل على استشارة مجانية ومعاينة للموقع من فريقنا الهندسي.' },
  'section.cta.button': { en: 'Contact Us Today', ar: 'تواصل معنا اليوم' },

  // Services
  'service.cctv.title': { en: 'CCTV Surveillance', ar: 'أنظمة كاميرات المراقبة' },
  'service.cctv.desc': { en: 'IP and analog camera systems with remote monitoring, AI analytics, and central management.', ar: 'أنظمة كاميرات IP وتناظرية مع مراقبة عن بعد وتحليلات الذكاء الاصطناعي وإدارة مركزية.' },
  'service.networking.title': { en: 'Networking Solutions', ar: 'حلول الشبكات' },
  'service.networking.desc': { en: 'Structured cabling, switches, routers, and wireless infrastructure for enterprise networks.', ar: 'كابلات منظمة ومحولات وموجهات وبنية لاسلكية للشبكات المؤسسية.' },
  'service.cybersecurity.title': { en: 'Cybersecurity', ar: 'الأمن السيبراني' },
  'service.cybersecurity.desc': { en: 'Firewalls, endpoint protection, SIEM, and security assessments to safeguard your data.', ar: 'جدران حماية وحماية الأجهزة وأنظمة إدارة المعلومات والأمن وتقييمات أمنية لحماية بياناتك.' },
  'service.firealarm.title': { en: 'Fire Alarm Systems', ar: 'أنظمة إنذار الحريق' },
  'service.firealarm.desc': { en: 'Conventional and addressable fire detection, suppression, and emergency notification systems.', ar: 'أنظمة كشف حريق تقليدية وعنوانية وأنظمة إطفاء وإشعارات طوارئ.' },
  'service.accesscontrol.title': { en: 'Access Control', ar: 'أنظمة التحكم في الدخول' },
  'service.accesscontrol.desc': { en: 'Card, biometric, and facial recognition access systems with time-and-attendance integration.', ar: 'أنظمة دخول بالبطاقات والبصمة والتعرف على الوجه مع تكامل الحضور والانصراف.' },
  'service.intercom.title': { en: 'Intercom Systems', ar: 'أنظمة الانتركوم' },
  'service.intercom.desc': { en: 'Audio and video intercoms for residential, commercial, and industrial buildings.', ar: 'أنظمة انتركوم صوتية ومرئية للمباني السكنية والتجارية والصناعية.' },
  'service.pa.title': { en: 'PA Systems', ar: 'أنظمة الصوت' },
  'service.pa.desc': { en: 'Public address and background music systems for malls, offices, and public spaces.', ar: 'أنظمة خطب عامة وموسيقى خلفية للمولات والمكاتب والأماكن العامة.' },
  'service.fiber.title': { en: 'Fiber Optics', ar: 'الألياف الضوئية' },
  'service.fiber.desc': { en: 'Fiber optic cabling, splicing, testing, and OTDR certification for high-speed backbones.', ar: 'كابلات الألياف الضوئية واللحام والاختبار وشهادات OTDR للشبكات عالية السرعة.' },
  'service.itsupport.title': { en: 'IT Support', ar: 'الدعم الفني' },
  'service.itsupport.desc': { en: 'Managed IT services, helpdesk support, infrastructure management, and cloud integration.', ar: 'خدمات تقنية المعلومات المدارة ودعم المكتب المساعد وإدارة البنية التحتية والتكامل السحابي.' },

  // Service detail page
  'service.learnmore': { en: 'Learn More', ar: 'المزيد' },
  'service.related.title': { en: 'Related Projects', ar: 'مشاريع ذات صلة' },
  'service.getquote': { en: 'Request a Quote for This Service', ar: 'اطلب عرض سعر لهذه الخدمة' },

  // Portfolio
  'portfolio.title': { en: 'Projects Portfolio', ar: 'معرض المشاريع' },
  'portfolio.subtitle': { en: 'Explore our delivered integration projects across industries', ar: 'استكشف مشاريع التكامل المنجزة عبر القطاعات' },
  'portfolio.all': { en: 'All', ar: 'الكل' },
  'portfolio.noprojects': { en: 'No projects found in this category.', ar: 'لا توجد مشاريع في هذه الفئة.' },
  'portfolio.viewproject': { en: 'View Project', ar: 'عرض المشروع' },

  // Project detail
  'project.scope': { en: 'Scope of Work', ar: 'نطاق العمل' },
  'project.client': { en: 'Client Type', ar: 'نوع العميل' },
  'project.location': { en: 'Location', ar: 'الموقع' },
  'project.year': { en: 'Year', ar: 'السنة' },
  'project.category': { en: 'Category', ar: 'الفئة' },
  'project.gallery': { en: 'Project Gallery', ar: 'معرض الصور' },
  'project.back': { en: 'Back to Portfolio', ar: 'العودة للمشاريع' },
  'project.notfound': { en: 'Project not found.', ar: 'المشروع غير موجود.' },
  'project.sample': { en: 'Sample Project', ar: 'مشروع نموذجي' },

  // About
  'about.title': { en: 'About IT Nation', ar: 'عن آي تي نيشون' },
  'about.subtitle': { en: 'Your trusted partner in systems integration', ar: 'شريكك الموثوق في تكامل الأنظمة' },
  'about.story': { en: 'Our Story', ar: 'قصتنا' },
  'about.story.text': {
    en: 'IT Nation Integrated Systems is an Egyptian technology company specializing in low-current systems and IT infrastructure integration. Founded by a team of certified engineers, we deliver end-to-end solutions from design and procurement to installation, commissioning, and ongoing maintenance.',
    ar: 'آي تي نيشون للأنظمة المتكاملة هي شركة تقنية مصرية متخصصة في تكامل أنظمة التيار الخفيف والبنية التحتية لتقنية المعلومات. تأسست على يد فريق من المهندسين المعتمدين، ونقدم حلولاً متكاملة من التصميم والتوريد إلى التركيب والتشغيل والصيانة المستمرة.',
  },
  'about.mission': { en: 'Our Mission', ar: 'رسالتنا' },
  'about.mission.text': {
    en: 'To empower Egyptian businesses with reliable, future-proof technology infrastructure that protects assets, connects people, and enables growth.',
    ar: 'تمكين الشركات المصرية ببنية تحتية تقنية موثوقة ومستقبلية تحمي الأصول وتصل بين الناس وتتيح النمو.',
  },
  'about.vision': { en: 'Our Vision', ar: 'رؤيتنا' },
  'about.vision.text': {
    en: 'To be Egypt\'s leading low-current and IT systems integrator, recognized for engineering excellence and customer trust.',
    ar: 'أن نكون الرائد في مصر في تكامل أنظمة التيار الخفيف وتقنية المعلومات، معروفين بالتميز الهندسي وثقة العملاء.',
  },
  'about.values': { en: 'Our Values', ar: 'قيمنا' },
  'about.value1': { en: 'Engineering Excellence', ar: 'التميز الهندسي' },
  'about.value1.desc': { en: 'Every project meets international standards and best practices.', ar: 'كل مشروع يلبي المعايير الدولية وأفضل الممارسات.' },
  'about.value2': { en: 'Customer First', ar: 'العميل أولاً' },
  'about.value2.desc': { en: 'We build long-term partnerships, not one-time transactions.', ar: 'نبني شراكات طويلة المدى، لا تعاملات لمرة واحدة.' },
  'about.value3': { en: 'Innovation', ar: 'الابتكار' },
  'about.value3.desc': { en: 'We stay ahead of technology trends to deliver future-ready solutions.', ar: 'نواكب التطورات التقنية لتقديم حلول جاهزة للمستقبل.' },
  'about.value4': { en: 'Integrity', ar: 'النزاهة' },
  'about.value4.desc': { en: 'Transparent pricing, honest advice, and accountable delivery.', ar: 'تسعير شفاف ونصيحة صادقة وتسليم مسؤول.' },

  // Maintenance
  'maintenance.title': { en: 'Maintenance Contracts', ar: 'عقود الصيانة' },
  'maintenance.subtitle': { en: 'Keep your systems running at peak performance', ar: 'حافظ على أنظمتك بأفضل أداء' },
  'maintenance.preventive.title': { en: 'Preventive Maintenance', ar: 'الصيانة الوقائية' },
  'maintenance.preventive.desc': {
    en: 'Scheduled inspections, cleaning, calibration, and testing to prevent failures before they happen. Includes quarterly site visits, system health reports, and priority response.',
    ar: 'فحص دوري وتنظيف ومعايرة واختبار لمنع الأعطال قبل حدوثها. يشمل زيارات ربع سنوية وتقارير صحة النظام واستجابة ذات أولوية.',
  },
  'maintenance.corrective.title': { en: 'Corrective Maintenance', ar: 'الصيانة التصحيحية' },
  'maintenance.corrective.desc': {
    en: 'Rapid-response repair services for active faults. Our engineers diagnose, repair, and restore full system functionality with minimal downtime.',
    ar: 'خدمات إصلاح سريعة الاستجابة للأعطال النشطة. يقوم مهندسونا بالتشخيص والإصلاح واستعادة وظائف النظام بالكامل بأقل وقت توقف.',
  },
  'maintenance.features': { en: 'What\'s Included', ar: 'ما يشمله العقد' },
  'maintenance.contact': { en: 'Request a Maintenance Contract', ar: 'اطلب عقد صيانة' },

  // Industries
  'industries.title': { en: 'Industries We Serve', ar: 'القطاعات التي نخدمها' },
  'industries.subtitle': { en: 'Tailored solutions for every sector', ar: 'حلول مخصصة لكل قطاع' },
  'industry.corporate.title': { en: 'Corporate Offices', ar: 'المكاتب المؤسسية' },
  'industry.corporate.desc': { en: 'Network infrastructure, access control, and CCTV for office towers.', ar: 'بنية شبكية وتحكم في الدخول وكاميرات مراقبة للأبراج المكتبية.' },
  'industry.retail.title': { en: 'Retail & Malls', ar: 'التجزئة والمولات' },
  'industry.retail.desc': { en: 'Surveillance, PA systems, and network infrastructure for retail chains.', ar: 'مراقبة وأنظمة صوت وبنية شبكية لسلاسل التجزئة.' },
  'industry.healthcare.title': { en: 'Healthcare', ar: 'الرعاية الصحية' },
  'industry.healthcare.desc': { en: 'Fire alarms, intercoms, and secure networking for hospitals and clinics.', ar: 'إنذار حريق وانتركوم وشبكات آمنة للمستشفيات والعيادات.' },
  'industry.education.title': { en: 'Education', ar: 'التعليم' },
  'industry.education.desc': { en: 'Campus networking, CCTV, and PA systems for schools and universities.', ar: 'شبكات الحرم وكاميرات وأنظمة صوت للمدارس والجامعات.' },
  'industry.industrial.title': { en: 'Industrial & Warehouses', ar: 'الصناعة والمخازن' },
  'industry.industrial.desc': { en: 'Robust surveillance, access control, and fire safety for facilities.', ar: 'مراقبة قوية وتحكم في الدخول وأمان حريق للمنشآت.' },
  'industry.hospitality.title': { en: 'Hospitality', ar: 'الضيافة' },
  'industry.hospitality.desc': { en: 'Intercoms, WiFi, CCTV, and fire safety for hotels and resorts.', ar: 'انتركوم وواي فاي وكاميرات وأمان حريق للفنادق والمنتجعات.' },
  'industry.residential.title': { en: 'Residential Compounds', ar: 'المجمعات السكنية' },
  'industry.residential.desc': { en: 'Smart home integration, access control, and perimeter security.', ar: 'تكامل المنازل الذكية والتحكم في الدخول وأمن المحيط.' },
  'industry.banking.title': { en: 'Banking & Finance', ar: 'البنوك والتمويل' },
  'industry.banking.desc': { en: 'High-security surveillance, access control, and cybersecurity solutions.', ar: 'مراقبة عالية الأمن وتحكم في الدخول وحلول أمن سيبراني.' },

  // Contact
  'contact.title': { en: 'Contact Us', ar: 'تواصل معنا' },
  'contact.subtitle': { en: 'Get in touch for quotations, site surveys, or maintenance contracts', ar: 'تواصل معنا لطلبات الأسعار أو المعاينة أو عقود الصيانة' },
  'contact.form.quotation': { en: 'Request a Quotation', ar: 'طلب عرض سعر' },
  'contact.form.sitesurvey': { en: 'Request a Site Survey', ar: 'طلب معاينة للموقع' },
  'contact.form.maintenance': { en: 'Request a Maintenance Contract', ar: 'طلب عقد صيانة' },
  'contact.form.name': { en: 'Full Name', ar: 'الاسم الكامل' },
  'contact.form.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'contact.form.phone': { en: 'Phone', ar: 'الهاتف' },
  'contact.form.company': { en: 'Company', ar: 'الشركة' },
  'contact.form.service': { en: 'Service Required', ar: 'الخدمة المطلوبة' },
  'contact.form.message': { en: 'Message', ar: 'الرسالة' },
  'contact.form.submit': { en: 'Send Request', ar: 'إرسال الطلب' },
  'contact.form.success': { en: 'Your request has been sent. We will contact you within 24 hours.', ar: 'تم إرسال طلبك. سنتواصل معك خلال 24 ساعة.' },
  'contact.form.error': { en: 'Something went wrong. Please try again or call us directly.', ar: 'حدث خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.' },
  'contact.form.select': { en: 'Select a service', ar: 'اختر خدمة' },
  'contact.info.title': { en: 'Contact Information', ar: 'معلومات الاتصال' },
  'contact.info.phone': { en: 'Phone', ar: 'الهاتف' },
  'contact.info.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'contact.info.address': { en: 'Address', ar: 'العنوان' },
  'contact.info.address.val': { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' },
  'contact.info.hours': { en: 'Working Hours', ar: 'ساعات العمل' },
  'contact.info.hours.val': { en: 'Sat - Thu: 9:00 AM - 6:00 PM', ar: 'السبت - الخميس: 9:00 ص - 6:00 م' },

  // Footer
  'footer.about': { en: 'IT Nation Integrated Systems — Egyptian IT and low-current systems integration company.', ar: 'آي تي نيشون للأنظمة المتكاملة — شركة مصرية لتكامل أنظمة تقنية المعلومات والتيار الخفيف.' },
  'footer.quicklinks': { en: 'Quick Links', ar: 'روابط سريعة' },
  'footer.services': { en: 'Services', ar: 'الخدمات' },
  'footer.contact': { en: 'Contact', ar: 'تواصل' },
  'footer.rights': { en: 'All rights reserved.', ar: 'جميع الحقوق محفوظة.' },
  'footer.disclaimer': { en: 'Sample projects shown for demonstration.', ar: 'المشاريع المعروضة نموذجية للعرض.' },

  // Admin
  'admin.title': { en: 'Admin Dashboard', ar: 'لوحة الإدارة' },
  'admin.login': { en: 'Admin Login', ar: 'تسجيل دخول الإدارة' },
  'admin.email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'admin.password': { en: 'Password', ar: 'كلمة المرور' },
  'admin.signin': { en: 'Sign In', ar: 'تسجيل الدخول' },
  'admin.signout': { en: 'Sign Out', ar: 'تسجيل الخروج' },
  'admin.projects': { en: 'Manage Projects', ar: 'إدارة المشاريع' },
  'admin.submissions': { en: 'Contact Submissions', ar: 'طلبات التواصل' },
  'admin.add': { en: 'Add Project', ar: 'إضافة مشروع' },
  'admin.edit': { en: 'Edit', ar: 'تعديل' },
  'admin.delete': { en: 'Delete', ar: 'حذف' },
  'admin.save': { en: 'Save', ar: 'حفظ' },
  'admin.cancel': { en: 'Cancel', ar: 'إلغاء' },
  'admin.new': { en: 'New Project', ar: 'مشروع جديد' },
  'admin.images': { en: 'Image URLs (one per line)', ar: 'روابط الصور (واحد لكل سطر)' },
  'admin.scope': { en: 'Scope of Work (one item per line)', ar: 'نطاق العمل (عنصر لكل سطر)' },
  'admin.featured': { en: 'Featured', ar: 'مميز' },
  'admin.published': { en: 'Published', ar: 'منشور' },
  'admin.confirmdelete': { en: 'Are you sure you want to delete this project?', ar: 'هل أنت متأكد من حذف هذا المشروع؟' },
  'admin.nosubmissions': { en: 'No submissions yet.', ar: 'لا توجد طلبات حتى الآن.' },
  'admin.loginerror': { en: 'Invalid email or password.', ar: 'بريد إلكتروني أو كلمة مرور غير صحيحة.' },
  'admin.welcometext': { en: 'Sign in to manage your projects and view contact submissions.', ar: 'سجل الدخول لإدارة مشاريعك وعرض طلبات التواصل.' },
  'admin.back': { en: 'Back to Website', ar: 'العودة للموقع' },
};

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('itnation-lang');
    return (saved === 'ar' || saved === 'en') ? saved : 'en';
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('itnation-lang', l);
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const translate = (key: string): string => {
    const entry = t[key];
    if (!entry) return key;
    return entry[lang];
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translate, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
