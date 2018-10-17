const Stars = (props) => {
	let starsNumber = Math.floor(Math.random()*9);
  let stars = [];
  for(let i = 0; i < starsNumber; i++) {
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
    	<button>=</button>
    </div>
  );
}

const Answer = (props) => {
	return(
  	<div className="col-5">
  	  <span>5</span>
      <span>6</span>
  	</div>
  );
}

const Numbers = (props) => {
	return(
  	<div className="card text-center col-12">
    	<div>
    	  {Numbers.list.map((number) => 
        	<span>{number}</span>
        )}
    	</div>
    </div>
  );
}
Numbers.list = _.range(1, 10);

class Game extends React.Component {
	render() {
  	return(
    	<div className="col-12">
        <h3>Play nine</h3>
      </div>
    );
  }
}

class App extends React.Component {
	render() {
  	return(
    	<div className="row">
      	<Game/>
        <Stars/>
        <Button/>
        <Answer/>
        <Numbers/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, mountNode);

