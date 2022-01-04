import App from "./app";
import Server from "./server";

export default class startApplication {
    public static start(): void {
        console.log(` INICIALIZANDO APLICAÇÃO `);
        new Server(new App()).start();
    }
}

startApplication.start();