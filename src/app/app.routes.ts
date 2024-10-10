import { Routes } from '@angular/router';
import { clienteResolver } from "./components/cliente/resolver/cliente.resolver";
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from "./components/cliente/cliente-list/cliente-list.component";
import { telaResolver } from './components/tela/tela.resolver';
import { TelaFormComponent } from './components/tela/tela-form/tela-form.component';
import { TelaListComponent } from './components/tela/tela-list/tela-list.component';

export const routes: Routes = [

    {path: 'clientes/edit/:id', component: ClienteFormComponent, resolve:{Cliente: clienteResolver}},
    {path: 'clientes', component: ClienteListComponent, title: 'Lista de Clientes'},
    {path: 'clientes/new', component: ClienteFormComponent, title: 'Novos Clientes'},
    {path: 'telas/edit/:id', component: TelaFormComponent, resolve:{Telas: telaResolver}},
    {path: 'telas', component: TelaListComponent, title: 'Lista de Telas'},
    {path: 'telas/new', component: TelaFormComponent, title: 'Novos Telas'}
];
