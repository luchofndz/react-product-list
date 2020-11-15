import { React, useEffect, useState } from 'react';
import { getProductById } from '../api/productsApi';
import '../styles/ProductStyles.css';
import { Button, Toast } from 'react-bootstrap';
import { useParams } from 'react-router-dom';


export function ProductView(props) {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(false);
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
      }
    }
  };

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
        <div>
          <h3>{product.Name ? product.Name : ''}</h3>
          <p>{product.Description ? product.Description : ''}</p>
        </div>
       
        <div>
          <div>

          </div>
          <div>
            {product.Stock 
              ? <p>Available {product.Stock} units</p>
              : <p>Out of Stock</p>
            }
            <Button onClick={() => setShow(true)}>Show Toast</Button>
          </div>
        </div>
      </div>
    </div>
  ); 
}