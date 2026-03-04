import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationData = async (latitude, longitude) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/location/reverse?lat=${latitude}&lon=${longitude}`
        );

        const data = await res.json();
        const userLocation = data?.address?.state || null;

        setLocation(userLocation);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchLocationData(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        setError("Unable to access location. Please enable location services.");
        setLoading(false);
      }
    );
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation, loading, error }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
