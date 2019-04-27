import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import axios from 'axios';

class EndingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: '',
      loadingResult: true
    };
  }
  componentDidMount() {
    const { answers, quizId } = this.props;
    this.setState({ ...this.state, loadingResult: true });
    let answerString = '';
    answers.map(answer => {
      return (answerString += `&answers[]=${answer}`);
    });
    console.log(answerString);
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://printful.com/test-quiz.php?action=submit&quizId=${quizId}${answerString}`
      )
      .then(res => {
        this.setState({ results: res.data, loadingResult: false });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { results, loadingResult } = this.state;
    return (
      <div style={{ textAlign: 'right' }}>
        <h1 className="display-4">Thank You</h1>
        {!loadingResult ? (
          <div className="result">
            {' '}
            <h4>
              Your result: {results.correct}/{results.total}{' '}
            </h4>{' '}
            <a href="http://localhost:3000/">
              <Button>Try Again?:(</Button>
            </a>
          </div>
        ) : (
          'Calculating results..'
        )}
      </div>
    );
  }
}

export default EndingPage;
