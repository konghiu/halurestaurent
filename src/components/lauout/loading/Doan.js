import React, { useRef, useState } from "react";
import "./doan.css";
import { BsFillBalloonHeartFill } from "react-icons/bs";

const Doan = () => {
     const [image, setImage] = useState("");
     const loading = useRef(null);
     const loadingEnd = useRef(null);

     const handleAddImage = (e) => {
          const file = e.target.files[0];
          file.preview = URL.createObjectURL(file);
          setImage(file.preview);
     };

     const handleLoading = () => {
          loading.current.classList.add("loadings");
          setTimeout(() => {
               document.querySelector(".loading__run").style.display = "none";
               document.querySelector(".loading__end").style.display = "flex";
          }, 6000);
     };

     return (
          <div className="doan none__copy">
               <div className="content">
                    <div className="content__file flex items-center justify-center">
                         <input
                              type="file"
                              id="file"
                              className="hidden"
                              onChange={(e) => handleAddImage(e)}
                         />
                         <label htmlFor="file">Thêm hình vào đây</label>
                         {image !== "" && (
                              <div className="content__image">
                                   <img src={image} alt="" />
                              </div>
                         )}
                    </div>
                    <button onClick={handleLoading}>Tiến hành</button>
               </div>
               <div ref={loading} className="hidden">
                    <div className="loading__run">
                         <p>loading ....</p>
                         <div>
                              <div></div>
                              <p>I love Đon</p>
                         </div>
                    </div>
                    <div className="loading__end">
                         <div>
                              <h1>
                                   Đã thêm Khánh Đoan vào trái tim
                                   <BsFillBalloonHeartFill />
                              </h1>
                              <h2>-- Híu --</h2>
                              <div></div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Doan;
