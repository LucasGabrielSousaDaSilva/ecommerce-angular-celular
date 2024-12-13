// import { Sensor } from "./sensor.model";

import { Camera } from "./camera.model";
import { Processador } from "./processador.model";
import { Tela } from "./tela.model";
import { Serie } from "./serie.model";


export class Celular {
    id! : number;
    tela! : Tela;
    processador! : Processador;
    serie! : Serie;
    camera! : number[];
    portaSlot!: number[];
    sensor! : number[];
    nomeImagem! : string;
    marca! : string;
    nome! : string;
    anoLancamento! : any;
    armazenamento! : number;
    ram! : number;
    preco! : number;
    estoque! : number;
}
