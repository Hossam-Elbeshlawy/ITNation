export const services = [
  { slug: 'cctv', icon: 'Camera', category: 'cctv' },
  { slug: 'networking', icon: 'Network', category: 'networking' },
  { slug: 'cybersecurity', icon: 'ShieldCheck', category: 'cybersecurity' },
  { slug: 'fire-alarm', icon: 'Flame', category: 'fire-alarm' },
  { slug: 'access-control', icon: 'Fingerprint', category: 'access-control' },
  { slug: 'intercom', icon: 'Phone', category: 'intercom' },
  { slug: 'pa-systems', icon: 'Volume2', category: 'pa-systems' },
  { slug: 'fiber-optics', icon: 'Cable', category: 'fiber-optics' },
  { slug: 'it-support', icon: 'MonitorCog', category: 'it-support' },
] as const;

export const serviceDetails: Record<string, { features: { en: string; ar: string }[] }> = {
  cctv: {
    features: [
      { en: 'IP camera installation and configuration', ar: 'تركيب وتكوين كاميرات IP' },
      { en: 'Centralized video management systems (VMS)', ar: 'أنظمة إدارة الفيديو المركزية' },
      { en: 'Remote monitoring via mobile and web', ar: 'مراقبة عن بعد عبر الجوال والويب' },
      { en: 'AI-powered video analytics and motion detection', ar: 'تحليلات فيديو بالذكاء الاصطناعي واكتشاف الحركة' },
      { en: 'Network video recorders (NVR) and storage solutions', ar: 'مسجلات فيديو شبكية وحلول التخزين' },
      { en: 'PTZ cameras and thermal imaging', ar: 'كاميرات دوارة وتصوير حراري' },
    ],
  },
  networking: {
    features: [
      { en: 'Structured cabling (Cat6, Cat6A)', ar: 'كابلات منظمة (Cat6, Cat6A)' },
      { en: 'Enterprise switching and routing', ar: 'محولات وموجهات مؤسسية' },
      { en: 'Wireless LAN (WiFi 6) deployment', ar: 'نشر شبكات لاسلكية (WiFi 6)' },
      { en: 'Network security and segmentation (VLAN)', ar: 'أمن الشبكة وتقسيم الشبكات (VLAN)' },
      { en: 'Server room design and rack installation', ar: 'تصميم غرف الخوادم وتركيب الخزائن' },
      { en: 'Network monitoring and management', ar: 'مراقبة وإدارة الشبكة' },
    ],
  },
  cybersecurity: {
    features: [
      { en: 'Next-generation firewall deployment', ar: 'نشر جدران حماية من الجيل الجديد' },
      { en: 'Endpoint detection and response (EDR)', ar: 'اكتشاف نقاط النهاية والاستجابة' },
      { en: 'Security information and event management (SIEM)', ar: 'إدارة معلومات وأحداث الأمن' },
      { en: 'Vulnerability assessment and penetration testing', ar: 'تقييم الثغرات واختبار الاختراق' },
      { en: 'Data encryption and backup solutions', ar: 'تشفير البيانات وحلول النسخ الاحتياطي' },
      { en: 'Security awareness training', ar: 'تدريب الوعي الأمني' },
    ],
  },
  'fire-alarm': {
    features: [
      { en: 'Conventional and addressable fire detection', ar: 'كشف حريق تقليدي وعنواني' },
      { en: 'Smoke, heat, and multi-sensor detectors', ar: 'كواشف دخان وحرارة ومستشعرات متعددة' },
      { en: 'Fire suppression systems (FM-200, CO2)', ar: 'أنظمة إطفاء الحريق (FM-200, CO2)' },
      { en: 'Emergency notification and evacuation systems', ar: 'أنظمة إشعارات الطوارئ والإخلاء' },
      { en: 'Integration with BMS and access control', ar: 'تكامل مع نظام إدارة المبنى والتحكم في الدخول' },
      { en: 'Compliance with NFPA and Egyptian standards', ar: 'متوافق مع معايير NFPA والمصرية' },
    ],
  },
  'access-control': {
    features: [
      { en: 'Card-based and biometric access systems', ar: 'أنظمة دخول بالبطاقات والبصمة' },
      { en: 'Facial recognition terminals', ar: 'محطات التعرف على الوجه' },
      { en: 'Time and attendance management', ar: 'إدارة الحضور والانصراف' },
      { en: 'Visitor management systems', ar: 'أنظمة إدارة الزوار' },
      { en: 'Turnstiles and barrier gates', ar: 'أبواب دوارة وبوابات حاجزة' },
      { en: 'Cloud-based access management', ar: 'إدارة دخول سحابية' },
    ],
  },
  intercom: {
    features: [
      { en: 'Audio and video intercom systems', ar: 'أنظمة انتركوم صوتية ومرئية' },
      { en: 'IP-based intercom integration', ar: 'تكامل انتركوم عبر IP' },
      { en: 'Multi-building and multi-entrance solutions', ar: 'حلول متعددة المباني والمداخل' },
      { en: 'Door phone and gate integration', ar: 'تكامل هواتف الأبواب والبوابات' },
      { en: 'Wireless intercom solutions', ar: 'حلول انتركوم لاسلكية' },
      { en: 'Integration with access control', ar: 'تكامل مع التحكم في الدخول' },
    ],
  },
  'pa-systems': {
    features: [
      { en: 'Public address and voice alarm systems', ar: 'أنظمة خطب عامة وإنذار صوتي' },
      { en: 'Background music distribution', ar: 'توزيع موسيقى خلفية' },
      { en: 'Zoned audio management', ar: 'إدارة صوتية مقسمة' },
      { en: 'Amplifiers, speakers, and microphones', ar: 'مكبرات ومكبرات صوت وميكروفونات' },
      { en: 'Integration with fire alarm evacuation', ar: 'تكامل مع إخلاء إنذار الحريق' },
      { en: 'Digital signage and display integration', ar: 'تكمل اللوحات الرقمية والشاشات' },
    ],
  },
  'fiber-optics': {
    features: [
      { en: 'Fiber optic cable installation (single/multi-mode)', ar: 'تركيب كابلات الألياف الضوئية (أحادي/متعدد الموضع)' },
      { en: 'Fusion splicing and mechanical splicing', ar: 'لحام انصهاري ولحام ميكانيكي' },
      { en: 'OTDR testing and certification', ar: 'اختبار وشهادات OTDR' },
      { en: 'Fiber termination and patch panel installation', ar: 'إنهاء الألياف وتركيب لوحات التوصيل' },
      { en: 'Fiber optic backbone design', ar: 'تصميم العمود الفقري للألياف الضوئية' },
      { en: 'Emergency fiber repair', ar: 'إصلاح طوارئ الألياف' },
    ],
  },
  'it-support': {
    features: [
      { en: 'Managed IT services and monitoring', ar: 'خدمات تقنية المعلومات المدارة والمراقبة' },
      { en: 'Helpdesk support (on-site and remote)', ar: 'دعم المكتب المساعد (في الموقع وعن بعد)' },
      { en: 'Server and virtualization management', ar: 'إدارة الخوادم والافتراض' },
      { en: 'Cloud migration and integration', ar: 'الهجرة والتكامل السحابي' },
      { en: 'Backup and disaster recovery', ar: 'النسخ الاحتياطي والتعافي من الكوارث' },
      { en: 'IT consulting and procurement', ar: 'استشارات تقنية المعلومات والتوريد' },
    ],
  },
};

