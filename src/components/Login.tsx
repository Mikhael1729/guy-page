import * as React from 'react';
import user_image from 'images/user.png';
import {
  createStyles,
  FormControl,
  Grid,
  TextField,
  WithStyles,
  Avatar,
  Button
  } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import * as Styles from "styles/Register.css";
import classnames from "classnames";
import { Person } from "models/Person";

export interface ILoginProps {
  history?: any;
  updateCurrentPerson: (user: Person) => void;
}

export interface ILoginState {
  email: string;
  password: string;
}

export default class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handlerLogin = this.handlerLogin.bind(this);
  }

  public render() {
    return (
      <div className={Styles.container}>

        <Avatar 
          src={user_image}
          style={{  
            textAlign: "center",
            alignSelf: "center",
            width: "100px",
            height: "100px"
          }}/>

        <h1>Login</h1>

        <FormControl fullWidth={true}>
          <TextField 
            id="email_textField"
            label="Email"
            fullWidth={true}
            value={this.state.email}
            onChange={this.onChangeEmail}
            margin="normal"/>

          <TextField 
            id="password_textField"
            fullWidth={true}
            label="Password"
            type="password"
            onChange={this.onChangePassword}
            value={this.state.password}
            margin="normal"/>

            <Button 
              style={{ marginTop: "20px" }}
              color="primary" 
              variant="contained"
              children="Login"
              onClick={this.handlerLogin}/>
          </FormControl>
      </div>
    );
  }

  private onChangeEmail (e: any) {
    this.setState({ email: e.target.value });
  }

  private onChangePassword (e: any) {
    this.setState({ password: e.target.value });
  }

  private handlerLogin() {
    const person = new Person({
      email: this.state.email,
      password: this.state.password
    });

    fetch(`http://localhost:3000/api/Person/login`, {
      method: "POST",
      body: JSON.stringify(person),
      headers: {  
        "Content-type": "application/json"
      }
    }) 
      .then(res => res.json())
      .then(res => {
        // tslint:disable-next-line:no-shadowed-variable
        
        person.token = res.id;
        person.id = res.userId;
        
        console.log(person);
        
        this.props.updateCurrentPerson(person);
        this.props.history.push("/profile");
      })
      .catch(error => console.error(error));
    

  }
}

