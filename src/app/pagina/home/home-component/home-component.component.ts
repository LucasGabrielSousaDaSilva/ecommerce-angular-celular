import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';
// import { CarrosselComponent } from '../carrossel/carrossel.component';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, FooterComponent, RouterOutlet],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
