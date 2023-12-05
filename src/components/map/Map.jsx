import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'
const POLYLINE1 = {
  id: 'one',
  draggable: true,
  geometry: {
    type: 'LineString',
    coordinates: [
      // Specify the coordinates of the vertices of the polyline.
      [37.5, 55.7],
      [37.4, 55.8],
      [37.5, 55.8],
      [37.4, 55.7],
    ],
  },
  style: { stroke: [{ color: '#f00', width: 4 }] },
}


export const ReactMap = () => {
  const [reactify, setReactify] = useState(null)
  const [YMapZoomControl, setYMapZoomControl] = useState(null)
  useEffect(() => {
    Promise.all([
      ymaps3.import('@yandex/ymaps3-reactify'),
      ymaps3.import('@yandex/ymaps3-controls@0.0.1'),
      ymaps3.ready,
    ]).then(([ymaps3Reactify, yMapZoomControl]) => {
      const temp = ymaps3Reactify.reactify.bindTo(React, ReactDOM)
      setYMapZoomControl(temp.module(yMapZoomControl).YMapZoomControl)
      setReactify(temp)
    })
  }, [])
  if (!reactify) return <>Loading</>
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapFeature,
    YMapCollection,
    YMapControls,
  } = reactify.module(ymaps3)

  return (
    <YMap location={{ center: [37.623082, 55.75254], zoom: 10 }} mode='vector'>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapCollection>
        <YMapFeature {...POLYLINE1} />
        <YMapFeature {...POLYLINE2} />
      </YMapCollection>
      <YMapControls position='right'>
        <YMapZoomControl />
      </YMapControls>
      {/* <YMapMarker coordinates={[37.623082, 55.75254]} draggable={true}>
        <section>
          <h1>You can drag this header</h1>
        </section>
      </YMapMarker> */}
    </YMap>
  )
}
