import { Component, OnInit,OnChanges, Input,NgZone } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tableview',
  templateUrl: './tableview.component.html',
  styleUrls: ['./tableview.component.scss']
})
export class TableviewComponent implements OnInit {
  @Input() name:string;
  @Input() clickedTable:string;
  table;
  tableKeys;
  prevRowValues=[];
  tableRows=[];
  readonly=[];
  updateResultMessage;
  disabledAccept=true;
  constructor(private hp:HttpServiceService,private zone:NgZone,private router: Router) { }

  ngOnInit() {
   
    //
  }
  ngOnChanges(){
    this.tableRows=[];
    if(this.clickedTable!==undefined)
      this.loadTable();
    
  }

  

  redactRow(rowIndex){
    console.log(rowIndex);
    for(let i=0;i<this.tableRows.length;i++){
      if(i==rowIndex){
        for(let j=0;j<this.tableRows[i].length;j++){
          this.readonly[i][j]=false;
          this.prevRowValues.push(this.tableRows[i][j]);
        }
      }
    }
    console.log(this.prevRowValues);
    this.disabledAccept=!this.disabledAccept;
  }
  async confirmRow(rowIndex){
    this.updateResultMessage={};
    console.log(rowIndex);
    let values=[];
    for(let i=0;i<this.tableRows.length;i++){
      if(i==rowIndex){
        for(let j=0;j<this.tableRows[i].length;j++){
          this.readonly[i][j]=true;
          values.push(this.tableRows[i][j]);
        }
      }
    }
    let count=this.prevRowValues.length;
    for(let i=0;i<this.prevRowValues.length;i++){
      if(this.prevRowValues[i]===values[i])
        count--;
    }
    console.log(count);
    if(count>0){
      let obj={
        action:"UPDATE",
        table:this.clickedTable,
        schema:this.name,
        cols:this.tableKeys,
        values:values,
        primary_key:this.tableKeys[0],
        primary_key_val:this.prevRowValues[0]
      }
      
      this.updateResultMessage= await this.hp.updateQuery(obj);
      this.nullAll();
      this.loadTable();
      console.log("Загружено!");
      console.log(this.updateResultMessage.success);
    }
    this.disabledAccept=!this.disabledAccept;
    
  }

  
  deleteRow(row){
    let obj={
      action:"DELETE",
      table:this.clickedTable,
      schema:this.name,
      cols:this.tableKeys,
      values:[],
      primary_key:this.tableKeys[0],
      primary_key_val:this.tableRows[row][0]
    }
    console.log(obj);
    this.hp.updateQuery(obj).then(resolve=>{
      console.log(resolve);
      this.nullAll();
      this.loadTable();
    },reject=>{
      console.log(reject);
    });
  }
  
  
  trackByFn(index: any, item: any) {
    return index;
 }

  nullAll(){
    this.table={};
    this.tableKeys={};
    this.tableRows=[];
    this.readonly=[];
  }

  async loadTable(){
    
    this.table=await this.hp.getTable(this.clickedTable,this.name);
    this.tableKeys=Object.keys(this.table.table);
    let index=0;
    for(let i=0; i< this.table.table[this.tableKeys[0]].length;i++){
      let bufArr=[];
      for (const i in this.table.table) {
          bufArr.push(this.table.table[i][index]); 
      }
      this.tableRows.push(bufArr);
      index++;
      console.log("1");
      console.log(this.tableRows);
      console.log(this.table);
    }
    for(let i=0;i<this.tableRows.length;i++){
      this.readonly.push([]);
      for(let j=0;j<this.tableRows[i].length;j++){
        this.readonly[i].push(true);
        console.log(this.tableRows[i][j]);
      }
    }
    console.log(this.readonly);
    }
}
    
  


