import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  uploadProfilePhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}upload/profile`, formData);
  }
}
