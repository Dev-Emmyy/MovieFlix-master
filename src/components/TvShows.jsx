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
               <Link to={`/${movie.id}`} key={movie.id} style={{textDecorationLine:"none"}}>
                <div className="container">
                    <AiFillPlayCircle color="green" fontSize={40} id="playicon"/>
                    <img src={shows.poster_path ? `${Img}${shows.poster_path}`: NoImg} alt="movie poster" />
                      <h4 id={shows.name.length < 28? "" : "smallertext"} className={toggle? "mainColor" : "secondaryColor"} >{shows.name}</h4>
                </div>
                </Link>
          ))}
          </div>
        </div>
    </Fragment>
    )
}

export default TvShows;

