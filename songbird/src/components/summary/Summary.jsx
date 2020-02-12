import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header';
class Summary extends Component {
    constructor (props) {
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuetions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
        }
    }

    componentDidMount () {
        const { state } = this.props.location;
        if (state !== undefined) {
            this.setState({
                score: state.correctAnswers*5 - state.wrongAnswers,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuetions: state.numberOfQuestions - (state.correctAnswers + state.wrongAnswers),
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
            });
        }
        
    }

    render() {
        const { state, score } = this.props.location;
        let stats;
        console.log(state);
        if (state !== undefined) {
            stats = (
               <>
                <div className ="container">
                <h2 className="summary__success">Поздравляем!</h2>
                <div className = "jumbotron">
            <h4 className=" summary__desc">Вы набрали: {this.state.score} из 30</h4> 
            <span className="stat left">Всего вопросов</span>
            <span className="right">{this.state.numberOfQuestions}</span><br />
            <span className="stat left">Количество правильных ответов</span>
            <span className="right">{this.state.correctAnswers}</span><br />
            <span className="stat left">Количество неправильных ответов</span>
            <span className="right">{this.state.wrongAnswers}</span><br />
                </div>
                <section>
                    <button type="button" className="btn btn-primary btn-lg btn-block"><Link to ="/">Играть еще раз</Link></button>
                </section>
                </div>
               </> 
               
            
                );
        } else {
            stats = (
            <>
            <section>
                <h1 className = "no-stats">No Stats available. Take a quiz</h1>
                    <button><Link to ="/">Играть</Link></button>
            </section>
            </>
            );
        }
        return (
            <>
            <Header />
            {stats}
            </>
        );
    }
}

export default Summary;