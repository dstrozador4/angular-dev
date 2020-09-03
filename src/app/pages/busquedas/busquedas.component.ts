import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [],
})
export class BusquedasComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ termino }) => {
      this.busquedaGlobal(termino);
    });
  }

  busquedaGlobal(termino: string) {
    this.busquedasService.busquedaGlobal(termino).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
    });
  }

  abrirMedico(medico: Medico) {}
}
