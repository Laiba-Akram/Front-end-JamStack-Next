import React, { useState } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
  { id: 5, name: "Shirts", doc_count: 165 },
  { id: 5, name: "Jackets", doc_count: 165 },
  { id: 5, name: "AirPods", doc_count: 165 },
  { id: 5, name: "Headphones", doc_count: 165 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];

const Menu = ({ categories }) => {
  const [showCatMenu, setShowCatMenu] = useState(false);

  const handleMouseEnter = () => {
    setShowCatMenu(true);
  };

  const handleMouseLeave = () => {
    setShowCatMenu(false);
  };

  return (
    <ul className="hidden md:flex items-center gap-8 font-medium text-black">
<div className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 shadow-lg"></div>
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li
                className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center gap-2 cursor-pointer ">
                  <span className="text-lg">{item.name}</span>
                  <BsChevronDown size={16} className="text-gray-400" />
                </div>

                {showCatMenu && (
                  <ul className="absolute top-6  left-0 px-1 py-1 w-44 bg-gray-900 text-white shadow-lg rounded-md">
                    {categories?.map(({ attributes: c, id }) => {
                      return (
                        <Link
                          key={id}
                          href={`/category/${c.slug}`}
                          onClick={() => setShowCatMenu(false)}
                        >
                          <li className="px-4 py-3 hover:bg-gray-800">
                            <span className="text-sm">{c.name}</span>
                            <span className="text-xs text-White-500 ml-2">
                              ({c.products.data.length})
                            </span>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                )}
              </li>
            ) : (
              <li className="relative cursor-pointer p-2">
  <Link href={item?.url}>{item.name}</Link>
  {/* Pseudo-element for the bottom shadow */}
  <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-400 shadow-lg"></div>
</li>

            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
