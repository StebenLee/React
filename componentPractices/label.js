class NameForm extends React.Component {
constructor(props) {
  super(props);
  this.state={value: ''};
  
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}  
  
handleChange(event) {
  this.setState({value:event.target.value.toUpperCase()});
}
handleSubmit(event) {
  alert('A name was submitted'+ this.state.value);
  event.preventDefault();
}
  
  
render() {
  return ( 
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
      </label>
        <input type="submit" value="Submit" />
    </form>
  );
  
}
}
ReactDOM.render(
<NameForm />,
document.getElementById('root')
);
//Controlled component (onChanged, onSubmit)
//controlled componenet onChange practice, it will target the input value.
//In React, textarea uses a value attribute instead.
//<textarea value={this.state.value} onChange={this.handleChange} />
/*          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>*/
//selet Tag use a value attribute to show selected tag
//<textarea> and <select>, they accept attribute that you can use to implement a controlled component.
//Computed property name [] , it represnet that can update the state key corresponding to the given input name in a object 

//Uncontrolled Components is a alternative