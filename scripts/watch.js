// Пересобирает проект (Vike + встраивание CSS) при изменениях в src/ и pages/.
// `vite build --watch` с Vike не работает (client и ssr собираются параллельно),
// а `node --watch-path` зацикливается на временном файле, который Vike пишет в pages/.
import { spawn } from 'node:child_process'
import { watch } from 'node:fs'

const IGNORED = /\.build-[\w-]+\.mjs$/

let building = false
let pending = false
let timer

function build() {
  if (building) {
    pending = true
    return
  }
  building = true
  const child = spawn('npx vike build && node scripts/inline-css.js', { shell: true, stdio: 'inherit' })
  child.on('exit', () => {
    building = false
    if (pending) {
      pending = false
      build()
    } else {
      console.log('\nwatching src/ and pages/ for changes...')
    }
  })
}

for (const dir of ['src', 'pages']) {
  watch(dir, { recursive: true }, (_, file) => {
    if (!file || IGNORED.test(file)) return
    clearTimeout(timer)
    timer = setTimeout(build, 150)
  })
}

build()
