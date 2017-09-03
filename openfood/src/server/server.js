//server related modules
import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';

//Models
import User from './models/user';
import Recipe from './models/recipe';

//webpackDevMiddleware( sever middleware)
import webpack from 'webpack';
import React from 'react';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { RouterContext, match } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import Immutable, { fromJS } from 'immutable';

//common package
import webpackConfig from '../../webpack.config';
import routes from '../common/routes';
import configureStore from '../common/store/configureStore'; 
import fetchComponentData from '../common/utils/fetchComponentData';
import apiRoutes from './controllers/api.js';

//config
const app = new Express();
const port = process.env.PORT || 3000;

//connecting to database 
mongoose.connect(config.database);

app.set('env','production');
//setup static docs positsion
app.use('/static', Express.static(__dirname + '/public'));
app.use(cookieParser());
//using body parser to get the info from POST and URL parameters
app.use(bodyParser.urlencoded({ extended: false })); //only deal with key/value
app.use(bodyParser.json());
//morgan
app.use(morgan('dev'));


// req handler -> judging how to handle( get initialState and transit to UI)
const handleRender = (req, res) => {
  //Query our mock API asynchronously
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps == null) {
      res.status(404).send('Not found');
    }
  	fetchComponentData(req.cookies.token).then((response) => {
      let isAuthorized = false;
      if (response[1].data.success === true) {
         isAuthorized = true;
      } else {
        isAuthorized = false;        
      }
      const initialState = fromJS({
        recipe: {
          recipes: response[0].data,
          recipe: {
            id: '',
            name: '', 
            description: '', 
            imagePath: '',            
          }  
        },
        user: {
          isAuthorized: isAuthorized,
          isEdit: false,
        }
      });
   	  // server side to UI
   	  // Creating a new Redux sotre instance
   	  const store = configureStore(initialState);
   	  const initView = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
   	  );
      let state = store.getState();
      let page = renderFullPage(initView, state);
      return res.status(200).send(page);
    })
    .catch(err => res.end(err.message));
  })
}

const renderFullPage = (html, preloadedState) => (`
    <!doctype html>
    <html>
      <head>
        <title>OpenCook 分享料理的美好時光</title>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <!-- Optional theme -->
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootswatch/3.3.7/journal/bootstrap.min.css">
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>`
);


//setuping hot reload middleware
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

//API prefix, apiRoutes handles /api
app.use('/api', apiRoutes);
//handleRender
app.use(handleRender);
app.listen(port, (error) => {
  if(error) {
  	console.error(error)
  } else {
  	console.info(` >> listening on port ${port}. open up http://localhost:${port}/ in your browser `)
  }
});
