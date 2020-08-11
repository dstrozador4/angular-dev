import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Main',
          url: '/',
        },
        {
          titulo: 'ProgressBar',
          url: 'progress',
        },
        {
          titulo: 'Promesas',
          url: 'promises',
        },
        {
          titulo: 'Rxjs',
          url: 'rxjs',
        },
        {
          titulo: 'Gráficas',
          url: 'charts',
        },
      ],
    },
  ];

  constructor() {}
}
