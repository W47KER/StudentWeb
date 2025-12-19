import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { StudentRoutingModule } from './student-routing.module';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { StudentViewComponent } from './student-view/student-view.component';


@NgModule({
  declarations: [
    ViewComponent,
    CreateComponent,
    StudentViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StudentRoutingModule,
  ]
})
export class StudentModule { }
