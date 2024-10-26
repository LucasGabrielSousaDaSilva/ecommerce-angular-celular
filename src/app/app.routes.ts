import { Routes } from '@angular/router';
import { clienteResolver } from "./components/cliente/resolver/cliente.resolver";
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from "./components/cliente/cliente-list/cliente-list.component";
import { telaResolver } from './components/tela/tela.resolver';
import { TelaFormComponent } from './components/tela/tela-form/tela-form.component';
import { TelaListComponent } from './components/tela/tela-list/tela-list.component';
import { CameraFormComponent } from './components/camera/camera-form/camera-form.component';
import { CameraListComponent } from './components/camera/camera-list/camera-list.component';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { PortaSlotFormComponent } from './components/portaSlot/portaSlot-form/portaSlot-form.component';
import { PortaSlotListComponent } from './components/portaSlot/portaSlot-list/portaSlot-list.component';


export const routes: Routes = [

    {path: 'clientes/edit/:id', component: ClienteFormComponent, resolve:{Cliente: clienteResolver}},
    {path: 'clientes', component: ClienteListComponent, title: 'Lista de Clientes'},
    {path: 'clientes/new', component: ClienteFormComponent, title: 'Novos Clientes'},
    {path: 'telas/edit/:id', component: TelaFormComponent, resolve:{Telas: telaResolver}},
    {path: 'telas', component: TelaListComponent, title: 'Lista de Telas'},
    {path: 'telas/new', component: TelaFormComponent, title: 'Novos Telas'},
    {path: 'cameras', component: CameraListComponent, title: 'Lista de Cameras'},
    {path: 'cameras/new', component: CameraFormComponent, title: 'Novos Cameras'},
    {path: 'funcionarios', component: FuncionarioListComponent, title: 'Lista de Funcionarios'},
    {path: 'funcionarios/new', component: FuncionarioFormComponent, title: 'Novos Funcionarios'},
    {path: 'portasSlots', component: PortaSlotListComponent, title: 'Lista de PortasSlots'},
    {path: 'portasSlots/new', component: PortaSlotFormComponent, title: 'Novos PortasSlots'},
];
