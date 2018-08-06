import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Dashboard, DashboardReducer, DashboardSaga } from './Dashboard';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  DashboardReducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(DashboardSaga)

render(
  <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to List Manager</h1>
      </header>
        <Dashboard />
    </div>
  </Provider>,
  document.getElementById('root')
)