import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'nova-tarefa',
    loadComponent: () => import('./nova-tarefa/nova-tarefa.page').then( m => m.NovaTarefaPage)
  },
  {
    path: 'atualiza-tarefa',
    loadComponent: () => import('./atualiza-tarefa/atualiza-tarefa.page').then( m => m.AtualizaTarefaPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
];
