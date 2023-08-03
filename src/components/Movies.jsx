import React, { Fragment, useEffect, useState, useContext } from "react";
import {Container} from "./Navbar";
import { AiFillPlayCircle} from "react-icons/ai";
import {AiFillLinkedin,AiOutlineTwitter,AiFillGithub} from "react-icons/ai"
import Noimg from "./no img.jpg";
import "../Styles/Video.css";
import axios from 'axios';
import BottomBg from "./bottom img.jpg";
import {Link} from "react-router-dom";

function Movies({id}) {
    const {toggle,inputValue} = useContext(Container);
    const input = inputValue;
    const Shown = input ? "search" : "discover";

    const[moviesData,setMoviesData] = useState([])

    const Api = `https://api.themoviedb.org/3/${Shown}/movie`;
    const Images = "https://image.tmdb.org/t/p/w500"
  const MovieCall = async() => {
    const data = await axios.get(Api,{
        params:{
            api_key: "47440337c6b528a0103650d276133e76",
            query: input,
        }
    })
    const results = data.data.results       
    setMoviesData(results)
  }

  useEffect(()=> {
    MovieCall()
  },[input])
  console.log(moviesData)


    return (
      <Fragment>

            <div className={toggle? "mainBgColor" : "secondaryBgColor"}>
                <div className="movie_container">
       {moviesData.map((movie) => (
                      <Link to={`/${movie.id}`} key={movie.id} style={{textDecorationLine:"none"}}>
                          <div className="container">
                              <AiFillPlayCircle color="green" fontSize={40} id="playicon"/>
                              <img src={movie.poster_path ? `${Images}${movie.poster_path}`: Noimg} alt="movie poster" />
                              <h4 id={movie.title.length < 28 ? "" : "smallertext"} className={toggle? "mainColor" : "secondaryColor"} >{movie.title}</h4>
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
         <h2> My Challenge 1 project, Created by Dev-Emmy</h2>
         </div>
         </div>
       </div>
        </div>
         </Fragment>
    )

}

export default Movies;



