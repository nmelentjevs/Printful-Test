import React from 'react';

import InputForm from './InputForm';

import Container from 'react-bootstrap/Container';

function Home() {
  return (
    <Container className="home-main">
      <h1 className="display-4">Technical Task</h1>
      <InputForm />
    </Container>
  );
}

export default Home;
