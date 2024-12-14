import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CelularService } from '../../../services/celular.service';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatOption } from '@angular/material/select';
import { Celular } from '../../../models/celular.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProcessadorService } from '../../../services/processador.service'; // Novo serviço
import { CommonModule } from '@angular/common';
import { TelaService } from '../../../services/tela.service';
import { PortaSlotService } from '../../../services/porta-slot.service';
import { SensorService } from '../../../services/sensor.service';
import { SerieService } from '../../../services/serie.service';
import { CameraService } from '../../../services/camera.service';
import { FormStateService } from '../../../services/form-state.service';
import { Tela } from '../../../models/tela.model';

@Component({
  selector: 'app-celular-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, 
    RouterModule, MatSelectModule, MatIconModule, MatOption
    ,CommonModule],
  templateUrl: './celular-form.component.html',
  styleUrl: './celular-form.component.css'
})
export class CelularFormComponent implements OnInit {
  formGroup!: FormGroup;

  fileName: string = '';
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null;
  processadores: { id: number; modelo: string; marca: string }[] = [];
  series: { id: number; nome: string; anoLancamento: number}[] = [];
  telas: {id: number; resolucao: number; tamanho: number;}[] = [];
  portas: {id: number; tipo: string}[] = [];
  cameras: {id: number; resolucao: number; frontal: boolean;}[] = [];
  sensores: {id: number; tipo:string}[] = [];

