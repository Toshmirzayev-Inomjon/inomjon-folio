export type TabId = "home" | "about" | "portfolio" | "experience" | "contact";

export type IconName =
  | "briefcase"
  | "code"
  | "dashboard"
  | "external"
  | "folder"
  | "github"
  | "home"
  | "inbox"
  | "instagram"
  | "linkedin"
  | "location"
  | "mail"
  | "monitor"
  | "rocket"
  | "send"
  | "settings"
  | "sparkles"
  | "user";

export const siteIdentity = {
  ownerName: "Inomjon Toshmirzayev",
  role: "Full-stack Dasturchi",
  brandName: "Inomjon Toshmirzayev",
  brandBase: "Inomjon",
  brandAccent: "Toshmirzayev",
  siteUrl: "https://toshmirzayev-inomjon.online",
  metadataTitle: "Inomjon Toshmirzayev | Full-stack Dasturchi",
  metadataDescription: "Zamonaviy web ilovalar, portfolio saytlar, dashboardlar va biznes uchun qulay web platformalar.",
  setupTitle: "Inomjon portfolio sozlashni talab qiladi",
  setupDescription: "Profil, loyihalar va lokatsiya ma'lumotlarini yaratish uchun Prisma migration va seedni ishga tushiring."
} as const;

export const personalProfile = {
  name: siteIdentity.ownerName,
  role: siteIdentity.role,
  headline: "Full-stack Dasturchi",
  bio: "Zamonaviy web ilovalar, portfolio saytlar, dashboardlar va biznes uchun qulay web platformalar yarataman. Next.js, React, TypeScript, Prisma va Tailwind CSS yordamida tez, chiroyli va foydali loyihalar quraman.",
  heroImage: "/uploads/profile-inomjon.webp",
  cvUrl: "/api/cv",
  telegramUrl: "https://t.me/toshmirzayevinomjon",
  githubUrl: "https://github.com/Toshmirzayev-Inomjon",
  linkedinUrl: "",
  instagramUrl: "",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Node.js", "PostgreSQL", "Git"]
} as const;

export const projectSeeds = [
  {
    title: "Admin Dashboard",
    description: "Statistika, foydalanuvchilar va kontent boshqaruvi uchun zamonaviy boshqaruv paneli.",
    imageUrl: "",
    techStack: "Next.js, TypeScript, Prisma, Tailwind CSS",
    visitUrl: siteIdentity.siteUrl,
    githubUrl: "",
    featured: true
  },
  {
    title: "E-Commerce Platforma",
    description: "Mahsulotlar, buyurtmalar va to'lov jarayonlari uchun qulay web platforma.",
    imageUrl: "",
    techStack: "React, Node.js, PostgreSQL, Tailwind CSS",
    visitUrl: "",
    githubUrl: "",
    featured: true
  },
  {
    title: "Portfolio Website",
    description: "Shaxsiy portfolio web-sayti. Next.js va Tailwind CSS yordamida yaratilgan.",
    imageUrl: "",
    techStack: "Next.js, React, TypeScript, Tailwind CSS",
    visitUrl: siteIdentity.siteUrl,
    githubUrl: "",
    featured: false
  },
  {
    title: "Business Web Platform",
    description: "Biznes jarayonlarini raqamlashtirish uchun tezkor va qulay web platforma.",
    imageUrl: "",
    techStack: "Next.js, Prisma, PostgreSQL, Git",
    visitUrl: "",
    githubUrl: "",
    featured: false
  }
] as const;

export const locationSeed = {
  latitude: 39.0843,
  longitude: 66.8332,
  iframeUrl: ""
} as const;

const workItemsUz = [
  {
    role: "Full-stack Dasturchi",
    company: "Mustaqil web loyihalar",
    period: "2024 - Hozir",
    description: "Next.js, React, TypeScript, Prisma va Tailwind CSS yordamida portfolio, dashboard va biznes platformalar yaratish."
  },
  {
    role: "Next.js Dasturchi",
    company: "Web ilovalar va platformalar",
    period: "2022 - 2024",
    description: "Responsive interfeyslar, API routelar, autentifikatsiya, admin panellar va database asosidagi funksiyalarni implementatsiya qilish."
  },
  {
    role: "Avtomatlashtirish Dasturchisi",
    company: "Mijoz integratsiyalari va web yechimlar",
    period: "2021 - 2022",
    description: "Biznes jarayonlari uchun integratsiyalar, botlar va qulay web yechimlar yaratish."
  }
] as const;

