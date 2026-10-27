import { useEffect, useRef } from 'react'

/**
 * Лента скачущих лошадей. Сдвиг привязан к прокрутке через CSS `animation-timeline: scroll(root)`;
 * где его нет — прогресс считается здесь и пишется в `--progress`.
 */
export function HorsesStrip({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || CSS.supports('animation-timeline: scroll()')) return

    let frame = 0
    const update = () => {
      frame = 0
      const run = parseFloat(getComputedStyle(el).getPropertyValue('--run')) || 700
      const progress = Math.min(1, window.scrollY / run)
      el.style.setProperty('--progress', progress.toFixed(4))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <div ref={ref} aria-hidden className={`horses h-[105px] ${className}`} />
}
