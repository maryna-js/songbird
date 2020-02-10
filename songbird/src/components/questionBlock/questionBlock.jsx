import React, { Component, Fragment } from 'react';
import bird from './images/bird-guess.jpg';
import AudioPlayer from "react-h5-audio-player";
import questions from '../../data/quiz.json';
import isEmpty from '../../utils/isEmpty.js';

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
            usedFiftyFifty: false
        };
    }

    // increaseCount = () => {
    //     this.setState({
    //         counter: 5
    //     });
    // }

    componentDidMount () {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
    }

    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
        if (!isEmpty(this.state.questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestionIndex.answer;
            this.setState({
                currentQuestion,
            nextQuestion,
            previousQuestion,
            answer,

            });
        }
    };

  render () {
      const { currentQuestion } = this.state;
      console.log(this.state);
      return (
        <>
        <div className = "question__container">
        <div className = "question jumbotron">
        <img src={bird} alt="Quess the bird" className = "question__img" />
        {/* <p>Counter: {this.state.counter}</p>
            <button onClick = {this.increaseCount}>Click me</button> */}
            {/* <div className = "player">
                
            <p>test</p>
            </div> */}
            
            {/* <p>{currentQuestion.audio}</p> */}
            <AudioPlayer
    autoPlay = {false}
    
    src={currentQuestion.audio}
    onPlay={e => console.log("onPlay")}
    // other props here
  />
           
        </div>
        <div className = "main__container">
        <div className = "options__container card text-white bg-info mb-3">
            <div class="card-header">
              <p>Выберите ответ</p>
              <div className = "card__lifeline">
                  <p>
                      <span>2 of 15</span>
                  </p>
              </div>
            </div>
            <p className = "option">Кукушка</p>
            <p className = "option">Кукушка</p>
            <p className = "option">Кукушка</p>
            <p className = "option">Кукушка</p>
            <p className = "option">Кукушка</p>
            <p className = "option">Кукушка</p>


        </div>
        <div className = "description__container card border-info mb-3">
        <div class="card-header">Послушайте плеер.</div>
            Выберите птицу из списка
        </div>
        </div>
        <div className = "button__container">
            <button className = "btn btn-secondary">Previous</button>
            <button className = "btn btn-success">Next</button>
            <button className = "btn btn-danger">Quit</button>
        </div>
        </div>
        </>
      );
  }
} 

export default QuestionBlock;