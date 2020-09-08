import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantaComponent } from './pages/planta/planta.component';
import { PlantasComponent } from './pages/plantas/plantas.component';


const routes: Routes = [
  {
    path: 'platas',
    component: PlantasComponent
  },

  {
    path: 'planta/:id',
    component: PlantaComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'platas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
