export type TabId = "home" | "about" | "portfolio" | "contact";

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
  role: "Full-stack dasturchi va AI mahsulot muhandisi",
  brandName: "InomjonFolio",
  brandBase: "Inomjon",
  brandAccent: "Folio",
  siteUrl: "https://toshmirzayev-inomjon.online",
  metadataTitle: "Inomjon Toshmirzayev | Full-stack dasturchi va AI mahsulot muhandisi",
  metadataDescription: "Inomjon Toshmirzayev portfoliosi: biznes o'sishi uchun miqyoslanuvchan veb-platformalar, dashboardlar va AI yordamidagi workflowlar yaratadi.",
  setupTitle: "InomjonFolio sozlashni talab qiladi",
  setupDescription: "Boshlang'ich profil, loyihalar va lokatsiya sozlamalarini yaratish uchun Prisma migration va seedni ishga tushiring."
} as const;

export const personalProfile = {
  name: siteIdentity.ownerName,
  role: siteIdentity.role,
  headline: "Full-stack dasturchi va AI mahsulot muhandisi",
  bio: "Biznes o'sishiga xizmat qiladigan miqyoslanuvchan veb-yechimlar yarataman: puxta interfeyslar, ishonchli backend tizimlar va amaliy AI avtomatlashtirishni birlashtiraman. Murakkab g'oyalarni xavfsiz, tezkor va kengaytirish oson bo'lgan raqamli mahsulotlarga aylantirishga fokus qilaman.",
  heroImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
  cvUrl: "/api/cv",
  telegramUrl: "https://t.me/toshmirzayevinomjon",
  githubUrl: "https://github.com/Toshmirzayev-Inomjon",
  linkedinUrl: "",
  instagramUrl: "",
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "SQLite", "Prisma", "Python", "OpenAI API"]
} as const;

export const projectSeeds = [
  {
    title: "AI portfolio admin paneli",
    description: "Profil kontenti, loyihalar, lokatsiya ma'lumotlari va tasdiqlangan kontakt xabarlarini bitta xavfsiz admin paneldan boshqarish uchun full-stack portfolio dashboard.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    techStack: "Next.js, React, Prisma, SQLite",
    visitUrl: siteIdentity.siteUrl,
    githubUrl: "",
    featured: true
  },
  {
    title: "AI assistent workflow",
    description: "Leadlarni saralash, support savollarini tartiblash va Telegram xabarlarini AI yordamidagi mantiq bilan yo'naltirishga xizmat qiladigan avtomatlashtirish workflowi.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    techStack: "Python, OpenAI API, Next.js, Telegram",
    visitUrl: "",
    githubUrl: "",
    featured: true
  }
] as const;

export const locationSeed = {
  latitude: 39.0843,
  longitude: 66.8332,
  iframeUrl: ""
} as const;

