import React, { Component } from 'react'
class Cell extends Component {
  active() {
    return this.props.activeCells.indexOf(this.props.id) >= 0
  }
  handleClick = () => {
    if (this.guessState() === undefined &&
      this.props.gameState === "recall") {
      this.props.recordGuess({
        /*we use Arrow function for handleClick and not for guess State
        because we assign using this.props.id and this.active*/
        cellId: this.props.id,
        GuessIsRight: this.active()
      })
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
      && this.active()
      ) 
      { className += " active" }
    className += " guess-" + this.guessState()
  
  return (
    <div className={className} onClick={this.handleClick}></div>
  )
  }
}

export default Cell
