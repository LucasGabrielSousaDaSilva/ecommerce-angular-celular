import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { MenuComponent } from '../../../pagina/home/menu/menu.component';
import { HeaderComponent } from '../../../pagina/home/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-template',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MenuComponent, RouterOutlet],
  templateUrl: './user-template.component.html',
  styleUrl: './user-template.component.css'
})
export class UserTemplateComponent {

}