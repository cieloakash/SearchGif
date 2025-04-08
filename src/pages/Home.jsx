import React,{useEffect, useState} from 'react'
import { GifUseContext } from '../context/GifContext'
import banner from '../assets/banner.gif'
import Gif from '../component/Gif'
import FilterGif from '../component/FilterGif'

const Home = () => {
  const {gipfyFetch,gifs,setGifs,filter} = GifUseContext()
  const [limit, setlimit] = useState(20)
  const [page,setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchAllGifs = async ()=>{
    const {data}  =await gipfyFetch.trending({
      limit:limit,
      type:filter,
      rating:'g'
    })
    setGifs(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchAllGifs()
  }, [filter,page])

  const handleScroll= ()=>{
    if(document.body.scrollHeight -500 < window.scrollY + window.innerHeight){
      setlimit((prev)=>prev+10)
      console.log('\x1b[33m%s\x1b[0m', limit);
      
      setLoading(true)
    }
  }

  function debounce(func,delay){
    let timeOutId;
    return function(...args){
      if(timeOutId){
        clearTimeout(timeOutId);
      }
      timeOutId = setTimeout(()=>{
        func(...args);
      },delay)
    }
  }
  
  window.addEventListener('scroll',debounce(handleScroll,500))

  useEffect(() => {
    if (loading == true) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);
  console.log(gifs);
  
  return (
    <div className='min-h-screen'>
      <img src={banner} alt="banner" className='mt-2 rounded w-full' />

      {/* filter gif */}
      <FilterGif showTrending={true}/>

      <div className=' columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 '>
        {
          gifs.map((gif)=>{
              return <Gif gif={gif} key={gif.title}/>
          })
        }
      </div>
      {loading && <h1>Loading....</h1>}
    </div>
  )
}

export default Home