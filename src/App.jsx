import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './component/AppLayout'
import Home from './pages/Home'
import Categories from './pages/Categories'
import SearchPage from './pages/SearchPage'
import SingleGif from './pages/SingleGif'
import Favrate from './pages/Favrate'
import { GifContextProvider } from './context/GifContext'

function App() {
  const [count, setCount] = useState(0)

  const routerDom = createBrowserRouter([
    {
      element:<AppLayout/>,
      children:[
        {
          path:'/',
          // errorElement:
          element:<Home/>
        },
        {
          path:'/fav',
          // errorElement:
          element:<Favrate/>
        },
        {
          path:'/search/:query',
          // errorElement:
          element:<SearchPage/>
        },
        {
          path:'/:category',
          // errorElement:
          element:<Categories/>
        },
        
        {
          path:'/:type/:slug',
          // errorElement:
          element:<SingleGif/>
        }
        
      ]
    }
  ])

  return (
    <GifContextProvider>
      <RouterProvider router={routerDom}/>
    </GifContextProvider>
   
  )
}

export default App
