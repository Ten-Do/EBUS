export interface IRout {
  id: number
  number: string
  path: string
  stations: {
    id: number
    lat: number
    lon: number
    name: string
    routes: string[]
  }[]
}

export interface IRoutData {
  id: number
  number: string
}
