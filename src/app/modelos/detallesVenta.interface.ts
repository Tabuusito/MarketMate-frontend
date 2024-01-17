import { ProductosI } from "./productos.interface";

export interface detallesVentaI{
    id:number;
    producto:ProductosI
    cantidad:number;
    precioUnitario:number
}