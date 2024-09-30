import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { lunchItems } from "../../../utils/Data/DishesData";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";
import Notification from "../../../components/Notification/Notification"; 
import "./Dishes.css";

const Lunch = () => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]); 

  const handleAddToCart = (item) => {
    if (isAuthenticated) {
      addToCart(item);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: Date.now(), message: `Added ${item.name} to cart` }
      ]);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNotificationClose = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="lunch-section py-5 bg-white">
      <Container>
        <h2 className="text-center fs-0.5 mb-4 mb-lg-5 text-uppercase fw-bold text-success">
          Dishes
        </h2>
        <Row className="gx-4">
          {lunchItems.map((item) => (
            <Col key={item.id} lg={6} className="mb-4">
              <div className="custom-card border-0 shadow h-100 d-flex">
                <div className="card-img-container">
                  <img src={item.image} className="card-img" alt={item.name} />
                </div>
                <div className="card-text-container d-flex flex-column justify-content-between">
                  <div>
                    <h3 className="text-center fs-3 text-capitalize">
                      {item.name}
                    </h3>
                    <p className="text-center fs-5">{item.description}</p>
                  </div>
                  <div className="text-center fs-3 fw-bold text-success">
                    {item.price}
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="mt-3 bg-secondary border-0"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <ul className="navigation-links-dishes">
        <li>
          <Link to="/breakfast" className="text-decoration-none">
            Breakfast
          </Link>
        </li>
        <li>
          <Link to="/drinks" className="text-decoration-none">
            Drinks
          </Link>
        </li>
        <li>
          <Link to="/desserts" className="text-decoration-none">
            Desserts
          </Link>
        </li>
      </ul>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Authentication Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please log in to add items to your cart.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Link to="/auth/login">
            <Button variant="primary" onClick={handleCloseModal}>
              Login
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
      <Notification notifications={notifications} onClose={handleNotificationClose} /> 
    </div>
  );
};

export default Lunch;
