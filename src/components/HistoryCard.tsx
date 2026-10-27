import type { HistoryItem } from '../data'
import { useInView } from '../hooks/useInView'
import { RoundImage } from './RoundImage'

type Props = {
  item: HistoryItem
  index: number
}

/** Десктопная карточка: зигзаг, анимация появления при попадании во вьюпорт. */
export function HistoryCard({ item, index }: Props) {
  const [ref, inView] = useInView<HTMLElement>()
  const reversed = index % 2 === 1

  return (
    <article
      ref={ref}
      data-reveal
      data-inview={inView || undefined}
      className={`grid items-center gap-x-[66px] ${reversed ? 'grid-cols-[445px_382px]' : 'grid-cols-[382px_445px]'}`}
    >
      <RoundImage item={item} className={`w-[382px] ${reversed ? 'order-2' : ''}`} />
      <div className="reveal-text">
        <h3 className="mb-4 text-[36px] leading-tight font-extrabold tracking-wide text-brick uppercase">
          {item.title}
        </h3>
        <p className="text-lg leading-[1.7] font-medium">{item.text}</p>
      </div>
    </article>
  )
}
