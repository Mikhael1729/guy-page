import { Button, Grid, createStyles } from "@material-ui/core";
import { withStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import * as Styles from './styles/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Fragment } from "react";
import Header from "components/Header";
import { IHeaderButton } from "models/HeaderButton";
import Register from "components/Register";
import Login from "components/Login";
 // tslint:disable:jsx-no-lambda

// #region Styles
const styles = ({ palette }: Theme) => createStyles({
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      palette.type === 'light' ? palette.grey[200] : palette.grey[900]
    }`,
  }
});
// #endregion

class App extends React.Component<any, any> {
  private headerButtons: IHeaderButton[];

  constructor(props: any) {
    super(props);

    this.headerButtons = [
      { component: <Register />, exactLink: true, label: "Register", link: "/register" },
      { component: <Login />, exactLink: true, label: "Login", link: "/login" },
    ]
  }

  public render() {
    return (
      <BrowserRouter>
        <Fragment>

          {/* Header */}
          <div className={Styles.header}>
            <Header title="Guy Page" buttons={this.headerButtons}/>
          </div>

          {/* Pages */}
          <div className={`${Styles.container} ${Styles.body}`}>
            <Grid container={true}>
                <Grid item={true} xs={12}>
                  <Switch>
                  {
                    this.headerButtons.map((r, index) => (
                        <Route 
                          key={index}
                          exact={r.exactLink}
                          path={r.link}
                          render={() => r.component}/>
                     ))
                  }
                  </Switch>
                </Grid>
            </Grid>
          </div>

        </Fragment>
      </BrowserRouter>
    );
  }
}

export default withStyles(styles)(App);