import './Playvideo.css';

import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { useState } from 'react';
import { API_KEY, value_converter } from '../../Data';
import { useEffect } from 'react';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';




const Playvideo = () => {

  const [apiData , setApiData] = useState(null);
  const [ channelData , setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const {videoId} = useParams();
  

  const fetchApiData = async () =>{
          const videoDetails =
            ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY} `;
            await fetch(videoDetails).then(response => response.json()).then(data => setApiData(data.items[0]))
  }
  
  const fetchChannelData = async () =>{
          const channelDetails = ` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY} 
`;
            await fetch(channelDetails).then(response => response.json()).then(data => setChannelData(data.items[0]))

            const channelComment = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}
`; 
            await fetch(channelComment).then(response => response.json()).then(data => setCommentData(data.items))
  }
  

  useEffect(()=>{
    fetchApiData();
  },[videoId])
  useEffect(()=>{
    fetchChannelData();
  },[apiData])

  return (
    <div className="play-video">
      {/* <video src={Video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="no-referrer"
        allowFullScreen
        title="Video Player"
      />
      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "16k"}{" "}
          &bull;
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}{" "}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 155}
          </span>
          <span>
            <img src={dislike} alt="" />

          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData? channelData.snippet.thumbnails.default.url:""} alt="" />
        <div>
          <p>{apiData? apiData.snippet.channelTitle:""}</p>
          <span>{channelData? value_converter(channelData.statistics.subscriberCount) :"1M"}</span>
        </div>
        <button>Subscribers</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData? apiData.snippet.description.slice(0,250) : " Description Here"}
        </p>
        <hr />
        <h4>{apiData? value_converter(apiData.statistics.commentCount):102}</h4>
         {commentData.map((item,index)=>{
          return (
             <div key={index} className="comment">
          <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" className='profile-comment' />
          <div>
            <h3>
              {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
            </h3>
            <p>
             {item.snippet.topLevelComment.snippet.textDisplay}
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
          )
         })}
      </div>
    </div>
  );
}

export default Playvideo