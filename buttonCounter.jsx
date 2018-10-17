class Button extends React.Component {
	handleFunction = () => {
  	this.props.onClickFuntion(this.props.incrementValue);
  };

  render() {
  	return(
    	<button onClick={this.handleFunction}>
				{this.props.incrementValue}
    	</button>
    );
  }
}

const Result = (props) => {
	return(
  	<div>
  	  { props.currentValue }
  	</div>
  );
};

class App extends React.Component {
	state = { counter: 0 };
  
  incrementCounter = (incrementValue) => {
  	this.setState((prevState) => {
    	return { counter: prevState.counter + incrementValue };
    });
  };

	render () {  
  	return(
    	<div>
      	<Button incrementValue={1} onClickFuntion={this.incrementCounter}/>
        <Button incrementValue={5} onClickFuntion={this.incrementCounter}/>
        <Button incrementValue={10} onClickFuntion={this.incrementCounter}/>
        <Button incrementValue={15} onClickFuntion={this.incrementCounter}/>
        <Result currentValue={this.state.counter}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, mountNode);

