import React, { Component, Fragment } from 'react';
import bird from './images/bird-guess.jpg';
import AudioPlayer from "react-h5-audio-player";

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
        // this.state = {
        //     counter: 0
        // };
    }

    // increaseCount = () => {
    //     this.setState({
    //         counter: 5
    //     });
    // }

  render () {
      return (
        <>
        <div>
        <div className = "question jumbotron">
        <img src={bird} alt="Quess the bird" className = "question__img" />
        {/* <p>Counter: {this.state.counter}</p>
            <button onClick = {this.increaseCount}>Click me</button> */}
            {/* <div className = "player">
                
            <p>test</p>
            </div> */}
            <AudioPlayer
    autoPlay = {false}
    showVolumeControl={false}
    src="https://www.xeno-canto.org/sounds/uploaded/XIQVMQVUPP/XC518684-Grands%20corbeaux%2009012020%20Suzon.mp3"
    onPlay={e => console.log("onPlay")}
    // other props here
  />
           
        </div>
        </div>
        </>
      );
  }
} 

export default QuestionBlock;