export const translations = {
  uz: {
    heroTitle: "Premium full-stack web platformalar yarataman",
    about: "Men haqimda",
    projects: "Loyihalar",
    contact: "Aloqa",
    skills: "Mening ekspertizam",
    letstalk: "Aloqaga chiqish",
    viewProjects: "Loyihalarni ko'rish",
    downloadCv: "CV yuklab olish",
    bookCall: "Aloqaga chiqish",
    langLabel: "Uz",
    profileHeadline: "Full-stack Dasturchi",
    profileBio: personalProfile.bio,
    home: "Bosh sahifa",
    portfolioLabel: "Tanlangan ishlar",
    aiBuilder: "Web yechimlar",
    focus: "Fokus",
    focusText: "G'oyadan tayyor mahsulotgacha zamonaviy web ilovalar, dashboardlar va biznes platformalar quraman.",
    experience: "Tajriba",
    workExperience: "Tajriba",
    aboutButton: "Men haqimda",
    stack: "Texnologiyalar",
    recentProjects: "So'nggi loyihalar",
    all: "Barchasini ko'rish",
    aboutMe: "Men haqimda",
    aboutTitle: "Salom, men",
    availableForHire: "Loyihalar uchun ochiqman",
    aboutText: "Men biznes uchun aniq, tez va foydalanishga qulay web yechimlar quradigan full-stack dasturchiman. Interfeys, backend, database va admin panel qismlarini bitta yaxlit mahsulot sifatida ishlab chiqaman.",
    yearsExperience: "Yillik tajriba",
    projectsCompleted: "Loyihalar",
    happyClients: "Mamnun mijozlar",
    coreTechnologies: "Asosiy texnologiyalar",
    marquee: "Inomjon bilan yarating",
    portfolioTitle: "Biznes natijalarga yo'naltirilgan loyihalar",
    portfolioText: "Dashboardlar, portfolio saytlar, e-commerce platformalar va biznes jarayonlarini soddalashtiradigan full-stack web yechimlar.",
    featured: "Tanlangan",
    project: "Loyiha",
    visitSite: "Loyihani ko'rish",
    servicesTitle: "Qanday yordam bera olaman",
    serviceFrontendTitle: "Frontend interfeyslar",
    serviceFrontendText: "Dizayn va mahsulot g'oyalarini responsive, qulay va tez ishlaydigan React/Next.js interfeyslarga aylantiraman.",
    serviceFullStackTitle: "Full-stack ishlab chiqish",
    serviceFullStackText: "Database, API route, autentifikatsiya, admin funksiyalar va deployga tayyor arxitekturagacha to'liq mahsulot oqimini quraman.",
    serviceDashboardTitle: "Admin dashboardlar",
    serviceDashboardText: "Kontent, foydalanuvchilar, xabarlar, loyihalar va biznes operatsiyalarini boshqarish uchun amaliy dashboardlar yarataman.",
    serviceStartupTitle: "Web platformalar",
    serviceStartupText: "Biznes g'oyalarni tezkor, qulay va kengaytirish oson bo'lgan web mahsulotlarga aylantiraman.",
    contactTitle: "Loyihangizni birgalikda yaratamiz!",
    contactText: "G'oyangizni real loyihaga aylantirish uchun men bilan aloqa qiling.",
    ctaTitle: "Loyihangizni birgalikda yaratamiz!",
    ctaText: "G'oyangizni real loyihaga aylantirish uchun men bilan aloqa qiling.",
    authButton: "Xavfsiz xabar yuborish uchun kiring",
    mapTitle: "Kitob / Shahrisabz, O'zbekiston",
    name: "Ism",
    email: "Email",
    password: "Parol",
    subject: "Mavzu",
    message: "Loyiha tafsilotlari",
    send: "Xabar yuborish",
    sending: "Yuborilmoqda...",
    sent: "Xabar muvaffaqiyatli yuborildi.",
    authRequired: "Xabar yuborishdan oldin tizimga kiring yoki akkaunt yarating.",
    verifyRequired: "Xabar yuborishdan oldin emailingizni tasdiqlang.",
    sendFailed: "Xabar yuborilmadi.",
    secureContact: "Xavfsiz aloqa",
    signIn: "Kirish",
    signUp: "Akkaunt yaratish",
    createAccount: "Akkaunt yaratish",
    haveAccount: "Menda akkaunt bor",
    pleaseWait: "Iltimos, kuting...",
    verificationHint: "Tasdiqlash havolasi emailingizga yuboriladi.",
    signedIn: "Tizimga kirdingiz.",
    verificationSent: "Tasdiqlash havolasi emailingizga yuborildi.",
    workItems: workItemsUz,
    expertGroups: { Frontend: "Frontend", Design: "Dizayn", Backend: "Backend", Database: "Ma'lumotlar bazasi", Platform: "Platforma", Storage: "Saqlash", Tooling: "Vositalar" }
  },
  en: {
    heroTitle: "Premium full-stack web platforms",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    skills: "My Expertise",
    letstalk: "Contact Me",
    viewProjects: "View Projects",
    downloadCv: "Download CV",
    bookCall: "Contact Me",
    langLabel: "En",
    profileHeadline: "Full-stack Developer",
    profileBio: "I build modern web apps, portfolio websites, dashboards and useful business platforms with Next.js, React, TypeScript, Prisma and Tailwind CSS.",
    home: "Home",
    portfolioLabel: "Selected work",
    aiBuilder: "Web solutions",
    focus: "Focus",
    focusText: "I build modern web apps, dashboards and business platforms from idea to production.",
    experience: "Experience",
    workExperience: "Experience",
    aboutButton: "About",
    stack: "Technologies",
    recentProjects: "Recent Projects",
    all: "View all",
    aboutMe: "About me",
    aboutTitle: "Hi, I am",
    availableForHire: "Available for projects",
    aboutText: "I am a full-stack developer building fast, clear and practical web solutions for business. I ship interfaces, backend, database and admin features as one complete product.",
    yearsExperience: "Years experience",
    projectsCompleted: "Projects",
    happyClients: "Happy clients",
    coreTechnologies: "Core technologies",
    marquee: "Build with Inomjon",
    portfolioTitle: "Projects shaped around business outcomes",
    portfolioText: "Dashboards, portfolio websites, e-commerce platforms and full-stack web solutions for practical business workflows.",
    featured: "Featured",
    project: "Project",
    visitSite: "View Project",
    servicesTitle: "How I can help",
    serviceFrontendTitle: "Frontend interfaces",
    serviceFrontendText: "I turn designs and product ideas into responsive, accessible and fast React/Next.js interfaces.",
    serviceFullStackTitle: "Full-stack delivery",
    serviceFullStackText: "I build database, API routes, authentication, admin features and deployment-ready architecture.",
    serviceDashboardTitle: "Admin dashboards",
    serviceDashboardText: "I create dashboards for managing content, users, messages, projects and business operations.",
    serviceStartupTitle: "Web platforms",
    serviceStartupText: "I turn business ideas into fast, useful and maintainable web products.",
    contactTitle: "Let's build your project together",
    contactText: "Contact me to turn your idea into a real web project.",
    ctaTitle: "Let's build your project together",
    ctaText: "Contact me to turn your idea into a clean, useful and reliable web project.",
    authButton: "Sign in to send a secure message",
    mapTitle: "Kitob / Shahrisabz, Uzbekistan",
    name: "Name",
    email: "Email",
    password: "Password",
    subject: "Subject",
    message: "Project details",
    send: "Send Message",
    sending: "Sending...",
    sent: "Message sent successfully.",
    authRequired: "Please sign in or create an account before sending a message.",
    verifyRequired: "Please verify your email before sending a message.",
    sendFailed: "Message could not be sent.",
    secureContact: "Secure Contact",
    signIn: "Sign In",
    signUp: "Create Account",
    createAccount: "Create Account",
    haveAccount: "I already have an account",
    pleaseWait: "Please wait...",
    verificationHint: "A verification link will be sent to your email.",
    signedIn: "Signed in.",
    verificationSent: "Verification link sent to your email.",
    workItems: [
      { ...workItemsUz[0], role: "Full-stack Developer", company: "Independent web projects", period: "2024 - Present", description: "Building portfolio websites, dashboards and business platforms with Next.js, React, TypeScript, Prisma and Tailwind CSS." },
      { ...workItemsUz[1], role: "Next.js Developer", company: "Web apps and platforms", description: "Implemented responsive interfaces, API routes, auth flows, admin panels and database-backed features." },
      { ...workItemsUz[2], role: "Automation Developer", company: "Client integrations and web solutions", description: "Created integrations, bots and practical web solutions for business processes." }
    ],
    expertGroups: { Frontend: "Frontend", Design: "Design", Backend: "Backend", Database: "Database", Platform: "Platform", Storage: "Storage", Tooling: "Tooling" }
  },
  ru: {
    heroTitle: "Премиальные full-stack web-платформы",
    about: "Обо мне",
    projects: "Проекты",
    contact: "Контакты",
    skills: "Моя экспертиза",
    letstalk: "Связаться",
    viewProjects: "Смотреть проекты",
    downloadCv: "Скачать CV",
    bookCall: "Связаться",
    langLabel: "Ru",
    profileHeadline: "Full-stack разработчик",
    profileBio: "Создаю современные web-приложения, portfolio сайты, dashboard'ы и удобные business platforms на Next.js, React, TypeScript, Prisma и Tailwind CSS.",
    home: "Главная",
    portfolioLabel: "Избранные работы",
    aiBuilder: "Web решения",
    focus: "Фокус",
    focusText: "Создаю современные web-приложения, dashboard'ы и business platforms от идеи до запуска.",
    experience: "Опыт",
    workExperience: "Опыт",
    aboutButton: "Обо мне",
    stack: "Технологии",
    recentProjects: "Последние проекты",
    all: "Смотреть все",
    aboutMe: "Обо мне",
    aboutTitle: "Привет, я",
    availableForHire: "Открыт к проектам",
    aboutText: "Я full-stack разработчик, создающий быстрые, понятные и практичные web-решения для бизнеса: интерфейс, backend, database и admin features как единый продукт.",
    yearsExperience: "Лет опыта",
    projectsCompleted: "Проекты",
    happyClients: "Довольных клиентов",
    coreTechnologies: "Основные технологии",
    marquee: "Создавайте с Inomjon",
    portfolioTitle: "Проекты, ориентированные на бизнес-результат",
    portfolioText: "Dashboard'ы, portfolio сайты, e-commerce platforms и full-stack web решения для бизнеса.",
    featured: "Избранное",
    project: "Проект",
    visitSite: "Смотреть проект",
    servicesTitle: "Чем я могу помочь",
    serviceFrontendTitle: "Frontend интерфейсы",
    serviceFrontendText: "Превращаю дизайн и product ideas в responsive и быстрые React/Next.js интерфейсы.",
    serviceFullStackTitle: "Full-stack разработка",
    serviceFullStackText: "Строю database, API routes, authentication, admin features и deployment-ready architecture.",
    serviceDashboardTitle: "Admin dashboard'ы",
    serviceDashboardText: "Создаю dashboard'ы для управления контентом, пользователями, сообщениями, проектами и business operations.",
    serviceStartupTitle: "Web платформы",
    serviceStartupText: "Превращаю business ideas в быстрые, полезные и удобные web-продукты.",
    contactTitle: "Создадим ваш проект вместе",
    contactText: "Свяжитесь со мной, чтобы превратить идею в реальный web-проект.",
    ctaTitle: "Создадим ваш проект вместе",
    ctaText: "Свяжитесь со мной, чтобы превратить идею в удобный и надежный web-проект.",
    authButton: "Войдите, чтобы отправить безопасное сообщение",
    mapTitle: "Китаб / Шахрисабз, Узбекистан",
    name: "Имя",
    email: "Email",
    password: "Пароль",
    subject: "Тема",
    message: "Детали проекта",
    send: "Отправить сообщение",
    sending: "Отправляется...",
    sent: "Сообщение успешно отправлено.",
    authRequired: "Перед отправкой сообщения войдите в систему или создайте аккаунт.",
    verifyRequired: "Перед отправкой сообщения подтвердите email.",
    sendFailed: "Не удалось отправить сообщение.",
    secureContact: "Безопасная связь",
    signIn: "Войти",
    signUp: "Создать аккаунт",
    createAccount: "Создать аккаунт",
    haveAccount: "У меня уже есть аккаунт",
    pleaseWait: "Пожалуйста, подождите...",
    verificationHint: "Ссылка подтверждения будет отправлена на ваш email.",
    signedIn: "Вы вошли.",
    verificationSent: "Ссылка подтверждения отправлена на ваш email.",
    workItems: [
      { ...workItemsUz[0], role: "Full-stack разработчик", company: "Независимые web проекты", period: "2024 - Сейчас", description: "Создание portfolio сайтов, dashboard'ов и business platforms на Next.js, React, TypeScript, Prisma и Tailwind CSS." },
      { ...workItemsUz[1], role: "Next.js разработчик", company: "Web приложения и платформы", description: "Реализация responsive интерфейсов, API routes, auth flows, admin panels и database-backed features." },
      { ...workItemsUz[2], role: "Разработчик автоматизаций", company: "Клиентские интеграции и web решения", description: "Создание интеграций, ботов и практичных web решений для business processes." }
    ],
    expertGroups: { Frontend: "Frontend", Design: "Дизайн", Backend: "Backend", Database: "База данных", Platform: "Платформа", Storage: "Хранилище", Tooling: "Инструменты" }
  }
} as const;

