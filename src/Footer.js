import React, { Component } from 'react'
class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<div className="hint">
				<h3>{this.props.hints[this.props.gameState]}!!!</h3>
				</div>
			</div>
			)
	}
}

Footer.defaultProps = {
	hints: {
		ready: "Get Ready",
		memorize: "Memorize",
		recall: "Recall"
	}
}

export default Footer