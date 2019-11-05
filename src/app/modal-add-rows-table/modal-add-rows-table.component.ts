import { Component, OnInit,Input } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal-add-rows-table',
  templateUrl: './modal-add-rows-table.component.html',
  styleUrls: ['./modal-add-rows-table.component.scss']
})
export class ModalAddRowsTableComponent implements OnInit {
  @Input() clickedTable;
  @Input() name;
  table;
  tableKeys;
  Values=[];
  constructor(private hp:HttpServiceService,public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.loadTable().then(()=>{
      this.Values.push([]);
      for(let i=0;i<this.tableKeys.length;i++){
        this.Values[this.Values.length-1][i]="";
      }
      console.log(this.Values);
    });
    
  }

  async loadTable(){
    
    this.table=await this.hp.getTable(this.clickedTable,this.name);
    this.tableKeys=Object.keys(this.table.table);console.log(this.tableKeys);
  }

  insertRows(){
    let reqObj={
      schema_name:this.name,
      name:this.clickedTable,
      keys:this.tableKeys,
      values:this.Values
    }
    this.hp.insertToTable(reqObj).then(resolve=>{
      console.log(resolve);
      this.activeModal.dismiss("add");
    },reject=>{
      console.log(reject);
    });
    console.log(reqObj);
  }

  addField(){
    this.Values.push([]);
    for(let i=0;i<this.tableKeys.length;i++){
      this.Values[this.Values.length-1][i]="";
    }

    
  }

}
