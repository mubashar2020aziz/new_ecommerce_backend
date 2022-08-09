import React from 'react';
import './style.css';
import Layout from '../../component/Layout';

const Home = (props) => {
  return (
    <>
      <Layout sidebar>
        container
        {/* <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to={'/'}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="orders">Orders</NavLink>
                </li>
              </ul>
            </Col>
            <Outlet />
            <Col md={10} style={{ marginLeft: 'auto' }}>
              Container
            </Col>
          </Row>
        </Container> */}
        {/* <div class="container-fluid bg-light text-dark p-3 mt-5 text-center shadow">
          <h6 class="display-4">Welcome Admin Dashboard</h6>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem
          </p>
        </div> */}
      </Layout>
    </>
  );
};
export default Home;