export const translations = {
  "uz": {
    "heroTitle": "Biznes o'sishiga xizmat qiladigan premium full-stack mahsulotlar yarataman: toza tizimlar, aniq interfeyslar va amaliy AI.",
    "about": "Men haqimda",
    "projects": "Ishlar",
    "contact": "Aloqa",
    "skills": "Mening ekspertizam",
    "letstalk": "Loyihani boshlash",
    "downloadCv": "CV yuklab olish",
    "bookCall": "Qo'ng'iroq belgilash",
    "langLabel": "Uz",
    "profileHeadline": "Full-stack dasturchi va AI mahsulot muhandisi",
    "profileBio": "Biznes o'sishiga xizmat qiladigan miqyoslanuvchan veb-yechimlar yarataman: puxta interfeyslar, ishonchli backend tizimlar va amaliy AI avtomatlashtirishni birlashtiraman. Murakkab g'oyalarni xavfsiz, tezkor va kengaytirish oson bo'lgan raqamli mahsulotlarga aylantirishga fokus qilaman.",
    "home": "Bosh sahifa",
    "portfolioLabel": "Tanlangan ishlar",
    "aiBuilder": "AI yechimlar",
    "focus": "Fokus",
    "focusText": "Founderlar va jamoalarga g'oyadan productiongacha aniq texnik yo'l bilan miqyoslanuvchan veb-platformalar, ichki dashboardlar va AI yordamidagi workflowlarni ishga tushirishda yordam beraman.",
    "experience": "Tajriba",
    "workExperience": "Tajriba",
    "aboutButton": "Men haqimda",
    "stack": "Texnologiyalar",
    "recentProjects": "So'nggi loyihalar",
    "all": "Barchasini ko'rish",
    "aboutMe": "Men haqimda",
    "aboutTitle": "Salom, men",
    "availableForHire": "Loyihalar uchun ochiqman",
    "aboutText": "Men biznes o'sishi uchun miqyoslanuvchan veb-yechimlar yaratuvchi full-stack dasturchi va AI tarafdoriman. React, Next.js, SQLite, Prisma, Python va zamonaviy AI vositalari orqali puxta interfeyslar, xavfsiz backend tizimlar va qo'l mehnatini kamaytiradigan avtomatlashtirishlarni quraman. Maqsadim - premium ko'rinadigan, barqaror ishlaydigan va biznes ulg'aygani sari oson kengayadigan mahsulotlar yetkazish.",
    "yearsExperience": "Yillik fokusli amaliyot",
    "projectsCompleted": "Ishga tushirilgan loyihalar",
    "coreTechnologies": "Asosiy texnologiyalar",
    "marquee": "Inomjon bilan yarating",
    "portfolioTitle": "Biznes natijalarga yo'naltirilgan loyihalar",
    "portfolioText": "Amaliy o'sish uchun zamonaviy frontend, backend va AI tooling asosida qurilgan dashboardlar, avtomatlashtirish vositalari va full-stack tizimlar tanlovi.",
    "featured": "Tanlangan",
    "project": "Loyiha",
    "visitSite": "Saytga o'tish",
    "servicesTitle": "Qanday yordam bera olaman",
    "serviceFrontendTitle": "Frontend interfeyslar",
    "serviceFrontendText": "Dizayn va mahsulot g'oyalarini responsive, qulay va tez ishlaydigan React/Next.js interfeyslarga aylantiraman.",
    "serviceFullStackTitle": "Full-stack yetkazib berish",
    "serviceFullStackText": "Database, API route, autentifikatsiya, admin funksiyalar va deployga tayyor arxitekturagacha to'liq mahsulot oqimini quraman.",
    "serviceDashboardTitle": "Admin dashboardlar",
    "serviceDashboardText": "Kontent, foydalanuvchilar, xabarlar, loyihalar va biznes operatsiyalarini boshqarish uchun amaliy dashboardlar yarataman.",
    "serviceStartupTitle": "AI MVP'lar",
    "serviceStartupText": "Qo'l mehnatini kamaytiradigan va jamoalarga tezroq tekshirishga yordam beradigan AI funksiyalar, avtomatlashtirishlar va workflowlarni prototiplayman.",
    "contactTitle": "Nima qurmoqchi ekaningizni ayting",
    "contactText": "Mahsulot maqsadi, dashboard g'oyasi yoki AI workflowingizni yuboring. Men scope'ni ko'rib chiqib, amaliy texnik yo'nalish, muddat va implementatsiya yo'lini taklif qilaman.",
    "authButton": "Xavfsiz xabar yuborish uchun kiring",
    "mapTitle": "Kitob / Shahrisabz, O'zbekiston",
    "name": "Ism",
    "email": "Email",
    "password": "Parol",
    "subject": "Mavzu",
    "message": "Loyiha tafsilotlari",
    "send": "Xabar yuborish",
    "sending": "Yuborilmoqda...",
    "sent": "Xabar muvaffaqiyatli yuborildi.",
    "authRequired": "Xabar yuborishdan oldin tizimga kiring yoki akkaunt yarating.",
    "verifyRequired": "Xabar yuborishdan oldin emailingizni tasdiqlang.",
    "sendFailed": "Xabar yuborilmadi.",
    "secureContact": "Xavfsiz aloqa",
    "signIn": "Kirish",
    "signUp": "Akkaunt yaratish",
    "createAccount": "Akkaunt yaratish",
    "haveAccount": "Menda akkaunt bor",
    "pleaseWait": "Iltimos, kuting...",
    "verificationHint": "Tasdiqlash havolasi emailingizga yuboriladi.",
    "signedIn": "Tizimga kirdingiz. Email tasdiqlangandan keyin xabar yuborishingiz mumkin.",
    "verificationSent": "Tasdiqlash havolasi emailingizga yuborildi.",
    "workItems": [
      {
        "role": "Full-stack dasturchi va AI integratsiya muhandisi",
        "company": "Mustaqil Web va AI loyihalar",
        "period": "2024 - Hozir",
        "description": "React, Next.js, SQLite, Prisma va Python bilan veb-ilovalar, dashboardlar va AI integratsiyalar qurish."
      },
      {
        "role": "Next.js dasturchi",
        "company": "Full-stack loyihalar",
        "period": "2022 - 2024",
        "description": "Responsive interfeyslar, API routelar, auth flowlar, admin panellar va database asosidagi funksiyalarni implementatsiya qilish."
      },
      {
        "role": "Avtomatlashtirish dasturchisi",
        "company": "Mijoz integratsiyalari",
        "period": "2021 - 2022",
        "description": "Amaliy biznes jarayonlari uchun Telegram botlar, workflow avtomatlashtirishlar va tashqi API integratsiyalar yaratish."
      }
    ],
    "expertGroups": {
      "Frontend": "Frontend",
      "Design": "Dizayn",
      "Backend": "Backend",
      "Database": "Ma'lumotlar bazasi",
      "AI": "AI",
      "Platform": "Platform",
      "Storage": "Saqlash",
      "Tooling": "Vositalar"
    }
  },
  "en": {
    "heroTitle": "I design and ship premium full-stack products that help businesses grow with cleaner systems, sharper interfaces and practical AI.",
    "about": "About",
    "projects": "Work",
    "contact": "Contact",
    "skills": "My Expertise",
    "letstalk": "Start a Project",
    "downloadCv": "Download CV",
    "bookCall": "Book a Call",
    "langLabel": "En",
    "profileHeadline": "Full-stack Developer & AI Product Engineer",
    "profileBio": "I create scalable web solutions that support business growth, combining polished user interfaces, reliable backend systems and practical AI automation. My work focuses on turning complex ideas into secure, fast and maintainable digital products.",
    "home": "Home",
    "portfolioLabel": "Selected Work",
    "aiBuilder": "AI Builder",
    "focus": "Focus",
    "focusText": "I help founders and teams launch scalable web platforms, internal dashboards and AI-assisted workflows with a clear technical path from idea to production.",
    "experience": "Experience",
    "workExperience": "Experience",
    "aboutButton": "About",
    "stack": "Stack",
    "recentProjects": "Recent Projects",
    "all": "View All",
    "aboutMe": "About Me",
    "aboutTitle": "Hi, I am",
    "availableForHire": "Available for Projects",
    "aboutText": "I am a full-stack developer and AI advocate creating scalable web solutions for business growth. I combine React, Next.js, SQLite, Prisma, Python and modern AI tooling to build polished interfaces, secure backend systems and automations that reduce manual work. My goal is to deliver products that feel premium, perform reliably and stay easy to extend as the business grows.",
    "yearsExperience": "Years of focused practice",
    "projectsCompleted": "Projects shipped",
    "coreTechnologies": "Core technologies",
    "marquee": "Build with Inomjon",
    "portfolioTitle": "Projects shaped around business outcomes",
    "portfolioText": "A focused selection of dashboards, automation tools and full-stack systems built with modern frontend, backend and AI tooling for practical growth.",
    "featured": "Featured",
    "project": "Project",
    "visitSite": "Visit Site",
    "servicesTitle": "How I Can Help",
    "serviceFrontendTitle": "Frontend Interfaces",
    "serviceFrontendText": "Convert designs and product ideas into responsive, accessible and high-performing React/Next.js interfaces.",
    "serviceFullStackTitle": "Full-stack Delivery",
    "serviceFullStackText": "Build the complete product flow: database, API routes, authentication, admin features and deployment-ready architecture.",
    "serviceDashboardTitle": "Admin Dashboards",
    "serviceDashboardText": "Create practical dashboards for managing content, users, messages, projects and business operations.",
    "serviceStartupTitle": "AI MVPs",
    "serviceStartupText": "Prototype AI-assisted features, automations and workflows that reduce manual work and help teams validate faster.",
    "contactTitle": "Tell me what you want to build",
    "contactText": "Share your product goal, dashboard idea or AI workflow. I will review the scope and respond with a practical technical direction, timeline and implementation path.",
    "authButton": "Sign in to send a secure message",
    "mapTitle": "Kitob / Shahrisabz, Uzbekistan",
    "name": "Name",
    "email": "Email",
    "password": "Password",
    "subject": "Subject",
    "message": "Project details",
    "send": "Send Message",
    "sending": "Sending...",
    "sent": "Message sent successfully.",
    "authRequired": "Please sign in or create an account before sending a message.",
    "verifyRequired": "Please verify your email before sending a message.",
    "sendFailed": "Message could not be sent.",
    "secureContact": "Secure Contact",
    "signIn": "Sign In",
    "signUp": "Create Account",
    "createAccount": "Create Account",
    "haveAccount": "I already have an account",
    "pleaseWait": "Please wait...",
    "verificationHint": "A verification link will be sent to your email.",
    "signedIn": "Signed in. You can send a message after your email is verified.",
    "verificationSent": "Verification link sent to your email.",
    "workItems": [
      {
        "role": "Full-stack Developer & AI Integration Engineer",
        "company": "Independent Web & AI Projects",
        "period": "2024 - Present",
        "description": "Building web applications, dashboards and AI integrations with React, Next.js, SQLite, Prisma and Python."
      },
      {
        "role": "Next.js Developer",
        "company": "Full-stack Projects",
        "period": "2022 - 2024",
        "description": "Implemented responsive interfaces, API routes, auth flows, admin panels and database-backed features."
      },
      {
        "role": "Automation Developer",
        "company": "Client Integrations",
        "period": "2021 - 2022",
        "description": "Created Telegram bots, workflow automations and external API integrations for practical business processes."
      }
    ],
    "expertGroups": {
      "Frontend": "Frontend",
      "Design": "Design",
      "Backend": "Backend",
      "Database": "Database",
      "AI": "AI",
      "Platform": "Platform",
      "Storage": "Storage",
      "Tooling": "Tooling"
    }
  },
  "ru": {
    "heroTitle": "Я проектирую и запускаю premium full-stack продукты, которые помогают бизнесу расти за счет чистых систем, точных интерфейсов и практичного AI.",
    "about": "Обо мне",
    "projects": "Работы",
    "contact": "Контакты",
    "skills": "Моя экспертиза",
    "letstalk": "Начать проект",
    "downloadCv": "Скачать CV",
    "bookCall": "Назначить звонок",
    "langLabel": "Ru",
    "profileHeadline": "Full-stack разработчик и AI product engineer",
    "profileBio": "Я создаю масштабируемые веб-решения для роста бизнеса: объединяю продуманные интерфейсы, надежные backend-системы и практичную AI-автоматизацию. Моя работа сфокусирована на превращении сложных идей в безопасные, быстрые и удобные для развития цифровые продукты.",
    "home": "Главная",
    "portfolioLabel": "Избранные работы",
    "aiBuilder": "AI решения",
    "focus": "Фокус",
    "focusText": "Помогаю founder'ам и командам запускать масштабируемые веб-платформы, внутренние dashboard'ы и AI workflow с понятным техническим путем от идеи до production.",
    "experience": "Опыт",
    "workExperience": "Опыт",
    "aboutButton": "Обо мне",
    "stack": "Технологии",
    "recentProjects": "Последние проекты",
    "all": "Смотреть все",
    "aboutMe": "Обо мне",
    "aboutTitle": "Привет, я",
    "availableForHire": "Открыт к проектам",
    "aboutText": "Я full-stack разработчик и сторонник практичного AI, создающий масштабируемые веб-решения для роста бизнеса. Использую React, Next.js, SQLite, Prisma, Python и современные AI-инструменты, чтобы строить polished интерфейсы, безопасные backend-системы и автоматизации, которые уменьшают ручную работу. Моя цель - создавать продукты, которые выглядят premium, стабильно работают и легко расширяются вместе с бизнесом.",
    "yearsExperience": "Лет сфокусированной практики",
    "projectsCompleted": "Запущенных проектов",
    "coreTechnologies": "Основные технологии",
    "marquee": "Создавайте с Inomjon",
    "portfolioTitle": "Проекты, ориентированные на бизнес-результат",
    "portfolioText": "Подборка dashboard'ов, инструментов автоматизации и full-stack систем, созданных на современном frontend, backend и AI tooling для практического роста.",
    "featured": "Избранное",
    "project": "Проект",
    "visitSite": "Перейти на сайт",
    "servicesTitle": "Чем я могу помочь",
    "serviceFrontendTitle": "Frontend интерфейсы",
    "serviceFrontendText": "Превращаю дизайн и продуктовые идеи в responsive, удобные и производительные React/Next.js интерфейсы.",
    "serviceFullStackTitle": "Full-stack разработка",
    "serviceFullStackText": "Строю полный product flow: database, API routes, authentication, admin-функции и архитектуру, готовую к deployment.",
    "serviceDashboardTitle": "Admin dashboard'ы",
    "serviceDashboardText": "Создаю практичные dashboard'ы для управления контентом, пользователями, сообщениями, проектами и бизнес-операциями.",
    "serviceStartupTitle": "AI MVP",
    "serviceStartupText": "Прототипирую AI-функции, автоматизации и workflow, которые уменьшают ручную работу и помогают командам быстрее валидировать идеи.",
    "contactTitle": "Расскажите, что хотите построить",
    "contactText": "Отправьте цель продукта, идею dashboard'а или AI workflow. Я изучу scope и предложу практичное техническое направление, сроки и путь реализации.",
    "authButton": "Войдите, чтобы отправить безопасное сообщение",
    "mapTitle": "Китаб / Шахрисабз, Узбекистан",
    "name": "Имя",
    "email": "Email",
    "password": "Пароль",
    "subject": "Тема",
    "message": "Детали проекта",
    "send": "Отправить сообщение",
    "sending": "Отправляется...",
    "sent": "Сообщение успешно отправлено.",
    "authRequired": "Перед отправкой сообщения войдите в систему или создайте аккаунт.",
    "verifyRequired": "Перед отправкой сообщения подтвердите email.",
    "sendFailed": "Не удалось отправить сообщение.",
    "secureContact": "Безопасная связь",
    "signIn": "Войти",
    "signUp": "Создать аккаунт",
    "createAccount": "Создать аккаунт",
    "haveAccount": "У меня уже есть аккаунт",
    "pleaseWait": "Пожалуйста, подождите...",
    "verificationHint": "Ссылка подтверждения будет отправлена на ваш email.",
    "signedIn": "Вы вошли. После подтверждения email вы сможете отправить сообщение.",
    "verificationSent": "Ссылка подтверждения отправлена на ваш email.",
    "workItems": [
      {
        "role": "Full-stack разработчик и AI integration engineer",
        "company": "Независимые Web и AI проекты",
        "period": "2024 - Сейчас",
        "description": "Создание веб-приложений, dashboard'ов и AI-интеграций с React, Next.js, SQLite, Prisma и Python."
      },
      {
        "role": "Next.js разработчик",
        "company": "Full-stack проекты",
        "period": "2022 - 2024",
        "description": "Реализация responsive интерфейсов, API routes, auth flows, admin panels и функций на базе database."
      },
      {
        "role": "Разработчик автоматизаций",
        "company": "Клиентские интеграции",
        "period": "2021 - 2022",
        "description": "Создание Telegram-ботов, workflow автоматизаций и внешних API-интеграций для практичных бизнес-процессов."
      }
    ],
    "expertGroups": {
      "Frontend": "Frontend",
      "Design": "Дизайн",
      "Backend": "Backend",
      "Database": "База данных",
      "AI": "AI",
      "Platform": "Платформа",
      "Storage": "Хранилище",
      "Tooling": "Инструменты"
    }
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
  { name: "SQLite", group: "Database" },
  { name: "Prisma", group: "Database" },
  { name: "Python", group: "Backend" },
  { name: "Node.js", group: "Backend" },
  { name: "OpenAI API", group: "AI" },
  { name: "Telegram Web Apps", group: "Platform" },
  { name: "Git", group: "Tooling" },
  { name: "Cloudinary", group: "Storage" }
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
    contentDescription: "Profil, loyihalar, lokatsiya va tasdiqlangan foydalanuvchi xabarlari shu yerda boshqariladi.",
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
    projectTitle: "AI portfolio admin paneli",
    imageUrl: "https://...",
    projectDescription: "Loyiha tavsifi",
    techTags: "React, Next.js, SQLite, Python",
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
    description: "Xavfsiz kontakt formasidan foydalanishdan oldin emailingizni tasdiqlang.",
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
