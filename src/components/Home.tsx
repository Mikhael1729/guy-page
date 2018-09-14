import * as React from 'react';
import QuantityCard from "./QuantityCard";
import { Grid } from '@material-ui/core';
import ClientList from './ClientList';
// tslint:disable:variable-name

interface IHomeProps {
}

export const Home: React.SFC<IHomeProps> = (props) => {
  return(
      <React.Fragment>
        <h1>Home</h1>

        {/* Clients quantities */}
        <Grid container={true} justify="space-between">
            <Grid item={true} xs={6}>
                <QuantityCard 
                    title="My clients quantity" 
                    backgroundColor="#E6E6E6"
                    quantity={12}/>
            </Grid>

            <Grid item={true} xs={6}>
                <QuantityCard 
                    title="My clients quantity" 
                    backgroundColor="#F0F0F0"
                    quantity={12}/>
            </Grid>
        </Grid>

        {/* My client list */}
        <ClientList />
        <ClientList />

      </React.Fragment>
  ) ;
};
