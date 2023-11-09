import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = "http://localhost:8080/api/send";

  constructor(private http: HttpClient) { }

  sendEmailWithAttachment(emailData: any) {
    return this.http.post<any>(this.apiUrl, emailData);
  }
}
