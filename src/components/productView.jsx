import { React, useEffect, useState } from 'react';
// import { getDataFromDb } from '../api/productsApi';
// import '../styles/DashboardMainStyles.css';
import { Button, Toast } from 'react-bootstrap';

export function ProductView(props) {
  const [show, setShow] = useState(false);

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
          <img src={props.imageUrl}></img>
          <div>
            <Button variant="danger">Danger</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>
        <div>

        </div>
        <div>
          <div>

          </div>
          <div>
            <Button onClick={() => setShow(true)}>Show Toast</Button>
          </div>
        </div>
      </div>
    </div>
  ); 
}