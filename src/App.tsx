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
import Profile from "components/Profile";
import { withHistory } from "./components/WithHistory";
import { Person as PersonModel} from "models/Person";
 // tslint:disable:jsx-no-lambda

interface IAppState {
  currentUser: PersonModel;
}

class App extends React.Component<any, IAppState> {
  private headerButtons: IHeaderButton[];
  private onlyRoutes: IHeaderButton[];

  constructor(props: any) {
    super(props);

    const stored: PersonModel = JSON.parse(sessionStorage.getItem("person") || '{}');

    this.state = {
      currentUser: stored
    };

    // Header buttons.
    this.headerButtons = [
      { component: Register, exactLink: true, label: "Register", link: "/register" },
      { component: Login, exactLink: true, label: "Login", link: "/login" },
    ];

    // Only routes.
    this.onlyRoutes = [
      { component: Profile, exactLink: true, label: "Profile", link: "/profile"}
    ]

    // Bindings.
    this.logIn = this.logIn.bind(this);
  }

  public render() {
    const routes = [...this.onlyRoutes, ...this.headerButtons];

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
                    routes.map((r, index) => (
                        <Route 
                          key={index}
                          exact={r.exactLink}
                          path={r.link}
                          render={({history}) => {
                            // tslint:disable-next-line:variable-name
                            const Component = withHistory(r.component, history);

                            if(r.link==="/login") {
                              return <Component updateCurrentPerson={this.logIn}/>
                            }
                            else if (r.link==="/profile") {
                              return <Component email={this.state.currentUser.email}/>
                            }

                            return <Component />
                          }}/>
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

  private logIn(person: PersonModel) {
    // Storing person session.
    sessionStorage.setItem("person", JSON.stringify(person));
    this.setState({ currentUser: person });
  }
}

export default App;