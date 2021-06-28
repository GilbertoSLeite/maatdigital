import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  useRoutes,
} from "react-router-dom";
import { CssBaseline } from '@material-ui/core';
import pageRoutes from './router';
import FooterSite from './components/footer/Footer';

const Main = () => {
  const routing = useRoutes((pageRoutes));
  return (
    <React.Fragment>
      {routing}
    </React.Fragment>
  )
};

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter
      forceRefresh
    >
      <Main />
      <FooterSite />
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root')
);