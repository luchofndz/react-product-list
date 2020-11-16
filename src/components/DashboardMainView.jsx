import { React, useEffect, useState } from 'react';
import { getDataFromDb } from '../api/productsApi';
import '../styles/DashboardMainStyles.css';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export function DashboardMainView(props) {
  const [products, setProducts] = useState(null);
  const [navigate, setNavigate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(false);

  useEffect(() => {
    getProductsListFromBackEnd();
  },[]);

  const getProductsListFromBackEnd = async () => {
    const productList = await getDataFromDb();
    if (productList) {
      setProducts(productList);
    }
  };

  const handleOnClickButton = product => {
    setSelectedProduct(product)
    setNavigate(true); 
  };

  const productsView = () => {
    let arrayOfPRoducts = null;
    arrayOfPRoducts = products.map((item, index) => {
      return (
        <div className="product-view" key={item.ProductID} >
          <div className="detail-product">
            <img src={item.ThumbnailURL} alt="product"></img>
            <div className="description-container">
              <p>{item.Name}</p>
              <p>
                {item.Price}
                <strike className="strike-price">{item.RetailPrice}</strike>
              </p>
            </div>
          </div>
          <div className="button-container">
            <Button 
              variant="success" 
              className="shadow-none" 
              onClick={() => handleOnClickButton(item)}
            >
              View Details
            </Button>
          </div>
        </div>
      );
    });
    if (arrayOfPRoducts) {
      return arrayOfPRoducts;
    }
  };

  return (
    <div className="products-main-container">
      {products && productsView()}
      {navigate && selectedProduct &&
        <Redirect 
          to={{
          pathname: `/product/${selectedProduct.ProductID}`
          }}
        />
        }
    </div>
  ); 
}