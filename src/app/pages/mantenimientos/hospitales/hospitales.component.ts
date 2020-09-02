import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';

import { Hospital } from 'src/app/models/hospital.model';
import { error } from 'protractor';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [],
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedasService: BusquedasService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(300))
      .subscribe((img) => this.cargarHospitales());
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedasService
      .buscar('hospitales', termino)
      .subscribe((resp: Hospital[]) => {
        this.hospitales = resp;
      });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe((hospitales) => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

  guardarCambios(hospital: Hospital) {
    this.hospitalService
      .actualizarHospotal(hospital._id, hospital.nombre)
      .subscribe(
        (resp) => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        },
        (error) => {
          Swal.fire('Error', error.error.msg, 'error');
          this.cargarHospitales();
        }
      );
  }

  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Borrar hospital?',
      text: `Está a punto de borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar hospital',
    }).then((result) => {
      if (result.value) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(
          (resp) => {
            Swal.fire('Borrado!', 'El hospital ha sido borrado', 'success');
            this.cargarHospitales();
          },
          (error) => {
            Swal.fire('Error!', error.error.msg, 'error');
            this.cargarHospitales();
          }
        );
      }
    });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((resp: any) => {
        this.hospitales.push(resp.hospital);
      });
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal(
      'hospitales',
      hospital._id,
      hospital.imagen
    );
  }
}
