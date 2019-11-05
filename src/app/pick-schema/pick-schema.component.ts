import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pick-schema',
  templateUrl: './pick-schema.component.html',
  styleUrls: ['./pick-schema.component.scss']
})
export class PickSchemaComponent implements OnInit {

  mainObj;
  schemas=[];
  schemaName="";
  constructor(private hp:HttpServiceService,private http: HttpClient,private router: Router){

  }
   ngOnInit(){
    if(sessionStorage.getItem('token')===null){
      this.router.navigate(['/login']);
    }
     this.loadSchemas();
   }

   loadSchemas(){
    this.getMain().then(()=>{
      console.log(this.mainObj.schemas);
      //this.model
     // this.schemas=this.mainObj.schemas;
      for (let i=0;i<this.mainObj.schemas.length;i++) {
        if(this.mainObj.schemas[i]!=="sys"&&
           this.mainObj.schemas[i]!=="mysql"&&
           this.mainObj.schemas[i]!=="information_schema"&&
           this.mainObj.schemas[i]!=="performance_schema")
           {
           this.schemas.push(this.mainObj.schemas[i]);
           }    
      }
      console.log(this.schemas)
    });
   }

  async getMain(){
    this.mainObj=await this.hp.getMainData();
  }
  

  addSchema(){
    console.log(this.schemaName);
    this.hp.addSchema(this.schemaName).then(resolve=>{
      this.mainObj=null;
      this.schemas=[];
      this.loadSchemas();
    },reject=>{
      console.log(reject);
    });
  }

}
