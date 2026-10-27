import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import { useEffect, useRef, type RefObject } from 'react'

/**
 * PhotoSwipe поверх галереи: открывает ссылки `a[data-pswp-width]` внутри контейнера.
 * onChange получает индекс текущего слайда лайтбокса.
 */
export function useLightbox(gallery: RefObject<HTMLElement | null>, onChange?: (index: number) => void) {
  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  })

  useEffect(() => {
    if (!gallery.current) return

    const lightbox = new PhotoSwipeLightbox({
      gallery: gallery.current,
      children: 'a[data-pswp-width]',
      pswpModule: () => import('photoswipe'),
      bgOpacity: 0.92,
      showHideAnimationType: 'fade',
    })
    lightbox.addFilter('placeholderSrc', () => false)
    lightbox.on('change', () => {
      if (lightbox.pswp) onChangeRef.current?.(lightbox.pswp.currIndex)
    })
    lightbox.init()

    return () => lightbox.destroy()
  }, [gallery])
}
