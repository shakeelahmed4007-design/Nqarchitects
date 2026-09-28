import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {LanguageProvider} from './Language.jsx'
import {RouterProvider} from './Router.jsx'
import './styles.css'
createRoot(document.getElementById('root')).render(<React.StrictMode><LanguageProvider><RouterProvider><App/></RouterProvider></LanguageProvider></React.StrictMode>)