export type Language = keyof typeof translations;
export type Translation = (typeof translations)[Language];
export type TranslationStringKey = {
  [Key in keyof Translation]: Translation[Key] extends string ? Key : never;
}[keyof Translation];

export const languages = ["uz", "en", "ru"] as Language[];

export const portfolioTabs = [
  { id: "home", labelKey: "home", icon: "home" },
  { id: "about", labelKey: "about", icon: "user" },
  { id: "portfolio", labelKey: "projects", icon: "briefcase" },
  { id: "experience", labelKey: "experience", icon: "code" },
  { id: "contact", labelKey: "contact", icon: "mail" }
] satisfies ReadonlyArray<{ id: TabId; labelKey: TranslationStringKey; icon: IconName }>;

export const socialLinks = [
  { field: "telegramUrl", label: "Telegram", icon: "send" },
  { field: "instagramUrl", label: "Instagram", icon: "instagram" },
  { field: "githubUrl", label: "GitHub", icon: "github" },
  { field: "linkedinUrl", label: "LinkedIn", icon: "linkedin" }
] satisfies ReadonlyArray<{ field: "telegramUrl" | "instagramUrl" | "githubUrl" | "linkedinUrl"; label: string; icon: IconName }>;

export const expertAreas = [
  { name: "React", group: "Frontend" },
  { name: "Next.js", group: "Frontend" },
  { name: "TypeScript", group: "Frontend" },
  { name: "Tailwind CSS", group: "Design" },
  { name: "Prisma", group: "Database" },
  { name: "Node.js", group: "Backend" },
  { name: "PostgreSQL", group: "Database" },
  { name: "Git", group: "Tooling" }
] as const;

