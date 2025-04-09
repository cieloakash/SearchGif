
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

  const routerDom = createBrowserRouter([
    {
      element:<AppLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/fav',
          element:<Favrate/>
        },
        {
          path:'/search/:query',
          element:<SearchPage/>
        },
        {
          path:'/:category',
          element:<Categories/>
        },
        
        {
          path:'/:type/:slug',
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
