import { useParams } from 'react-router-dom';
import './SearchVideo.css';
import Playvideo from '../PlayVideo/Playvideo';

const SearchVideo = () => {
    const { videoId } = useParams();
  return (
    <div className="play-container">
      <Playvideo videoId={videoId} />
      
    </div>
  );
}

export default SearchVideo