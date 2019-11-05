import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from "@angular/common/http";
import { PickSchemaComponent } from './pick-schema/pick-schema.component';
import { MainComponent } from './main/main.component';
import { TableviewComponent } from './main/tableview/tableview.component';
import { FormsModule }   from '@angular/forms';
import {NgbModule, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateTableComponent } from './modal-create-table/modal-create-table.component';
import { ModalAddRowsTableComponent } from './modal-add-rows-table/modal-add-rows-table.component';
import { LoginComponent } from './login/login.component';
const appRoutes: Routes =[
  { path: '', component: PickSchemaComponent},
  {path:'login',component:LoginComponent},
  { path:'main/:name',component:MainComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    PickSchemaComponent,
    MainComponent,
    TableviewComponent,
    ModalCreateTableComponent,
    ModalAddRowsTableComponent,
    LoginComponent
  ],
  entryComponents:[
    ModalCreateTableComponent,
    ModalAddRowsTableComponent
  ],
  exports:[
    ModalCreateTableComponent,
    ModalAddRowsTableComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
