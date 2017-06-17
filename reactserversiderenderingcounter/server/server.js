import Express from 'express';
import qs from 'qs';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

import configureStore from '../common/store/configureStore';
import CounterContainer from '../common/containers/CounterContainer';

import { fetchCounter } from '../common/api/counter';

const app = new Express();
const port = 3000;

function handleRender(req, res) {
	//async
	fetchCounter(apiResult => {
	  const params = qs.parse(req.query);
	  const counter = parseInt(params.counter, 10) || apiResult || 0;

	  const initialState = fromJS({
	  	counterReducers: {
	  	  count: counter,
	  	}
	  });
	  //building a redux store
	  const store = configureStore(initialState);
	  const html = renderToString(
	    <Provider store={store}>
	      <CounterContainer />
	    </Provider>
	  );

	  const finalState = store.getState();
	  res.send(renderFullPage(html, finalState));
	})
}

//HTML Markup
function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

//using middlware to set up hot module reloading via webpack
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicaPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
//server request
app.use(handleRender);

app.listen(port, (error) => {
  if(error) {
  	console.error(error)
  } else {
  	console.info('==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.')
  }
});
