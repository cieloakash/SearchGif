import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifUseContext } from '../context/GifContext';
import GifSearch from './GifSearch';

const Header = () => {
    const [categories, setCategories] = useState([])
    const [showCategories, setShowCategories] = useState(false)
    const {gipfyFetch,gifs,setGifs,filter,setFilter,favorites} = GifUseContext()


    const fetchCategories =async ()=>{
        const {data} =await gipfyFetch.categories();
        setCategories(data);
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    
    console.log(categories);
      
    
  return (
    <nav>
        <div className='relative flex gap-4 justify-between items-center mb-2'>
            <Link to='/' className='flex gap-2'>
                <img src={logo} alt='logo' className='w-8'/>
                <h1 className='text-5xl font-bold tracking-tight cursor-pointer'>GIPFY</h1>
            </Link>
            <div className='font-bold text-md flex gap-2 items-center'>
                {categories?.slice(0,5)?.map((category,index)=>{
                    return <Link key={index} to={`/${category.name_encoded}`} className='px-4 py-1 hover:gradient border-b-4 hidden lg:block'>
                            {category.name}
                        </Link>
                })}
                
                <button onClick={()=>setShowCategories(!showCategories)} >
                    <HiEllipsisVertical size={35} className={`py-0.5 hover-gradient ${showCategories ? 'gradient': ''} border-b-4 hidden lg:block`}/>
                </button>
                
                {
                    favorites.length > 0 && <div className='h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer'>
                    <Link to='/fav'>Fovorite GIFs</Link>
                </div>
                }
                <button>
                    <HiMiniBars3BottomRight className='text-sky-400 block lg:hidden' size={30}/>
                </button>
                <div>

                    {
                        showCategories && <div className='absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20'>
                            <span className='text-3xl font-extrabold'>Categories</span>
                            <hr className='bg-gray-100 opacity-50 mt-5 mb-5' />
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4' >
                                {
                                    categories.map((category,index)=>{
                                        return <Link key={index} className='font-bold' to={`/${category.name_encoded}`}>{category.name}</Link>
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>

        {/* search */}
        <GifSearch />
    </nav>
  )
}

export default Header