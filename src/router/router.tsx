import { createBrowserRouter } from 'react-router-dom'
import { AdminPage } from '../pages/admin/AdminPage.js'
import { BusesPage } from '../pages/buses/BusesPage.js'
import { DriversPage } from '../pages/drivers/DriversPage.js'
import { MapPage } from '../pages/map/MapPage.js'
import { RoutesPage } from '../pages/routes/RoutesPage.js'
import { SettingsPage } from '../pages/settings/SettingsPage.js'
import { StopsPage } from '../pages/stops/StopsPage.js'
import { PAGES } from './pages.js'
import { RootLayout } from './rootLayout/RootLayout.js'
import { ChatPage } from '../pages/chat/ChatPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: PAGES.chat,
        element: <ChatPage />,
      },
      {
        path: PAGES.buses,
        element: <BusesPage />,
      },
      {
        path: PAGES.drivers,
        element: <DriversPage />,
      },
      {
        path: PAGES.routes,
        element: <RoutesPage />,
      },
      {
        path: PAGES.stops,
        element: <StopsPage />,
      },
      {
        path: PAGES.admin,
        element: <AdminPage />,
      },
      {
        path: PAGES.settings,
        element: <SettingsPage />,
      },
    ],
  },
])
