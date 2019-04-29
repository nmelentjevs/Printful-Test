import React, { Component } from 'react';

// Calls to API
import axios from 'axios';

// Bootstrap Elements
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';

// Components
import EndingPage from './EndingPage';
import Answer from './common/Answer';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 1,
      questions: [],
      answers: [],
      questionsLoading: true,
      page: 'quiz',
      submittedAnswers: []
    };
  }

  // Get questions and answers on component mount
  componentDidMount() {
    this.setState({ questionsLoading: true });
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://printful.com/test-quiz.php?action=questions&quizId=${
          this.props.quizId[0].id
        }`
      )
      .then(res => {
        this.setState({
          questions: res.data
        });
        res.data.map(question => {
          return axios
            .get(
              `https://cors-anywhere.herokuapp.com/https://printful.com/test-quiz.php?action=answers&quizId=${
                this.props.quizId[0].id
              }&questionId=${question.id}`
            )
            .then(res => {
              console.log(res.data);
              this.setState({
                answers: [...this.state.answers, res.data],
                questionsLoading: false
              });
            });
        });
      })
      .then()
      .catch(err => console.log(err));
  }

  // Submit answer with its id to array of answer Ids
  submitAnswer = id => {
    const { questionNumber, questions, submittedAnswers } = this.state;
    questionNumber === questions.length
      ? this.setState({
          page: 'end',
          submittedAnswers: [...submittedAnswers, id]
        })
      : this.setState({
          submittedAnswers: [...submittedAnswers, id],
          questionNumber: questionNumber + 1
        });
    console.log(submittedAnswers);
    console.log(questionNumber);
  };

  // Handle page change
  handleClick = direction => {
    const { questionNumber, questions, submittedAnswers } = this.state;
    if (direction === 'back') {
      if (questionNumber > 1) {
        this.setState({ questionNumber: questionNumber - 1 });
      }
    } else {
      questionNumber === questions.length
        ? this.setState({ ...this.state, page: 'end' })
        : this.setState({
            ...this.state,
            submittedAnswers: [...submittedAnswers, 0],
            questionNumber: questionNumber + 1
          });
    }
    console.log(questionNumber);
  };

  render() {
    const {
      questionNumber,
      answers,
      questions,
      questionsLoading,
      page,
      submittedAnswers
    } = this.state;

    // Progress Bar
    const progressInstance = (
      <ProgressBar
        now={(100 / questions.length) * questionNumber}
        label={`${((100 / questions.length) * questionNumber).toFixed(0)}%`}
      />
    );
    let content;
    if (page === 'end') {
      content = (
        <EndingPage
          answers={submittedAnswers}
          quizId={this.props.quizId[0].id}
          className="content-box"
        />
      );
    } else if (page === 'quiz') {
      content = (
        <div
          className="question-page"
          style={{
            padding: '10px'
          }}
        >
          <h3>
            {this.props.quizId[0].title} Questionaire{' '}
            <span style={{ fontSize: '.9rem' }}>for </span>
            <span style={{ fontSize: '1.1rem' }}>{this.props.name}</span>
          </h3>
          <hr />

          {!questionsLoading ? (
            <div className="question-area">
              <div className="txt-center" style={{ width: '100%' }}>
                <h5 className="mx-auto" style={{ maxWidth: '300px' }}>
                  <div variant="primary" />
                  <p>
                    <span style={{ fontSize: '1rem' }}>
                      {`${questionNumber}/${questions.length}`}.{' '}
                    </span>
                    {questions[questionNumber - 1].title}
                  </p>
                </h5>
              </div>
              <div className="answers-grid">
                {answers[questionNumber - 1].map(answer => {
                  return (
                    <Answer
                      className="answer"
                      submit={() => this.submitAnswer(answer.id)}
                      key={answer.id}
                      answer={answer.title}
                    />
                  );
                })}
              </div>
              {progressInstance}
              <div
                className="buttons"
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-around',
                  marginTop: '10px'
                }}
              >
                <Button
                  variant="primary"
                  onClick={() => this.handleClick('back')}
                >
                  Previous Question
                </Button>
              </div>
            </div>
          ) : (
            <div className="txt-center">
              <span>
                Loading Questions <Spinner animation="border" size="sm" />
              </span>
            </div>
          )}
        </div>
      );
    }
    return content;
  }
}

export default Questions;
