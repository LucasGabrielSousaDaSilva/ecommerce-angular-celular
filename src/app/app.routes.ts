import { Routes } from '@angular/router';
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
import { HomeComponentComponent } from './pagina/home-component/home-component.component';
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
import { LinhaListComponent } from './components/linha/linha-list/linha-list.component';
import { LinhaFormComponent } from './components/linha/linha-form/linha-form.component';
import { funcionarioResolver } from './components/funcionario/resolver/funcionario.resolver';
import { cameraResolver } from './components/camera/camera.resolver';
import { portaSlotResolver } from './components/portaSlot/resolver/porta-slot.resolver';
import { VendaComponent } from './components/venda/venda/venda.component';
import { LoginADMComponent } from './components/loginADM/login.component';
import { RegisterADMComponent } from './components/registerADM/register.component';
import { FinalizarVendaComponent } from './components/carrinho/finalizar-venda/finalizar-venda.component';
import { HomeComponent } from './pagina/home/home.component';
import { NovidadesComponent } from './pagina/novidades/novidades.component';
import { PromocoesComponent } from './pagina/promocoes/promocoes.component';
import { ControleComponent } from './controle/controle.component';
import { linhaResolver } from './components/linha/resolver/linha.resolver';
import { RealizarPagamentoComponent } from './components/carrinho/realizar-pagamento/realizar-pagamento.component';
import { AcompanharPedidoComponent } from './components/carrinho/acompanhar-pedido/acompanhar-pedido.component';
import { authClienteGuard } from './guard/auth-cliente.guard';
import { AlterarUsernameComponent } from './components/cliente/alterar-username/alterar-username/alterar-username.component';
import { AlterarSenhaComponent } from './components/cliente/alterar-senha/alterar-senha.component';
import { ClientePerfilComponent } from './components/cliente/cliente-perfil/cliente-perfil.component';
import { ClientePedidosComponent } from './components/cliente/cliente-pedidos/cliente-pedidos.component';

