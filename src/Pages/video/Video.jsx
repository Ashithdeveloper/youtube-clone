
import { useParams } from 'react-router-dom';
import Playvideo from '../../Component/PlayVideo/Playvideo';
import Recommended from '../../Component/Recommented/Recommended';
import './Video.css';

const Video = () => {

  const { categoryId, videoId } = useParams();

  return (
    <div className='play-container'>
      <Playvideo videoId={videoId}/>
      <Recommended categoryId={categoryId} />
    </div>
  )
}

export default Video