import { useState } from 'react';
import axios from '../axios/axios';

const usePut = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (payload) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.put(url, payload);
      console.log(payload , "is here");
      setData(response.data);
    } catch (err) {
    
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, putData };
};

export default usePut;
