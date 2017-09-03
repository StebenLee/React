import Express from 'express';
// jsonwebtoken
import jwt from 'jsonwebtoken';
// User,Recipe Models
import User from '../models/user';
import Recipe from '../models/recipe';
import config from '../config';

// API Route
const app = new Express();
const apiRoutes = Express.Router();
//設定 JSON web token 
app.set('superSecret', config.secret);
//API for logging, email and passport are used. 
//If logging sucessfully, pass a token to cookie for 24 hours. 
apiRoutes.post('/login', function(req, res) {
  //find the user
  User.findOne({
  	email: req.body.email
  }, (err, user) => {
  	if (err) throw err;
  	if(!user) {
  	  res.json({ success: false, message: 'Authentication failed. User not found.'});
  	} else if (user) {
  		// checking pasword
  	  if (user.password != req.body.password) {
  	  	res.json({ success: false, message: 'Authentication failed. Wrong password.'});
  	  } else {
  	  	// if password and user both are authenticated, then creat a token
  	  	const token = jwt.sign({ email: user.email }, app.get('superSecret'), {
  	  	  expiresIn: 60 * 60 * 24 //expires in 24 hours
  	  	});
  	  	//return the information including token as JSON
  	  	res.json({
  	  		success: true,
  	  		message: 'token has been set up',
  	  		token: token,
  	  		userId: user._id
  	  	});
  	  }
  	}
  });
});

apiRoutes.get('/setup', (req, res) => {
	//create a sample user
	const sampleUser = new User({
	  username: 'Steben',
	  email: 'steben@demo.com',
	  password: '123456',
	  admin: true
	});
	const sampleRecipe = new Recipe({
    id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
    name: '番茄炒蛋', 
    description: '番茄炒蛋，一道非常經典的家常菜料理。雖然看似普通，但每個家庭都有屬於自己家裡的不同味道', 
    imagePath: 'https://c1.staticflickr.com/6/5011/5510599760_6668df5a8a_z.jpg',
    steps: ['放入番茄', '打個蛋', '放入少許鹽巴', '用心快炒'],
	  updatedAt: new Date()
	});

	sampleUser.save((err) => {
	  if (err) throw err;
	  sampleRecipe.save((err) => {
	  	if (err) throw err;
	  	console.log('User saved succesfully');
	  	res.json({ success: true });
	  })
	});
});

apiRoutes.get('/recipes', (req, res) => {
  Recipe.find({}, (err, recipes) => {
  	res.status(200).json(recipes);
  })
});

// route middleware to verify a token
apiRoutes.use((req, res, next) => {
	//check token from header or url parameter or post parameters
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //decoding token
    if (token) {
    	jwt.verify(token, app.get('superSecret'), (err, decoded) => {
    	  if(err) {
    	  	return res.json({ success: false, message: 'Failed to authenticate token.' }); 
    	  } else {
    	  	req.decoded = decoded;
    	  	next();
    	  }
    	});
    } else { // no token
    	return res.status(403).send({
    		success: false,
    		message: 'No token provided.'
    	});
    }
});

//creating recipe
apiRoutes.post('/recipes', (req, res) => {
  const newRecipe = new Recipe({
  	name: req.body.name,
  	description: req.body.description,
  	imagePath: req.body.imagePath,
  	steps: ['放入番茄', '打個蛋', '放入少許鹽巴', '用心快炒'],
  	updatedAt: new Data()
  });

  newRecipe.save((err) => {
  	if (err) throw err;
  	console.log('User saved successfully');
  	res.json({ success: true });
  });
});

//update recipe
apiRoutes.put('/recipes/:id', (req, res) => {
  Recipe.update({ _id: req.params.id }, {
  	name: req.body.name,
  	description: req.body.description,
  	imagePath: req.body.imagePath,
  	steps: ['放入番茄', '打個蛋', '放入少許鹽巴', '用心快炒'],
  	updatedAt: new Date()
  } ,(err) => {
  	if (err) throw err;
  	console.log('User updated successfully');
  	res.json({ success: true});
  });
});

//remove recipe
apiRoutes.delete('/recipes/:id', (req, res) => {
  Recipe.remove({_id: req.params.id }, (err, recipe) => {
  	if (err) throw err;
  	console.log('remove saved successfully');
  	res.json({ success: true });
  });
});


//route to show a random message
apiRoutes.get('/authenticate', (req, res) => {
  res.json({
  	success: true,
  	message: 'Enjoy',
  });
});

export default apiRoutes;