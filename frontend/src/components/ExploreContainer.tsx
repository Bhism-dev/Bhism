import './ExploreContainer.css';
import { useHistory } from "react-router";

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const History = useHistory();
  const handleClick = () => {
    History.push('/tailwind-example');
  }
  return (
    <div id="container">
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components" className='text-blue-500'>UI Components</a></p>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer m-8 transition duration-300 transform hover:scale-105'
        onClick={handleClick}>
        Tailwind-Example
      </button>
    </div>
  );
};

export default ExploreContainer;
