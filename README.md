# InomjonFolio

Professional portfolio, admin dashboard va secure contact tizimi. Loyiha Next.js, Prisma, SQLite va Tailwind CSS asosida qurilgan.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-0f766e?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=for-the-badge&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-SQLite-2d3748?style=for-the-badge&logo=prisma)

## Nima Qiladi

- Premium soft dark portfolio: glassmorphism, claymorphism, teal-emerald gradient.
- Uch tilda ishlaydi: `UZ`, `EN`, `RU`.
- Secure contact: foydalanuvchi ro'yxatdan o'tadi, emailini tasdiqlaydi, keyin xabar yuboradi.
- Professional email verification template: oddiy link emas, branded HTML xat.
- Admin panel: profil, loyihalar, lokatsiya, CV, rasm upload va inbox boshqaruvi.
- SQLite + Prisma ORM.
- SEO uchun sitemap va robots route mavjud.

## Tech Stack

- `Next.js App Router`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Framer Motion`
- `Lucide React`
- `Prisma ORM`
- `SQLite`
- `Nodemailer SMTP`
- `JWT cookie auth`

## Asosiy Sahifalar

| Route | Tavsif |
| --- | --- |
| `/` | Public portfolio |
| `/auth/sign-up` | Ro'yxatdan o'tish |
| `/auth/sign-in` | Tizimga kirish |
| `/verify-email` | Email tasdiqlash statusi |
| `/admin` | Himoyalangan admin panel |
| `/api/cv` | CV PDF yuklab olish |

## Local Ishga Tushirish

```bash
cp .env.example .env
npm install
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

Local URL:

```bash
http://localhost:2026
```

## Environment

`.env.example` faylini `.env` qilib ko'chiring va qiymatlarni to'ldiring.

Muhim envlar:

```bash
DATABASE_URL="file:./dev.db"
APP_URL="https://your-domain.com"
JWT_SECRET="long-random-secret-minimum-32-characters"

ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="StrongPassword123!"

SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="gmail-app-password"
SMTP_FROM="InomjonFolio <your-email@gmail.com>"

EMAIL_VERIFICATION_EXPIRY="15"
```

Gmail ishlatsangiz, oddiy parol emas, Gmail App Password ishlating.

## Serverga Joylash

Ubuntu server uchun tavsiya qilingan yo'l:

```bash
sudo apt update
sudo apt install -y nodejs npm nginx
sudo npm install -g pm2
```

SQLite uchun alohida database server kerak emas. Prisma `.env` ichidagi `DATABASE_URL="file:./dev.db"` bo'yicha `prisma/dev.db` faylini yaratadi.

Repo'ni serverga oling:

```bash
git clone https://github.com/USERNAME/inomjonfolio.git
cd inomjonfolio
cp .env.example .env
npm ci
```

`.env` ichida production qiymatlarni yozing. Keyin:

```bash
npm run prisma:deploy
npm run prisma:seed
npm run build
pm2 start ecosystem.config.cjs
pm2 save
```

SQLite database fayli serverda `prisma/dev.db` sifatida turadi. Uni deploymentdan keyin o'chirmang va muntazam backup qiling:

```bash
cp prisma/dev.db backups/dev-$(date +%F).db
```

Tekshirish:

```bash
pm2 status
curl -I http://localhost:2026
```

## Nginx Reverse Proxy

`/etc/nginx/sites-available/inomjonfolio`:

```nginx
server {
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:2026;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable qilish:

```bash
sudo ln -s /etc/nginx/sites-available/inomjonfolio /etc/nginx/sites-enabled/inomjonfolio
sudo nginx -t
sudo systemctl reload nginx
```

SSL uchun:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Email Verification

Ro'yxatdan o'tgan foydalanuvchiga professional HTML email yuboriladi. Email ichida:

- InomjonFolio branding.
- Premium dark card dizayni.
- Tasdiqlash tugmasi.
- Backup verification URL.
- Xavfsizlik eslatmasi.

SMTP sozlanmagan bo'lsa, verification link dev console'ga chiqadi.

## Admin Panel

Admin login `.env` ichidagi quyidagi qiymatlardan seed vaqtida yaratiladi:

```bash
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="StrongPassword123!"
```

Admin panel orqali:

- Profil ma'lumotlarini tahrirlash.
- Portfolio rasmini yuklash.
- CV PDF yuklash.
- Loyihalarni qo'shish, yangilash va o'chirish.
- Lokatsiya iframe yoki koordinatalarini sozlash.
- Contact inbox xabarlarini ko'rish.

## GitHubga Push Qilishdan Oldin

Tekshiring:

```bash
npm run lint
npm run build
```

Muhim:

- `.env` faylini GitHubga chiqarmang.
- `node_modules`, `.next`, `prisma/*.db` push qilinmaydi.
- Production serverda `JWT_SECRET`, `DATABASE_URL`, `SMTP_PASS` kuchli va maxfiy bo'lishi kerak.

## Scripts

| Command | Vazifasi |
| --- | --- |
| `npm run dev` | Development server, port `2026` |
| `npm run build` | Prisma generate + Next production build |
| `npm run start` | Production server, port `2026` |
| `npm run lint` | TypeScript tekshiruv |
| `npm run prisma:migrate` | Prisma migration |
| `npm run prisma:deploy` | Production migration deploy |
| `npm run prisma:seed` | Admin, profil, loyihalar va lokatsiya seed |

## Author

**Inomjon Toshmirzayev**  
Full-stack dasturchi va AI mahsulot muhandisi.
# inomjon.folio
# inomjon-folio
# inomjon-folio
