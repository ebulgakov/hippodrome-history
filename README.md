# История Московского ипподрома

<img width="2800" height="1764" alt="image" src="https://github.com/user-attachments/assets/42b80262-71e2-45fb-8b1f-7dd8722878b1" />

Стек: Vite + React + TypeScript, Tailwind CSS v4, Swiper (слайдер), PhotoSwipe (лайтбокс). Шрифт Montserrat (Google Fonts).

```bash
npm install
npm run dev      # dev-сервер Vike с HMR
npm run watch    # пересборка dist/client/ при изменениях в src/ и pages/
npm run build    # проверка типов + сборка + пререндер HTML (Vike) → dist/client/
npm run preview  # просмотр собранного dist/client/
```

## Что где

- `src/data.ts` — пункты истории (тексты, фото, размеры для лайтбокса).
- `src/components/HistoryList.tsx`, `HistoryCard.tsx` — десктоп (≥1024px): зигзаг, анимация при попадании во вьюпорт (`useInView` + CSS-переходы в `index.css`): рамка докручивается вокруг оси, фото чередует zoomOut / fadeIn, текст выезжает снизу.
- `src/components/HistorySlider.tsx` — мобильный слайдер на Swiper: свайп, стрелки, точки-индикатор.
- `src/components/RoundImage.tsx` — круглое превью (кольцо и диск на CSS, орнамент из PSD) — ссылка на полноразмерное фото для PhotoSwipe.
- `src/components/HorsesStrip.tsx` — лента лошадей: CSS `animation-timeline: scroll(root)`, в браузерах без scroll-driven animations — JS-фолбэк через `--progress`.
- `prefers-reduced-motion` отключает анимации.

Ассеты: `src/assets/frame.png`, `horses.png` вырезаны из PSD.

Фото хранятся на imgix. Папка задаётся в `.env.local` (шаблон — `.env.example`): `VITE_IMGIX_BASE=https://xxx.imgix.net/assets_m24/`, файлы `1.jpg` … `6.jpg`. В `src/photos.ts` строятся URL: превью — `<picture>` с квадратным кропом под диаметр круга (249px на десктопе, 190px на мобильном) и плотностями 1x/2x/3x, `auto=format,compress`; лайтбокс получает `srcset` по ширинам.

## Производительность

- Пререндер и гидрация — [Vike](https://vike.dev) + `vike-react` (`pages/+config.ts`: `prerender: true`). Статика для деплоя — `dist/client/`.
- Десктопная и мобильная версии обе в разметке, видимую выбирает CSS — без мигания до гидрации.
- CSS встраивается в HTML после сборки (`scripts/inline-css.js`) — нет блокирующих запросов. Шрифт Montserrat свой (вариативный, только кириллица и латиница, `@font-face` в `src/index.css`), preload Vike добавляет сам.
- Первое фото грузится сразу с `fetchpriority="high"`, остальные — лениво.
- На хостинге стоит отдавать `/assets/*` с `Cache-Control: public, max-age=31536000, immutable` (имена с хешем).
