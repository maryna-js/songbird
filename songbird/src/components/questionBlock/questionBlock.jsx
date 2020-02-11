import React, { Component, Fragment } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import bird from './images/bird-guess.jpg';
import questions from '../../data/quiz.json';
import isEmpty from '../../utils/isEmpty.js';
import M from 'materialize-css';
import correctNotification from '../../assets/audio/correct-answer.mp3';;
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
// import load from '../../utils/load';

// const Player = () => (
//   <AudioPlayer
//     autoPlay
//     src="http://example.com/audio.mp3"
//     onPlay={e => console.log("onPlay")}
//     // other props here
//   />
// );

class QuestionBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions,
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: 'Журавль',
      numberOfQuestions: 0,
      numberOfAnsweredQuetions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
    };
    // this.loadData();
  }

  // increaseCount = () => {
  //     this.setState({
  //         counter: 5
  //     });
  // }
  // loadData() {
  //     load(this.props.data).then(users => {
  //         this.setState({
  //           data: JSON.parse(users)
  //         });
  //       });
  // }

  componentDidMount() {
    const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
    this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
  }

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    const { currentQuestionIndex } = this.state;

    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState({
        currentQuestion,
        nextQuestion,
        previousQuestion,
        answer,
      });
    }
  };

  handleOptionClick = e => {
       console.log(this.state.answer);
if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
    document.getElementById('correct-sound').play();
    this.correctAnswer();
} else {
    document.getElementById('wrong-sound').play();
    this.wrongAnswer();
}
  };
  // add styles for M, working but white

  correctAnswer = () => {
      M.toast({
          html: 'Correct answer',
          classes: 'alert alert-dismissible alert-success',
          displayLength: 1500,
      });
      this.setState(prevState => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuetions: prevState.numberOfAnsweredQuetions +1
      }), () => {
        this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      });
  }

  wrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
        html: 'Wrong answer',
        classes: 'alert alert-dismissible alert-danger',
        displayLength: 1500,
    });
    this.setState(prevState => ({
      wrongAnswers: prevState.wrongAnswers + 1,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      numberOfAnsweredQuetions: prevState.numberOfAnsweredQuetions + 1
    })
    // , () => {
    //     this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
    //   }
      );
}

  render() {
    const { currentQuestion } = this.state;
    return (
      <>
        <div className="question__container">
          <div className="question jumbotron">
            <img src={bird} alt="Quess the bird" className="question__img" />
            {/* <p>Counter: {this.state.counter}</p>
            <button onClick = {this.increaseCount}>Click me</button> */}
            {/* <div className = "player">
                
            <p>test</p>
            </div> */}
            <audio id="correct-sound" src={correctNotification}></audio>
            <audio id="wrong-sound" src={wrongNotification}></audio>
            <p>{currentQuestion.question}</p>
            <AudioPlayer
              autoPlay={false}
              src={currentQuestion.audio}
              onPlay={e => console.log('onPlay')}
            />
          </div>
          <div className="main__container">
            <div className="options__container card text-white bg-info mb-3">
              <div className="card-header">
                <p>Выберите ответ</p>
                <div className="card__lifeline">
                  <p>
                    <span>2 of 15</span>
                  </p>
                </div>
              </div>
              <button onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionA}
              </button>
              <button onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionB}
              </button>
              <button onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionC}
              </button>
              <button onClick={this.handleOptionClick} className="option">
                Кукушка
              </button>
              <button onClick={this.handleOptionClick} className="option">
                Кукушка
              </button>
              <button onClick={this.handleOptionClick} className="option">
                Кукушка
              </button>
            </div>
            <div className="description__container card border-info mb-3">
              <div className="card-header">Послушайте плеер.</div>
              Выберите птицу из списка
            </div>
          </div>
          <div className="button__container">
            <button className="btn btn-secondary">Previous</button>
            <button className="btn btn-success">Next</button>
            <button className="btn btn-danger">Quit</button>
          </div>
        </div>
      </>
    );
  }
}

export default QuestionBlock;
