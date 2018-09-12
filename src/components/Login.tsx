import * as React from 'react';

export interface ILoginProps {
}

export interface ILoginState {
}

export default class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div>
        Hello world login
      </div>
    );
  }
}
