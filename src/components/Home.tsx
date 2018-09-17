import * as React from 'react';
import ClientList from './ClientList';
import QuantityCard from './QuantityCard';
import { Grid } from '@material-ui/core';
import { Client as ClientModel, Client } from "models/Client";
import { InstancesLocator } from "helpers/InstancesLocator";
import { ClientService } from "data/services/ClientService";
// tslint:disable:variable-name

export interface IHomeProps {
    currentUserId: number;
}

export interface IHomeState {
    clients: ClientModel[];
    clientsCount: number;
    myClientsCount: number;
}

export class Home extends React.Component<IHomeProps, IHomeState> {
    private readonly clientService: ClientService = InstancesLocator.getInstance().clientService;

    constructor(props: IHomeProps) {
        super(props);
        
        this.state = {
            clients: [],
            myClientsCount: 0,
            clientsCount: 0
        }

        this.clientService.count().then(response => console.log(response.count));
    }

    public componentWillMount() {
        this.getAllClients().then(c => {
            this.getAllClientsCount().then(c1 => {
                this.getMyClients().then(c2 => {
                    this.setState({ clients: c, clientsCount:c1, myClientsCount: c2 });
                })  
            })
        });
    }

    public render() {
        let count: number = 0;
        this.clientService.count().then(response => count = response.count);
        
        return (
            <React.Fragment>
                <h1>Home</h1>

                {/* Clients quantities */}
                <Grid container={true} justify="space-between">
                    <Grid item={true} xs={6}>
                        <QuantityCard 
                            title="My clients quantity" 
                            backgroundColor="#E6E6E6"
                            quantity={this.state.myClientsCount}/>
                    </Grid>

                    <Grid item={true} xs={6}>
                        <QuantityCard 
                            title="All clients quantity" 
                            backgroundColor="#F0F0F0"
                            quantity={this.state.clientsCount}/>
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

    private async getAllClientsCount () : Promise<number> {
        const count: number = (await this.clientService.count()).count;
        return count;
    }

    private async getMyClients (): Promise<number> {
        const count: number = (await this.clientService.countByPersonId(this.props.currentUserId)).count;
        return count;
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
