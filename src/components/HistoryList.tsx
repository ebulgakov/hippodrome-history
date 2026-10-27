import { useRef } from 'react'
import { history } from '../data'
import { useLightbox } from '../hooks/useLightbox'
import { HistoryCard } from './HistoryCard'

export function HistoryList() {
  const ref = useRef<HTMLDivElement>(null)
  useLightbox(ref)

  return (
    <div ref={ref} className="mx-auto flex w-fit flex-col gap-14">
      {history.map((item, i) => (
        <HistoryCard key={item.id} item={item} index={i} />
      ))}
    </div>
  )
}
