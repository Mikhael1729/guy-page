import * as React from 'react';
import { TextField, createStyles, WithStyles, Grid, FormControl } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';

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
  }

  public render() {
    const classes = this.props.classes;

    return (
      <div>
        <h1>Register</h1>
        <FormControl fullWidth={true}>
          <TextField 
            id="email"
            label="Email"
            fullWidth={true}
            value={this.state.email}
            onChange={this.onChangeEmail}
            margin="normal"/>

          <TextField 
            id="password"
            fullWidth={true}
            label="Password"
            type="password"
            onChange={this.onChangePassword}
            value={this.state.password}
            margin="normal"/>

           <TextField 
            id="password"
            fullWidth={true}
            label="Password"
            type="password"
            onChange={this.onchangeRepeatedPassword}
            value={this.state.password}
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
    fetch("http://localhost:3000/api/Person/1?access_token=DtQPd8cKqSNgR8p5CE3iljJsVZdY5DXuxEShZfCLGiDYFLEl5ekhmZa3F4Mac05e")
      .then((data: any) => {
        data.json().then((converted: any) => {
          console.log(converted);
        })
      })
  }
}

export default withStyles(styles)(Register);