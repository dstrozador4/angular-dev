import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
declare function customSidebar();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario;
  public barra: HTMLElement;
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.barra = document.getElementById('busqueda');
  }

  logout() {
    this.usuarioService.logout();
  }

  mostrarBarra() {
    this.barra.style.display = 'block';
  }

  ocultarBarra() {
    this.barra.style.display = 'none';
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.router.navigateByUrl('/dashboard');
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}
