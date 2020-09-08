import { Component, OnInit } from '@angular/core';
import { PlantaService } from '../../services/planta.service';
import { PlantaModel } from '../../Model/Planta.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrls: ['./plantas.component.css']
})
export class PlantasComponent implements OnInit {
  plantas: PlantaModel[] = [];
  cargando = true;


  constructor(private PlantaService: PlantaService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.PlantaService.getPlantas()
    .subscribe( resp => {
      this.plantas = resp;
      this.cargando = false;
    });
  }
  borrarplanta( planta: PlantaModel, i: number ) {
    Swal.fire({
      title: '¿Esta seguro?',
      text:  `Esta seguro que desea borrar a ${planta.depatamento}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.plantas.splice(i, 1);
        this.PlantaService.borrarplanta( planta.id).subscribe();

      }
    });
  }

}
