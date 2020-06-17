import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogMessageFormat  } from 'logging-format';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  backEndUrl = 'http://localhost:3400/messages';
  messages = [];

  constructor(private http: HttpClient) { 
    this.getAll().subscribe(data => this.messages = data);
  }

  getAll(){
    return this.http.get<LogMessageFormat[]>(this.backEndUrl);
  }

  
}
