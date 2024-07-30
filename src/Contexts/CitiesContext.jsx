import { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = 'http://localhost:9000';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   cities details state
  const [currentCity, setCurrentCity] = useState({});

  /**
   * Fetch FAke API
   */
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert('Something wrong getting the data...');
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  /**
   * Get details city
   */
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert('Something wrong getting the data...');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// Custom hooks for provider
function useCities() {
  const context = useContext(CitiesContext);
  //   if access context outside provider
  if (context === undefined)
    throw new Error('Can not use CitiesContext outside provider');
  return context;
}

export { CitiesProvider, useCities };
