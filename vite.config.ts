import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Встраивает CSS в index.html (убирает блокирующий запрос) и добавляет preload шрифтов,
 * чтобы они начинали грузиться сразу, а не после разбора стилей.
 */
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html']
      if (html?.type !== 'asset') return
      let source = String(html.source)

      for (const [name, file] of Object.entries(bundle)) {
        if (file.type !== 'asset' || !name.endsWith('.css')) continue
        const link = new RegExp(`<link rel="stylesheet"[^>]*href="/${name}"[^>]*>`)
        if (!link.test(source)) continue
        source = source.replace(link, () => `<style>${file.source}</style>`)
        delete bundle[name]
      }

      const fonts = Object.keys(bundle)
        .filter((name) => /montserrat-(cyrillic|latin)-wght-normal-.*\.woff2$/.test(name))
        .map((name) => `<link rel="preload" href="/${name}" as="font" type="font/woff2" crossorigin>`)
      source = source.replace('</title>', `</title>\n    ${fonts.join('\n    ')}`)

      html.source = source
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCss()],
})
