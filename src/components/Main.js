import React, { Component } from 'react';

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Questions from './Questions';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      test: '1',
      page: 1,
      questions: [],
      quizLoading: false
    };
  }

  nextPage = e => {
    e.preventDefault();
    this.setState({ ...this.state, page: this.state.page + 1 });
  };

  changePage = direction => {
    this.setState({ ...this.state, page: this.state.page + direction });
  };

  componentDidMount() {
    this.setState({ ...this.state, quizLoading: true });
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://printful.com/test-quiz.php?action=quizzes'
      )
      .then(res => {
        // console.log(res.data);
        this.setState({
          ...this.state,
          questions: res.data,
          test: res.data[0].title,
          quizLoading: false
        });
      })
      .catch(err => console.log(err));
  }

  getQuiz = () => {
    const { test, questions } = this.state;
    return this.state.quizLoading ? (
      <div>
        <Spinner animation="grow" />
        <Spinner animation="grow" />
        <Spinner animation="grow" />
      </div>
    ) : (
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Choose Test</Form.Label>
        <Form.Control
          as="select"
          onChange={e => this.setState({ ...this.state, test: e.target.value })}
          placeholder="Please choose the test"
          value={test}
          required
        >
          {questions.map(question => {
            return <option key={question.id}>{question.title}</option>;
          })}

          {/* FROM API GET QUESTION OPTIONS */}
        </Form.Control>
      </Form.Group>
    );
  };

  render() {
    let content;
    const { page, test, questions, name, quizLoading } = this.state;
    // console.log(this.state);
    if (page === 1) {
      content = (
        <div className="content-box">
          <h1 className="display-4 questionaire-title">Amazing Questionaire</h1>
          <Form onSubmit={e => this.nextPage(e)}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Please enter your name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                style={{ display: 'block' }}
                onChange={e =>
                  this.setState({ ...this.state, name: e.target.value })
                }
                required
              />
              <Form.Text className="text-muted" />
            </Form.Group>
            {this.getQuiz()}
            {!quizLoading ? (
              <Button variant="primary" type="submit" style={{ width: '100%' }}>
                Let's Go!
              </Button>
            ) : null}
          </Form>
        </div>
      );
    } else if (page === 2) {
      content = (
        <div className="content-box" style={{ margin: '0 25%' }}>
          <Questions
            changePage={this.changePage}
            quizId={questions.filter(question => {
              return question.title === test;
            })}
            name={name}
          />
        </div>
      );
    }
    return content;
  }
}

export default Main;
