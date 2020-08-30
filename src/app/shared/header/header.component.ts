import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
declare function customSidebar();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    customSidebar();
  }

  logout() {
    this.usuarioService.logout();
  }
}
