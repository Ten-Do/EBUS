import { useEffect } from 'react'
import { load } from '@2gis/mapgl'
import { useMapglContext } from './MapglContext.js'
import { Clusterer } from '@2gis/mapgl-clusterer'
import { RulerControl } from '@2gis/mapgl-ruler'
import { Directions } from '@2gis/mapgl-directions'
import { useControlRotateClockwise } from './useControlRotateClockwise.js'
import { ControlRotateCounterclockwise } from './ControlRotateConterclockwise.js'
import { MapWrapper } from './MapWrapper.js'

export const MAP_CENTER = [37.623082, 55.75254]

export default function Mapgl() {
  const { setMapglContext } = useMapglContext()

  useEffect(() => {
    let map: mapgl.Map | undefined = undefined
    let directions: Directions | undefined = undefined
    let clusterer: Clusterer | undefined = undefined

    load().then(mapgl => {
      map = new mapgl.Map('map-container', {
        center: MAP_CENTER,
        zoom: 13,
        key: 'a1893935-6834-4445-b97a-3405fb426c5b',
      })

      map.on('click', e => console.log(e))

      /**
       * Ruler  plugin
       */

      const rulerControl = new RulerControl(map, { position: 'centerRight' })

      /**
       * Clusterer plugin
       */

      clusterer = new Clusterer(map, {
        radius: 60,
      })

      const markers = [
        { coordinates: [37.623082, 55.75254] },
        { coordinates: [36.623082, 55.75254] },
        { coordinates: [37.623082, 55.05254] },
      ]
      clusterer.load(markers)

      /**
       * Directions plugin
       */

      directions = new Directions(map, {
        directionsApiKey: 'rujany4131', // It's just demo key
      })

      directions.carRoute({
        points: [
          [37.623082, 55.75454],
          [37.623082, 55.75254],
        ],
      })

      setMapglContext({
        mapglInstance: map,
        rulerControl,
        mapgl,
      })
    })

    // Destroy the map, if Map component is going to be unmounted
    return () => {
      directions && directions.clear()
      clusterer && clusterer.destroy()
      map && map.destroy()
      setMapglContext({ mapglInstance: undefined, mapgl: undefined })
    }
  }, [setMapglContext])

  useControlRotateClockwise()

  return (
    <>
      <MapWrapper />
      <ControlRotateCounterclockwise />
    </>
  )
}
