var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const DoneFrame = (props) => {
	return(
  	<div>
  	  <h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={props.resetGame}>
      	Play again
      </button>
  	</div>
  );
}

const Stars = (props) => {
  let stars = [];
  for(let i = 0; i < props.starsNumber; i++) {
  	stars.push(<li className="fa fa-star" key={i}></li>);
  }
  
	return(
  	<div className="col-5">
    	{ stars }
    </div>
  );
}

const Button = (props) => {
	let button;
	switch(props.answerIsCorrect) {
  	case true:
    	props.acceptAnswer();
      button =
        <button className="btn btn-success">
          <i className="fa fa-check"></i>
        </button>        
    break;
    case false:
    	button=         
        <button className="btn btn-danger">
          <i className="fa fa-times"></i>
        </button>
    break;
    default:
    	button = 
        <button className="btn"
        				onClick={props.checkAnswer}
        				disabled={props.selectedNumbers.length === 0}>=</button>
    break;
  }

	return(
  	<div className="col-2 text-center">
    	{button}
      <br/>
      <button disabled={props.remainingRedraws < 1} className="btn btn-warning btn-sm" onClick={props.redraw}>
        <i className="fa fa-sync"></i>
        {props.remainingRedraws}
      </button>      
    </div>
  );
}

const Answer = (props) => {	
	return(
  	<div className="col-5">
    	{ props.selectedNumbers.map( (number, i) => <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span> ) }
  	</div>
  );
}

const Numbers = (props) => {
	const numberClassName = (number) => {
  	if(props.selectedNumbers.indexOf(number) >= 0)
    	return 'selected';
      
    if(props.usedNumbers.indexOf(number) >= 0)
    	return 'used';
  };

	return(
  	<div className="card text-center col-12">
    	<div>
    	  {Numbers.list.map((number, i) =>
        	<span key={i} className={numberClassName(number)} onClick={() => props.selectNumber(number)}>
          	{number}
          </span>
        )}
    	</div>
    </div>
  );
}
Numbers.list = _.range(1, 10);

class Game extends React.Component {
  static randomStarsNumber = () => 1 + Math.floor(Math.random()*9);
  static initialState = () => ({
                                starsNumber: Game.randomStarsNumber(),
                                selectedNumbers: [],
                                answerIsCorrect: null,
                                usedNumbers: [],
                                remainingRedraws: 5,
                                doneStatus: null
                              });
	state = Game.initialState();
  
  
  selectNumber = (selectedNumber) => {
  	let newState = this.state;
    if(this.state.selectedNumbers.indexOf(selectedNumber) >= 0 || 
    	 this.state.usedNumbers.indexOf(selectedNumber) >= 0)
    	return;

  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.concat(selectedNumber)
    }));
  }
  
  unselectNumber = (unselectedNumber) => {
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.filter(number => number !== unselectedNumber)
    }));
  }
  
  checkAnswer = () => {
  	this.setState(prevState=> ({ 
    	answerIsCorrect: prevState.starsNumber === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  }
  
  acceptAnswer = () => {
  	this.setState(prevState => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
    	answerIsCorrect: null,
      selectedNumbers: [],
      starsNumber: Game.randomStarsNumber()
    }), this.updateDoneStatus);
  }
  
  redraw = () => {
  	if(this.state.remainingRedraws === 0)
    	return;
  	this.setState(prevState => ({
    	starsNumber: Game.randomStarsNumber(),
      answerIsCorrect: null,
      selectedNumbers: [],
      remainingRedraws: --prevState.remainingRedraws
    }), this.updateDoneStatus);
  }

  updateDoneStatus = () => {
  	this.setState(prevState => {
    	if(prevState.usedNumbers.length === 9){
      	debugger;
      	return { doneStatus: 'You win! :)' };
      }
      	
      if(prevState.remainingRedraws === 0 && !this.possibleSolutions(prevState)) {
      	debugger;
      	return { doneStatus: 'You lose :/' };
      }
    });
  }
  
  possibleSolutions = ({starsNumber, usedNumbers}) => {
  	const possibleNumbers = _.range(1, 10).filter(number => {
    	usedNumbers.indexOf(number) >= 0
    });
    
    return possibleCombinationSum(possibleNumbers, starsNumber);
  }
  
  resetGame = () => {
  	this.setState(Game.initialState());
  }

	render() {
  	return(
    	<div className="container">
        <h3>Play nine</h3>
      	<div className="row">
          <Stars starsNumber={this.state.starsNumber}/>
          <Button selectedNumbers={this.state.selectedNumbers} 
          				checkAnswer={this.checkAnswer}
                  answerIsCorrect={this.state.answerIsCorrect}
                  acceptAnswer={this.acceptAnswer}
                  redraw={this.redraw}
                  remainingRedraws={this.state.remainingRedraws}/>
          <Answer selectedNumbers={this.state.selectedNumbers}
          				unselectNumber={this.unselectNumber}/>
          { this.state.doneStatus ? <DoneFrame doneStatus={this.state.doneStatus} 
          													 resetGame={this.resetGame}/> :
          <Numbers selectedNumbers={this.state.selectedNumbers} 
          				 selectNumber={this.selectNumber}
                   availableNumbers={this.state.availableNumbers}
                   usedNumbers={this.state.usedNumbers}/>
          }
      	</div>      
      </div>
    );
  }
}

class App extends React.Component {
	render() {
  	return(
    	<div>
      	<Game/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, mountNode);

