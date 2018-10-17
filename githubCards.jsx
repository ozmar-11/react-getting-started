const Card = (props) => {
	return(
  <div key={props.id}>
	  <img width="75" src={props.avatarUrl}/>
    <div style={{display: 'inline-block', marginLeft: 10}}>
      <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
      <div>{props.user}</div>
      <div>{props.company}</div>
    </div>
	</div>);
}

const CardList = (props) => {
	return(
  	<div>
    	{props.cards.map( card => <Card {...card}/> )}
    </div>
  );
}

class Form extends React.Component {
	state = { userName: '' };
	submitHandler = (event) => {
  	event.preventDefault();
 		axios.get(`https://api.github.com/users/${this.state.userName}`)
    .then(resp => {    
    	let respData = resp.data;
    	let data = { user: respData.login, avatarUrl: respData.avatar_url, name: respData.name, company: respData.company, id: respData.id };
    	this.props.onSubmit(data);
      this.setState({ userName: '' });
    });
  }

	render() {
  	return(
  	<form onSubmit={this.submitHandler}>
    	<input value={this.state.userName} 
      onChange={(event) => this.setState({ userName: event.target.value })}
      name="user" type="text" required/>
      <button type="submit">Search</button>
    </form>
  );
  }
}

class App extends React.Component {
	addNewCard = (card) => {
  	this.setState( prevState => ({ 
    cards: prevState.cards.concat(card)
    }));
  }

  state = {
  	cards: []
  };

	render() {
  	return(
    	<div>
    	  <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards}/>
    	</div>
    );
  }
}

ReactDOM.render(<App/>, mountNode);

