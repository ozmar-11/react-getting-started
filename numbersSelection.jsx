const Stars = (props) => {
  let stars = [];
  for(let i = 0; i < props.starsNumber; i++) {
  	stars.push(<li className="fa fa-star"></li>);
  }
  
	return(
  	<div className="col-5">
    	{ stars }
    </div>
  );
}

const Button = (props) => {
	return(
  	<div className="col-2">
    	<button className="btn" disabled={props.selectedNumbers.length === 0}>=</button>
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
  };

	return(
  	<div className="card text-center col-12">
    	<div>
    	  {Numbers.list.map((number) =>
        	<span className={numberClassName(number)} onClick={() => props.selectNumber(number)}>
          	{number}
          </span>
        )}
    	</div>
    </div>
  );
}
Numbers.list = _.range(1, 10);

class Game extends React.Component {
	state = {
  	starsNumber: 1 + Math.floor(Math.random()*9),
  	selectedNumbers: []
  };
  
  selectNumber = (selectedNumber) => {
  	let newState = this.state;
    if(this.state.selectedNumbers.indexOf(selectedNumber) >= 0)
    	return;

  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.concat(selectedNumber)
    }));
  }
  
  unselectNumber = (unselectedNumber) => {
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.filter(number => number !== unselectedNumber)
    }));
  }

	render() {
  	return(
    	<div className="container">
        <h3>Play nine</h3>
      	<div className="row">
          <Stars starsNumber={this.state.starsNumber}/>
          <Button selectedNumbers={this.state.selectedNumbers}/>
          <Answer selectedNumbers={this.state.selectedNumbers} unselectNumber={this.unselectNumber}/>
          <Numbers selectedNumbers={this.state.selectedNumbers} 
          				 selectNumber={this.selectNumber}
                   availableNumbers={this.state.availableNumbers}/>
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

