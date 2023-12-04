import { BusCard } from '../../components/cards/bus/BusCard.js'
import { RoutCard } from '../../components/cards/rout/RoutCard.js'

export const DriversPage = () => {
  return (
    <div>
      <BusCard
        close={() => {}}
        name='И730КГ'
        data={{
          battery: '50',
          rout: '1856',
          driver: 'Ефремов Павел Альбертович',
          load: 'средняя',
          chill: '15:00',
          charging: '18:00',
          currentStop: 'Площадь',
          nextStop: 'Магазин',
        }}
      />
      <br />
      <br />
      <br />
      <RoutCard
        close={() => {}}
        name='14'
        data={{
          buses: [
            'Е254ТС',
            'Е254ТС',
            'Е254ТС',
            'Е254ТС',
            'Е254ТС',
            'Е254ТС',
            'Е254ТС',
            'Е254ТС',
            'Е254ТС',
            'Е254ТС',
          ],
          stops: [
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
            'Площадь',
          ],
        }}
      />
    </div>
  )
}
