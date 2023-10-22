import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import {AiFillPlayCircle} from "react-icons/ai";
import { Container } from "./Navbar";
import NoImg from "./no img.jpg"
import "../Styles/Video.css"
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
            </div>
        </Fragment>
    )
}

export default Trends;