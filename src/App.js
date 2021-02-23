import logo from './logo.svg';
import './App.css';
import React from 'react'
import Header from "./Components/Header";
import Films from "./Components/Films";
import axios from "axios";
import Search from "./Components/Search";
import MyLoader from "./Components/Loader";
import LoadingBlock from "./Components/Loader";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // you should replace this with yours

const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
};


const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_MOVIES_REQUEST":
            return {
                ...state,
                loading: true,
                errorMessage: null
            };
        case "SEARCH_MOVIES_SUCCESS":
            return {
                ...state,
                loading: false,
                movies: action.payload
            };
        case "SEARCH_MOVIES_FAILURE":
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            };
        default:
            return state;
    }
};




function App() {

    //делаю локальныйй редюсер на хуке объединяя стейты
    const [state, dispatch]=React.useReducer(reducer,initialState);







    // const [loading, setLoading] = React.useState(true);
    // const [movies, setMovies] = React.useState([]);
    // const [errorMessage, setErrorMessage] = React.useState(null);

   React.useEffect(()=>{
       axios.get(MOVIE_API_URL)
           .then(({data})=>{
               // setMovies(data.Search)
               // setLoading(false)
               dispatch({
                   type:"SEARCH_MOVIES_SUCCESS",
                   payload: data.Search
               })
           })
   },[])

    const search = (searchValue) => {
        // setLoading(true);
        // setErrorMessage(null);
        dispatch({
            type: "SEARCH_MOVIES_REQUEST"
        });
       axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
           .then(({data})=>{
               if(data.Response==='True'){
                   // setMovies(data.Search)
                   // setLoading(false)
                   dispatch({
                       type: "SEARCH_MOVIES_SUCCESS",
                       payload: data.Search
                   });
               } else {
                   // setErrorMessage(data.Error)
                   // setLoading(false)
                   dispatch({
                       type: "SEARCH_MOVIES_FAILURE",
                       error: data.Error
                   });
               }
           })

    }
    const { movies, errorMessage, loading } = state;

    return (
      <div className="App">
          <Header text="ФИЛЬМОМАНИЯ" />
          <Search search={search} />
          <p className="App-intro">Sharing a few of our favourite movies</p>
          <div className="movies">
              {loading && !errorMessage ? (
                  movies.map((n,index)=>(<LoadingBlock key={index}/>))
              ) : errorMessage ? (
                  <div className="errorMessage">{errorMessage}</div>
              ) : (
                  movies.map((movie, index) => (
                      <Films key={`${index}-${movie.Title}`} movie={movie} />
                  ))
              )}
          </div>
      </div>
  );
}

export default App;
