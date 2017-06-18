//axios used to do promises base request
import axios from 'axios';
//cookies token
export default function fetchComponentData(token = 'token') {
	const promises = [axios.get('http://localhost:3000/api/recipes'), axios.get('http://localhost:3000/api/authenticate?token=' + token)];
	return Promise.all(promises);
}