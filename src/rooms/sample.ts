import {Room, Client} from "colyseus";
import {Timeline} from "@gamestdio/timeline";


export class SampleRoom extends Room {
    timeline: Timeline;

    constructor() {
        super();

        this.setState({
            players: {},
            messages: []
        })
    }

    requestJoin(options: any, isNew: boolean) {
        return this.maxClients - this.clients.length > 0 && this.clients.filter(c => c.id == options.clientId).length == 0;
    }

    onAuth(options: any) {
        return true;
    }

    onDispose(): void | Promise<any> {
        return undefined;
    }

    onInit(options: any): void {
        this.setPatchRate(1000/20);
        this.setSimulationInterval(this.update.bind(this));
        console.log("initialized");
    }

    onJoin(client: Client, options?: any, auth?: any) {
        console.log("client joined! ", client.sessionId);
        this.state.players[client.sessionId].status = "online";

    }

    onLeave(client: Client, consented?: boolean) {
        this.state.players[client.sessionId].status = "offline";
    }

    onMessage(client: Client, data: any) {
        this.broadcast("client: "+data.toString(), {except: client});
    }

    update() {
        console.log("num clients:", Object.keys(this.clients).length);
    }

}