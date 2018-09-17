import * as React from 'react';
import ClientList from './ClientList';
import QuantityCard from './QuantityCard';
import { Grid } from '@material-ui/core';
import { Client as ClientModel, Client } from "models/Client";
import { InstancesLocator } from "helpers/InstancesLocator";
import { ClientService } from "data/services/ClientService";
// tslint:disable:variable-name

export interface IHomeProps {
}

export interface IHomeState {
    clients: ClientModel[];
}

export class Home extends React.Component<IHomeProps, IHomeState> {
    private readonly clientService: ClientService = InstancesLocator.getInstance().clientService;

    constructor(props: IHomeProps) {
        super(props);
        
        this.state = {
            clients: []
        }
    }

    public componentWillMount() {
        this.getAllClients().then(res => {
            this.setState({ clients: res })
        });
    }

    public render() {
        return (
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
                <ClientList clients={this.state.clients}/>

            </React.Fragment>
        );
    }

    private async getAllClients (): Promise<ClientModel[]>{
        const clients: ClientModel[] = (await this.clientService.getAll());
        console.log(clients);
        return clients;
    }

    private generateClients() : ClientModel[]{
        const clients: ClientModel[] = [];

        for(let i = 0; i < 15; i++) {
            const client = new ClientModel({
                birthdate: (2000 + i + i <= 12 ? i : i - (i-1) + i).toString(),
                email: `user${i}@email.com`,
                id: i,
                lastname: `Lastname${i}`,
                name: `User${i}`,
                public: i % 2 === 0 ? true : false
            });

            clients.push(client);
        }

        return clients;
    }
}
