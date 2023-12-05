import React, { Fragment, useEffect, useState, useContext } from "react";
import {Container} from "./Navbar";
import {AiFillPlayCircle,AiFillLinkedin,AiOutlineTwitter,AiFillGithub} from "react-icons/ai"
import Noimg from "./no img.jpg";
import "../Styles/Video.css";
import axios from 'axios';
import BottomBg from "./bottom img.jpg"
import {Link} from "react-router-dom";

function Movies({ id }) {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const Shown = input ? "search" : "discover";
  const [loading, setLoading] = useState(true);

  const [moviesData, setMoviesData] = useState([]);

  const Api = `https://api.themoviedb.org/3/${Shown}/movie`;
  const Images = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const MovieCall = async () => {
      const data = await axios.get(Api, {
        params: {
          api_key: "47440337c6b528a0103650d276133e76",
          query: input,
        },
      });
      const results = data.data.results;
      setMoviesData(results);
    };

    MovieCall();
  }, [input]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <Fragment>
      {loading ? ( // Render loading spinner if loading is true
        <div className="loading-spinner"></div>
      ) : (
        <div className={toggle? "mainBgColor" : "secondaryBgColor"}>
          <div className="movie_container">
            {moviesData.map((movie) => (
              <Link to={`/${movie.id}`} key={movie.id} style={{ textDecorationLine: "none" }}>
                <div className="container">
                  <AiFillPlayCircle color="green" fontSize={40} id="playicon" />
                  <img src={movie.poster_path ? `${Images}${movie.poster_path}` : Noimg} alt="movie poster" />
                  <h4 id={movie.title.length < 28 ? "" : "smallertext"} className={toggle ? "mainColor" : "secondaryColor"}>
                    {movie.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Movies;


