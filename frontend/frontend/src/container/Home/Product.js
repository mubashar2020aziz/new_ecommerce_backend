import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import Layout from '../../component/Layout';
import Input from '../../component/UI/input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/actions/productaction';

const Product = (props) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDiscription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [productPicture, setProductPicture] = useState('');
  const [show2, setShow2] = useState(false);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const handleOut = () => {
    const form = new FormData();
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('description', description);
    form.append('category', categoryId);
    form.append('price', price);
    for (let pic of productPicture) {
      form.append('productPicture', pic);
    }

    setShow2(false);
    dispatch(addProduct(form));
  };
  const handleEnter = () => setShow2(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPicture([...productPicture, e.target.files[0]]);
  };
  console.log(productPicture);

  return (
    <>
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Products</h3>
                <button onClick={handleEnter}>Add</button>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal show={show2} onHide={handleOut}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Products</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              label="Name"
              placeholder={'Product Name'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="quantity"
              placeholder={'Quantity'}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Input
              label="Description"
              placeholder={'description'}
              value={description}
              onChange={(e) => setDiscription(e.target.value)}
            />
            {/* <Input
              label="category"
              placeholder={'category'}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            /> */}
            <Input
              label="price"
              placeholder={'price'}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            {/* <Input
              label="productPicture"
              placeholder={'productPicture'}
              value={productPicture}
              onChange={(e) => setProductPicture(e.target.value)}
            /> */}
            <select
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option>Select Category</option>
              {createCategoryList(category.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            {productPicture.length > 0
              ? productPicture.map((pic, index) => (
                  <div key={index}>{pic.name}</div>
                ))
              : null}
            <input
              type="file"
              name="productPicture"
              onChange={handleProductPictures}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleOut}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    </>
  );
};

export default Product;
