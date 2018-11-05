import * as path from "path";
import * as fs from "fs";
import { Express } from "express";

export default(app: Express) => {
    var route = path.join(__dirname, "../routes");
    fs.readdirSync(route).forEach(file => {
    if(file.indexOf("_loader") > -1) return;
    let handler = require(`${route}/${file}`).default;
    handler(app);
});
}