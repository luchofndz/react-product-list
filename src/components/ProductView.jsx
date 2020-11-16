import { React, useEffect, useState } from 'react';
import ReactStars from 'react-stars'
import { getProductById } from '../api/productsApi';
import '../styles/ProductStyles.css';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


export function ProductView(props) {
  const [showToast, setShowToast] = useState(false);
  const [product, setProduct] = useState(null);
  const [stars, setStars] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setProductValues();
    }
  },[]);

  const setProductValues = async () => {
    if (id) {
      const response = await getProductById(parseInt(id));
      if (response) {
        setProduct(response);
        setStarsAverage(response.RatingAvg);
      }
    }
  };

  const setStarsAverage = (number) => {
    if (number) {
      let roundedNumber = 0;
      
      if ((number % 1) >= 0.5) {
        roundedNumber = parseFloat(parseInt(number) + 0.5);            
      } else {
        roundedNumber = parseInt(number);
      }
      setStars(roundedNumber);
    }
  };
  
  const openToastFunction = () => {
    setShowToast(true);
    setTimeout (
      () => setShowToast(false), 
      7000
    );
  };
                                                                                                 
  return (
    <div className="product-main-container">
      {showToast &&
        <div className="toast-container">
          <div className="toast-success">
            <h4>Product added successfully!</h4>
          </div>
        </div>
      }
      {product && 
        <div className="product">
          <div>
            <div>
              <img src={product.PictureURL ? product.PictureURL : ''} alt="product"></img>
              <div className="image-buttons-container">
                <Button variant="danger" className="shadow-none">Clearance</Button>
                <Button variant="danger" className="shadow-none">Free Shipping</Button>
              </div>
            </div>
            <div className="product-image__footer-text">
              <p><b>Brand: </b>{product.Brand ? product.Brand : ''}</p>
              <p><b>Color: </b>{product.Color ? product.Color : ''}</p>
            </div>
          </div>
          <div className="description-container">
            <h3>{product.Name ? product.Name : ''}</h3>
            <ReactStars
              count={5}
              size={24}
              half={true}
              value={stars}
              edit={false}
            />
            <p>
              {(product.Description && product.Description.length > 1000) 
                ? (product.Description.substring(0, 1000) + '...') 
                : product.Description 
              }
              {/* {TODO: implement read more functionality} */}
            </p>
          </div>
          <div className="add-to-cart-container">
            <div className="price-container">
              <p>
                {product.Price ? product.Price : ''}
              </p>
              <p>
                <strike className="strike-price">
                  {product.RetailPrice ? product.RetailPrice : ''}
                </strike>
              </p>
            </div>
            <div className="stock-container">
              {product.Stock 
                ? <p className="available">Available {product.Stock} units</p>
                : <p className="out">Out of Stock</p>
              }
              <Button 
                variant="success" 
                className="shadow-none" 
                onClick={() => openToastFunction()}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      }
    </div>
  ); 
}