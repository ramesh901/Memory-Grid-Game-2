import React, { Component } from 'react'
class Cell extends Component {
	active() {
		//console.log("hilo",this.props.activeCells.indexOf(this.props.id))
  		return this.props.activeCells.indexOf(this.props.id) >= 0;
	}
	handleClick = () => {
		if (this.guessState() === undefined &&
			this.props.gameState === "recall") {
			this.props.recordGuess({
				cellId: this.props.id,
				GuessIsRight: this.active()
			})
		}
	}
	guessState() {
		if (this.props.correctGuesses.indexOf(this.props.id) >= 0) {
			return true;
		} else if (this.props.wrongGuesses.indexOf(this.props.id) >= 0) {
			return false;
		}
	}

	render() {
		let className = "cell"
		if(this.props.gameState === "memorize" 
			&& this.active()
			) 
			{ className += " active" }
		className += " guess-" + this.guessState();
  	
    return (
      <div className={className} onClick={this.handleClick}></div>
    )
  }
}

export default Cell
