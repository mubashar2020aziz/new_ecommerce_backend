import React from 'react';
import Header from '../Header';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/category">Category</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/orders">Orders</NavLink>
                </li>
              </ul>
            </Col>
            <Outlet />
            <Col md={10} style={{ marginLeft: 'auto' }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};

export default Layout;
