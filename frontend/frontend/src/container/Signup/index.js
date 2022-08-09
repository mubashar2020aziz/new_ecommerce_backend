import React, { useState } from 'react';
import Layout from '../../component/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../component/UI/input';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/actions/authAction';

const Signup = (props) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstname,
      lastname,
      email,
      password,
      phone,
    };
    dispatch(signup(user));
    console.log(user);
  };

  const auth = useSelector((state) => state.auth);

  if (auth.authenticate) {
    return <Navigate to={'/'} />;
  }
  if (user.loading) {
    return <p>loading...!</p>;
  }
  return (
    <>
      <Layout>
        <Container>
          {user.message}
          <Row style={{ marginTop: '50px' }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userSignup}>
                <Row>
                  <Col md={{ span: 6 }}>
                    <Input
                      label="First Name"
                      placeholder="First Name"
                      value={firstname}
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Col>
                  <Col md={{ span: 6 }}>
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      value={lastname}
                      type="text"
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </Col>
                </Row>

                <Input
                  label="Enter your Email"
                  placeholder="email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label="Enter your password"
                  placeholder="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  label="Enter your Number"
                  placeholder="Number"
                  value={phone}
                  type="number"
                  onChange={(e) => setPhone(e.target.value)}
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
