import { Component, OnInit } from '@angular/core';
import {BloqueService} from 'src/app/services/bloque.service'
import {Vacante} from 'src/app/modelo/bloque'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit {

  criterios = new Array<String>();

  criteriosSeleccionados = new Array<string>();

  vacantes = new Array<Vacante>();

  vacantesFiltradas = new Array<Vacante>();

  constructor(public bloqueInjection: BloqueService) { 
    
  }
 
 
  ngOnInit(): void {   
    this.obtenerDatos()
  }

  obtenerDatos(){
    this.bloqueInjection.getBloque().subscribe(vacantes =>{
      this.vacantes = vacantes;
      this.vacantesFiltradas = vacantes;
      this.obtenerCriterios()
    })
  }

  obtenerCriterios(){
      this.criterios = this.vacantes.reduce((prev, current) => {
          current.languages.forEach(item => {
            if(prev.includes(item) === false)
            {
                prev.push(item);
            }
          });

          if(prev.includes(current.level) === false){
            prev.push(current.level);
          }

          if(prev.includes(this.capitalizeFirstLetter(current.role.toLocaleLowerCase())) === false)
          {
              prev.push(this.capitalizeFirstLetter(current.role.toLocaleLowerCase()));
          }

          return prev;
      }, []);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  agregarCriterio = (criterio: string): void => {

      if(this.criteriosSeleccionados.includes(criterio) === false)
      {
          this.criteriosSeleccionados.push(criterio);
          this.aplicarFiltros();
      }
      
      console.log(this.criteriosSeleccionados);
  }

  quitarCriterio = (criterio: string): void => {
    if(this.criteriosSeleccionados.includes(criterio) === true){
      this.criteriosSeleccionados = this.criteriosSeleccionados.filter(item => {
        if(item !== criterio){
            return item;
        }
      });
    }

    this.aplicarFiltros();
  }

  limpiarCriterios = (): void => {
    this.criteriosSeleccionados = [];
    this.aplicarFiltros();
  }

  aplicarFiltros = () => {
      this.vacantesFiltradas = this.vacantes
      if(this.criteriosSeleccionados.length > 0){
          this.vacantesFiltradas = this.vacantes.filter(item => {
              const tags = this.obtenerCriteriosDeVacante(item);

              let cantidadCriteriosCumplidos = 0;

              this.criteriosSeleccionados.forEach(criterio => {
                tags.forEach(tag => {
                   if(tag === criterio){
                      cantidadCriteriosCumplidos = cantidadCriteriosCumplidos + 1;  
                   }
                });
              });

              if(cantidadCriteriosCumplidos === this.criteriosSeleccionados.length){
                return item;
              }
              
          });
      }
  }

  obtenerCriteriosDeVacante(item){
    let criterios = [];
    item.languages.forEach(item => {
      if(criterios.includes(item) === false)
      {
          criterios.push(item);
      }
    });

    if(criterios.includes(item.level) === false){
      criterios.push(item.level);
    }

    if(criterios.includes(this.capitalizeFirstLetter(item.role.toLocaleLowerCase())) === false)
    {
        criterios.push(this.capitalizeFirstLetter(item.role.toLocaleLowerCase()));
    }

    return criterios;
  }

}
