import * as React from 'react';
import user_image from 'images/user.png';
import {
  createStyles,
  FormControl,
  Grid,
  TextField,
  WithStyles,
  Avatar
  } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import * as Styles from "styles/Register.css";
import classnames from "classnames";

// #region Styles
const styles = ({ spacing }: Theme) => createStyles({
  textField: {
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
  },
});

// #endregion
export interface IRegisterProps extends WithStyles<typeof styles> {
}

export interface IRegisterState {
  email: string;
  password: string;
  repeatedPassword: string;
}

class Register extends React.Component<IRegisterProps, IRegisterState> {
  constructor(props: IRegisterProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeatedPassword: ""
    };

    this.getData();

    this.onChangeEmail= this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onchangeRepeatedPassword = this.onchangeRepeatedPassword.bind(this);
  }

  public render() {
    const classes = this.props.classes;

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

        <h1>Register</h1>

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

           <TextField 
            id="repeatedPassword_textField"
            fullWidth={true}
            label="Password"
            type="password"
            onChange={this.onchangeRepeatedPassword}
            value={this.state.repeatedPassword}
            margin="normal"/>
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

  private onchangeRepeatedPassword (e: any) {
    this.setState({ repeatedPassword: e.target.value });
  }

  private getData() {
    fetch("http://localhost:3000/api/Person/1?access_token=U6CxKEHXnkS5CHiqqKV9Z0WEY5uMa1xLirtwpK3J7E2cVaBBnC3JFICJdBGqhGni")
      .then((data: any) => {
        data.json().then((converted: any) => {
          console.log(converted);
        })
      });
  }
}

export default withStyles(styles)(Register);