/*
 * @Author: kyroswu
 * @Date: 2022-04-17 11:37:42
 * @Last Modified by: kyroswu
 * @Last Modified time: 2022-05-06 14:08:33
 */
import { useEffect, useState } from 'react';

export const baseURL = 'https://www.pet-app.club/pet-app/api';

export const useDataApi = (initData, func) => {
  const [data, setData] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // 副作用
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await func();
        if (result.code === 0) {
          setData(result.data);
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [func]);

  return [data, isLoading, isError];
};
