import React, { Component } from 'react';

// Bootstrap Elements
import Button from 'react-bootstrap/Button';

// Share Buttons
import {
  FacebookShareButton,
  GooglePlusShareButton,
  RedditShareButton,
  TwitterShareButton
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  RedditIcon,
  GooglePlusIcon
} from 'react-share';

// Calls to API
import axios from 'axios';

class EndingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: '',
      loadingResult: true
    };
  }

  // Check answers on mount
  componentDidMount() {
    const { answers, quizId } = this.props;
    this.setState({ ...this.state, loadingResult: true });
    let answerString = '';
    answers.map(answer => {
      return (answerString += `&answers[]=${answer}`);
    });
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
      <div className="final-page">
        <h1 className="display-4">Thank You</h1>
        {!loadingResult ? (
          <div className="result">
            {' '}
            <h4 className="display-5">
              Your result: {results.correct}/{results.total}{' '}
            </h4>{' '}
            <a href="http://localhost:3000/">
              <Button>Try Again?:(</Button>
            </a>
            <div className="share-buttons">
              <p className="share-text" style={{ fontSize: '1.2rem' }}>
                Share your result:
              </p>
              <div className="share-button">
                {' '}
                <FacebookShareButton url="https://www.facebook.com/me">
                  <FacebookIcon size={35} round={true} />
                </FacebookShareButton>
              </div>
              <div className="share-button">
                {' '}
                <TwitterShareButton url="https://www.facebook.com/me">
                  <TwitterIcon size={35} round={true} />
                </TwitterShareButton>
              </div>
              <div className="share-button">
                {' '}
                <GooglePlusShareButton url="https://www.facebook.com/me">
                  <GooglePlusIcon size={35} round={true} />
                </GooglePlusShareButton>
              </div>
              <div className="share-button">
                {' '}
                <RedditShareButton url="https://www.facebook.com/me">
                  <RedditIcon size={35} round={true} />
                </RedditShareButton>
              </div>
            </div>
          </div>
        ) : (
          'Calculating results..'
        )}
      </div>
    );
  }
}

export default EndingPage;
