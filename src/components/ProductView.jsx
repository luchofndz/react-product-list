import { React, useEffect, useState } from 'react';
import ReactStars from 'react-stars'
import { getProductById } from '../api/productsApi';
import '../styles/ProductStyles.css';
import { Button, Toast } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


export function ProductView(props) {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(null);
  const [stars, setStars] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setProductValues();
    }
  },[id]);

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
  console.log("stars", stars);
                                                                                                 
  return (
    <div className="product-main-container">
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded mr-2"
            alt=""
          />
          <strong className="mr-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
      {product && 
        <div className="product">
          <div>
            <div>
              <img src={product.PictureURL ? product.PictureURL : ''} alt="product"></img>
              <div className="image-buttons-container">
                <Button variant="danger">Clearance</Button>
                <Button variant="danger">Free Shipping</Button>
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
            <p>{product.Description ? product.Description : ''}</p>
          </div>
          <div>
            <div className="price-container">
              <p>
                {product.Price ? product.Price : ''}
                <strike className="strike-price">
                  {product.RetailPrice ? product.RetailPrice : ''}
                </strike>
              </p>
            </div>
            <div>
              {product.Stock 
                ? <p>Available {product.Stock} units</p>
                : <p>Out of Stock</p>
              }
              <Button variant="success" onClick={() => setShow(true)}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      }
    </div>
  ); 
}