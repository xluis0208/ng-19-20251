import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

export interface Paciente {
  id: number;
  nombre: string;
  edad: number;
  sexo: string;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  protected title = 'proyecto-salud-mat';
  pacientes: Paciente[] = [];
  pacienteForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pacienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      sexo: ['', Validators.required]
    });
  }
  agregarPaciente() {
    if (this.pacienteForm.valid) {
      const nuevoPaciente: Paciente = {
        id: this.pacientes.length + 1,
        ...this.pacienteForm.value
      };
      this.pacientes.push(nuevoPaciente);
      this.pacienteForm.reset();
    }
  }
  eliminarPaciente(id: number) {
    this.pacientes = this.pacientes.filter(p => p.id !== id);
  }
}
