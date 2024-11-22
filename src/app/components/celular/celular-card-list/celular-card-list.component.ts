import { Component, OnInit, signal } from '@angular/core';
import { Celular } from '../../../models/celular.model';
import { CelularService } from '../../../services/celular.service';
import { MatCardActions, MatCardContent, MatCardFooter, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';

type Card = {
  titulo: string;
  marca: string
  preco: number
  imageUrl: string
}

@Component({
  selector: 'app-celular-card-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, 
    MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, MatCardModule, MatPaginatorModule, MatInputModule,
    MatIconModule, FormsModule, MatFormField],
  templateUrl: './celular-card-list.component.html',
  styleUrls: ['./celular-card-list.component.css']
})
export class CelularCardListComponent implements OnInit {
  celulares: Celular[] = [];
  cards = signal<Card[]>([]);

  totalRecords = 0;
  pageSize = 4;
  page = 0;

  filtro: string = '';

  constructor(private celularService: CelularService) {

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
    // Lógica de filtragem
    console.log('Filtro aplicado:', this.filtro);
    // Aqui você pode adicionar a lógica para filtrar os cards com base no valor de `filtro`
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
        imageUrl: this.celularService.getUrlImage(celular.nomeImagem)
      })
    });
    this.cards.set(cards);
  }

  

}