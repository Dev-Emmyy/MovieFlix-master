import { Fragment, useEffect, useState , useContext } from "react";
import {AiFillPlayCircle,AiFillLinkedin,AiOutlineTwitter,AiFillGithub} from "react-icons/ai"
import { Container } from "./Navbar";
import NoImg from "./no img.jpg"
import "../Styles/Video.css"
import axios from "axios";
import BottomBg from "./bottom img.jpg"
import { Link } from "react-router-dom";



function TvShows({id}) {
    const[TvShowsData,setTvShowsData] = useState([])
    const {toggle,inputValue} = useContext(Container)

    const input = inputValue
    const Shown = input? "search" : "discover"
    const Img = "https://image.tmdb.org/t/p/w500"
    const Api = `https://api.themoviedb.org/3/${Shown}/tv`;
    const TvShowsCall = async() => {
        const data = await axios.get(Api, {
            params:{
              api_key: "47440337c6b528a0103650d276133e76",
              query: input,
            }
        })
        const results = data.data.results
        setTvShowsData(results)
    }
    console.log(TvShowsData)

    useEffect(() => {
        TvShowsCall()
    },[]);

    return (
    <Fragment>
            <div className={toggle? "mainBgColor" : "secondaryBgColor"}>
                <div className="movie_container">
                     {TvShowsData.map((shows) => (
                     
                          <div className="container">
                              <AiFillPlayCircle color="green" fontSize={40} id="playicon"/>
                              <img src={shows.poster_path ? `${Img}${shows.poster_path}`: NoImg} alt="movie poster" />
                               <h4 id={shows.name.length < 28? "" : "smallertext"} className={toggle? "mainColor" : "secondaryColor"} >{shows.name}</h4>
                          </div>
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

export default TvShows;

