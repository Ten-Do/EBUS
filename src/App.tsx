import { Header } from './components/header/header.js'
import './main_styles/App.css'
import Pagination from './UI/paginationBar/paginationBar.js'

async function initMap(): Promise<void> {
  await ymaps3.ready.then(e => console.log('e: ', e))

  const LOCATION = {
    center: [37.623082, 55.75254],
    zoom: 9,
  }

  const { YMap, YMapDefaultSchemeLayer, YMapListener } = ymaps3

  const map = new YMap(document.getElementById('app')!, { location: LOCATION })
  map.addChild(new YMapDefaultSchemeLayer({}))
  map.addChild(
    new YMapListener({
      layer: 'any',
      // Добавление обработчиков на слушатель.
      onClick: console.log,
    }),
  )
}

function App() {
  return (
    <>
      <Header />
      <Pagination currentPage={2} totalPages={10} />
      <Pagination currentPage={2} totalPages={7} />
      {/* 
urrentPage: number
  totalPages: number
  onPageChange: (page: number) => void
*/}
    </>
  )
  initMap()
  return (
    <>
      <div id='app' style={{ width: '100vw', height: '80vh', overflow: 'hidden' }}></div>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni veritatis aperiam numquam
        impedit amet, temporibus, quia porro atque, maiores omnis laudantium nam. Id vitae non
        veritatis velit similique beatae quaerat.
      </h1>
      <h2>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam id tempore itaque vel,
        nobis animi maxime. Ea, enim reiciendis nulla placeat at consequuntur id autem quod magnam,
        amet tenetur sapiente?
      </h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam id tempore itaque vel,
        nobis animi maxime. Ea, enim reiciendis nulla placeat at consequuntur id autem quod magnam,
        amet tenetur sapiente?
      </p>
      <h6>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam id tempore itaque vel,
        nobis animi maxime. Ea, enim reiciendis nulla placeat at consequuntur id autem quod magnam,
        amet tenetur sapiente?
      </h6>
    </>
  )
}

export default App
