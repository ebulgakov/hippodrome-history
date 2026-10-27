// Встраивает CSS в пререндеренный Vike HTML: убирает блокирующий запрос стилей
import { readFile, writeFile } from 'node:fs/promises'

const dist = new URL('../dist/client/', import.meta.url)
const file = new URL('index.html', dist)
let html = await readFile(file, 'utf8')

const links = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]*href="\/([^"]+\.css)"[^>]*>/g)]
if (!links.length) throw new Error('No stylesheet links found in dist/client/index.html')

for (const [tag, path] of links) {
  const css = await readFile(new URL(path, dist), 'utf8')
  html = html.replace(tag, () => `<style>${css}</style>`)
  // preload этого же CSS больше не нужен
  html = html.replace(new RegExp(`<link[^>]+rel="preload"[^>]*href="/${path}"[^>]*>`), '')
}

await writeFile(file, html)
console.log(`Inlined ${links.length} stylesheet(s) into dist/client/index.html`)
