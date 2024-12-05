import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './carrossel.component.html',
  styleUrl: './carrossel.component.css'
})
export class CarrosselComponent {
  slides = [
    { image: 'assets/slide1.jpg', title: 'Promoção 1', description: 'Descontos incríveis!' },
    { image: 'assets/slide2.jpg', title: 'Novidades', description: 'Novos modelos disponíveis!' },
    { image: 'assets/slide3.jpg', title: 'Frete Grátis', description: 'Frete grátis nas compras acima de R$ 199!' }
  ];

  activeSlide = 0;

  nextSlide() {
    this.activeSlide = (this.activeSlide + 1) % this.slides.length;
  }

  previousSlide() {
    this.activeSlide = (this.activeSlide - 1 + this.slides.length) % this.slides.length;
  }

  // ngOnInit() {
  //   setInterval(() => {
  //     this.nextSlide();
  //   }, 5000); // alterna a cada 5 segundos
  // }
}
