import { useEffect, useState } from 'react'
import { useMapglContext } from '../../components/map2gis/MapglContext.js'
import { Actions } from '../../components/tableActions/Actions.js'
import styles from './styles.module.css'
import { Clusterer } from '@2gis/mapgl-clusterer'

export const RoutesPage = () => {
  const [stops, setStops] = useState<
    {
      name: string
      coordinates: number[]
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
      clusterer.on('click', ({ target }) =>
        setStops(curr => [
          ...curr,
          { coordinates: target.data.coordinates, name: target.data.userData },
        ]),
      )
      // clusterer.on('click', ({ target }) => console.log(target))

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
      <FormCard
          action={action}
          config={formConfig}
          close={() => {
            setShowCard(false)
          }}
        >{children}</FormCard>
      <Actions
        button_text='Добавить маршрут'
        action='route/'
        formConfig={{ name: { placeholder: 'Название маршрута', label: 'Название маршрута' } }}
      >
        <SelectedStops stops={stops.map(stop => stop.name)} />
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
