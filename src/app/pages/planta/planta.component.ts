import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PlantaModel } from '../../Model/Planta.model';
import { PlantaService } from '../../services/planta.service';

import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planta',
  templateUrl: './planta.component.html',
  styleUrls: ['./planta.component.css']
})
export class PlantaComponent implements OnInit {

  planta = new PlantaModel();




  Departamento: any[] = [
    {
      Departamento: 'Aglonemas',
      subDivision: 'Foliage',
      Division: 'Exp. EE.UU',
      Glower: 'Daniela Barzola'
    },
    {
      Departamento: 'Costa Colors',
      subDivision: 'Foliage',
      Division: 'Exp. EE.UU',
      Glower: 'Patricia Cordero'
    },
    {
      Departamento: 'NPI',
      subDivision: 'Foliage',
      Division: 'Exp. EE.UU',
      Glower: 'Patricia Codero'
    },
    {
      Departamento: 'Bosai',
      subDivision: 'Foliage',
      Division: 'Exp. EE.UU',
      Glower: 'Michael Remy'
    },
  ];


  constructor( private PlantaService: PlantaService,
               private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.PlantaService.getplanta(id)
       .subscribe((resp: PlantaModel)=> {
         this.planta = resp;
         this.planta.id = id;
       });
    }
  }

  guardar( form: NgForm ) {
    if (form.invalid){
      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();


    let peticion: Observable<any>;

    if ( this.planta.id) {
      peticion = this.PlantaService.actualizarPlanta(this.planta);

    }else {
       peticion = this.PlantaService.crearPlanta(this.planta);
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.planta.depatamento,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });

    });



    this.PlantaService.crearPlanta( this.planta )
    .subscribe(resp => {
      console.log(resp);
    });


  }

}
