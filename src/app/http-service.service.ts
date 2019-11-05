import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
  
@Injectable({
	providedIn: 'root'
})
export class HttpServiceService{
  
    constructor(private http: HttpClient){ }
    //baseUrl="http://localhost:8090";
  //  baseUrl="http://testdb.std-763.ist.mospolytech.ru";
    baseUrl="http://dbhost.trelloiii.site";
    headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    });
    options = { headers: this.headers };
    getMainData(){
      return this.http.get(this.baseUrl,this.options).toPromise();
    }
    getSchemaTables(param:string){
      return this.http.get(`${this.baseUrl}/schema?name=${param}`,this.options).toPromise();
    }
    getTable(name:string,schemaName:string){
      if(name!==undefined)
        return this.http.get(`${this.baseUrl}/table?name=${name}&schemaName=${schemaName}`,this.options).toPromise();
    }
    updateField(schemaName:string,where:number,value:string,table:string,col:string){
      return this.http.get(`${this.baseUrl}/update/field?schemaName${schemaName}&where=${where}&value=${value}&table=${table}&col=${col}`,this.options).toPromise();
    }
    updateQuery(obj){
      
      const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
     // return this.http.get(`http://localhost:8080/test?json=${encodeURIComponent(JSON.stringify(obj))}`).toPromise();
     return this.http.post(`${this.baseUrl}/test`,obj,this.options).toPromise();
    }
    createTable(obj){
      // return this.http.get(`http://localhost:8080/testTable?json=${encodeURIComponent(JSON.stringify(obj))}`).toPromise();
      return this.http.post(`${this.baseUrl}/testTable`,obj,this.options).toPromise();
    }
    insertToTable(obj){
     // return this.http.get(`http://localhost:8080/insert?json=${encodeURIComponent(JSON.stringify(obj))}`).toPromise();
      return this.http.post(`${this.baseUrl}/insert`,obj,this.options).toPromise();
    }
    deleteTable(schemaName,tableName){
      return this.http.get(`${this.baseUrl}/delete?schemaName=${schemaName}&tableName=${tableName}`,this.options).toPromise();
    }
    addSchema(schemaName){
      return this.http.get(`${this.baseUrl}/newSchema?schemaName=${schemaName}`,this.options).toPromise();
    }
    // getData(param:string){
        
    // }
    // postData(param:Object){
    //     //const body={message:param.message,from:param.from};
    //     return this.http.post('http://server.std-763.ist.mospolytech.ru/GuestBook.php',param,{responseType:"text"}).toPromise();
    // }
    // getGuests(param:string){
    //     return this.http.get('http://server.std-763.ist.mospolytech.ru/getGuests.php?user='+param).toPromise();
    // }

    // getShips(param:string){
    //     return this.http.get('http://server.std-763.ist.mospolytech.ru/getShips.php?user='+param).toPromise();
    // }
    // getProfiles(param:string){
    //     return this.http.get('http://server.std-763.ist.mospolytech.ru/getProfiles.php?user='+param).toPromise();
    // }
    // getGalery(param:string){
    //     return this.http.get('http://server.std-763.ist.mospolytech.ru/getGallery.php?user='+param).toPromise();
    // }
}