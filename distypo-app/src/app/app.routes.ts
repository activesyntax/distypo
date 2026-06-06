import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('@app/document-view/document-view').then(m => m.DocumentView) },
  { path: 'settings', loadComponent: () => import('@app/settings/settings').then(m => m.Settings) },
  { path: 'about', loadComponent: () => import('@app/about/about').then(m => m.About) },
  { path: '**', redirectTo: '' },
];
