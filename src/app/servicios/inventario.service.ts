import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosI } from '../modelos/productos.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  url:string = 'http://host.docker.internal:8080/inventario/';

  constructor(private http:HttpClient) { }

  getById(id:number): Observable<ProductosI>{
    let direccion = this.url + id;
    return this.http.get<ProductosI>(direccion);
  }

  getByNameOrRef(name:string): Observable<ProductosI[]>{
    let direccion = this.url + "search/" + name;
    return this.http.get<ProductosI[]>(direccion);
  }

  getByRef(reference:string): Observable<ProductosI>{
    let direccion = this.url + "ref/" + reference;
    return this.http.get<ProductosI>(direccion);
  }

  updateProduct(id: number, productData: ProductosI): Observable<ProductosI> {
    let direccion = this.url + id;
    return this.http.put<ProductosI>(direccion, productData);
  }

  deleteProduct(id: number): Observable<ProductosI> {
    let direccion = this.url + id;
    return this.http.delete<ProductosI>(direccion);
  }

  createProduct(productData: ProductosI){
    return this.http.post<ProductosI>(this.url, productData);
  }

  updateProductImage(id: number, file: File) {
    let direccion = `${this.url}${id}/imagen`;
    console.log(direccion);
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(direccion, formData);
  }
}
