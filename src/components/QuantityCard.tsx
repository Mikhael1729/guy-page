import * as React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  WithStyles
  } from '@material-ui/core';
import { Fragment } from 'react';
import { Theme, withStyles } from '@material-ui/core/styles';
// tslint:disable:variable-name
// tslint:disable:no-shadowed-variable

const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
};

interface IQuantityCardProps extends WithStyles<typeof styles>{
  backgroundColor: string;
  quantity: number;
  title: string;
}

const QuantityCard: React.SFC<IQuantityCardProps> = (props) => {
  const classes = props.classes

  return (
    <Fragment>
      <Card style={{ backgroundColor: props.backgroundColor }}>
          <CardContent>

              {/* Title */}
              <Typography 
                className={classes.title} 
                color="textSecondary" 
                align="center"
                children={props.title} />

              {/* Quantity */}
              <Typography 
                variant="headline" 
                color="textPrimary"
                align="center"
                children={props.quantity} />

          </CardContent>
      </Card>
    </Fragment>
  );
};

export default withStyles(styles)(QuantityCard);