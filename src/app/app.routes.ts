import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./feature/student/student.module').then(m => m.StudentModule)
    },
    {
    path: '**',
    redirectTo: ''
  }
];
