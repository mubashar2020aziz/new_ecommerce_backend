import React from 'react';
import Layout from '../../component/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../component/UI/input';

const Signup = (props) => {
  return (
    <>
      <Layout>
        <Container>
          <Row style={{ marginTop: '50px' }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Row>
                  <Col md={{ span: 6 }}>
                    <Input
                      label="First Name"
                      placeholder="First Name"
                      value=""
                      type="text"
                      onChange={() => {}}
                    />
                  </Col>
                  <Col md={{ span: 6 }}>
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      value=""
                      type="text"
                      onChange={() => {}}
                    />
                  </Col>
                </Row>

                <Input
                  label="Enter your Email"
                  placeholder="email"
                  value=""
                  type="email"
                  onChange={() => {}}
                />

                <Input
                  label="Enter your password"
                  placeholder="password"
                  value=""
                  type="password"
                  onChange={() => {}}
                />
                <Input
                  label="Enter your Number"
                  placeholder="Number"
                  value=""
                  type="number"
                  onChange={() => {}}
                />

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};
export default Signup;
