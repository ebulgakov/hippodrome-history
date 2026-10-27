import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'

export default {
  extends: [vikeReact],
  // HTML рендерится при сборке, на клиенте vike-react гидрирует его через hydrateRoot
  prerender: true,
  lang: 'ru',
  title: 'История Московского ипподрома',
  description: 'История Центрального московского ипподрома: от основания в 1834 году до наших дней.',
  favicon:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='15' fill='%23d2b877' stroke='%238c472b' stroke-width='2'/%3E%3C/svg%3E",
} satisfies Config
