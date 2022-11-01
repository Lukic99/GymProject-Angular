import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register-new-client/register.component';
import { ClientComponent } from './client-list-item/client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { TrainingComponent } from './training/training.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTrainingComponent } from './add-training/add-training.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { EditTrainingLogComponent } from './edit-training-log/edit-training-log.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guard/AuthGuard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClientComponent,
    ClientListComponent,
    TrainingComponent,
    TrainingListComponent,
    AddTrainingComponent,
    EditTrainingLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxMatTimepickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    DatePipe, 
    {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi:true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
