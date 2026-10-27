import frame from '../assets/frame.webp'
import type { HistoryItem } from '../data'
import { fullPhoto, thumbPhoto } from '../photos'

/** Диаметр фото в круге: десктоп 249px, мобильный 190px (по макетам). */
const PHOTO_DESKTOP = 249
const PHOTO_MOBILE = 190

type Props = {
  item: HistoryItem
  className?: string
  /** Первое фото на экране: грузить сразу и с высоким приоритетом */
  priority?: boolean
}

/**
 * Круглое превью: контур, золотой диск, орнаментальная рамка и фото.
 * Пропорции сняты с макета (внешний круг 382px).
 */
export function RoundImage({ item, className = '', priority = false }: Props) {
  const full = fullPhoto(item)
  const { desktop, ...thumb } = thumbPhoto(item, PHOTO_MOBILE, PHOTO_DESKTOP)

  return (
    <a
      href={full.src}
      data-pswp-srcset={full.srcSet}
      data-pswp-width={item.width}
      data-pswp-height={item.height}
      target="_blank"
      rel="noreferrer"
      aria-label={`Открыть фото: ${item.title}`}
      className={`group relative block aspect-square cursor-zoom-in rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brick ${className}`}
    >
      <span className="absolute inset-0 rounded-full border border-brick/45" />
      <span className="absolute inset-[2.9%] rounded-full bg-disc" />
      <img
        src={frame}
        alt=""
        width={337}
        height={337}
        draggable={false}
        className="reveal-frame absolute inset-[5.9%] size-[88.2%] select-none"
      />
      <span className="absolute inset-[17.4%] overflow-hidden rounded-full bg-ink/20">
        <picture>
          <source media="(min-width: 1024px)" srcSet={desktop} />
          <img
            {...thumb}
            width={PHOTO_MOBILE}
            height={PHOTO_MOBILE}
            alt={item.title}
            draggable={false}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className="reveal-photo size-full select-none object-cover"
          />
        </picture>
        <span className="absolute inset-0 rounded-full bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
      </span>
    </a>
  )
}
