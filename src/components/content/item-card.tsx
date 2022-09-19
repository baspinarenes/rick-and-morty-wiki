import type { FC } from "react";

const ItemCard: FC<ItemCardProps> = ({ name, image, url }) => {
  return (
    <a href={url} className="h-full relative cursor-pointer">
      <div className="overflow-hidden peer">
        <img
          src={image || "/images/placeholder.png"}
          alt={`${name} avatar`}
          className="w-full h-auto hover:scale-110 hover:ease-in duration-500"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-[rgba(128,253,76,0.8)] to-[rgba(34,162,189,1)] font-poppins font-bold text-3xl leading-8 text-black whitespace-pre-wrap break-words peer-hover:hidden">
        <div className="px-3 py-4 border-gray-500">{name}</div>
      </div>
    </a>
  );
};

interface ItemCardProps {
  url: string;
  name: string;
  image: string;
}

export default ItemCard;
