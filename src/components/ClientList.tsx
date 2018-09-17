import * as React from 'react';
import { Fragment } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    WithStyles
} from '@material-ui/core';
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import { Client as ClientModel } from "models/Client";
// tslint:disable:variable-name

const styles = ({ spacing }: Theme) => createStyles({
    root: {
      width: '100%',
      marginTop: spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
});

interface IClientListProps extends WithStyles<typeof styles>{
    clients: ClientModel[];
}

const ClientList: React.SFC<IClientListProps> = (props) => {
    const classes = props.classes;

    return (
        <Fragment>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Lastname</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Is public</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        props.clients.map(client => {
                            return (
                                <TableRow key={client.id}>
                                    <TableCell component="th" scope="row"><div>{client.name}</div></TableCell>
                                    <TableCell><div>{client.lastname}</div></TableCell>
                                    <TableCell><div>{client.email}</div></TableCell>
                                    <TableCell><div>{client.birthdate ? getAge(new Date(client.birthdate)) : null}</div></TableCell>
                                    <TableCell><div>{client.public!.toString()}</div></TableCell>
                                </TableRow>
                            );
                        })
                    }
                    </TableBody>
                </Table>
            </Paper>
        </Fragment>
    );
};

function getAge(date: Date): number {
    const ageDifMs = Date.now() - date.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default withStyles(styles)(ClientList);