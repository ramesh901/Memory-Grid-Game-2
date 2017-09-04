import React, { Component } from 'react'
class Cell extends Component {

  handleClick = () => {
    if (this.guessState() === undefined &&
      this.props.gameState === "recall") {
      this.props.recordGuess({
        /*we use Arrow function for handleClick and not for guess State
        because handleClick is eventhandler*/
        cellId: this.props.id,
        GuessIsRight: this.props.isActiveCell
      })
      this.clicked = "true"
    }
  }
  guessState() {
    if (this.props.correctGuesses.indexOf(this.props.id) >= 0) {
      return true
    } else if (this.props.wrongGuesses.indexOf(this.props.id) >= 0) {
      return false
    }
  }
  
  render() {
    let className = "cell"
    if(this.props.gameState === "memorize" 
      && this.props.isActiveCell === "true"
      ) 
      { className += " active" }
    if(this.clicked === "true"){
      className += " guess-" + this.props.isActiveCell
    }
      
  return (
    <div className={className} onClick={this.handleClick}></div>
  )
  }
}

export default Cell
