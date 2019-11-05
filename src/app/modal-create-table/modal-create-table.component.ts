import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpServiceService } from 'src/app/http-service.service';
@Component({
  selector: 'app-modal-create-table',
  templateUrl: './modal-create-table.component.html',
  styleUrls: ['./modal-create-table.component.scss']
})
export class ModalCreateTableComponent implements OnInit {
  @Input() name;
  constructor(public activeModal: NgbActiveModal,private hp:HttpServiceService) { }
  table_name="";
  type_value="Type";
  types=["INT","VARCHAR","TEXT","DATE","BIGINT","DOUBLE"];
  fields=[];
  val="s";
  ngOnInit() {
    for(let i=0;i<4;i++){
      this.fields.push({
        name:"",
        type:"Type",
        length_val:"",
        isPrimaryKey:false,
        isAutoIncriment:false
      });
    }
  }

  addField(){
    this.fields.push({
      name:"",
      type:"Type",
      length_val:"",
      isPrimaryKey:false,
      isAutoIncriment:false
    });
  }

  testSendQuery(){
    
  }

  setValue(value,index){
    this.type_value=value;
    this.fields[index].type=value;
    console.log(this.type_value);
  }
  showRows(){

    let sendObj={
      schema_name:this.name,
      name:this.table_name,
      fields:[]
    }
    for (let i=0;i<this.fields.length;i++) {
      if(this.fields[i].name!=="")
        sendObj.fields.push(this.fields[i]);
    }
    console.log(sendObj);
    if(sendObj.name!==""&&sendObj.schema_name!=="")
      this.hp.createTable(sendObj).then((resolve)=>{
        console.log(resolve);
        this.activeModal.dismiss("add");
      },(reject)=>{
        console.log(reject);
      });
      
    
  }

}
