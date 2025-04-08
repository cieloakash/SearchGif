import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { GifUseContext } from "../context/GifContext";

const filters = [
  {
    title: "GIFs",
    value: "gifs",
  },
  {
    title: "Stickers",
    value: "stickers",
  },
  {
    title: "Clips",
    value: "clips",
  },
];
const FilterGif = ({ alignleft = false, showTrending = false }) => {
  const { filter, setFilter } = GifUseContext();
  return (
    <div
      className={`flex gap-3 my-2 ${alignleft ? "" : "justify-end"} 
    ${
      showTrending
        ? "justify-between flex flex-col sm:flex-row sm:items-center"
        : ""
    }`}
    >
      {showTrending && (
        <span className="flex gap-2">
          {showTrending && (
            <HiMiniArrowTrendingUp size={25} className="text-teal-400" />
          )}
          <span className="font-semibold text-gray-400">Treding</span>
        </span>
      )}
      <div className="flex min-w-80 rounded-full bg-gray-800">
        {filters.map((filter) => {
          return (
            <span
              className={`font-semibold py-2 w-1/3 text-center rounded-full cursor-pointer`}
              key={filter.title}
              onClick={()=>setFilter(filter.value)}
            >
              {filter.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};
export default FilterGif;
