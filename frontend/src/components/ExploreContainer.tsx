import './ExploreContainer.css';
import { useHistory } from "react-router";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const History = useHistory();
  return (
    <div id="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components" className='text-blue-500'>UI Components</a></p>
    </div>
  );
};

export default ExploreContainer;
