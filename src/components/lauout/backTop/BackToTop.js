import React, { useRef } from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";

const BackToTop = () => {
     const backToTop = useRef(null);

     window.onscroll = () => {
          if (window.pageYOffset > 500) {
               backToTop.current.style.display = "block";
          } else {
               backToTop.current.style.display = "none";
          }
     };

     const handleBackToTop = () => {
          let timerBackToTop = setInterval(() => {
               if (window.pageYOffset <= 0) clearInterval(timerBackToTop);
               document.documentElement.scrollTop -= 100;
          }, 10);
     };

     return (
          <div
               className="fixed right-20 bottom-20 hidden bg-white rounded-full overflow-hidden"
               ref={backToTop}
               onClick={handleBackToTop}
          >
               <BsArrowUpCircleFill className="main__color  hover:opacity-70 text-5xl cursor-pointer border-4 border-white" />
          </div>
     );
};

export default BackToTop;
