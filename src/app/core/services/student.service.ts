import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get(`${this.baseUrl}students?${Date.now()}`);
  }
  getStudentById(id: number) {
    return this.http.get(`${this.baseUrl}student/${id}`);
  }
  createStudent(studentData: any) {
    return this.http.post(`${this.baseUrl}student`, studentData);
  }
  updateStudent(id: number, studentData: any) {
    return this.http.put(`${this.baseUrl}student/${id}`, studentData);
  }
  deleteStudent(id: number) {
    return this.http.delete(`${this.baseUrl}student/${id}`);
  }
}
