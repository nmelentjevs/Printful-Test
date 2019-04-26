import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import axios from 'axios';

class EndingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: ''
    };
  }
  componentDidMount() {
    const { answers, quizId } = this.props;
    this.setState({ ...this.state, quizLoading: true });
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
        this.setState({ results: res.data });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { correct, total } = this.state.results;
    return (
      <div>
        <h1 className="display-4">Finished. Thank You</h1>
        <h4>
          Your result: {correct}/{total}{' '}
        </h4>
        <Button onClick={() => this.props.history.push()}>Try Again?:(</Button>
      </div>
    );
  }
}

export default withRouter(EndingPage);
