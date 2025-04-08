import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifUseContext } from "../context/GifContext";
import Gif from "../component/Gif";
import {
  HiMiniChevronDoubleUp,
  HiMiniChevronDoubleDown,
  HiMiniHeart,
} from "react-icons/hi2";

import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSlashSharp } from "react-icons/io5";
import SingleGifSkeleton from "../component/SingleGifSkeleton";
const SingleGif = () => {
  const contentType = ["gifs", "stickers", "texts"];

  const { type, slug } = useParams();
  const [gif, setGif] = useState({});
  const [related, setRelated] = useState([]);
  const [readmore, setReadMore] = useState(false);
  const [loading,setLoading] = useState(false)
  const { gipfyFetch,favorites,addToFav } = GifUseContext();

  const shareGif=()=>{

  }
  const embadedGif = ()=>{

  }


  const fetchGifData = async () => {
    const gifId = slug.split("-");
    const { data } = await gipfyFetch.gif(gifId[gifId.length - 1]);
    const { data: related } = await gipfyFetch.related(
      gifId[gifId.length - 1],
      { limit: 10 }
    );
    setGif(data);
    setRelated(related);
    setLoading(true)
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("invalid content type");
    }
    fetchGifData();
    setLoading(false)
  }, [type, slug ]);

  console.log(gif);


  
   if(!loading){
    return <SingleGifSkeleton opacity={0.2}/>
   }
  
  return (
    
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-2">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />

              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="">{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4  whitespace-pre-line text-sm text-gray-400">
                {readmore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}

               { gif?.user?.description.length > 100 && 
               ( <div
                  className="flex items-center cursor-pointer "
                  onClick={() => setReadMore(!readmore)}
                >
                  {readmore ? (
                    <>
                      Read less <HiMiniChevronDoubleUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDoubleDown size={20} />
                    </>
                  )}
                </div>)}
              </p>
            )}
          </>
        )}
        <div className="divider" />
        {gif?.source && (
          <div>
            <span className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </span>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className=" truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* mobile  ui */}

            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="">{gif?.user?.username}</div>
              </div>
              <button className="ml-auto" 
              // onClick={shareGif}
              >
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>
          {/* fav/share/embed */}
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button 
            onClick={()=>addToFav(gif.id)}
            className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart size={30} className={`${favorites.includes(gif.id) ? 'text-red-500': ''}`}/>
              Favorite
            </button>

            <button
            //  onClick={shareGif} 
             className="flex gap-5 items-center font-bold text-lg">
              <FaPaperPlane size={25}/>
              Share
            </button>

            <button className="flex gap-5 items-center font-bold text-lg" onClick={embadedGif}>
              <IoCodeSlashSharp />
              Embed
            </button>
          </div>
          
        </div>
        <div>
          <span className="font-extrabold">related Gifs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {
              related.slice(1).map((Sgif)=>(
                <Gif gif={Sgif} key={Sgif.id}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGif;
