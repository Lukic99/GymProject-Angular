import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register-new-client/register.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { ClientListComponent } from './client-list/client-list.component';
import { EditTrainingLogComponent } from './edit-training-log/edit-training-log.component';
import { AuthGuard } from './guard/AuthGuard';
import { LoginComponent } from './login/login.component';
import { TrainingListComponent } from './training-list/training-list.component';

const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent,canActivate:[AuthGuard]},
  {path:'clients/trainingLog', component: EditTrainingLogComponent,canActivate:[AuthGuard]},
  {path:'clients/list', component: ClientListComponent,canActivate:[AuthGuard]},
  {path:'trainings/list', component: TrainingListComponent,canActivate:[AuthGuard]},
  {path:'trainings/add', component: AddTrainingComponent,canActivate:[AuthGuard]},
  {path:'**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
