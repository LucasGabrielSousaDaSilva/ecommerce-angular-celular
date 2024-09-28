import { Routes } from '@angular/router';
import { clienteResolver } from "./components/cliente/resolver/cliente.resolver";
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from "./components/cliente/cliente-list/cliente-list.component";

export const routes: Routes = [

    {path: 'clientes/edit/:id', component: ClienteFormComponent, resolve:{Cliente: clienteResolver}},
    {path: 'clientes', component: ClienteListComponent, title: 'Lista de Clientes'},
    {path: 'clientes/new', component: ClienteFormComponent, title: 'Novos Clientes'}
];
