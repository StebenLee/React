import React from 'react';
import { Link } from 'react-router';
import RaiseButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

const HomePage = ({
  userId,
  onSubmitUserId,
  onChangeUserId,
}) => (
  <div>
    <TextField 
      hintText="Please Key in your github user Id."
      onChange= {onChangeUserId}
    />
    <Link to= {{
      pathname: '/result',
      query: { userId },
    }}
    >
  	  <RaiseButton label="Submit" onClick={onSubmitUserId(userId)} primary />
    </Link>
  </div>
);

HomePage.propTypes = {
	onSubmitUserId: React.PropTypes.func,
	onChangeUserId: React.PropTypes.func,
	userId: React.PropTypes.string,
};

export default HomePage;