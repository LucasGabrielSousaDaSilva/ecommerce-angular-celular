import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PortaSlotService } from '../../../services/porta-slot.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { NgIf } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { PortaSlot } from '../../../models/porta-slot.model';

@Component({
  selector: 'app-portaSlot-form',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, NgIf, MatInputModule, ReactiveFormsModule, MatCardModule, RouterModule],
  templateUrl: './portaSlot-form.component.html',
  styleUrl: './portaSlot-form.component.css'
})
export class PortaSlotFormComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private portaSlotService: PortaSlotService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.formGroup = this.formBuilder.group({
        tipo:['', Validators.required]
      }) 
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  
  initializeForm(): void {
    const portaSlot: PortaSlot = this.activatedRoute.snapshot.data['portaSlot'];
  
    this.formGroup = this.formBuilder.group({
      id: [(portaSlot && portaSlot.id) ? portaSlot.id : null],
      tipo: [(portaSlot && portaSlot.tipo) ? portaSlot.tipo : null]
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