import React, { Component } from 'react'
class Footer extends Component {
	remainingCount(){
			if (this.props.gameState !== "recall") { return null; }
			return (
				<div>
				<h3>Remaining Wrong Guess Allowed:{this.props.maxWrongGuess}</h3>
				</div>
				)
		}
	render() {
		
		return (
			<div className="footer">
				<div className="hint">
				{//<h3>{this.props.gameState}</h3>
			}
				<h3>{this.props.hints[this.props.gameState]}!!!</h3>
				</div>
				<div>{this.remainingCount()}</div>
			</div>
			)
	}
}

Footer.defaultProps = {
	hints: {
		ready: "Get Ready",
		memorize: "Memorize",
		recall: "Recall",
		won: "Well Played",
		lost: "Game Over"
	}
}

export default Footer