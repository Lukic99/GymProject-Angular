import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../model/Client';
import { ClientServiceService } from '../services/client-service.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-edit-training-log',
  templateUrl: './edit-training-log.component.html',
  styleUrls: ['./edit-training-log.component.scss']
})
export class EditTrainingLogComponent implements OnInit {

  public client!: Client;

  constructor(private clientService: ClientServiceService, private router:Router,private toastr: ToastrService) {
    if (localStorage.getItem("trainingLogClientId")) {
      let id = localStorage.getItem("trainingLogClientId")
      clientService.getClient(id).subscribe(resp =>{  // map(rez=> this.client=rez??????)
        this.client = resp 
      }); 
    }
  }

  ngOnInit(): void {
  }

 
  saveChangess(value:string){
    console.log(value)
    this.clientService.changeTrainingLog(this.client.id, value).subscribe(val => console.log("new Log: "+val));
    localStorage.removeItem('trainingLogClientId')
    this.toastr.success("Training record updated","Success")
    this.router.navigate(['clients/list'])
  }
}
