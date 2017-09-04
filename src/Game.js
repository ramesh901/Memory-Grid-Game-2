//import _ from 'lodash'
import Row from './Row'
import Cell from './Cell'
import Footer from './Footer'
import React, { Component } from 'react'

class Game extends Component {
	constructor(props) {
		super(props)
		/*In the previous version let used and in this version its removed
		for matrix because we moved matrix from render to constructor.
		If we want to access variable from constructor to render then we
		use 'this.<<variable name>> or this.state.<<variable name>>. 
		Since matrix value not changing we used this.<<variable name>>'
		 */
		this.matrix = []
		this.flatMatrix = []
		/* we are using this.props.rows and this.props.columns 
		because this value comes from the parent component App*/

		/*for matrix we use "this.matrix" but for row we didn't use 
		"this.row" the reason when we access "row" in "return" we pass
		it as argument of "matrix"*/


		for(let r = 0; r < this.props.rows; r++) {
			let row = []
			for(let c = 0;c < this.props.columns;c++) {
				row.push(`${r}${c}`)
			}
			this.flatMatrix.push(...row)
			//why we use "this" for matrix.push?
			this.matrix.push(row)
			//console.log("matrix is",this.matrix)
		}
		/*please note in flatMatrix "this" not used because
		its not required in render */

		//let flatMatrix = _.flatten(this.matrix)
		//console.log("flatMatrix is:",flatMatrix)
		/*using math.random we can pick single element. To select subset of 
		element we have to use sampleSize. */
		this.activeCells = this.sampleSize(this.flatMatrix,this.props.activeCellsCount)
		//this.activeCells = _.sampleSize(this.flatMatrix,this.props.activeCellsCount)
		this.maxWrongGuess = this.props.maxGuess
		//state changing variable are put in "this.state"
		this.state = { 
			gameState: "ready",
			wrongGuesses: [],
			correctGuesses: [],
			//maxGuess: this.props.maxGuess
		}
	}
	componentDidMount() {
		setTimeout(() => this.setState({ gameState: 'memorize'}),2000)
		setTimeout(() => this.setState({ gameState: 'recall'}),4000)
	}
	
	sampleSize(array, n) {
		const length = array == null ? 0 : array.length
		if (!length || n < 1) {
			return []
			}
			n = n > length ? length : n
			//console.log("n is",n)
			let index = -1
			//const lastIndex = n - 1
			const result = array.slice()
			while (++index < n) {
				const rand = index + Math.floor(Math.random() * (length - index ))
				//console.log("rand is",rand)
				const value = result[rand]
				result[rand] = result[index]
				result[index] = value
			}
			//console.log("result is",result.slice(0,n))
			return result.slice(0,n)
	}
    
    //we are passing the JSON objects as arguments, hence we used curly braces 
    //for cellId, GuessIsRight
	recordGuess = ({ cellId, GuessIsRight} ) => {
		//if you remove this "let" statement you will get error
		//all the variable should come as argument or created using "let"
		let { wrongGuesses,correctGuesses,gameState } = this.state
		if (GuessIsRight) {
			correctGuesses.push(cellId)
			if(correctGuesses.length === this.props.activeCellsCount)
				{ gameState = "won"}

		} else {
			wrongGuesses.push(cellId)
			
			this.maxWrongGuess = this.maxWrongGuess - 1
			if(this.maxWrongGuess === 0){
				gameState = "lost"
			}
			//console.log("recordGuess",maxGuess)
			

		}
		this.setState({ correctGuesses, wrongGuesses, gameState })
}
	render() {
		return (
			<div className="grid">
		{/*ri means row index, that is automatically comes as second arg */}
			{this.matrix.map((row, ri) => (
				/*in the UI we get multiple rows hence key is mandatory field
				for Row element. Similarly for Cell element*/
				<Row key={ri}>
				{/*cellID is having $r$c contents. Here we are embedding 
				cell component within row component*/}
				{row.map(cellId => <Cell key={cellId} id={cellId} 
					activeCells={this.activeCells}{...this.state} 
					//recordGuess is a function. Assigning function similar to variable
					recordGuess={this.recordGuess}/>)}
				</Row>
				))}
		{/*The three-dots spread operator will take this.state 
		and spread all of its keys as props for the Footer component.*/}
			<Footer {...this.state} maxWrongGuess={this.maxWrongGuess} />
			</div>
			
		)
}
}
export default Game