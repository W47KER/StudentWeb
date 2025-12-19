import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentService } from '../../../core/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrl: './student-view.component.scss'
})
export class StudentViewComponent implements OnInit, OnDestroy {
  // public student data
  public student: any = null;
  public loader: boolean = true;
  public viewId: number | null = null;

  // subscription
  private serviceXhr: Subscription = new Subscription();

  constructor(
  private service: StudentService,
  private router: Router,
  private route: ActivatedRoute
  ){

  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.viewId = Number(id);
          this.loadStudent(this.viewId);
        }
      })
  }



  ngOnDestroy(): void {
    this.serviceXhr.unsubscribe();  
  }

  private loadStudent(id: number): void {
    this.loader = true;
    this.serviceXhr =  this.service.getStudentById(id).subscribe({
        next: (res: any) => {
          this.loader = false;
          this.student = res;
        },
        error: (err: any) => {
          this.loader = false;
          alert(err.error?.message || 'Unable to load student data.');
          this.router.navigate(['/student']);
        }
      })
  }

  goBack(): void {
    this.router.navigate(['/student']);
  }
}
