import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import {AiFillPlayCircle,AiFillLinkedin,AiOutlineTwitter,AiFillGithub} from "react-icons/ai";
import { Container } from "./Navbar";
import NoImg from "./no img.jpg"
import "../Styles/Video.css"
import BottomBg from "./bottom img.jpg"
import { Link } from "react-router-dom";

function Trends(){
    const {toggle,inputValue} = useContext(Container)
    const [trendsData,setTrendsData] = useState([])
    const input = inputValue
    const Shown = input? "search" : "trending"
    const Api = `https://api.themoviedb.org/3/${Shown}/all/day`
    const Img = "https://image.tmdb.org/t/p/w500"

    const TrendsCall = async() => {
        const data = await axios.get(Api, {
            params: {
                api_key: "47440337c6b528a0103650d276133e76",
                query: input,
            }
        })
        const results = data.data.results
        setTrendsData(results)
    }

    useEffect(() => {
        TrendsCall()
    },[input])
    console.log(trendsData)


    return(
        <Fragment>
            <div className={toggle? "mainBgColor" : "secondaryBgColor"}>
                <div className="movie_container">
                     {trendsData.map((trends) => (
                      <Link to={`/${trends.id}`} key={trends.id} style={{textDecorationLine:"none"}}>
                          <div className="container">
                              <AiFillPlayCircle color="green" fontSize={40} id="playicon"/>
                              <img src={trends.poster_path ? `${Img}${trends.poster_path}`: NoImg} alt="movie poster" />
                             <h4 className={toggle? "mainColor" : "secondaryColor"}>{trends.title? `${trends.title}` : `${trends.name}`}</h4>
                          </div>
                      </Link>
                  ))}
                     </div>
        
                    <div className="bottom_bg">
         <img src={BottomBg} width="100%"  height="350px"/>
         <div className="profile_link">
          <div className="contact">
             <h2>Connect Us</h2>
          </div>
          <div className="profile">
         <a href="https://www.linkedin.com/in/ugochukwu-emmanuel-ba798a25a/">
           <AiFillLinkedin color="#0072b1" fontSize={30} cursor="pointer"  fontWeight="bolder"/>
         </a>
          <a href="https://twitter.com/9Gunna9">
            <AiOutlineTwitter color="	#1DA1F2" fontSize={30} fontWeight="bolder"/>
          </a>
         <a href="https://github.com/Dev-Emmyy">
            <AiFillGithub color="black" fontSize={30} cursor="pointer"  fontWeight="bolder" />
          </a>
          </div>

          <div>
         <h2>My Challenge 1 project, Created by Dev-Emmy</h2>
         </div>
         </div>
         </div>
            </div>
        </Fragment>
    )
}

export default Trends;