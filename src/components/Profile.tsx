import * as React from 'react';
import { Fragment } from "react";

interface IProfileProps {
    email?: string;
}

// tslint:disable-next-line:variable-name
const Profile: React.SFC<IProfileProps> = (props) => {
  return (
      <Fragment>
          <h1>{props.email}</h1>
      </Fragment>
  )
};

export default Profile;