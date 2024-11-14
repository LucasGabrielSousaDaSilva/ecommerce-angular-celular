import { Component, OnInit, signal } from '@angular/core';
import { Celular } from '../../../models/celular.model';
import { CelularService } from '../../../services/celular.service';
import { MatCardActions, MatCardContent, MatCardFooter, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';

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
    MatCardActions, MatCardContent, MatCardTitle, MatCardFooter],
  templateUrl: './celular-card-list.component.html',
  styleUrl: './celular-card-list.component.css'
})
export class CelularCardListComponent implements OnInit {
  celulars: Celular[] = [];
  cards = signal<Card[]>([]);

  constructor(private celularService: CelularService) {

  }
  ngOnInit(): void {
    this.carregarCelulars();
  }

  carregarCelulars() {
    // buscando as celulars
    this.celularService.findAll(0,10).subscribe (data => {
      this.celulars = data;
      this.carregarCards();
    })
  }

  carregarCards() {
    const cards: Card[] = [];
    this.celulars.forEach(celular => {
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