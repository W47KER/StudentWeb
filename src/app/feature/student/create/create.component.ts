import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StudentService } from '../../../core/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../../../core/services/upload.service';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit, OnDestroy {
  // base url 
  private baseUrl: string = environment.apiBaseUrl;

  // subscription
  private serviceXhr: Subscription = new Subscription();
  
  public form!: FormGroup;
  public previewUrl: string | null = null;
  private editingId?: number;
  public saveLoader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private upload: UploadService
  ) {
    this.generateForm()
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.editingId = Number(id);
          this.loadStudent(this.editingId);
        }
      })
  }

  ngOnDestroy(): void {
    this.serviceXhr.unsubscribe();
  }

  generateForm() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      rollNumber: [null, [Validators.required, Validators.min(0)]],
      gender: [''],
      email: ['', [Validators.required, Validators.email]],
      profilePhoto: ['']
    });
  }

  private loadStudent(id: number): void {
    this.serviceXhr =  this.service.getStudentById(id).subscribe({
        next: (res: any) => {
          this.form.patchValue({
            firstName: res.firstName ?? '',
            lastName: res.lastName ?? '',
            rollNumber: res.rollNumber ?? null,
            gender: res.gender ?? '',
            email: res.email ?? '',
            profilePhoto: res.profilePhoto ?? ''
          });
          if (res.profilePhoto) {
            this.previewUrl = this.baseUrl + res.profilePhoto;
          }
        },
        error: (err: any) => {
          alert(err.error?.message || 'Unable to load student data.');
          this.router.navigate(['/student']);
        }
      })
  }

  onFileChange(event: Event): void {
    let input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length) {
      return;
    }
    const file = input.files[0];
    // call upload profile api
    this.serviceXhr = this.upload.uploadProfilePhoto(file).subscribe({
      next: (res: any) => {
        this.form.patchValue({  profilePhoto: res.url });
        this.previewUrl = this.baseUrl + res.url;
      },
      error: (err: any) => {
        input.value = '';
        alert(err.error?.message || 'Unable to upload profile photo.');
      }
    });

  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      ...this.form.value,
      rollNumber: Number(this.form.value.rollNumber)
    };

    this.saveLoader = true;
    if (this.editingId) {
     this.serviceXhr =  this.service.updateStudent(this.editingId, payload).subscribe({
          next: (res: any) => {
            this.saveLoader = false;
            alert(res?.message || 'Student updated successfully.');
            this.router.navigate(['/student']);
          },
          error: (err: any) => {
            this.saveLoader = false;
            alert(err.error?.message || 'Unable to update student.');
          }
        })
    } else {
       this.serviceXhr = this.service.createStudent(payload).subscribe({
          next: (res: any) => {
            this.saveLoader = false;
            alert(res?.message || 'Student created successfully.');
            this.router.navigate(['/student']);
          },
          error: (err: any) => {
            this.saveLoader = false;
            alert(err.error?.message || 'Unable to create student.');
          }
        })
    }
  }

  reset(): void {
    this.form.reset();
    this.previewUrl = null;
  }

  cancel(): void {
    this.router.navigate(['/student']);
  }

  // convenience getter for template
  get f() {
    return this.form.controls;
  }

}
