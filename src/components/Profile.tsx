import * as React from 'react';
import user_image from 'images/user.png';
import {
  createStyles,
  FormControl,
  Grid,
  TextField,
  WithStyles,
  Avatar,
  Button,
  Switch,
  FormControlLabel,
  FormGroup
  } from '@material-ui/core';
import { Fragment } from "react";
import { Person } from 'models/Person';
import { Client } from 'models/Client';
import { InstancesLocator } from "helpers/InstancesLocator";
import { ClientService } from "data/services/ClientService";

export interface IProfileState {
  name: string;
  lastname: string;
  public: boolean;
  email: string;
  birthdate: string;
}

export interface IProfileProps {
    email?: string;
    currentUserId: number;
    history: any;
}

export default class Profile extends React.Component<IProfileProps, IProfileState> {
  private readonly clientService = InstancesLocator.getInstance().clientService;

  constructor(props: IProfileProps) {
    super(props);

    this.state = {
      name: "",
      lastname: "",
      public: false,
      email: "",
      birthdate: ""
    };

    this.onChangeBirthdate = this.onChangeBirthdate.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePublic = this.onChangePublic.bind(this);
    this.handlerAddClient = this.handlerAddClient.bind(this);
  }
  
  public render() {
    return (
        <Fragment>
          <h1>Add a new client</h1>

          <FormControl fullWidth={true}>

            {/* Name */}
            <TextField 
              id="name_textField"
              label="Name"
              fullWidth={true}
              value={this.state.name}
              onChange={this.onChangeName}
              margin="normal"/>

            {/* Lastname */}
            <TextField 
              id="lastname_textField"
              label="Lastname"
              fullWidth={true}
              value={this.state.lastname}
              onChange={this.onChangeLastName}
              margin="normal"/>

            {/* Email */}
            <TextField 
              id="email_textField"
              label="Email"
              fullWidth={true}
              value={this.state.email}
              onChange={this.onChangeEmail}
              margin="normal"/>

            {/* Birthdate */}
            <TextField 
              id="birthdate_textField"
              label="Lastname"
              fullWidth={true}
              value={this.state.birthdate}
              onChange={this.onChangeBirthdate}
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true
              }}/>

            {/* Public */}
            <FormControlLabel 
              label="Public"
              control={
                <Switch 
                  color="primary"
                  checked={this.state.public}
                  onChange={this.onChangePublic}
                  value="public"/>}/>

            {/* Create button */}
            <Button
              style={{ marginTop: "25px" }}
              variant="contained" 
              color="primary"
              children="Add client"
              onClick={this.handlerAddClient}/>

          </FormControl>
        </Fragment>
    );
  }

  private onChangeName(e: any) {
    this.setState({ name: e.target.value });
  } 

  private onChangeLastName(e: any) {
    this.setState({ lastname: e.target.value });
  } 

  private onChangeEmail(e: any) {
    this.setState({ email: e.target.value });
  } 

  private onChangeBirthdate(e: any) {
    this.setState({ birthdate: e.target.value });
  }

  private onChangePublic() {
    this.setState(prevState => {
      return { public: !prevState.public }
    });
  }

  private handlerAddClient() {
    const client = new Client({
      email: this.state.email,
      name: this.state.name,
      birthdate: this.state.birthdate,
      lastname: this.state.lastname,
      public: this.state.public,
      personId: this.props.currentUserId
    });

    this.clientService.add(client).then(result => { 
      console.log(result); 
      this.props.history.push('/') 
    });
  }
}
