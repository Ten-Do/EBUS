import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main_styles/reset.css'
import './main_styles/variables.css'
import './main_styles/main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
