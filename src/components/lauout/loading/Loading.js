import React from "react";
import "./loading.css";

const Loading = () => {
     return (
          <section className="loading fixed w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
               <div>
                    <span></span>
                    <span></span>
                    <span></span>
               </div>
          </section>
     );
};

export default Loading;