export const categories = [
  { slug: 'cctv', icon: 'Camera' },
  { slug: 'networking', icon: 'Network' },
  { slug: 'cybersecurity', icon: 'ShieldCheck' },
  { slug: 'fire-alarm', icon: 'Flame' },
  { slug: 'access-control', icon: 'Fingerprint' },
  { slug: 'intercom', icon: 'Phone' },
  { slug: 'pa-systems', icon: 'Volume2' },
  { slug: 'fiber-optics', icon: 'Cable' },
  { slug: 'it-support', icon: 'MonitorCog' },
] as const;

export const brands = [
  { name: 'Hikvision', icon: 'Camera' },
  { name: 'Dahua', icon: 'Camera' },
  { name: 'Cisco', icon: 'Network' },
  { name: 'Mikrotik', icon: 'Network' },
  { name: 'Ubiquiti', icon: 'Wifi' },
  { name: 'Fortinet', icon: 'ShieldCheck' },
  { name: 'Palo Alto', icon: 'ShieldCheck' },
  { name: 'Honeywell', icon: 'Flame' },
  { name: 'Bosch', icon: 'Flame' },
  { name: 'ZKTeco', icon: 'Fingerprint' },
  { name: 'Hikvision Access', icon: 'Fingerprint' },
  { name: 'Commscope', icon: 'Cable' },
  { name: 'Fluke', icon: 'Cable' },
  { name: 'APC', icon: 'Server' },
  { name: 'Dell', icon: 'Server' },
  { name: 'Microsoft', icon: 'MonitorCog' },
] as const;
