import { Component, OnInit, signal } from '@angular/core';
import { Celular } from '../../../models/celular.model';
import { CelularService } from '../../../services/celular.service';
import { MatCardActions, MatCardContent, MatCardFooter, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarrinhoService } from '../../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';

type Card = {
  titulo: string;
  marca: string;
  preco: number;
  imageUrl: string;
  id: number;
}



@Component({
  selector: 'app-celular-card-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, 
    MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, MatCardModule, MatPaginatorModule, MatFormField, MatInputModule,
    MatIconModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './celular-card-list.component.html',
  styleUrls: ['./celular-card-list.component.css']
})
export class CelularCardListComponent implements OnInit {

  precoMin: number | null = null;
  precoMax: number | null = null;

  celulares: Celular[] = [];
  cards = signal<Card[]>([]);

  totalRecords = 0;
  pageSize = 4;
  page = 0;

  filtro: string = '';

  constructor(private celularService: CelularService, 
    private carrinhoService: CarrinhoService, 
    private snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    this.carregarCelulars();

    this.celularService.findAll(this.page, this.pageSize).subscribe(data => {
      this.celulares = data;
    });

    this.celularService.count().subscribe(data => {
      this.totalRecords = data;
    });
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  filtrar() {
  if (this.precoMin != null && this.precoMax != null && this.precoMin > this.precoMax) {
    this.showSnackbarTopPosition("O preço mínimo não pode ser maior que o preço máximo.");
    return;
  }
  const filtroLowerCase = this.filtro.toLowerCase();

  const filteredCards = this.celulares
    .filter((celular) => {
      const nomeMatch = celular.nome.toLowerCase().includes(filtroLowerCase);
      const precoMatch =
        (this.precoMin == null || celular.preco >= this.precoMin) &&
        (this.precoMax == null || celular.preco <= this.precoMax);
      return nomeMatch && precoMatch;
    })
    .map((celular) => ({
      titulo: celular.nome,
      marca: celular.marca,
      preco: celular.preco,
      imageUrl: this.celularService.getUrlImage(celular.nomeImagem),
      id: celular.id,
    }));

  this.cards.set(filteredCards);
}

  // Método para retornar os cards filtrados
  getFilteredCards() {
    if (!this.filtro) {
      return this.cards;
    }
    return this.cards().filter((card: Card) => card.titulo.toLowerCase().includes(this.filtro.toLowerCase()));
  }

  carregarCelulars() {
    // buscando as celulars
    this.celularService.findAll(0,10).subscribe (data => {
      this.celulares = data;
      this.carregarCards();
    })
  }

  carregarCards() {
    const cards: Card[] = [];
    this.celulares.forEach(celular => {
      cards.push({
        titulo: celular.nome,
        marca: celular.marca,
        preco: celular.preco,
        imageUrl: this.celularService.getUrlImage(celular.nomeImagem),
        id: celular.id
      })
    });
    this.cards.set(cards);
  }

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('produto adicionado ao carrinho');
    this.carrinhoService.adicionar({
      id: card.id,
      nome: card.titulo,
      preco: card.preco,
      quantidade: 1,
      imagem: card.imageUrl
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
