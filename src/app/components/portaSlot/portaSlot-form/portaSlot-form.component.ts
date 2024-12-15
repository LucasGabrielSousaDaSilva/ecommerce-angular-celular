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
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) {
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
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const portaSlot = this.formGroup.value;
      console.log('Dados enviados no formulário:', portaSlot); // Adicione este log
      const operacao = portaSlot.id == null
        ? this.portaSlotService.create(portaSlot)
        : this.portaSlotService.update(portaSlot);
  
      operacao.subscribe({
        next: () => {
          this.router.navigateByUrl('/admin/portaSlots');
          this.snackBar.open('O Porta Slot foi salva com Sucesso!!', 'Fechar', {duration: 3000});
        },
        error: (err) => {
          console.log('Erro ao Salvar' + JSON.stringify(err));
          this.snackBar.open('Erro ao tentar salvar o Porta Slot', 'Fechar', {duration: 3000});
        }
      });
    }
  }
}