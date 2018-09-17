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
    myClients: ClientModel[];
    publicClients: ClientModel[];
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
            clientsCount: 0,
            myClients: [],
            publicClients: []
        }

        this.clientService.count().then(response => console.log(response.count));
    }

    public componentWillMount() {
        this.getPublicClients().then(publicClients => {
            this.getMyClients().then(myClients => {
                this.getAllClientsCount().then(clientsCount => {

                    this.setState({ 
                        clients: myClients, 
                        clientsCount, 
                        myClientsCount: myClients.length, 
                        publicClients 
                    });

                })  
            })
        })
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

    private async getPublicClients (): Promise<ClientModel[]>{
        const clients: ClientModel[] = (await this.clientService.getClientsByFilter(`{"personId":"${this.props.currentUserId}"}`));
        console.log(clients);
        return clients;
    }

    private async getMyClients () : Promise<ClientModel[]> {
        const clients: ClientModel[] = (await this.clientService.getClientsByPersonId(this.props.currentUserId));
        console.log(clients, this.props.currentUserId);
        return clients;
    }

    private async getAllClientsCount (): Promise<number> {
        const count: number = (await this.clientService.countByPersonId(this.props.currentUserId)).count;
        return count;
    }
}
