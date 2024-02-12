import { VentasI } from "./ventas.interface";

export interface CajasI{
    id:number;
    primerTicket:VentasI;
    ultimoTicket:VentasI;
    fecha:Date;
    total:number;
}