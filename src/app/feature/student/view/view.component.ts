import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentService } from '../../../core/services/student.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit, OnDestroy {
  // base url
  public baseUrl: string = environment.apiBaseUrl; // Adjust according to your environment
  // student data 
  public students: any[] = [];
  public totalStudents: number = 0;
  public loader: boolean = true;
  public errorMessage: string = '';

  // subscriptions 
  private serviceXhr: Subscription = new Subscription();

  constructor(
    private service: StudentService,
    private router: Router
  ) {
    
  }

  ngOnDestroy(): void {
    this.serviceXhr.unsubscribe();
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.students = [];
    this.loader = true;
    this.serviceXhr = this.service.getStudents().subscribe({
      next: (res: any) => {
        this.loader = false;
        this.students = res;
        this.totalStudents = res.length;
      },
      error: (err: any) => {
        this.loader = false;
        alert(err.error?.message || 'Unable to fetch student data.');
        this.errorMessage = err?.message || 'Unable to fetch student data.';
      }
    });
  }

  deleteStudent(id: number): void {
    if(confirm('Are you sure you want to delete this student?')) {
      this.serviceXhr =  this.service.deleteStudent(id).subscribe({
        next: (res: any) => {
          alert(res?.message || 'Student deleted successfully.');
          this.loadStudents();
        },
        error: (err: any) => {
          alert(err.error?.message || 'Unable to delete student.');
        }
      }); 
    }
  }

  editStudent(id: number): void {
    this.router.navigate([`/student/edit/${id}`]);
  }

  viewStudent(id: number): void {
    this.router.navigate([`/student/view/${id}`]);
  }

  createStudent(): void {
    this.router.navigate(['/student/create']);
  }
}
