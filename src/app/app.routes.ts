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
import { telaResolver } from './components/tela/tela.resolver';
import { TelaFormComponent } from './components/tela/tela-form/tela-form.component';
import { TelaListComponent } from './components/tela/tela-list/tela-list.component';
import { ProcessadorFormComponent } from './components/processador/processador-form/processador-form.component';
import { ProcessadorListComponent } from './components/processador/processador-list/processador-list.component';
import { processadorResolver } from './components/processador/processador.resolver';
import { CelularFormComponent } from './components/celular/celular-form/celular-form.component';
import { CelularListComponent } from './components/celular/celular-list/celular-list.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { CelularCardListComponent } from './components/celular/celular-card-list/celular-card-list.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { LoginComponent } from './components/login/login.component';
import { CelularDetalhesComponent } from './components/celular/celular-detalhes/celular-detalhes.component';
import { HomeComponentComponent } from './pagina/home/home-component/home-component.component';
import { celularResolver } from './components/celular/celular.resolver';
import { clienteResolver } from './components/cliente/resolver/cliente.resolver';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guard/auth.guard';
import { SensorListComponent } from './components/sensor/sensor-list/sensor-list.component';
import { SensorFormComponent } from './components/sensor/sensor-form/sensor-form.component';
import { sensorResolver } from './components/sensor/resolver/sensor.resolver';
import { SerieListComponent } from './components/serie/serie-list/serie-list.component';
import { SerieFormComponent } from './components/serie/serie-form/serie-form.component';
import { serieResolver } from './components/serie/serie.resolver';

export const routes: Routes = [
    { 
        path: 'admin', 
        component: AdminTemplateComponent, 
        title: 'e-commerce',
        // canActivate: [authGuard],
        children: [

    {path: '', pathMatch: 'full', redirectTo: 'clientes'},

    {path: 'clientes/edit/:id', component: ClienteFormComponent, resolve:{Cliente: clienteResolver}},
    {path: 'clientes', component: ClienteListComponent, title: 'Lista de Clientes'},
    {path: 'clientes/new', component: ClienteFormComponent, title: 'Novo Cliente'},
    {path: 'funcionarios',component: FuncionarioListComponent, title: 'Lista de Funcionarios'},
    {path: 'funcionarios/new',component: FuncionarioFormComponent, title: 'Novo Funcionario'},
    {path: 'cameras',component: CameraListComponent, title: 'Lista de Cameras'},
    {path: 'cameras/new',component: CameraFormComponent, title: 'Nova Camera'},
    {path: 'portaSlots',component: PortaSlotListComponent, title: 'Lista de Portas'},
    {path: 'portaSlots/new',component: PortaSlotFormComponent, title: 'Nova Porta'},
    {path: 'telas/edit/:id', component: TelaFormComponent, resolve:{Telas: telaResolver}},
    {path: 'telas', component: TelaListComponent, title: 'Lista de Telas'},
    {path: 'telas/new', component: TelaFormComponent, title: 'Novo Tela'},
    {path: 'processadores/edit/:id', component: TelaFormComponent, resolve:{Processador: processadorResolver}},
    {path: 'processadores', component: ProcessadorListComponent, title: 'Lista de processadores'},
    {path: 'processadores/new', component: ProcessadorFormComponent, title: 'Novo processadore'},
    {path: 'celulares',component: CelularListComponent, title: 'Lista de Celulares'},
    {path: 'celulares/new',component: CelularFormComponent, title: 'Novo Celular'},
    {path: 'celulares/edit/:id',component: CelularFormComponent, resolve:{Celular: celularResolver}},
    {path: 'sensores', component: SensorListComponent, title: 'Lista de Sensores'},
    {path: 'sensores/new', component: SensorFormComponent, title: 'Novo Sensor'},
    {path: 'sensores/edit/:id', component: SensorFormComponent, resolve:{Sensor: sensorResolver}},
    {path: 'series', component: SerieListComponent, title: 'Lista de Series'},
    {path: 'series/new', component: SerieFormComponent, title: 'Nova Serie'},
    {path: 'series/edit/:id', component: SerieFormComponent, resolve:{Serie: serieResolver}},
        ]
    },
    { 
        path: 'user', 
        component: UserTemplateComponent,
        title: 'e-commerce',
        // canActivate: [authGuard],
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'ecommerce'},
        
            { path: 'ecommerce', component: CelularCardListComponent, title: 'Lista de Cards de Celulares'},
            { path: 'ecommerce/:id', component: CelularDetalhesComponent, title: 'Detalhes'},
            { path: 'login', component: LoginComponent, title: 'Login'},
            {path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho'}
        ]
    },
    {
    path: '',
    component: HomeComponentComponent,
    title: 'e-commerce',
    children: [
        { path: '', pathMatch: 'full', redirectTo: 'home' },
        { path: 'home', component: CelularCardListComponent, title: 'Lista de Cards de Celulares' },
        { path: 'login', component: LoginComponent, title: 'Login' },
        {path: 'register', component: RegisterComponent, title: 'Register'}
    ]
}
];