export const serviceCards = [
  { icon: "monitor", titleKey: "serviceFrontendTitle", textKey: "serviceFrontendText" },
  { icon: "code", titleKey: "serviceFullStackTitle", textKey: "serviceFullStackText" },
  { icon: "dashboard", titleKey: "serviceDashboardTitle", textKey: "serviceDashboardText" },
  { icon: "rocket", titleKey: "serviceStartupTitle", textKey: "serviceStartupText" }
] satisfies ReadonlyArray<{ icon: IconName; titleKey: TranslationStringKey; textKey: TranslationStringKey }>;

export const adminContent = {
  nav: [
    { label: "Profil", href: "profile", icon: "settings" },
    { label: "Loyihalar", href: "projects", icon: "folder" },
    { label: "Lokatsiya", href: "location", icon: "location" },
    { label: "Xabarlar", href: "inbox", icon: "inbox" }
  ],
  stats: [
    { label: "Loyihalar", valueKey: "projects", icon: "folder" },
    { label: "Xabarlar", valueKey: "messages", icon: "inbox" },
    { label: "Profil", value: "Faol", icon: "settings" }
  ],
  labels: {
    dashboardEyebrow: "Boshqaruv",
    dashboardTitle: "Admin panel",
    status: "Holat",
    statusText: "Portfolio kontenti, xarita va xabarlar shu dashboard orqali boshqariladi.",
    contentTitle: "Kontent boshqaruvi",
    contentDescription: "Profil, loyihalar, lokatsiya va foydalanuvchi xabarlari shu yerda boshqariladi.",
    profileEdit: "Profilni tahrirlash",
    mapsControl: "Xaritani boshqarish",
    projectCrud: "Loyihalarni boshqarish",
    inbox: "Xabarlar",
    noMessages: "Hozircha xabar yo'q.",
    uploadImage: "Rasm yuklash",
    uploadCv: "CV PDF yuklash",
    newProjectPreview: "Yangi loyiha ko'rinishi",
    featured: "Tanlangan"
  },
  form: {
    name: "Ism",
    headline: "Sarlavha",
    bio: "Bio",
    heroImageUrl: "Hero rasmi URL",
    cvUrl: "CV URL",
    telegramUrl: "Telegram URL",
    githubUrl: "GitHub URL",
    linkedinUrl: "LinkedIn URL",
    instagramUrl: "Instagram URL",
    latitude: "Kenglik",
    longitude: "Uzunlik",
    mapIframeUrl: "Google Maps iframe URL",
    title: "Sarlavha",
    imageUrl: "Rasm URL",
    description: "Tavsif",
    techTags: "Texnologiya teglari",
    visitUrl: "Sayt URL"
  },
  placeholders: {
    projectTitle: "Admin Dashboard",
    imageUrl: "https://...",
    projectDescription: "Loyiha tavsifi",
    techTags: "React, Next.js, Prisma, Tailwind CSS",
    githubUrl: "https://github.com/Toshmirzayev-Inomjon"
  },
  actions: {
    saveProfile: "Profilni saqlash",
    saveLocation: "Lokatsiyani saqlash",
    createProject: "Loyiha yaratish",
    save: "Saqlash",
    delete: "O'chirish",
    deleteMessage: "Xabarni o'chirish"
  },
  messages: {
    saved: "Muvaffaqiyatli saqlandi.",
    failed: "Amal bajarilmadi.",
    uploadingImage: "Rasm yuklanmoqda...",
    imageUploaded: "Rasm yuklandi. O'zgarishlarni saqlang.",
    imageUploadFailed: "Rasm yuklanmadi.",
    uploadFailed: "Yuklash amalga oshmadi",
    uploadingCv: "CV yuklanmoqda...",
    cvUploaded: "CV yuklandi. O'zgarishlarni saqlang."
  }
} as const;

