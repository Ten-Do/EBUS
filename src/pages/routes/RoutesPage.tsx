import { useEffect, useState } from 'react'
import { useMapglContext } from '../../components/map2gis/MapglContext.js'
import { Actions } from '../../components/tableActions/Actions.js'
import styles from './styles.module.css'
import { Clusterer } from '@2gis/mapgl-clusterer'

export const RoutesPage = () => {
  const [stops, setStops] = useState<
    {
      name: string
      lat: number
      lon: number
    }[]
  >([])
  const { mapglInstance } = useMapglContext()
  useEffect(() => {
    console.log('effect')

    let clusterer: Clusterer | undefined = undefined
    if (mapglInstance) {
      clusterer = new Clusterer(mapglInstance, {
        radius: 10,
      })
      clusterer.on('click', ({ target }) => setStops(curr => [...curr, target.data.coordinates]))
      fetch('../../../public/bus_stop_points.json')
        .then(res => res.json())
        .then(data => clusterer!.load(data))
    }
    return () => {
      clusterer && clusterer.destroy()
    }
  }, [stops])
  return (
    <div>
      <Actions
        button_text='Добавить маршрут'
        action='route/'
        formConfig={{ name: { placeholder: 'Название маршрута', label: 'Название маршрута' } }}
      >
        <SelectedStops stops={stops} />
      </Actions>
    </div>
  )
}

const SelectedStops = ({ stops }: { stops: string[] }) => {
  return (
    <div className={styles.stops}>
      {stops.map(stop => (
        <div className={styles.stop} key={stop}>
          {stop}
        </div>
      ))}
    </div>
  )
}
