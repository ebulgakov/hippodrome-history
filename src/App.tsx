import { HistoryList } from './components/HistoryList'
import { HistorySlider } from './components/HistorySlider'
import { HorsesStrip } from './components/HorsesStrip'

export default function App() {
  return (
    <main>
      <section aria-labelledby="history-title" className="overflow-hidden pt-8 pb-16 lg:pt-[74px] lg:pb-40">
        <HorsesStrip className="hidden lg:block" />

        <h2
          id="history-title"
          className="mx-auto mb-6 max-w-[1300px] px-6 text-center text-[22px] leading-[1.35] font-extrabold text-white uppercase lg:mt-[130px] lg:mb-14 lg:text-left lg:text-[clamp(48px,4.15vw,80px)] lg:leading-[1.05]"
        >
          История московского
          <br />
          ипподрома
        </h2>

        {/* Оба варианта есть в пререндеренном HTML, видимый выбирает CSS — без мигания до гидрации */}
        <div className="hidden lg:block">
          <HistoryList />
        </div>
        <div className="lg:hidden">
          <HistorySlider />
        </div>
      </section>
    </main>
  )
}
