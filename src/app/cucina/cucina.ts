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
  ordini: any = []

  dolciVis:boolean = false;

  constructor(private service:DbService)
  {}

  ngOnInit(){
    this.getOrdini()
    setInterval(()=>{this.getOrdini()}, 1000*45);
  }

  async getOrdini(){
    let result:any = await this.service.richiamaServer({action: "getOrdiniNoCompletato"})
    this.ordini = result.ordini
  }

  visDolci(visibility:boolean){
    this.dolciVis = visibility;

  }

  ordineCompletato(e:Event, ordine:any){
    if(!this.dolciVis && ordine.dolce == '1')
      this.service.richiamaServer({action: "completaOrdinePanino", idOr: ordine.idOrd});
    else
    {
      if(ordine.completatoPanino == '1' || ordine.dolce == '0')
      {
        if(ordine.dolce == '0')
          this.service.richiamaServer({action: "completaOrdinePanino", idOr: ordine.idOrd});

        this.service.richiamaServer({action: "completaOrdine", idOr: ordine.idOrd});
      }
      else
        alert('Completa prima il panino')
    }

    this.getOrdini()
  }
}
