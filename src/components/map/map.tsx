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

export const Map = () => {
  initMap()
  return (
    <>
      <div id='app' style={{ width: '100%', height: '100%', overflow: 'hidden' }}></div>
    </>
  )
}
