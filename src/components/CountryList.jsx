import styles from './CountryList.module.css';
import Spinner from './Spinner';
import CountryItem from './CountryItem';
import Message from './Message';

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  //   if there is no data
  if (!cities.length)
    return (
      <Message message='Add your first city by clicking the city on the Map' />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.city} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
