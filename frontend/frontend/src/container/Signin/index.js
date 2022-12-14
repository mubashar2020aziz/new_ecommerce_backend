import React from 'react';
import Layout from '../../component/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../component/UI/input';
const Signin = (props) => {
  return (
    <>
      <Layout>
        <Container>
          <Row style={{ marginTop: '50px' }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Input
                  label="Enter your email"
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
export default Signin;
