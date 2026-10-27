# История Московского ипподрома

<img width="2800" height="1764" alt="image" src="https://github.com/user-attachments/assets/42b80262-71e2-45fb-8b1f-7dd8722878b1" />

Стек: Vite + React + TypeScript, Tailwind CSS v4, Swiper (слайдер), PhotoSwipe (лайтбокс). Шрифт Montserrat (Локально).

```bash
pnpm install
pnpm run dev      # dev-сервер с HMR
pnpm run watch    # vite build --watch — пересборка dist/ при изменениях
pnpm run build    # проверка типов + production-сборка
pnpm run preview  # просмотр dist/
```

## Что где

- `src/data.ts` — пункты истории (тексты, фото, размеры для лайтбокса).
- `src/components/HistoryList.tsx`, `HistoryCard.tsx` — десктоп (≥1024px): зигзаг, анимация при попадании во вьюпорт (`useInView` + CSS-переходы в `index.css`): рамка докручивается вокруг оси, фото чередует zoomOut / fadeIn, текст выезжает снизу.
- `src/components/HistorySlider.tsx` — мобильный слайдер на Swiper: свайп, стрелки, точки-индикатор.
- `src/components/RoundImage.tsx` — круглое превью (кольцо и диск на CSS, орнамент из PSD) — ссылка на полноразмерное фото для PhotoSwipe.
- `src/components/HorsesStrip.tsx` — лента лошадей: CSS `animation-timeline: scroll(root)`, в браузерах без scroll-driven animations — JS-фолбэк через `--progress`.
- `prefers-reduced-motion` отключает анимации.

Ассеты: `src/assets/frame.png`, `horses.png` вырезаны из PSD. И оптимизированы для web. Использование webp, в данном случае, не выгодно. Для примера `src/assets/frame.png` ~11kb, а `src/assets/frame.webp` ~15kb

Фото хранятся на imgix. Папка задаётся в `.env.local` (шаблон — `.env.example`): `VITE_IMGIX_BASE=https://xxx.imgix.net/assets_m24/`, файлы `1.jpg` … `6.jpg`. В `src/photos.ts` строятся URL: превью — `<picture>` с квадратным кропом под диаметр круга (249px на десктопе, 190px на мобильном) и плотностями 1x/2x/3x, `auto=format,compress`; лайтбокс получает `srcset` по ширинам.
