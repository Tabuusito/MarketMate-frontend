import { detallesVentaI } from "./detallesVenta.interface";

export interface VentasI{
    id:number;
    detalles:detallesVentaI[];
    fechaHora:Date;
    total:number;
}