// import { Serie } from "./Serie.model";
// import { Sensor } from "./sensor.model";

import { Camera } from "./camera.model";
import { PortaSlot } from "./porta-slot.model";
import { Processador } from "./processador.model";
import { Tela } from "./tela.model";


export class Celular {
    id! : number;
    tela! : Tela;
    processador! : Processador;
    // serie! : Serie;
    camera! : Camera;
    portaSlot! : PortaSlot;
    // sensor! : Sensor;
    nomeImagem! : string;
    marca! : string;
    nome! : string;
    anoLacamento! : any;
    armazenamento! : number;
    ram! : number;
    preco! : number;
    estoque! : number;
}
