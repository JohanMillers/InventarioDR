import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlantaModel } from '../Model/Planta.model';
import { map} from 'rxjs/operators';
import { Key } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class PlantaService {

  private url = 'https://inventariodr-59d91.firebaseio.com';

  constructor( private http: HttpClient ) { }

  crearPlanta(planta: PlantaModel) {
    return this.http.post(`${this.url}/inventario.json`, planta)
           .pipe(
             map( (resp: any) => {
               planta.id = resp.name;
               return planta;
             })
           );
  }
  actualizarPlanta( planta: PlantaModel ) {
    const plantaTemp = {
      ...planta
    };
    delete plantaTemp.id;
    return this.http.put(`${this.url }/inventario/${planta.id}.json`, plantaTemp);
  }
  borrarplanta(id: string) {
    return this.http.delete(`${this.url}/inventario/${ id }.json`);
  }

  getplanta(id: string) {
    return this.http.get(`${this.url}/inventario/${ id }.json`);
  }

  getPlantas() {
    return this.http.get(`${this.url}/inventario.json`)
           .pipe(
             map( this.crearArreglo)
   );

  }

  private crearArreglo(plantasObj: object) {
    const plantas: PlantaModel[] = [];

    Object.keys( plantasObj ).forEach( Key => {
      const planta: PlantaModel = plantasObj[Key];
      planta.id = Key;

      plantas.push( planta );
    });

    if ( plantasObj === null) {return []; }

    return plantas;
  }
  }

