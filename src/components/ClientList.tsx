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

interface IClisntListProps extends WithStyles<typeof styles>{
    clients?: ClientModel[];
}

let id = 0;
function createData(name: any, calories: any, fat: any, carbs: any, protein: any) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ClientList: React.SFC<IClisntListProps> = (props) => {
    const classes = props.classes;
    return (
        <Fragment>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell numeric={true}>Calories</TableCell>
                        <TableCell numeric={true}>Fat (g)</TableCell>
                        <TableCell numeric={true}>Carbs (g)</TableCell>
                        <TableCell numeric={true}>Protein (g)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => {
                        return (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                            {row.name}
                            </TableCell>
                            <TableCell numeric={true}>{row.calories}</TableCell>
                            <TableCell numeric={true}>{row.fat}</TableCell>
                            <TableCell numeric={true}>{row.carbs}</TableCell>
                            <TableCell numeric={true}>{row.protein}</TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
            </Paper>
        </Fragment>
    );
};

export default withStyles(styles)(ClientList);