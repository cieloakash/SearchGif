import { createContext, useContext, useEffect, useState } from "react";
import {GiphyFetch} from '@giphy/js-fetch-api'




const GifcreateContext = createContext()

const GifContextProvider = ({children})=>{
    const [gifs,setGifs] = useState([])
    const [filter,setFilter] = useState('gifs')
    const [favorites,setFavorites] =useState([])
    
    const gipfyFetch = new GiphyFetch(import.meta.env.VITE_GIPFY_KEY)

    const addToFav =(id)=>{
        if(favorites.includes(id)){
            const updateFavorite = favorites.filter((itemId) => itemId !== id);
            localStorage.setItem('favGifs', JSON.stringify(updateFavorite));
            setFavorites(updateFavorite);
        }else{
            const updateFavorite = [...favorites,id]
            localStorage.setItem('favGifs',JSON.stringify(updateFavorite))
            setFavorites(updateFavorite)
        }
    }
    useEffect(()=>{
        const favorate = JSON.parse(localStorage.getItem('favGifs')) || [];
        setFavorites(favorate)
    },[])
    
    
    return(
        <GifcreateContext.Provider value={{gipfyFetch,gifs,setGifs,filter,setFilter,favorites,addToFav} }>
            {children}
        </GifcreateContext.Provider>
    )
}

const GifUseContext = () => useContext(GifcreateContext);


export {GifContextProvider,GifUseContext}