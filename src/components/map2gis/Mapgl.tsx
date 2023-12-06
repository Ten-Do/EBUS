import { useContext, useEffect, useState } from 'react'
import { load } from '@2gis/mapgl'
import { useMapglContext } from './MapglContext.js'
// import { Clusterer } from '@2gis/mapgl-clusterer'
import { RulerControl } from '@2gis/mapgl-ruler'
import { Directions } from '@2gis/mapgl-directions'
import { useControlRotateClockwise } from './useControlRotateClockwise.js'
import { ControlRotateCounterclockwise } from './ControlRotateConterclockwise.js'
import { MapWrapper } from './MapWrapper.js'
import { BusMarker } from '../../UI/bus/Bus.js'
import { HtmlMarker } from '@2gis/mapgl/types/index.js'
import { CentrifugoContext } from '../../Auth.tsx'

export const MAP_CENTER = [37.623082, 55.75254]

export default function Mapgl() {
  const centrifuge = useContext(CentrifugoContext);
  const { setMapglContext } = useMapglContext()
  const [map1, setMap] = useState(null);
  const [buses, setBuses] = useState([]);
  useEffect(() => {
    if (centrifuge && map1) {
      const newSub = centrifuge.newSubscription("geo:public");
      newSub.on('publication', function (ctx) {
        setBuses(buses => {
          const busIndex = buses.findIndex(bus => bus.ID === ctx.data.ID);
  
          if (busIndex >= 0) {
            // Автобус уже существует, обновляем его данные
            const updatedBuses = [...buses];
            updatedBuses[busIndex] = {
              ...updatedBuses[busIndex],
              Battery: ctx.data.Battery,
              driverID: ctx.data.DriverID
            };
            updatedBuses[busIndex].marker.setCoordinates([ctx.data.Lon, ctx.data.Lat])
            console.log(updatedBuses[busIndex].marker)
            return updatedBuses;
          } else {
            console.log(ctx.data.Lon, ctx.data.Lat)
            // Автобус новый, добавляем его в список
            const newBus = {
              ID: ctx.data.ID,
              marker: new mapgl.HtmlMarker(map1, {
                coordinates: [ctx.data.Lon, ctx.data.Lat],
                html: BusMarker(ctx.data.ID),
              }),
              Battery: ctx.data.Battery,
              driverID: ctx.data.DriverID
            };
            console.log(newBus.marker)
            return [...buses, newBus];
          }
        });
      });
      newSub.subscribe();
  
      // Функция очистки
      return () => {
        newSub.unsubscribe();
        centrifuge.removeSubscription(newSub);
      };
    }
  }, [centrifuge, map1]);
  useEffect(() => {
    let map: mapgl.Map | undefined = undefined
    let directions: Directions | undefined = undefined
    let htmlMarker: HtmlMarker | undefined = undefined
    // let clusterer: Clusterer | undefined = undefined

    load().then(mapgl => {
      map = new mapgl.Map('map-container', {
        center: MAP_CENTER,
        zoom: 13,
        key: 'a1893935-6834-4445-b97a-3405fb426c5b',
      })
      setMap(map);

      map.on('click', e => console.log(e))

      /**
       * Ruler  plugin
       */

      const rulerControl = new RulerControl(map, { position: 'centerRight' })

      /**
       * Clusterer plugin
       */

      // clusterer = new Clusterer(map, {
      //   radius: 60,
      // })

      // const markers = [
      //   {
      //     coordinates: [37.636802, 55.730285],
      //   },
      //   {
      //     coordinates: [37.633069, 55.793898],
      //   },
      //   {
      //     coordinates: [37.7653010159, 55.705529796],
      //   },
      //   {
      //     coordinates: [37.4983655238, 55.8175991765],
      //   },
      //   {
      //     coordinates: [37.567633, 55.743556],
      //   },
      //   {
      //     coordinates: [37.515279147774, 55.7461479133509],
      //   },
      //   {
      //     coordinates: [37.515491, 55.736486],
      //   },
      //   {
      //     coordinates: [37.746397, 55.788391],
      //   },
      //   {
      //     coordinates: [37.585953, 55.794251],
      //   },
      //   {
      //     coordinates: [37.7474441193, 55.7885026019],
      //   },
      //   {
      //     coordinates: [37.658618, 55.776401],
      //   },
      //   {
      //     coordinates: [37.751765, 55.758308],
      //   },
      //   {
      //     coordinates: [37.626355693522456, 55.79231357606657],
      //   },
      //   {
      //     coordinates: [37.660867, 55.757426],
      //   },
      //   {
      //     coordinates: [37.7833630365, 55.7881668645],
      //   },
      //   {
      //     coordinates: [37.560932, 55.765031],
      //   },
      //   {
      //     coordinates: [37.56435, 55.743108],
      //   },
      //   {
      //     coordinates: [37.4827877731, 55.7393608568],
      //   },
      //   {
      //     coordinates: [37.58195976927681, 55.7768004905017],
      //   },
      //   {
      //     coordinates: [37.6807042317, 55.7469496606],
      //   },
      //   {
      //     coordinates: [37.6567252185, 55.7723956034],
      //   },
      //   {
      //     coordinates: [37.5176348846, 55.7363244044],
      //   },
      //   {
      //     coordinates: [37.5693871584394, 55.7416037986967],
      //   },
      //   {
      //     coordinates: [37.7447037218, 55.8048289593],
      //   },
      //   {
      //     coordinates: [37.5547007739258, 55.7818327065666],
      //   },
      //   {
      //     coordinates: [37.64187, 55.822867],
      //   },
      //   {
      //     coordinates: [37.5848978251, 55.7775078413],
      //   },
      //   {
      //     coordinates: [37.57631, 55.818046],
      //   },
      //   {
      //     coordinates: [37.558017, 55.793031],
      //   },
      //   {
      //     coordinates: [37.7316526220851, 55.7092458213575],
      //   },
      //   {
      //     coordinates: [37.5163949588, 55.7768130661],
      //   },
      //   {
      //     coordinates: [37.645526, 55.821736],
      //   },
      //   {
      //     coordinates: [37.526312, 55.738575],
      //   },
      //   {
      //     coordinates: [37.638088734277865, 55.81907828030325],
      //   },
      //   {
      //     coordinates: [37.6352290734021, 55.7317403481233],
      //   },
      //   {
      //     coordinates: [37.7704413794, 55.7226540727],
      //   },
      //   {
      //     coordinates: [37.7848609351, 55.7186161286],
      //   },
      //   {
      //     coordinates: [37.7808578468, 55.7193650675],
      //   },
      //   {
      //     coordinates: [37.7611287497, 55.7258475547],
      //   },
      //   {
      //     coordinates: [37.53442, 55.740023],
      //   },
      //   {
      //     coordinates: [37.773946, 55.76259],
      //   },
      //   {
      //     coordinates: [37.7507700642895, 55.8021797610458],
      //   },
      //   {
      //     coordinates: [37.7580656728102, 55.8038475935839],
      //   },
      //   {
      //     coordinates: [37.7644171437575, 55.8055516091551],
      //   },
      //   {
      //     coordinates: [37.7693309506725, 55.8068930153357],
      //   },
      //   {
      //     coordinates: [37.7763476094557, 55.8087902407791],
      //   },
      //   {
      //     coordinates: [37.7838363370248, 55.8097931946348],
      //   },
      //   {
      //     coordinates: [37.7885784825636, 55.8099502818095],
      //   },
      //   {
      //     coordinates: [37.7872908966635, 55.7513241736569],
      //   },
      //   {
      //     coordinates: [37.7553604916, 55.7277225429],
      //   },
      //   {
      //     coordinates: [37.7755607105885, 55.7209638276382],
      //   },
      //   {
      //     coordinates: [37.6505245199755, 55.7283622627707],
      //   },
      //   {
      //     coordinates: [37.7483386727955, 55.7294796199401],
      //   },
      //   {
      //     coordinates: [37.7425880166676, 55.7318528440625],
      //   },
      //   {
      //     coordinates: [37.585173, 55.77819],
      //   },
      //   {
      //     coordinates: [37.578273216102, 55.7731035599866],
      //   },
      //   {
      //     coordinates: [37.490707, 55.73157],
      //   },
      //   {
      //     coordinates: [37.4875369497, 55.7350428484],
      //   },
      //   {
      //     coordinates: [37.4857378069, 55.7368949257],
      //   },
      //   {
      //     coordinates: [37.5821570976812, 55.7087189551715],
      //   },
      //   {
      //     coordinates: [37.6113395318, 55.728776424],
      //   },
      //   {
      //     coordinates: [37.612112008, 55.7310528259],
      //   },
      //   {
      //     coordinates: [37.6112537011, 55.7529376761],
      //   },
      //   {
      //     coordinates: [37.6143436059, 55.7575353661],
      //   },
      //   {
      //     coordinates: [37.6037864311773, 55.7656167187466],
      //   },
      //   {
      //     coordinates: [37.5962333305914, 55.769487143037],
      //   },
      //   {
      //     coordinates: [37.557008706, 55.7893192793],
      //   },
      //   {
      //     coordinates: [37.5323780779, 55.8003604645],
      //   },
      //   {
      //     coordinates: [37.5143536333, 55.8052428563],
      //   },
      //   {
      //     coordinates: [37.6188635839993, 55.7586864403836],
      //   },
      //   {
      //     coordinates: [37.6281332983547, 55.7585890936094],
      //   },
      //   {
      //     coordinates: [37.6340663446951, 55.7540696344419],
      //   },
      //   {
      //     coordinates: [37.6044440283352, 55.7454951328766],
      //   },
      //   {
      //     coordinates: [37.7735975276599, 55.7598835008911],
      //   },
      //   {
      //     coordinates: [37.7808744278636, 55.7573682213815],
      //   },
      //   {
      //     coordinates: [37.7769042037233, 55.7545951070514],
      //   },
      //   {
      //     coordinates: [37.7796722434304, 55.7500025713021],
      //   },
      //   {
      //     coordinates: [37.7780598632454, 55.7620289805325],
      //   },
      //   {
      //     coordinates: [37.777788357405, 55.76335677036],
      //   },
      //   {
      //     coordinates: [37.6609664788, 55.8136347527],
      //   },
      //   {
      //     coordinates: [37.669636213, 55.8287210207],
      //   },
      //   {
      //     coordinates: [37.505374, 55.734221],
      //   },
      //   {
      //     coordinates: [37.5297122330825, 55.7389401701279],
      //   },
      //   {
      //     coordinates: [37.5261717171829, 55.738056443317],
      //   },
      //   {
      //     coordinates: [37.7899129239424, 55.7658112899677],
      //   },
      //   {
      //     coordinates: [37.782714, 55.764343],
      //   },
      // ]
      // clusterer.load(markers)

      /**
       * Directions plugin
       */

      directions = new Directions(map, {
        directionsApiKey: 'rujany4131', // It's just demo key
      })
      // setInterval(
      //   () =>
      //     htmlMarker?.setCoordinates([
      //       htmlMarker.getCoordinates()[0] + 0.00001,
      //       htmlMarker.getCoordinates()[1],
      //     ]),
      //   10,
      // )
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
      htmlMarker && htmlMarker.destroy()
      // clusterer && clusterer.destroy()
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
