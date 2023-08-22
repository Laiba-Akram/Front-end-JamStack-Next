import Link from "next/link";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";
import React, { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import about from "@/pages/about";
const Footer = () => {
    const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
    return (
      <footer className="relative bg-light text-black pt-14 pb-3">
      {/* Pseudo-element for the top shadow */}
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-lg"></div>
          
            <Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0">
                {/* LEFT START */}
                <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
                   
                    {/* NORMAL MENU START */}
                    <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
                      
                       

                        {/* MENU START */}
                        <div className="flex flex-col gap-3 text">
                            <div className="font-oswald font-medium uppercase text-sm">
                          
                                About Ecommerce
                            </div>
                            
                           
                        </div>
                        {/* MENU END */}
                    </div>
                    {/* NORMAL MENU END */}
                </div>
                {/* LEFT END */}

                {/* RIGHT START */}
                <div className="flex gap-4 justify-center md:justify-start">
                    <div
                        onClick={() =>
                            window.open("https://www.facebook.com/techskills10", "_blank")
                        }
                        className="w-10 h-10 rounded-full shadow-2xl text-black/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer"
                    >
                        <FaFacebookF size={20} />
                    </div>
                   
                    <div onClick={() =>
                            window.open("https://www.youtube.com/@techskills/featured", "_blank")
                        }
                        className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
                        <FaYoutube size={20} />
                    </div>
                    <div onClick={() =>
                            window.open("https://www.instagram.com/techskills10/", "_blank")
                        }
                        className="w-10 h-10 rounded-full  text-black/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
                        <FaInstagram size={20} />
                    </div>
                </div>
                {/* RIGHT END */}
            </Wrapper>
            <Wrapper className="flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0">
                {/* LEFT START */}
                <div className=" text-[12px] shadow-2xl text-black/[0.5] hover:text-black cursor-pointer text-center md:text-left">
                    © 2023 Ecommerce, By (BC190405727) Laiba Akram. 
                </div>
                {/* LEFT END */}

               
                
                {showButton && (
        <button
          className="fixed bottom-5 right-5 p-2 rounded-full bg-blue-800 text-white hover:bg-sky-900 focus:outline-none focus:bg-blue-900"
          onClick={handleButtonClick}
        >
          <FaArrowAltCircleUp size={24} />
        </button>
      )}
               
            </Wrapper>
            
        </footer>
    );
};

export default Footer;
