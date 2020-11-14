// import data from './data/hardcodedData.json';
import axios from 'axios';

export const getDataFromDb = async () => {
  const promise = await new Promise((resolve, reject) => {
    return axios
      .get('data/hardcodedData.json')
      .then(({ data }) => { 
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  if (promise) {
    console.log(promise);
    return promise;
  }
};