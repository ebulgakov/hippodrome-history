import type { HistoryItem } from './data'

/** Папка с фото на imgix, например https://xxx.imgix.net/assets_m24/ — задаётся в .env.local */
const IMGIX_BASE: string = import.meta.env.VITE_IMGIX_BASE

if (!IMGIX_BASE) throw new Error('VITE_IMGIX_BASE is not set (see .env.example)')

type Params = Record<string, string | number | undefined>

function imgix(file: string, params: Params = {}) {
  const query = new URLSearchParams({ auto: 'format,compress' })
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) query.set(key, String(value))
  }
  return `${IMGIX_BASE}${file}?${query}`
}

/** Квадратный кроп под круг фиксированного размера: 1x/2x/3x, на высоких плотностях ниже качество. */
function squareSrcSet(item: HistoryItem, size: number) {
  return [1, 2, 3]
    .map(
      (dpr) =>
        `${imgix(item.file, { w: size, h: size, fit: 'crop', rect: item.rect, dpr, q: dpr > 1 ? 45 : 70 })} ${dpr}x`,
    )
    .join(', ')
}

/** Полноразмерное фото для лайтбокса. */
export function fullPhoto(item: HistoryItem) {
  const widths = [800, 1200].filter((w) => w < item.width).concat(item.width)
  return {
    src: imgix(item.file, { w: item.width }),
    srcSet: widths.map((w) => `${imgix(item.file, { w })} ${w}w`).join(', '),
  }
}

/** Превью в круге: `desktop` — srcset для широких экранов, остальное — атрибуты <img>. */
export function thumbPhoto(item: HistoryItem, mobileSize: number, desktopSize: number) {
  return {
    desktop: squareSrcSet(item, desktopSize),
    src: imgix(item.file, { w: mobileSize, h: mobileSize, fit: 'crop', rect: item.rect }),
    srcSet: squareSrcSet(item, mobileSize),
  }
}
