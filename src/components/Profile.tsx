import * as React from 'react';
import { Fragment } from "react";

export interface IProfileProps {
    email?: string;
}

export default class Profile extends React.Component<IProfileProps, any> {
  public render() {
    return (
        <Fragment>
            <h1>{this.props.email}</h1>
        </Fragment>
    );
  }

  public componentWillReceiveProps(nextProps: IProfileProps) {
    this.setState({ email: nextProps.email });
  }
}
