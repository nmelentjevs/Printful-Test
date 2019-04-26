import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function InputForm() {
  return (
    <Form>
      <Form.Group controlId="formBasicName">
        <Form.Label>Please enter your name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter name"
          style={{ display: 'block' }}
        />
        <Form.Text className="text-muted" />
      </Form.Group>
      <br />
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Choose Test</Form.Label>
        <Form.Control as="select">
          <option>Choose Test</option>
          <option>2</option>
          <option>3</option>
          {/* FROM API GET QUESTION OPTIONS */}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Let's Go!
      </Button>
    </Form>
  );
}

export default InputForm;
