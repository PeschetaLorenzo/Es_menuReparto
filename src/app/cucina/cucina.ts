import { Component, OnInit } from '@angular/core';
import { DbService } from '../db-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-cucina',
  imports: [NgClass],
  templateUrl: './cucina.html',
  styleUrl: './cucina.css',
})
export class Cucina implements OnInit {
  maxOr:number = 0;
  ordini: any = []
  constructor(private service:DbService)
  {}

  ngOnInit(){
    this.getOrdini()
    setInterval(()=>{this.getOrdini()}, 1000*45);
  }

  async getOrdini(){
    let result:any = await this.service.richiamaServer({action: "getOrdiniNoCompletato"})
    console.log(result)
    this.ordini = result.ordini
  }

  dolciVis:boolean = false;

  visDolci(visibility:boolean){
    this.dolciVis = visibility;

  }

  ordineCompletato(e:Event, ordine:any){
    if(!this.dolciVis && ordine.dolce == '1')
      this.service.richiamaServer({action: "completaOrdinePanino", idOr: ordine.idOrd});
    else
    {
      if(ordine.completatoPanino == '1')
        this.service.richiamaServer({action: "completaOrdine", idOr: ordine.idOrd});
      else
        alert('Completa prima il panino')
    }

    this.getOrdini()
  }
}
