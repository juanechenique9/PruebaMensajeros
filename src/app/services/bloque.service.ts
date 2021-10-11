import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { R3BoundTarget } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

 // ruta: string = "https://mocki.io/v1/c8827668-59f3-401f-8004-184ec171d192"

  constructor(private http: HttpClient) { }


/* getBloque(): Observable<any>{
  return this.http.get<any>(this.ruta)
} */

async getData(): Promise<any> {

  return  await this.http.get<any>("https://mocki.io/v1/c8827668-59f3-401f-8004-184ec171d192").toPromise()



}

}
