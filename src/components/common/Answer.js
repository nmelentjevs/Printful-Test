import React from 'react';

import Card from 'react-bootstrap/Card';

function Answer(props) {
  return (
    <Card onClick={() => props.submit()}>
      <Card.Body style={{ alignContent: 'cemter', cursor: 'pointer' }}>
        {props.answer}
      </Card.Body>
    </Card>
  );
}

export default Answer;
