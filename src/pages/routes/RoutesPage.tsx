import { useEffect, useState } from 'react'
import { useMapglContext } from '../../components/map2gis/MapglContext.js'
import styles from './styles.module.css'
import { Clusterer } from '@2gis/mapgl-clusterer'
import { InputField } from '../../UI/input/inputField.tsx'
import CloseSVG from '../../assets/icons/Close.svg?react'
import { Button } from '../../UI/button/button.tsx'
import { useKeycloak } from '@react-keycloak/web'
import $api from '../../http/api.ts'

export const RoutesPage = () => {
  const [stops, setStops] = useState<
    {
      name: string
      coordinates: number[]
    }[]
  >([])
  const { mapglInstance } = useMapglContext()
  useEffect(() => {
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

  const {keycloak} = useKeycloak()
  return (
    <div>
      <form
      style={{ right: '40px' }}
      onSubmit={e => {

        e.preventDefault()
        const formData = new FormData(e.target)
        const json = {number: formData.get('number'), stations: stops.map(stop => (
          {
            lat: stop.coordinates[1],
            lon: stop.coordinates[0],
            name: stop.name
          }
        ))}        
        $api.post('bus', 'route/', keycloak.token!, json)
        setStops([])
      }}
      className={styles.card}
    >
      <div className={styles.head}>
        <p>Добавить маршрут</p>
        <button onClick={() => {close(); setStops([])}}>
          <CloseSVG />
        </button>
      </div>
      <div className={styles.body + ' ' + styles.form}>
        <InputField config={{name: 'number', placeholder: 'Номер маршрута'}} label='Номер маршрута'/>
        <SelectedStops stops={stops.map(e => e.name)}/>
      </div>
      <div>
        <Button bg='primary'>Добавить</Button>
      </div>
    </form>
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
