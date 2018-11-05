import * as express from "express";
import * as colyseus from "colyseus";
import * as http from "http";
import { SampleRoom } from "./rooms/sample";

const app = express();
app.use((req, res,next) => {
    console.log("requesting "+ req.path);
});
const routes = require("./routes/_loader").default;

class GameServer extends colyseus.Server {
    app: express.Express;
    constructor(app: express.Express, port: number | string = 8080) {
        super({server: http.createServer(app)});

        this.app = app;

        this.registerGameRooms();

        routes(app);

        this.listen(port as number);
        console.log("Running on ws://localhost:" + port);
    }

    registerGameRooms() { 
        this.register("sample", SampleRoom);
    }
}

const gameServer = new GameServer(app, process.env.PORT);