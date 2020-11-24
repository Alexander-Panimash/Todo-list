import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import taskStore from './store/TaskStore';

const stores = {
  taskStore: taskStore
};

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Century Gothic'
  }
});

ReactDOM.render(
  <Provider {...stores}>

    <BrowserRouter>
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <App/>
        </MuiThemeProvider>
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
