import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogMessageFormat  } from 'logging-format';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  backEndUrl = 'http://localhost:3400/messages';
  messages = [];

  constructor(private http: HttpClient) {
    this.getLogData()
  }
  
  /**
   * fetch the log messages from localhost:3400/messages and push them into the messages array
   */
  getLogData(){
    this.http.get<LogMessageFormat[]>(this.backEndUrl).subscribe(data => this.messages = data);
  }

  
}
