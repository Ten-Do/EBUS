import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'

const polyline = [
  [55.75254, 37.623082],
  [57.75254, 38.623082],
  [58.75254, 39.623082],
  [59.75254, 36.623082],
]

export const Map = () => {
  return (
    <div style={{height: '60vh', width: '60vw'}}>

    <MapContainer center={[55.75254, 37.623082]} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      <Marker position={[55.75254, 37.623082]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Polyline pathOptions={{ color: 'lime' }} positions={polyline} />
    </MapContainer>
        </div>
  )
}
