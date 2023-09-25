import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { AiFillCaretDown } from "react-icons/ai";

import logo from "../../../assets/images/logo.webp";
import navigationBar from "../../common/navigationBar";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";

const NavigationBar = (props) => {
     const [isNavShow, setIsNavShow] = useState(false);
     const location = useLocation();

     React.useEffect(() => {
          setIsNavShow(props.openNav);
     }, [props.openNav]);

     React.useEffect(() => {
          handleCloseNav();
     }, [location.pathname]);

     const handleCloseNav = () => {
          setIsNavShow(false);
          props.setOpenNav(false);
     };

     return (
          <React.Fragment>
               <span
                    className="banner__black z-10 hidden"
                    style={isNavShow ? { display: "block" } : {}}
                    onClick={handleCloseNav}
               ></span>
               <nav
                    id="navigationBar"
                    className={clsx("text-black bg-gray-200 h-full w-1/5", {
                         "navigationBar-show": isNavShow,
                    })}
               >
                    <div className="flex justify-between items-center py-3 px-2">
                         <Link to="/home">
                              <img src={logo} alt="" />
                         </Link>
                         <IoIosClose
                              className="hover:main__color cursor-pointer text-4xl text-white"
                              onClick={handleCloseNav}
                         />
                    </div>
                    <ul className="nav">
                         {navigationBar.map((nav) => (
                              <NavChild nav={nav} key={nav.id} />
                         ))}
                    </ul>
               </nav>
          </React.Fragment>
     );
};

const NavChild = (props) => {
     const nav = props.nav;
     const [openNavExpand, setOpenNavExpand] = useState(false);
     const location = useLocation();

     React.useEffect(() => {
          setOpenNavExpand(false);
     }, [location.pathname]);

     return (
          <li className="block bg-white border-b-1 py-2">
               <Link
                    to={nav.url}
                    className="hover:main__color hover:font-bold px-3 inline uppercase text-sm"
               >
                    {nav.title}
               </Link>
               {nav.expand && (
                    <React.Fragment>
                         <AiFillCaretDown
                              className="hover:main__color inline float-right"
                              onClick={() => setOpenNavExpand(!openNavExpand)}
                         />
                         <ul
                              className="nav__expand text-white text-sm -mb-2"
                              style={openNavExpand ? { height: "133.6px" } : {}}
                         >
                              {nav.expand.map((item) => (
                                   <li className="p-3" key={item.id}>
                                        <Link
                                             to={item.url}
                                             className="block hover:main__color first-letter:uppercase"
                                        >
                                             {`${nav.title} ${item.title}`}
                                        </Link>
                                   </li>
                              ))}
                         </ul>
                    </React.Fragment>
               )}
          </li>
     );
};

export default NavigationBar;
