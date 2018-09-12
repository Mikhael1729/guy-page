import * as React from 'react';
import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  Toolbar,
  Typography,
  WithStyles,
  Badge
  } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withStyles, Theme } from '@material-ui/core/styles';
import { HeaderIcon } from "models/HeaderIcon";
import { HeaderButton } from "models/HeaderButton";
// tslint:disable:jsx-no-lambda

// #region Styles
const styles = ({ palette }: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
});
// #endregion

export interface IHeaderProps extends WithStyles<typeof styles> {
  title : string;
  buttons? : HeaderButton[];
  icons? : HeaderIcon[];
  itemsQuantity? : number;
}

class Header extends React.Component<IHeaderProps> {
  constructor(props: IHeaderProps) {
    super(props); 
  }

  public render() {
    // Classes
    const classes = this.props.classes;

    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="fixed" color="primary">
            <Toolbar>

              {/* Title Bar */}
              <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
                {this.props.title}
              </Typography>
             
              {/* Buttons */}
              {
                this.props.buttons 
                  ? this.props.buttons.map((b, index) => {
                      const link = (props:any) => <Link to={b.link} {...props}/>;
                      return (
                        <Button 
                          key={index} 
                          color="inherit" 
                          component={link} 
                          children={b.label}/>
                      );
                    })
                  : null
              }

              {/* Icons */}
              {
                this.props.icons 
                  ? this.props.icons.map((i, index) => {
                      const link = (props: any) => <Link to={i.link} {...props}/>
                      return (
                        <IconButton
                          component={link}
                          key={index}
                          aria-owns="menu-appbar"
                          aria-haspopup="true"
                          color="inherit">
                          { i.icon }
                        </IconButton>
                      )
                    })
                  : null
              }

            </Toolbar>
          </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);


