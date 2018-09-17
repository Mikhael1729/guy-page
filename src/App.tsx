import { Button, Grid, createStyles } from "@material-ui/core";
import { withStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import * as Styles from './styles/App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Fragment } from "react";
import Header from "components/Header";
import { IHeaderButton } from "models/HeaderButton";
import Register from "components/Register";
import Login from "components/Login";
import Profile from "components/Profile";
import { withHistory } from "./components/WithHistory";
import { Person as PersonModel, Person} from "models/Person";
import { Home } from "./components/Home";
// tslint:disable:variable-name
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

    // Bindings.
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.showOrHideNavBarElements = this.showOrHideNavBarElements.bind(this);

    // Bar elements and routes.
    this.showOrHideNavBarElements();

    // Only routes.
    this.onlyRoutes = [
      { component: Home, exactLink: true, label: "Home", link: "/", onClick: this.logOut}
    ]
  }

  public render() {
    this.showOrHideNavBarElements();
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
                    routes.map((r, index) => {
                      const h = 0;
                      return (
                        <Route 
                          key={index}
                          exact={r.exactLink}
                          path={r.link}
                          render={({history}) => {
                            const Component = withHistory(r.component, history);

                            /* Adding specific properties */
                            
                            if(r.link==="/login") {
                              return <Component updateCurrentPerson={this.logIn}/>
                            }
                            else if (r.link==="/profile") {
                              return <Component email={this.state.currentUser.email} currentUserId={this.state.currentUser.id}/>
                            } 
                            else if (r.link==="/") {
                              if(this.state.currentUser.token) {
                                return <Component />
                              } else {
                                return <Redirect to={{ pathname: '/login' }} />
                              }
                            }

                            return <Component />
                          }}/>
                     )})
                  }
                  </Switch>
                </Grid>
            </Grid>
          </div>

        </Fragment>
      </BrowserRouter>
    );
  }

  private showOrHideNavBarElements() {
    const register:IHeaderButton = { component: Register, exactLink: true, label: "Register", link: "/register" };
    const login: IHeaderButton = { component: Login, exactLink: true, label: "Login", link: "/login" };
    const profile: IHeaderButton = { component: Profile, exactLink: true, label: "Add client", link: "/addclient"};
    const logout: IHeaderButton = { component: <h1>h</h1>, exactLink: true, label: "Log out", link: "/", onClick: this.logOut};

    // Header buttons.
    this.headerButtons = [];

    if (this.state.currentUser.token) {
      this.headerButtons.push(profile);
      this.headerButtons.push(logout);
    } else {
      this.headerButtons.push(login);
      this.headerButtons.push(register);
    }
  }

  private logIn(person: PersonModel) {
    // Storing person session.
    sessionStorage.setItem("person", JSON.stringify(person));
    this.setState({ currentUser: person });
    console.log(this.state.currentUser);
    console.log(person);
  }

  private logOut() {
    sessionStorage.clear();
    this.setState({ currentUser: new Person({})});
  }
}

export default App;