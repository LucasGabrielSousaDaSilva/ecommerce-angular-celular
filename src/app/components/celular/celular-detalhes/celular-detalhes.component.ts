import { Component } from '@angular/core';
import { Celular } from '../../../models/celular.model';
import { ActivatedRoute } from '@angular/router';
import { CelularService } from '../../../services/celular.service';
import { NgFor, NgIf } from '@angular/common';
import { CarrinhoService } from '../../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PortaSlot } from '../../../models/porta-slot.model';

type Card = {
  titulo: string;
  marca: string;
  preco: number;
  imageUrl: string;
  id: number;
}
@Component({
  selector: 'app-celular-detalhes',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './celular-detalhes.component.html',
  styleUrl: './celular-detalhes.component.css'
})
export class CelularDetalhesComponent {

  
  celular!: Celular;

  constructor(
    private route: ActivatedRoute,
    private celularService: CelularService,
        private carrinhoService: CarrinhoService, 
        private snackBar: MatSnackBar
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

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('produto adicionado ao carrinho');
    this.carrinhoService.adicionar({
      id: card.id,
      nome: card.titulo,
      preco: card.preco,
      quantidade: 1,
      imageUrl: card.imageUrl
    });
  }

  showSnackbarTopPosition(content: any) {
    this.snackBar.open(content, 'fechar', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

}
