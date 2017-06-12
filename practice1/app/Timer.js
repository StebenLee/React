/*
const HelloMessage = (props) => (
	<div>Hello {props.name}</div>
);

HelloMessage.propTypes = {
	name: React.PropTypes.string,
}

HelloMessage.defaultProps = {
	name: 'Zuck';
}

ReactDOM.render(<HelloMessage name="Mark" />, document.getElementById('app'));
*/

/* Timer
class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.tick = this.tick.bing(this);
		this.state = {
				secondsElapsed: 0,
		}
	}
	tick() {
		this.setState({secondsElapsed: this.state.secondsElapsed + 1});
	}
	componentDidMount() {
		this.interval = setInterval(this.tick, 1000);
	}
	componentWillUnmount() {
			clearInterval(this.interval);
	}
	render() {
		return (
		  <div> Seconds Elapsed: {this.state.secondsElapsed}</div>
		);
	}
}

ReactDOM.render(<Timer />, document.getElementById('app'));
*/