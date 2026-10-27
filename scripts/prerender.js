// Подставляет отрендеренный на сервере HTML в dist/index.html
import { readFile, rm, writeFile } from 'node:fs/promises'

const { render } = await import('../dist-ssr/entry-server.js')

const file = new URL('../dist/index.html', import.meta.url)
const html = await readFile(file, 'utf8')
const placeholder = '<div id="root"></div>'
if (!html.includes(placeholder)) throw new Error('Root placeholder not found in dist/index.html')

await writeFile(file, html.replace(placeholder, `<div id="root">${render()}</div>`))
await rm(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true })
console.log('Prerendered dist/index.html')
