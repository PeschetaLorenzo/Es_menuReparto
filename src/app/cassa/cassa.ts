import { Component } from '@angular/core';
import { DbService } from '../db-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cassa',
  imports: [FormsModule],
  templateUrl: './cassa.html',
  styleUrl: './cassa.css',
})
export class Cassa {
  ordini: any = []
  ordiniFiltered: any = []
  tavoli:any = []
  tavolo:string = ""
  filtroStatoPagamento: string = "tutti"
  sortOrdine: string | null = null

  showModalPagamento: boolean = false
  ordineDaPagare: any = null

  dolciVis:boolean = false;
  isDisabled = true;
  value = true;

  constructor(private service:DbService)
  {}

  onCheckboxClick(event: MouseEvent) {
    if (this.isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.value = !this.value;
  }

  openPagamentoModal(ordine: any) {
    this.ordineDaPagare = ordine
    if(this.ordineDaPagare.pagato == '0')
      this.showModalPagamento = true
  }

  closePagamentoModal() {
    this.showModalPagamento = false

    this.applyFilters()
  }

  async confirmPagamento() {
    console.log(this.ordineDaPagare)
    if (!this.ordineDaPagare) return

    try {
      const result = await this.service.richiamaServer({
        action: "pagaOrdine",
        idOr: this.ordineDaPagare.idOrd
      })

      console.log("Pagamento confermato:", result)
    } catch (error) {
      console.error("Errore nel pagamento:", error)
    }

    this.getOrdini()

    this.closePagamentoModal()
  }

  ngOnInit(){
    this.getTavoli()
    this.getOrdini()
    /*setInterval(()=>{this.getOrdini()}, 1000*30);*/
  }

  async getTavoli(){
    let result:any = await this.service.richiamaServer({action: "getTavoli"})

    this.tavoli = []

    result.tavoli.forEach((tav: any) => {
      this.tavoli.push(parseInt(tav.idTavolo.substring(1)))
    });
    console.log(this.tavoli)

    this.tavoli.sort((a: number, b: number) => a - b)
    console.log(this.tavoli)
  }

  async getOrdini(){
    let result:any = await this.service.richiamaServer({action: "getOrdiniDaPagare"})
    this.ordini = result.ordini
    this.applyFilters()
  }

  setFilterPagamento(filtro: string){
    this.filtroStatoPagamento = filtro
    this.applyFilters()
  }

  applyFilters(){
    let filtered = [...this.ordini]

    // Filtro per tavolo
    if(this.tavolo){
      filtered = filtered.filter((ord:any) => ord.idTavolo === 't' + this.tavolo)
    }

    // Filtro per stato pagamento
    if(this.filtroStatoPagamento === 'da_pagare'){
      filtered = filtered.filter((ord:any) => ord.pagato === '0')
    } else if(this.filtroStatoPagamento === 'pagati'){
      filtered = filtered.filter((ord:any) => ord.pagato === '1')
    }

    this.ordiniFiltered = filtered
  }

  filterTable(){
    this.applyFilters()
  }

  sortByOrdine(){
    // Alterna tra ascendente, discendente e no-sort
    if(this.sortOrdine === null){
      this.sortOrdine = 'asc'
    } else if(this.sortOrdine === 'asc'){
      this.sortOrdine = 'desc'
    } else {
      this.sortOrdine = null
    }

    // Applica l'ordinamento
    if(this.sortOrdine === 'asc'){
      this.ordiniFiltered.sort((a:any, b:any) => {
        const aId = parseInt(a.idOrd) || 0
        const bId = parseInt(b.idOrd) || 0
        return aId - bId
      })
    } else if(this.sortOrdine === 'desc'){
      this.ordiniFiltered.sort((a:any, b:any) => {
        const aId = parseInt(a.idOrd) || 0
        const bId = parseInt(b.idOrd) || 0
        return bId - aId
      })
    }
  }
}