export const authPageContent = {
  signIn: {
    title: "Kirish",
    description: "Xavfsiz aloqa va admin funksiyalaridan foydalaning.",
    switchText: "Akkaunt kerakmi?",
    switchLabel: "Akkaunt yaratish",
    switchHref: "/auth/sign-up",
    success: "Tizimga kirdingiz."
  },
  signUp: {
    title: "Akkaunt yaratish",
    description: "Kontakt formasidan foydalanishdan oldin emailingizni tasdiqlang.",
    switchText: "Akkauntingiz bormi?",
    switchLabel: "Kirish",
    switchHref: "/auth/sign-in",
    success: "Tasdiqlash emaili yuborildi."
  },
  fields: {
    email: "Email",
    password: "Parol"
  },
  actions: {
    pleaseWait: "Iltimos, kuting...",
    createAccount: "Akkaunt yaratish"
  }
} as const;

export const verifyEmailContent = {
  title: "Email tasdiqlash",
  success: "Emailingiz tasdiqlandi. Endi kontakt formasidan foydalanishingiz mumkin.",
  invalid: "Bu tasdiqlash havolasi yaroqsiz yoki muddati tugagan.",
  pending: "Emailingizga yuborilgan tasdiqlash havolasini oching.",
  portfolioLink: "Portfolioga qaytish"
} as const;

export const emailContent = {
  from: `${siteIdentity.brandName} <no-reply@toshmirzayev-inomjon.online>`,
  subject: `${siteIdentity.brandName} email tasdiqlash`,
  textPrefix: "Emailingizni tasdiqlang:",
  htmlIntro: `${siteIdentity.brandName} orqali xabar yuborish uchun emailingizni tasdiqlang.`,
  verifyLinkLabel: "Emailni tasdiqlash"
} as const;
