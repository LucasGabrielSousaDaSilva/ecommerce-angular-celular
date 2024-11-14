import { Routes } from '@angular/router';
// import { clienteResolver } from "./components/cliente/resolver/cliente.resolver";
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from "./components/cliente/cliente-list/cliente-list.component";
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form.component';
import { CameraListComponent } from './components/camera/camera-list/camera-list.component';
import { CameraFormComponent } from './components/camera/camera-form/camera-form.component';
import { PortaSlotListComponent } from './components/portaSlot/portaSlot-list/portaSlot-list.component';
import { PortaSlotFormComponent } from './components/portaSlot/portaSlot-form/portaSlot-form.component';
// import { telaResolver } from './components/tela/tela.resolver';
import { TelaFormComponent } from './components/tela/tela-form/tela-form.component';
import { TelaListComponent } from './components/tela/tela-list/tela-list.component';
import { ProcessadorFormComponent } from './components/processador/processador-form/processador-form.component';
import { ProcessadorListComponent } from './components/processador/processador-list/processador-list.component';
// import { processadorResolver } from './components/processador/processador.resolver';
import { CelularFormComponent } from './components/celular/celular-form/celular-form.component';
import { CelularListComponent } from './components/celular/celular-list/celular-list.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';

export const routes: Routes = [
    { 
        path: 'admin', 
        component: AdminTemplateComponent, 
        title: 'e-commerce',
        children: [

    // {path: '', pathMatch: 'full', redirectTo: 'clientes'},

    // {path: 'clientes/edit/:id', component: ClienteFormComponent, resolve:{Cliente: clienteResolver}},
    {path: 'clientes', component: ClienteListComponent, title: 'Lista de Clientes'},
    {path: 'clientes/new', component: ClienteFormComponent, title: 'Novos Clientes'},
    {path: 'funcionarios',component: FuncionarioListComponent, title: 'Lista de Funcionarios'},
    {path: 'funcionarios/new',component: FuncionarioFormComponent, title: 'Novo Funcionario'},
    {path: 'cameras',component: CameraListComponent, title: 'Lista de Cameras'},
    {path: 'cameras/new',component: CameraFormComponent, title: 'Nova Camera'},
    {path: 'portaSlots',component: PortaSlotListComponent, title: 'Lista de Portas'},
    {path: 'portaSlots/new',component: PortaSlotFormComponent, title: 'Nova Porta'},
    // {path: 'telas/edit/:id', component: TelaFormComponent, resolve:{Telas: telaResolver}},
    {path: 'telas', component: TelaListComponent, title: 'Lista de Telas'},
    {path: 'telas/new', component: TelaFormComponent, title: 'Novos Telas'},
    // {path: 'processadores/edit/:id', component: TelaFormComponent, resolve:{Processador: processadorResolver}},
    {path: 'processadores', component: ProcessadorListComponent, title: 'Lista de processadores'},
    {path: 'processadores/new', component: ProcessadorFormComponent, title: 'Novos processadores'},
    {path: 'celulares',component: CelularListComponent, title: 'Lista de Celulares'},
    {path: 'celulares/new',component: CelularFormComponent, title: 'Novo Celular'}

        ]
    },
    { 
        path: '', 
        title: 'e-commerce',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'ecommerce'},
        
            { path: 'ecommerce', component: CelularCardListComponent, title: 'Lista de Cards de Celulares'},
        ]
    }
];
