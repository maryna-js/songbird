import React, { Component } from 'react';

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
        this.setState({
            score: (state.score / state.numberOfQuestions) *100,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuetions: state.numberOfAnsweredQuetions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers,
        });
    }

    render() {
        const { state, score } = this.props.location;
        let stats;
        if (state !== undefined) {
            stats = (
            <h2>Congratulations!</h2>
                );
        } else {
            stats = (<h1>No Stats available. Take a quiz</h1>);
        }
        return (
            <>
            {stats}
            </>
        );
    }
}

export default Summary;