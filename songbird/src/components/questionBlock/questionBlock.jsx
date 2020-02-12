import React, { Component, Fragment } from 'react';
import Header from '../header/header';
import AudioPlayer from 'react-h5-audio-player';
import bird from './images/bird-guess.jpg';
import questions from '../../data/quiz.json';
import isEmpty from '../../utils/isEmpty.js';
import M from 'materialize-css';
import correctNotification from '../../assets/audio/correct-answer.mp3';;
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';
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
      answer: '',
      numberOfQuestions: 0,
      numberOfAnsweredQuetions: 0,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      hints: 5,
      fiftyFifty: 2,
      usedFiftyFifty: false,
      nextButtonDisabled: false,
      previousButtonDisabled: true,
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
        numberOfQuestions: questions.length,
        answer,
      });
    }
  };

  handleOptionClick = e => {
       console.log(this.state.answer);
if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
    setTimeout(() => {
        document.getElementById('correct-sound').play();
    });
    this.correctAnswer();
} else {
    setTimeout(() => {
        document.getElementById('wrong-sound').play();
    });
    
    this.wrongAnswer();
}
  };

  handleNextButtonClick = () => {
      this.playButtonSound();
      if (this.state.nextQuestion !== undefined) {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex
            
        }), () => {
          document.querySelector('.question__answer').innerHTML = '*******';
          document.querySelector('.question__img').src = bird;
            this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
      }
  };

  handlePreviousButtonClick = () => {
    this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
      this.setState(prevState => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1
      }), () => {
          this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
      });
    }
};

  handleButtonClick = (e) => {
      switch (e.target.id) {
        case 'next-button': 
            this.handleNextButtonClick();
            break;
        case 'previous-button': 
            this.handlePreviousButtonClick();
            break;
        default:
              break;

      }
  };

  playButtonSound = () => {
    document.getElementById('button-sound').play();
  };

  stopButtonSound = () => {
    document.getElementById('button-sound').stop();
  };
  // add styles for M, working but white

  correctAnswer = () => {
      M.toast({
          html: 'Correct answer',
          classes: 'alert alert-dismissible alert-success toast__modal',
          displayLength: 1000,
      });
      this.setState(prevState => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuetions: prevState.numberOfAnsweredQuetions +1
      }), () => {
        if (this.state.nextQuestion === undefined) {
            document.querySelector('.question__answer').innerHTML = this.state.currentQuestion.answer;
            document.querySelector('.question__img').src = this.state.currentQuestion.image;
            this.endGame();
        } else {
            const { group } =  this.state.nextQuestion;
            console.log(this.state.currentQuestion.answer);
            document.querySelectorAll('.header__menu').forEach(item => {
              item.classList.remove("disabled");
              if (item.innerHTML === group) {
                 
                 item.classList.add("disabled");
              }
            });
            document.querySelector('.question__answer').innerHTML = this.state.currentQuestion.answer;
            document.querySelector('.question__img').src = this.state.currentQuestion.image;
            //this.stopButtonSound();
             //this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        }
        
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
      currentQuestionIndex: prevState.currentQuestionIndex,
      numberOfAnsweredQuetions: prevState.numberOfAnsweredQuetions + 1
    }), 
    () => {
        if (this.state.nextQuestion === undefined) {
            this.endGame();
        } 
        // else {
        //     this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        // }
        
      }
      );
}

endGame = () => {
    const { state } = this;
    const playerStats = {
        score: state.score,
        numberOfQuestions: state.numberOfQuestions,
        numberOfAnsweredQuetions: state.numberOfAnsweredQuetions,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers
    };
    console.log(playerStats);
    setTimeout(() => {
    this.props.history.push('/summary', playerStats);
    }, 1000);
};

  render() {
    const { currentQuestion, correctAnswers, numberOfQuestions, answer, wrongAnswers } = this.state;
    const {optionX} = currentQuestion;
    let optionXx;
    let birdProfile;
    let props = {
      correct: correctAnswers,
      wrong: wrongAnswers
      };
    if(optionX !== undefined) {
      
      optionX.map((item) => {
        optionXx = (
       <>
        <button onClick={this.handleOptionClick} className="option">
        {item.name}
      </button>
       </>
        );
        birdProfile = (
          <>
          <p>{item.name}</p>
          </>
        );
      })
     
    }
    
    return (
      <>
        <Header {...props} />
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
            <audio id="button-sound" src={buttonSound}></audio>
            <div className = "question__audio">
            {/* <p>{currentQuestion.question}</p> */}
            <p className = "question__answer">*******</p>
            <AudioPlayer
              autoPlay={false}
              src={currentQuestion.audio}
              onPlay={e => console.log('onPlay')}
            />
            </div>
          </div>
          <div className="main__container">
            <div className="options__container card text-white bg-info mb-3">
              <div className="card-header">
                <p>Выберите ответ</p>
                <div className="card__lifeline">
                  <p>
        <span>{correctAnswers + 1 }of {numberOfQuestions}</span>
                  </p>
                </div>
              </div>
              {optionXx}
              {/* <button onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionA}
              </button> */}
              <button onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionB}
              </button>
              <button onClick={this.handleOptionClick} className="option">
                {currentQuestion.optionC}
              </button>
              <button onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionD}
              </button>
              <button onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionE}
              </button>
              <button onClick={this.handleOptionClick} className="option">
              {currentQuestion.optionF}
              </button>
            </div>
            <div className="description__container card border-info mb-3">
              <div className="card-header">Послушайте плеер.</div>
              Выберите птицу из списка
              {birdProfile}
            </div>
          </div>
          <div className="button__container">
            <button id="previous-button" className="btn btn-secondary button__container-previous" onClick={this.handleButtonClick}>Previous</button>
            <button id="next-button" className="btn btn-success button__container-next" onClick={this.handleButtonClick}>Next</button>
          </div>
        </div>
      </>
    );
  }
}

export default QuestionBlock;

//вывод описания птиц 2ч до 15.00
//своя БД 1ч до 16.00
//звездочки вместо названия 1ч до 17.00
//кнопки доработать 1ч до 18.00
//верстка 100vh 1ч до 19.00
//адаптивная верстка 1ч до 20.00
//баги и eslint 2ч до 22.00
//netlify 1ч до 23.00
//Создание и использование собственного файла с данными: (+20)
//остановить проигрывание после правильного ответа??
