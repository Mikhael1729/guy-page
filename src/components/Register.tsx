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
import { InstancesLocator } from "helpers/InstancesLocator";
import { PersonService } from "data/services/PersonService";

// #region Styles
const styles = ({ spacing }: Theme) => createStyles({
  textField: {
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
  },
});

// #endregion
export interface IRegisterProps extends WithStyles<typeof styles> {
  history?: any;
}

export interface IRegisterState {
  email: string;
  password: string;
  repeatedPassword: string;
}

class Register extends React.Component<IRegisterProps, IRegisterState> {
  private readonly personService = InstancesLocator.getInstance().personService;

  constructor(props: IRegisterProps) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeatedPassword: ""
    };

    this.onChangeEmail= this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onchangeRepeatedPassword = this.onchangeRepeatedPassword.bind(this);
    this.handlerRegister = this.handlerRegister.bind(this);
  }

  public render() {
    const classes = this.props.classes;

    return (
      <div className={Styles.container}>

        <Avatar 
          src={user_image}
          style={{  
            marginTop: "40px",
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

            <Button 
              style={{ marginTop: "20px" }}
              color="primary" 
              variant="contained"
              children="Register"
              onClick={this.handlerRegister}/>
          </FormControl>
      </div>
    );
  }

  private handlerRegister() {
    if (this.state.password === this.state.repeatedPassword) {
      // Creating person.
      const person = new Person({
        email: this.state.email,
        password: this.state.password 
      });

      // Add person into database.
      this.personService.add(person).then(response => {
        console.log(response);
        this.props.history.push('/login');
      });
    }
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
}

export default withStyles(styles)(Register);