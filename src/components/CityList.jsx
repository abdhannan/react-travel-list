import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import { useCities } from '../Contexts/CitiesContext';

function CityList() {
  // CONSUME CONTEXT
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  //   if there is no data
  if (!cities.length)
    return (
      <Message message='Add your first city by clicking the city on the Map' />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
