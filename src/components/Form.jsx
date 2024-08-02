// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import UseUrlPosition from '../hooks/UseUrlPosition';
import Message from './Message';
import Spinner from './Spinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from '../Contexts/CitiesContext';
import { useNavigate } from 'react-router';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  // // use navigate
  const navigate = useNavigate();

  const [lat, lng] = UseUrlPosition();
  const { createCity, isLoading } = useCities();

  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingGeCoding, setIsLoadingGeoCoding] = useState(false);

  const [emoji, setEmoji] = useState();
  const [error, setError] = useState('');

  // run effect to call API to get the city name based on lat and lng
  // const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0";
  useEffect(
    function () {
      // immediately return
      if (!lat && !lng) return;

      async function fetchCityName() {
        try {
          setIsLoadingGeoCoding(true);
          setError('');
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          // check if there is no data at all
          if (!data.countryCode) {
            throw new Error(
              'There is no data available, please choose other locations 😉'
            );
          }

          console.log(data);
          setCityName(data.city || data.locality);
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          console.error(error);
          setError(error.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchCityName();
    },
    [lat, lng]
  );

  // handle sumbit form
  async function handleSUbmit(e) {
    e.preventDefault();
    // if there is no city or date
    if (!cityName && !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };

    await createCity(newCity);
    navigate('/app/cities');
  }

  if (!lat && !lng) return <Message message='Start by clicking the map 🗾' />;

  if (isLoadingGeCoding) return <Spinner />;

  if (error) return <Message message={error} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSUbmit}
    >
      <div className={styles.row}>
        <label htmlFor='cityName'>City name</label>
        <input
          id='cityName'
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor='date'>When did you go to {cityName}?</label>
        {/* <input
          id='date'
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id='date'
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat='dd/MM/yyyy'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor='notes'>Notes about your trip to {cityName}</label>
        <textarea
          id='notes'
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
