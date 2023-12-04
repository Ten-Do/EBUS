import { RouterProvider } from 'react-router-dom'
import { Auth } from './Auth.js'
// import styles from './main_styles/App.module.css'
import { router } from './router/router.js'

function App() {
  return (
    <>
      {/* <Auth> */}
        <RouterProvider router={router} />
      {/* </Auth> */}
    </>
  )
}

export default App
