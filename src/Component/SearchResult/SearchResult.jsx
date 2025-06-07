import { useEffect, useState } from "react";
import { API_KEY, value_converter } from "../../Data";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import Sidebar from "../Sidebar/Sidebar";
import './SearchResult.css';


const SearchResult = ({ query, sidebar }) => {
  const [results, setResult] = useState([]);
  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${API_KEY} 
`;
    await fetch(videoList_url)
      .then((response) => response.json())
      .then((data) => setResult(data.items));
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <>
      <Sidebar sidebar={sidebar} />
      <div className={`container ${sidebar ?"" : "large-container"}`}>
        <div className="search-result">
          {results.map((item, index) => {
             const videoId = item.id?.videoId;
            return (
              <Link to={`/searchvideo/${videoId}`} key={index} className="card">
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <h2>{item.snippet.title}</h2>
                <h3>{item.snippet.channelTitle}</h3>
                <p>
                  {value_converter(item.statistics?.viewCount)} &bull;
                  {moment(item.snippet.publishedAt).fromNow()}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
  
};

export default SearchResult