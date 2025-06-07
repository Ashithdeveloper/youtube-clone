import { Route, Routes } from "react-router-dom"
import Navbar from "./Component/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import Video from "./Pages/video/Video";
import { useState } from "react";
import SearchResult from "./Component/SearchResult/SearchResult";
import SearchVideo from "./Component/searchVideo/SearchVideo";


const App = () => {
  const [sidebar , setSidebar] = useState(true);
  const [query, setQuery] = useState("");
 
  return (
    <div>
      <Navbar setSidebar={setSidebar}  setQuery={setQuery} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />}  />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
        <Route path="/searchResult" element={<SearchResult sidebar={sidebar}  query={query}  />} />
        <Route path="/searchvideo/:videoId" element={<SearchVideo/>}/>
      </Routes>
    </div>
  );
}

export default App