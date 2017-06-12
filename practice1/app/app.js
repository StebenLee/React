class HelloMessage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<div> Hello {this.props.name} </div>
		)
	}
}

HelloMessage.propTypes = {
	name: React.PropTypes.string,
}

HelloMessage.defaultProps = {
	name: 'Zuck',
}

ReactDOM.render(<HelloMessage name="Mark" />, document.getElementById('app'));

