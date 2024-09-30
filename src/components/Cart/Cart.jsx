// src/components/Cart/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Cart.css";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, removeItemCompletely } =
    useContext(CartContext);

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleRemoveItemCompletely = (item) => {
    removeItemCompletely(item);
  };

  return (
    <Container className="cart-section py-5">
      <h2 className="text-center fs-1 mb-4 mb-lg-5 text-uppercase fw-bold">
        Cart
      </h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <Row className="gx-4">
          {cartItems.map((item, index) => (
            <Col key={index} lg={6} className="mb-4">
              <div className="custom-card border-0 shadow h-100 d-flex bg-white">
                <div className="card-img-container">
                  <img src={item.image} className="card-img" alt={item.name} />
                </div>
                <div className="card-text-container">
                  <div className="card-text-content">
                    <h3 className="text-center fs-3 text-capitalize">
                      {item.name}
                    </h3>
                    <p className="text-center fs-5">{item.description}</p>
                    <div className="text-center fs-3 fw-bold text-warning">
                      {item.price}
                    </div>
                    <div className="text-center fs-5">
                      Quantity: {item.quantity}
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(item)}
                      className="mx-2"
                    >
                      +
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleRemoveFromCart(item)}
                      className="mx-2"
                    >
                      -
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveItemCompletely(item)}
                      className="mx-2"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
      <div className="text-center">
        <Button variant="primary" className="mt-4">
          Proceed to Checkout
        </Button>
      </div>
    </Container>
  );
};

export default Cart;