export const routes: Routes = [
    { 
        path: 'admin', 
        component: AdminTemplateComponent, 
        title: 'Admin',
        // canActivate: [authGuard],
        children: [

    {path: '', pathMatch: 'full', redirectTo: 'controle'},

    // Usuarios
    {path: 'clientes/edit/:id', component: ClienteFormComponent, resolve:{cliente: clienteResolver}, canActivate: [authGuard] },
    {path: 'clientes', component: ClienteListComponent, title: 'Lista de Clientes', canActivate: [authGuard] },
    {path: 'clientes/new', component: ClienteFormComponent, title: 'Novo Cliente', canActivate: [authGuard] },
    {path: 'funcionarios/edit/:id',component: FuncionarioFormComponent, resolve:{funcionario: funcionarioResolver}, canActivate: [authGuard]},
    {path: 'funcionarios',component: FuncionarioListComponent, title: 'Lista de Funcionarios', canActivate: [authGuard]},
    {path: 'funcionarios/new',component: FuncionarioFormComponent, title: 'Novo Funcionario', canActivate: [authGuard]},

    // Produtos
    { path: 'controle', component: ControleComponent, title: 'Controle' },
    {path: 'cameras/edit/:id',component: CameraFormComponent, resolve:{camera: cameraResolver}},
    {path: 'cameras',component: CameraListComponent, title: 'Lista de Cameras'},
    {path: 'cameras/new',component: CameraFormComponent, title: 'Nova Camera'},
    {path: 'portaSlots/edit/:id',component: PortaSlotFormComponent, resolve:{portaSlot: portaSlotResolver}},
    {path: 'portaSlots',component: PortaSlotListComponent, title: 'Lista de Portas'},
    {path: 'portaSlots/new',component: PortaSlotFormComponent, title: 'Nova Porta'},
    {path: 'telas/edit/:id', component: TelaFormComponent, resolve: { tela: telaResolver }},
    {path: 'telas', component: TelaListComponent, title: 'Lista de Telas'},
    {path: 'telas/new', component: TelaFormComponent, title: 'Novo Tela'},
    {path: 'processadores/edit/:id', component: ProcessadorFormComponent, resolve:{ processador: processadorResolver }},
    {path: 'processadores', component: ProcessadorListComponent, title: 'Lista de processadores'},
    {path: 'processadores/new', component: ProcessadorFormComponent, title: 'Novo processadore'},
    {path: 'sensores', component: SensorListComponent, title: 'Lista de Sensores'},
    {path: 'sensores/new', component: SensorFormComponent, title: 'Novo Sensor'},
    {path: 'sensores/edit/:id', component: SensorFormComponent, resolve:{sensor: sensorResolver}},
    {path: 'series', component: SerieListComponent, title: 'Lista de Series'},
    {path: 'series/new', component: SerieFormComponent, title: 'Nova Serie'},
    {path: 'series/edit/:id', component: SerieFormComponent, resolve:{serie: serieResolver}},
    {path: 'linhas', component: LinhaListComponent, title: 'Lista de Linhas'},
    {path: 'linhas/new', component: LinhaFormComponent, title: 'Nova Linha'},
    {path: 'linhas/edit/:id', component: LinhaFormComponent, resolve:{linha: linhaResolver}},

    // Celulares
    {path: 'celulares',component: CelularListComponent, title: 'Lista de Celulares'},
    {path: 'celulares/new',component: CelularFormComponent, title: 'Novo Celular'},
    {path: 'celulares/edit/:id',component: CelularFormComponent, resolve:{ celular: celularResolver}},

    // Login ADM
    { path: 'loginADM', component: LoginADMComponent, title: 'Login'},
    { path: 'registerADM', component: RegisterADMComponent, title: 'Register'},

        ]
    },
    { 
        path: 'user', 
        component: UserTemplateComponent,
        title: 'Usuário',
        // canActivate: [authClienteGuard],
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'ecommerce'},
        
            { path: 'ecommerce', component: CelularCardListComponent, title: 'Lista de Cards de Celulares'},
            { path: 'ecommerce/:id', component: CelularDetalhesComponent, title: 'Detalhes'},

            // Login e Registro
            { path: 'login', component: LoginComponent, title: 'Login'},
            { path: 'alterarUsername', component: AlterarUsernameComponent, title: 'Alterando Username', canActivate: [authClienteGuard]},            
            { path: 'alterarSenha', component: AlterarSenhaComponent, title: 'Alterando Senha', canActivate: [authClienteGuard]},
            { path: 'meuPerfil', component: ClientePerfilComponent, title: 'Meu Perfil', canActivate: [authClienteGuard]},
            { path: 'meuPedido', component: ClientePedidosComponent, title: 'Meus Pedidos' },

            // Carrinho
            { path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho', canActivate: [authClienteGuard] },
            { path: 'realizarPagamento', component: RealizarPagamentoComponent, title: 'Realizar Pagamento', canActivate: [authClienteGuard] },
            { path: 'acompanharPedido', component: AcompanharPedidoComponent, title: 'Acompanhar Pedido', canActivate: [authClienteGuard] },
            { path: 'finalizarVenda', component: FinalizarVendaComponent, title: 'Finalizar Pedido'},
            { path: 'venda', component: VendaComponent, title: 'Finalizar Venda' },
            
        ]
    },
    {
    path: '',
    component: HomeComponentComponent,
    title: 'e-commerce',
    children: [
        { path: '', pathMatch: 'full', redirectTo: 'home' },

        { path: 'home', component: HomeComponent, title: 'Home' },
        {path: 'novidades', component: NovidadesComponent, title: 'Novidades'},
        {path: 'promocoes', component: PromocoesComponent, title: 'Promoções'},

        // Login e Registro
        { path: 'login', component: LoginComponent, title: 'Login' },
        { path: 'register', component: RegisterComponent, title: 'Register'}
    ]
}
];