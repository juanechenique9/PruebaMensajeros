import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {Vacante} from 'src/app/modelo/bloque'
import {BloqueService} from 'src/app/services/bloque.service' 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  @Input() vacantes: Array<Vacante>
  @Input() criterios: Array<String>
  @Input() criteriosSeleccionados: Array<String>
  @Input() agregarCriterio: (criterio: string) => void;
  @Input() quitarCriterio: (criterio: string) => void;
  @Input() limpiarCriterios: () => void;

  constructor(public bloqueInjection: BloqueService) { }

  ngOnInit(): void {
   //
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.vacantes);
  }

}
