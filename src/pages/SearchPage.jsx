import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { GifUseContext } from '../context/GifContext'
import FilterGif from '../component/FilterGif'
import Gif from '../component/Gif'

const Search = () => {
  const [searchesult, setSearchesult] = useState([])
  const {gipfyFetch,filter} = GifUseContext()
  
  const {query} = useParams()
  console.log(query);
  
  const fetchSearchResult = async ()=>{
    const {data} = await gipfyFetch.search(query,{
      sort:'relevant',
      lang:'en',
      type:filter,
      limit:20,
    })
    setSearchesult(data)

  }

console.log(searchesult);

  useEffect(()=>{
    fetchSearchResult()
  },[filter,query])

  return (
    <div className='my-4'>
      <h2 className='text-5xl pb-3 font-extrabold'>{query}</h2>
      <FilterGif alignleft={true}/>

      {
        searchesult.length>0 ?(
          <div className=' columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 '>
          {
            searchesult.map((gif)=>{
                return <Gif gif={gif} key={gif.id}/>
            })
          }
        </div>
        ):(<span> No GIFs for this {query} try something else </span>)
      }
    </div>
  )
}

export default Search