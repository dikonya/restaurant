import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./Cart.css";
import { Modal, Button, Form } from "react-bootstrap";

const Cart = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState("");

  const handleAddressChange = (e) => {
    setDeliveryAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentTime = new Date();
    const deliveryTime = new Date(currentTime.getTime() + 45 * 60000);
    const adjustedDeliveryTime = new Date(deliveryTime.getTime() + 10 * 60000);
    
    const deliveryMessage = `Your delivery will arrive around ${deliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${adjustedDeliveryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    setDeliveryMessage(deliveryMessage);
    setShowModal(true);
    
    clearCart();  
    setDeliveryAddress("");  
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="cart-section py-5 bg-secondary">
      <div className="container">
        <h2 className="text-center fs-0.5 mb-4 mb-lg-5 text-uppercase fw-bold text-white">
          Your Cart
        </h2>
        {cart.length === 0 ? (
          <p className="text-center text-white">Your cart is empty</p>
        ) : (
          <div>
            <div className="row row-cols-1 row-cols-lg-3 gx-4 ">
              {cart.map((item, index) => (
                <div key={index} className="col mb-4">
                  <div className="custom-card border-0 shadow h-100 d-flex bg-white">
                    <div className="card-img-container">
                      <img src={item.image} className="card-img" alt={item.name} />
                    </div>
                    <div className="card-text-container d-flex flex-column justify-content-between">
                      <div>
                        <h3 className="text-center fs-3 text-capitalize">{item.name}</h3>
                        <p className="text-center fs-5">{item.description}</p>
                        <div className="text-center fs-3 fw-bold text-warning">{item.price}</div>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="btn btn-outline-secondary me-2" onClick={() => decrementQuantity(item)}>
                          -
                        </button>
                        <span className="fs-5">{item.quantity}</span>
                        <button className="btn btn-outline-secondary ms-2" onClick={() => incrementQuantity(item)}>
                          +
                        </button>
                      </div>
                      <button className="btn btn-danger mt-2" onClick={() => removeFromCart(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Form onSubmit={handleSubmit} className="mt-4 deliv-form">
              <h3>Do you want to order right now?</h3>
              <Form.Group className="mb-3 ">
                <Form.Label htmlFor="deliveryAddress">Delivery Address</Form.Label>
                <Form.Control
                  type="text"
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={handleAddressChange}
                  required
                />
              </Form.Group>
              <Button type="submit" className="btn btn-lg ">
                Confirm Delivery
              </Button>
            </Form>
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delivery Confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Body>{deliveryMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
