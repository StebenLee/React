function UserGreeting(props) {
  return <h1>Welcome </h1>
}

function GuestGreeting(props) {
  return <h1>Please sign up</h1>
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if(props.isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login  
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
    );
}

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Threre are your messages:</h1>
        {unreadMessages.length > 0 && 
          <h2>You have {unreadMessages.length} Messages</h2>
        }
      </div>
    );
  }

function Addbutton(props) {
  return (
  <button onClick={props.add} >
   Add Message
  </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.addMessages = this.addMessages.bind(this);
    this.state = {
      isLoggedIn: false,
      messages:[]
    };
  }
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  addMessages() {
    let arr = this.state.messages;
    arr.push('1');
    this.setState({messages: arr});
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const messages = this.state.messages;
    
    let button = null;
    if(isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        The user is <b>{isLoggedIn ? (<LogoutButton onClick={this.handleLogoutClick}/>)
        :(<LoginButton onClick={this.handleLoginClick}/>)}</b>
      <Greeting isLoggedIn={isLoggedIn}/>
      {button}
      <Mailbox unreadMessages={messages} />
      <Addbutton add={this.addMessages}/>
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl/>,
  document.getElementById('root')
);
