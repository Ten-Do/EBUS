import { createBrowserRouter } from 'react-router-dom'
import { PAGES } from './pages.js'
import { RootLayout } from './rootLayout/RootLayout.js'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: PAGES.map,
        element: <div></div>,
      },
      {
        path: PAGES.buses,
        element: <div></div>,
      },
      {
        path: PAGES.drivers,
        element: <div></div>,
      },
      {
        path: PAGES.routes,
        element: <div></div>,
      },
      {
        path: PAGES.stops,
        element: <div></div>,
      },
      {
        path: PAGES.admin,
        element: <div></div>,
      },
      {
        path: PAGES.settings,
        element: <div></div>,
      },
    ],
  },
])
