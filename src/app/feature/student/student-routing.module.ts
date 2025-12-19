import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { StudentViewComponent } from './student-view/student-view.component';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent
  },
  {
    path: 'student',
    component: ViewComponent
  },
  {
    path: 'student/create',
    component: CreateComponent
  },
  {
    path: 'student/edit/:id',
    component: CreateComponent
  },
  {
    path:'student/view/:id',
    component: StudentViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