  constructor(private formBuilder: FormBuilder,
    private formStateService: FormStateService,
    private telaService: TelaService,
    private portaSlotService: PortaSlotService,
    private cameraService: CameraService,
    private sensorService: SensorService,
    private celularService: CelularService,
    private processadorService: ProcessadorService,
    private serieService: SerieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {
      this.formGroup = this.formBuilder.group({
        nome: ['', Validators.required],
        preco: [null, Validators.required],
        estoque: [null, Validators.required],
        marca: ['', Validators.required],
        anoLancamento: [null, Validators.required],
        armazenamento: [null, Validators.required],
        ram: [null, Validators.required],
        idProcessador: [null, Validators.required],
        idtela: [null, Validators.required],
        idPortaSlot: [[], Validators.required],
        idCamera: [[], Validators.required],
        idSensor: [[], Validators.required],
        idSerie: [null, Validators.required],
        id: [null],
      });
  }

  ngOnInit(): void {

    this.initializeForm();
    this.carregarTelas();
    this.carregarProcessadores();
    this.carregarPortas();
    this.carregarSensores();
    this.carregarSeries();
    this.carregarCameras();
    const savedState = this.formStateService.getState();
    if (savedState) {
      this.formGroup.patchValue(savedState);
    }
  }

  carregarProcessadores(): void {
    this.processadorService.findAll().subscribe({
      next: (processadores) => (this.processadores = processadores),
      error: (err) => console.error('Erro ao carregar processadores', err),
    });
  }

  carregarSeries(): void {
    this.serieService.findAll().subscribe({
      next: (series) => (this.series = series),
      error: (err) => console.error('Erro ao carregar series', err),
    });
  }

  carregarTelas(): void {
    this.telaService.findAll().subscribe({
      next: (telas) => (this.telas = telas),
      error: (err) => console.error('Erro ao carregar telas', err),
    });
  }

  carregarPortas(): void {
    this.portaSlotService.findAll().subscribe({
      next: (idPortaSlots) => (this.portas = idPortaSlots),
      error: (err) => console.error('Erro ao carregar porta', err),
    });
  }

  carregarCameras(): void {
    this.cameraService.findAll().subscribe({
      next: (idCameras) => (this.cameras = idCameras),
      error: (err) => console.error('Erro ao carregar camera', err),
    });
  }

  carregarSensores(): void {
    this.sensorService.findAll().subscribe({
      next: (idSensor) => (this.sensores = idSensor),
      error: (err) => console.error('Erro ao carregar sensor', err),
    });
  }

  voltarPagina() {
    this.location.back();
  }

  initializeForm(): void {
    const celular: Celular = this.activatedRoute.snapshot.data['celular'];
  
    // carregando a imagem do preview
    if (celular && celular.nomeImagem) {
      this.imagePreview = this.celularService.getUrlImage(celular.nomeImagem);
      this.fileName = celular.nomeImagem;
    }
  
    this.formGroup = this.formBuilder.group({
      id: [(celular && celular.id) ? celular.id : null],
      nome: [(celular && celular.nome) ? celular.nome : null, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      preco: [(celular && celular.preco) ? celular.preco : null, Validators.required],
      estoque: [(celular && celular.estoque) ? celular.estoque : null, Validators.required],
      marca: [(celular && celular.marca) ? celular.marca : null, Validators.required],
      anoLancamento: [(celular && celular.anoLancamento) ? celular.anoLancamento : null, Validators.required],
      armazenamento: [(celular && celular.armazenamento) ? celular.armazenamento : null, Validators.required],
      ram: [(celular && celular.ram) ? celular.ram : null, Validators.required],
      idProcessador: [(celular && celular.processador) ? celular.processador : null, Validators.required],
      telas: [(celular && celular.tela) ? celular.tela : null, Validators.required],
      idPortaSlot: [(celular && celular.portaSlot) ? celular.portaSlot : [], Validators.required],
      idCamera: [(celular && celular.camera) ? celular.camera : [], Validators.required],
      idSensor: [(celular && celular.sensor) ? celular.sensor : [], Validators.required],
      idSerie: [(celular && celular.serie) ? celular.serie : null, Validators.required],

    });
  }

  tratarErros(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 400) {
      if (errorResponse.error?.errors) {
        errorResponse.error.errors.forEach((validationError: any) => {
          const formControl = this.formGroup.get(validationError.fieldName);

          if (formControl) {
            formControl.setErrors({apiError: validationError.message})
          }
        });
      }
    } else if (errorResponse.status < 400){
      alert(errorResponse.error?.message || 'Erro genérico do envio do formulário.');
    } else if (errorResponse.status >= 500) {
      alert('Erro interno do servidor.');
    }
  }

  carregarImagemSelecionada(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      // carregando image preview
      const reader = new FileReader();
      reader.onload = e => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  private uploadImage(celularId: number) {
    if (this.selectedFile) {
      this.celularService.uploadImage(celularId, this.selectedFile.name, this.selectedFile)
      .subscribe({
        next: () => {
          this.voltarPagina();
        },
        error: err => {
          console.log('Erro ao fazer o upload da imagem');
          // tratar o erro
        }
      });
    } else {
      this.voltarPagina();
    }
  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const celular = this.formGroup.value;
      console.log('Dados enviados no formulário:', celular); // Adicione este log
      const operacao = celular.id == null
        ? this.celularService.insert(celular)
        : this.celularService.update(celular);
  
      operacao.subscribe({
        next: (celularCadastrada) => {
          this.uploadImage(celularCadastrada.id);
          this.router.navigateByUrl('/admin/celulares');
        },
        error: (error) => {
          console.log('Erro ao Salvar' + JSON.stringify(error));
          this.tratarErros(error);
        }
      });
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const celular = this.formGroup.value;
      if (celular.id != null) {
        this.celularService.delete(celular).subscribe({
          next: () => {
            this.router.navigateByUrl('/admin/celulares');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }

  getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return '';
    }
    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]) {
        return this.errorMessages[controlName][errorName];
      }
    }

    return 'invalid field';
  }

  navigateToPortaSlot() {
    this.formStateService.saveState(this.formGroup.value);
    this.router.navigate(['/admin/portaSlots/new']);
  }

  navigateToProcessador() {
    this.formStateService.saveState(this.formGroup.value);
    this.router.navigate(['/admin/processadores/new']);
  }

  navigateToSerie() {
    this.formStateService.saveState(this.formGroup.value);
    this.router.navigate(['/admin/series/new']);
  }

  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
    nome: {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve conter ao menos 2 letras.',
      maxlength: 'O nome deve conter no máximo 60 letras.',
      apiError: ' '
    },
    preco: {
      required: 'O preço deve ser informado.',
      apiError: ' '
    },
    estoque: {
      required: 'O estoque deve ser informado.',
      apiError: ' '
    },
    processadorId: {
      required: 'O processador deve ser selecionado.',
      apiError: ' '
    }
  }
}
