import React, { useEffect,useState } from 'react'
import { GifUseContext } from '../context/GifContext'
import Gif from '../component/Gif'

const Favrate = () => {
  const [favStore, setFavStore] = useState([])
  const {gipfyFetch,favorites} = GifUseContext()
  const fetchFavData = async ()=>{
    const {data:gifs} = await  gipfyFetch.gifs(favorites);
    setFavStore(gifs)
  }
  useEffect(()=>{
    fetchFavData()
  },[])
  console.log(favStore);
  
  
  return (
    <div className='mt-2'>
      <span className='font-extrabold text-4xl capitalize'>my-favorites</span>
      <div className=' columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2 '>
            {
              favStore.map((gif)=>{
                  return <Gif gif={gif} key={gif.id}/>
              })
            }
          </div>
    </div>
  )
}

export default Favrate