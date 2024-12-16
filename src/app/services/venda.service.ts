import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor() { }
  create(venda: any): void {
    console.log('Venda criada:', venda);
  }
  
  // createVenda() {
  //   this.vendaService.createVenda(this.venda).subscribe(response => {
  //     console.log('Venda criada com sucesso', response);
  //   }, error => {
  //     console.error('Erro ao criar venda', error);
  //   });
  // }

  // createVenda(venda: VendaDTO): Observable<VendaResponseDTO> {
  //   return this.http.post<VendaResponseDTO>(this.apiUrl, venda);
  // }

  // export interface VendaDTO {
  //   celulares: { idCelular: number; quantidade: number }[];
  //   data: string;
  //   valorFinal: number;
  //   formaPagamento: string;
  // }
}
