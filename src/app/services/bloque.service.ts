import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloqueService {

  ruta: string = "https://mocki.io/v1/c8827668-59f3-401f-8004-184ec171d192"

  constructor(private http: HttpClient) { }


getBloque(): Observable<any>{
  return this.http.get<any>(this.ruta)
}


}
