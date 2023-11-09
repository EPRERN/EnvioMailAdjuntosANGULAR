import { Component } from '@angular/core';
import { ServicesService } from './services.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ServicesService]
})
export class AppComponent {
  formData = {
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    email: '',
    descripcion: ''
  };
  files: File[] = [];
  maxSize: number = 10 * 1024 * 1024; // 10 MB en bytes
  errorMessage: string = '';
  isButtonDisabled: boolean = false;


  constructor(private http: HttpClient) {}

 
  enviarFormulario() {
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].size > this.maxSize) {
        this.errorMessage = 'El tamaño del archivo excede el límite permitido de 10MB. No se puede enviar el formulario.';
        this.isButtonDisabled = true;
        return;
      }
    }

    const formData = new FormData();
    formData.append('nombre', this.formData.nombre ?? '');
    formData.append('apellido', this.formData.apellido ?? '');
    formData.append('dni', this.formData.dni ?? '');
    formData.append('telefono', this.formData.telefono ?? '');
    formData.append('email', this.formData.email ?? '');
    formData.append('descripcion', this.formData.descripcion ?? '');
    this.files.forEach((file, index) => {
      formData.append('files', file, file.name);
    });

    this.http.post('http://localhost:3000/send-email', formData)
      .subscribe((response) => {
        console.log('Correo electrónico enviado con éxito');
      }, (error) => {
        console.error('Error al enviar el correo electrónico:', error);
      });
  }

  handleFileInput(event: any) {
    this.errorMessage = '';
    this.isButtonDisabled = false; // Restablecer a falso antes de la verificación
  
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > this.maxSize) {
          this.errorMessage = 'El tamaño del archivo excede el límite permitido de 10MB. Intente comprimir los archivos, si no sabe cómo, haga clic <a href="https://www.winrar.es/soporte/compresion/40/como-comprimir-ficheros-con-winrar" target="_blank">aquí</a>.';

          this.isButtonDisabled = true; // Establecer en verdadero si un archivo excede el límite
          this.files = [];
          return;
        }
        this.files.push(files[i]);
      }
    }
  }
}
