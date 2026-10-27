import { useRef, useState } from 'react'
import { A11y, Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import { history } from '../data'
import { useLightbox } from '../hooks/useLightbox'
import { RoundImage } from './RoundImage'

function Chevrons({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 32 33" className={`size-8 ${dir === 'next' ? 'rotate-180' : ''}`} aria-hidden>
      <path d="M15 2 3 16.5 15 31M29 2 17 16.5 29 31" fill="none" stroke="currentColor" strokeWidth="4" />
    </svg>
  )
}

/** Мобильный слайдер: свайп, стрелки и точки-индикатор. */
export function HistorySlider() {
  const ref = useRef<HTMLDivElement>(null)
  const [swiper, setSwiper] = useState<SwiperType>()
  const [active, setActive] = useState(0)

  useLightbox(ref, (index) => swiper?.slideTo(index, 0))

  const arrow = 'absolute top-[237px] z-10 p-1 text-brick transition-opacity disabled:opacity-30'

  return (
    <div ref={ref} className="relative">
      <Swiper
        modules={[A11y, Keyboard]}
        onSwiper={setSwiper}
        onSlideChange={(s) => setActive(s.activeIndex)}
        autoHeight
        grabCursor
        keyboard
        spaceBetween={24}
        a11y={{ prevSlideMessage: 'Предыдущий слайд', nextSlideMessage: 'Следующий слайд' }}
      >
        {history.map((item, i) => (
          <SwiperSlide key={item.id} className="px-5 text-center">
            <RoundImage item={item} priority={i === 0} className="mx-auto w-[291px]" />
            <h3 className="mt-7 mb-2 text-2xl font-extrabold tracking-wide text-brick uppercase">{item.title}</h3>
            <p className="text-lg leading-[1.45] font-medium">{item.text}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className={`${arrow} left-2`}
        aria-label="Предыдущий слайд"
        disabled={active === 0}
        onClick={() => swiper?.slidePrev()}
      >
        <Chevrons dir="prev" />
      </button>
      <button
        type="button"
        className={`${arrow} right-2`}
        aria-label="Следующий слайд"
        disabled={active === history.length - 1}
        onClick={() => swiper?.slideNext()}
      >
        <Chevrons dir="next" />
      </button>

      <div className="mt-14 flex justify-center gap-3.5">
        {history.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Слайд ${i + 1}: ${item.title}`}
            aria-current={i === active}
            onClick={() => swiper?.slideTo(i)}
            className={`size-[21px] rounded-full border-[1.5px] border-brick transition-colors ${
              i === active ? 'bg-brick' : 'bg-transparent'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
