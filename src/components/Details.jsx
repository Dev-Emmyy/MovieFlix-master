import React, { Fragment, useEffect, useState } from "react";
import {AiFillLinkedin,AiOutlineTwitter,AiFillGithub} from "react-icons/ai"
import Noimg from "./no img.jpg";
import "../DetailsStyles/details.css";
import axios from 'axios';
import BottomBg from "./bottom img.jpg";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';

  
function Details() {
  
  const[moviesDetails,setMoviesDetails] = useState();
  const [videoURL, setVideoURL] = useState([]);

  const {id} = useParams()
  const Api = `https://api.themoviedb.org/3/movie/${id}`;
  const Images = "https://image.tmdb.org/t/p/w500";
  const ApiKey = "47440337c6b528a0103650d276133e76";

  const backgroundStyle = `${moviesDetails? `${Images}${moviesDetails.poster_path}` : Noimg}`

  console.log(backgroundStyle)
              //<img src={moviesDetails? `${Images}${moviesDetails.poster_path}` : Noimg} id="img_bg"/>
 

  const DetailsCall = async() => {
    const data = await axios.get(Api,{
        params:{
            api_key: ApiKey
        }
    })
    const results = data.data       
    // console.log('results:', results)
    setMoviesDetails(results)
  }

  const videoTrillerCall = async() => {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}`)
    const results = data.data;
    // console.log('results: ', results)
    setVideoURL(results.results)
  }

  useEffect(()=> {
    DetailsCall();
  },[id])

    useEffect(()=> {
    videoTrillerCall();
  },[])
   


 const [video, setVideo] = useState("");

function handleSearch() {
    movieTrailer(moviesDetails?.title || "")
      .then((res) => {
        const urlParams = new URLSearchParams(new URL(res).search);
        setVideo(urlParams.get("v"));
      })
      .catch((error) => console.log(error));
  }
  

  useEffect(() => {
    handleSearch();
  }, [moviesDetails]);

    return (
      <Fragment>
            <div id="secondaryColor" >
              <div id="bg_image" style={{backgroundImage : `url(${backgroundStyle})`,backgroundSize:'cover',backgroundRepeat: 'no-repeat',height: '1000px',backgroundPosition : 'left calc((50vw - 170px) - 340px) top,}'}}>
             <div id="details_container">
                <img src={moviesDetails? `${Images}${moviesDetails.poster_path}` : Noimg} />
                <div id="container_content">
                     <h1>{moviesDetails? moviesDetails.original_title : ""}</h1>
                      <h3>{moviesDetails? moviesDetails.release_date : ""}. <span> {moviesDetails? moviesDetails.genres[0].name : ""}, {moviesDetails? moviesDetails.genres[1].name : ""}</span></h3>
                     <h2>Status: <span>{moviesDetails? moviesDetails.status :""}</span></h2>
                     <em>{moviesDetails? moviesDetails.tagline : ""}</em>

                     <div id="container_overview">
                        <h1>Overview</h1>
                     <h3>{moviesDetails? moviesDetails.overview : ""}</h3>
                     </div>

                     <div id="collections">
                        <img src={moviesDetails? `${Images}${moviesDetails.production_companies[0].logo_path}` : Noimg} />
                        <h3 id="collections_one">{moviesDetails? moviesDetails.production_companies[0].name :  "" } </h3>
                        <h3 id="collections_two">{moviesDetails? moviesDetails.production_countries[0].name: ""} </h3>
                     </div>

                     <div className="trailer">
                      <ReactPlayer width="100%"  height="300px"  url={`https://www.youtube.com/watch?v=${videoURL[0]?.key}`} controls={true} style={{margin: '2rem 0rem'}} />
                     </div>
                </div>
            </div>
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

export default Details;

