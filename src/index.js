import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
    {props.value}
    </button>
  );
}


/*class Square extends React.Component {
  constructor(props){
      super(props);
      this.state={
          value:null,
      };                                                     //initializing state to store the current value of square in this.state
  }
  render() {
    return (
      <button
        className="square"
        onClick={()=>this.props.onClick()}
      >
      {this.props.value}
      </button>
      //<button className="square" onClick={()=> { alert('click'); }}>    //to display an alert that that button is clicked 
      // {this.props.value }                                             //to show 'value' 
      //</button> 
      //<button 
      //className="square" 
      //onClick={()=> this.setState({value:'X'})}>   
      //{this.state.value }                                                     
      //</button>
      //By calling this.setState from an onClick handler in the Square’s render method,
      // we tell React to re-render that Square whenever its <button> is clicked. 
      //After the update, the Square’s this.state.value will be 'X', so we’ll see the X on the game board. 
      //If you click on any Square, an X should show up.
    );    
  }
}
      
  */    
      
      
class Board extends React.Component {
  /*constructor(props){
    super(props);
    this.state={
      squares:Array(9).fill(null),
      xIsNext:true,                                          //Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved
    };                                                      //set the Board’s initial state to contain an array of 9 nulls corresponding to the 9 squares
  }*/
  /*handleClick(i){
    const squares=this.state.squares.slice();             //we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
    if(calculateWinner(squares) || squares[i]){
      return;                            //to return early by ignoring a click if someone has won the game or if a Square is already filled
    }
    squares[i]=this.state.xIsNext?'X':'O';                //to flip the value of xIsNext
    this.setState({
      squares:squares,
      xIsNext:!this.state.xIsNext,
    });
  }*/
  renderSquare(i){
    return(
      <Square 
         //value={this.state.squares[i]}                  
         //onClick={()=>this.handleClick(i)}     
         value={this.props.squares[i]}                  
         onClick={()=>this.props.onClick(i)}             
      />
    );                         
  }
//'value' is a prop
 //onClick is used to maintain which squares are filled.
  render() {
   /* const winner=calculateWinner(this.state.squares);
    let status;
    if(winner){
      status='Winner: '+ winner;
    } else{
    status = 'Next player: '+ (this.state.xIsNext?'X':'O');
    }*/
    return (
      <div>
        
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}




class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber:0,
      xIsNext: true,
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber:history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } 
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    }
    return (
      <div className="game">
        <div className="start_game"></div>
        <div className="game-board">
          <Board
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
           />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
