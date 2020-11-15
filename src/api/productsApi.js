import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/data'
})

export const getDataFromDb = async () => {
  const promise = await new Promise((resolve, reject) => {
    return apiClient
      .get('/hardcodedData.json')
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

export const getProductById = async (productId) => {
  const promise = await new Promise((resolve, reject) => {
    return apiClient
      .get('/hardcodedData.json')
      .then(({ data }) => { 
        data.forEach(item => {
          if (item.ProductID === productId) {
            resolve(item);
          }
        });
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