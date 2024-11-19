import { Component } from '@angular/core';
import { Celular } from '../../../models/celular.model';
import { ActivatedRoute } from '@angular/router';
import { CelularService } from '../../../services/celular.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-celular-detalhes',
  standalone: true,
  imports: [NgIf],
  templateUrl: './celular-detalhes.component.html',
  styleUrl: './celular-detalhes.component.css'
})
export class CelularDetalhesComponent {

  celular!: Celular;

  constructor(
    private route: ActivatedRoute,
    private celularService: CelularService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.celularService.findById(id).subscribe(
      (data: Celular) => {
        this.celular = data;
      },
      (error) => {
        console.error('Erro ao buscar o celular:', error);
      }
    );
  }

}
