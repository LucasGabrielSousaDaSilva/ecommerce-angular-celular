import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PortaSlotService } from '../../../services/porta-slot.service';
import { Router, RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-portaSlot-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, ReactiveFormsModule, MatCardModule, RouterModule],
  templateUrl: './portaSlot-form.component.html',
  styleUrl: './portaSlot-form.component.css'
})
export class PortaSlotFormComponent {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private portaSlotService: PortaSlotService,
    private router: Router) {
      this.formGroup = this.formBuilder.group({
        tipo:['', Validators.required]
      }) 
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const novoPortaSlot = this.formGroup.value;
      this.portaSlotService.create(novoPortaSlot).subscribe({
        next: (portaSlotCadastrado) => {
          this.router.navigateByUrl('/admin/portaSlots');
        },
        error: (err) => {
          console.log('Erro ao salvar', + JSON.stringify(err));
        }
      })
    }
  }
}