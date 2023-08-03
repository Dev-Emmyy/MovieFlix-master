import React, { Fragment, useState } from "react";
import {Routes,Route, NavLink} from "react-router-dom";
import {BsCloudSun} from "react-icons/bs"
import {HiSearch} from "react-icons/hi";
import {BiMoon} from "react-icons/bi"
import "../Styles/NavBarStyle.css";
import Movies from "./Movies";
import Trends from "./Trends";
import TvShows from "./TvShows";
import Details from "./Details";
export const Container = React.createContext()

function Navbar(){
    const[toggle,setToggle] = useState(true);
    const[inputValue,setInputValue] = useState("");


    return(
        <Container.Provider value={{toggle,inputValue}}>
       <Fragment>
        <nav className="nav">
            <div className="nav_options">
                     <h1 id={toggle? "" : "heading"}>MOVIEFLIX</h1>
    
                 <NavLink to="/">
                     <span id={toggle? "movies" : "movies_light"}>Movies</span>
                </NavLink>
               
                 <NavLink to="/TvShows">
                     <span  id={toggle? "movies" : "movies_light"}>TvShows</span>
                </NavLink>
               
                 <NavLink to="/Trends">
                     <span  id={toggle? "movies" : "movies_light"}>Trending</span>
                </NavLink>
               
            </div>
            <div className="input_section">
                <input type="text" placeholder="Search for a Movie" onChange={(e) => setInputValue(e.target.value)}/>
                <HiSearch fontSize={21} color="black" id="search" cursor={"pointer"}/>
                </div>
           

            <div className="color_mode" onClick={() => setToggle(!toggle)}>
                            <h3>{toggle? "DarkMode" : "WhiteMode"}</h3>
                              <BiMoon fontSize={23} id="mode" color="#fff"  className={toggle?  "display" : "noDisplay"}/>
                             <BsCloudSun fontSize={23} id="mode"  color="#fff"  className={toggle? "noDisplay" :   "display"}/>
                        </div>
        </nav>

        <Routes>
            
            <Route path="" element={<Movies/>}/>
            <Route path="TvShows" element={<TvShows/>}/>
            <Route path="Trends" element={<Trends/>}/>
             <Route path=":id" element={<Details/>}/>
        </Routes>
       </Fragment>
       </Container.Provider>
    )
}

export default Navbar;