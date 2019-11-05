import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute,Router} from '@angular/router';
import { HttpServiceService } from 'src/app/http-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ModalCreateTableComponent} from 'src/app/modal-create-table/modal-create-table.component';
import {ModalAddRowsTableComponent} from 'src/app/modal-add-rows-table/modal-add-rows-table.component'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private name: string;
  private subscription: Subscription;
  schemaObj;
  testResObj;
  tables=[];
  clickedTable;
  visible=true;
  constructor(private activateRoute: ActivatedRoute,private hp:HttpServiceService,private router: Router,private modalService: NgbModal) { 
    this.subscription = activateRoute.params.subscribe(params=>{
      this.name=params['name'];
    });
  }


  openSql(){
    this.visible=!this.visible;
  }

  ngOnInit() {
    console.log(sessionStorage.getItem('token'));
    this.checkAuth();
    this.getTables();
  }

  checkAuth(){
    if(sessionStorage.getItem('token')===null){
      console.log("sssss");
      this.router.navigate(['/login']);
    }
  }
  toSchemas(){
    this.router.navigate(['']);
  }
  reload(){
    this.schemaObj=null;
    this.tables=[];
    this.getTables();
  }
  logout(){
    console.log("out");
   // sessionStorage.setItem('token',null);
    sessionStorage.clear();
    this.checkAuth();
  }
  async getTables(){
    this.schemaObj=await this.hp.getSchemaTables(this.name);
    this.tables=this.schemaObj.tables;
    console.log(this.tables);
  }
  click(table){
    this.clickedTable=table;
    console.log(this.clickedTable);
  }
  async openAdd() {
    let modalRef = this.modalService.open(ModalCreateTableComponent,{size: 'lg'});
    modalRef.componentInstance.name = this.name;
   
    modalRef.result.then((result)=>{
      console.log(result);    
    },(reason)=>{
      if(reason=="add")
        this.reload();
    })
  }
  openInsert(){
    if(this.clickedTable!==undefined){
      let modalRef = this.modalService.open(ModalAddRowsTableComponent,{size: 'lg'});
      modalRef.componentInstance.name = this.name; 
      modalRef.componentInstance.clickedTable = this.clickedTable;
      modalRef.result.then(result=>{
        console.log(result);
      },reason=>{
        if(reason==="add"){
          let buf=this.clickedTable;
          this.clickedTable=this.tables[0];
          setTimeout(()=>{
            this.clickedTable=buf;
          },3)
          
          //this.clickedTable=this.clickedTable;
        }
      });
    }
  }

  deleteTable(){
    this.hp.deleteTable(this.name,this.clickedTable).then(resolve=>{
      console.log(resolve);
      this.reload();
      this.clickedTable=this.tables[0];
    },reject=>{
      console.log(reject);
    })
  }

}
