import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifUseContext } from '../context/GifContext'
import Gif from '../component/Gif'

const Categories = () => {
  const [result,setResult] = useState([])
  const {gipfyFetch} = GifUseContext()
  
  const {category} = useParams()
  const fetchCategoriesData = async ()=>{
    const {data} = await gipfyFetch.gifs(category,category)
    setResult(data)
  }
  
  useEffect(()=>{
    fetchCategoriesData()
  },[category])
  return (
    <div className='flex flex-col sm:flex-row gap-5 my-4'>
      <div className='w-full sm:w-72'>
          {
            result.length>0 && <Gif gif={result[0]} hover={false}/>
          }
          <span className='text-gray-400 text-sm pt-2'>
            Don't tell it tome , GIF it to me!
          </span>
          {/* <FollowOn/> */}
          <div className='divider'></div>
      </div>
      <div>
        <h2 className=' capitalize font-extrabold text-4xl pb-1'>{category.split('-').join('&')} GIFs</h2>
        <h2 className='text-lg pb-3 text-gray-400 hover:text-gray-50 cursor-pointer font-bold'>
              @{category}
        </h2>

        {
          result.length>0 && (
            <div className=' columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 '>
            {
              result.slice(1).map((gif)=>{
                  return <Gif gif={gif} key={gif.id}/>
              })
            }
          </div>
          )
        }
      </div>
    </div>
  )
}

export default Categories