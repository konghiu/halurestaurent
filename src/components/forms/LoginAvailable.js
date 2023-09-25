import React from "react";

// img
import btn__gg from "../../assets/images/gp-btn.svg";
import btn__fb from "../../assets/images/fb-btn.svg";

const LoginAvailable = () => {
     return (
          <div>
               <h1 className="font-bold text-2xl mb-4">
                    Đặng nhập bằng Facebook hoặc Google
               </h1>
               <div className="w-32 inline-block">
                    <img src={btn__fb} alt="button login fb" />
               </div>
               <div className="w-32 inline-block ml-4">
                    <img src={btn__gg} alt="button login fb" />
               </div>
          </div>
     );
};

export default LoginAvailable;
