import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useEffect, useState } from 'react'

export const ReactMap = () => {
  const [reactify, setReactify] = useState(null)
  useEffect(() => {
    ymaps3
      .import('@yandex/ymaps3-reactify')
      .then(ymaps3Reactify => setReactify(ymaps3Reactify.reactify.bindTo(React, ReactDOM)))
  }, [])
  if (!reactify) return <>Loading</>
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
    reactify.module(ymaps3)

  return (
    <YMap location={{ center: [37.623082, 55.75254], zoom: 9 }} mode='vector'>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />

      {/* <YMapMarker coordinates={[25.229762, 55.289311]} draggable={true}>
          <section>
            <h1>You can drag this header</h1>
          </section>
        </YMapMarker> */}
    </YMap>
  )
}
