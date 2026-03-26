import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbService } from '../db-service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-utente',
  imports: [NgClass, FormsModule],
  templateUrl: './utente.html',
  styleUrl: './utente.css',
})
export class Utente implements AfterViewInit{
  @Input() idTavolo:any;

  constructor(private service: DbService){

  }


  @ViewChild('indietro') indietro !: ElementRef;
  @ViewChild('conferma') conferma !: ElementRef;
  @ViewChild('avanti') avanti !: ElementRef;

  @ViewChild('hotdog') hotdog !: ElementRef;
  @ViewChild('contorno') contorno !: ElementRef;
  @ViewChild('dolce') dolce !: ElementRef;

  @ViewChild('img_salsiccia') imgSalsiccia !: ElementRef;
  @ViewChild('img_pancake') imgPancake !: ElementRef;

  @ViewChild('modal') modal !: ElementRef;



  page:number = 1

  ngAfterViewInit() {

  }

  prevPage(){
    if(this.page == 2)
    {
      //p1
      this.hotdog.nativeElement.style.display = "flex"
      this.contorno.nativeElement.style.display = "none"
      this.dolce.nativeElement.style.display = "none"


      this.indietro.nativeElement.style.visibility = 'hidden'
    }
    else if(this.page == 3)
    {
      //p2
      this.hotdog.nativeElement.style.display = "none"
      this.contorno.nativeElement.style.display = "flex"
      this.dolce.nativeElement.style.display = "none"

      this.avanti.nativeElement.style.visibility = 'visible'
      this.conferma.nativeElement.style.visibility = 'hidden'

    }
    this.page--
  }

  nextPage(){
    if(this.page == 1)
    {
      //p2
      this.hotdog.nativeElement.style.display = "none"
      this.contorno.nativeElement.style.display = "flex"
      this.dolce.nativeElement.style.display = "none"

      this.indietro.nativeElement.style.visibility = 'visible'
    }
    else if(this.page == 2)
    {
      //p3
      this.hotdog.nativeElement.style.display = "none"
      this.contorno.nativeElement.style.display = "none"
      this.dolce.nativeElement.style.display = "flex"

      this.avanti.nativeElement.style.visibility = 'hidden'
      this.conferma.nativeElement.style.visibility = 'visible'
    }
    this.page++
  }


  swtPane:boolean = true;
  swtVeggie:boolean = false;
  swtKetchup:boolean = true;
  swtMaionese:boolean = true;

  swtPatatine:boolean = true;
  swtPeperoni:boolean = true;

  swtPancake:boolean = true;
  swtNutella:boolean = true;
  swtMarmellata:boolean = false;

  swtVeggie_Click(){
    if(!this.swtVeggie)
      this.imgSalsiccia.nativeElement.src = "img/SalsicciaVeg.png"
    else
      this.imgSalsiccia.nativeElement.src = "img/Salsiccia.png"

  }

  toggleTopping(){
    if(!this.swtNutella || this.swtMarmellata)
    {
      this.swtMarmellata = false
      this.swtNutella = true

      this.imgPancake.nativeElement.src = "img/PancakeNutella.png"
    }
    else
    {
      this.swtMarmellata = true
      this.swtNutella = false

      this.imgPancake.nativeElement.src = "img/PancakeMarmellata.png"
    }

  }

  apriConferma(){
      this.modal.nativeElement.style.display = "block";
  }

  closeModal(){
    this.modal.nativeElement.style.display = "none";
  }

  async inviaOrdine(){
    let ordine = {
      hotdog: this.swtPane,
      ketchup: this.swtKetchup,
      maionese: this.swtMaionese,
      vegetariano: this.swtVeggie,
      patatine: this.swtPatatine,
      peperoni: this.swtPeperoni,
      dolce: this.swtPancake,
      topping: this.swtNutella ? "Nutella" : "Marmellata"
    }
    if(this.swtPane || this.swtPeperoni || this.swtPatatine || this.swtPancake)
      this.service.richiamaServer({action: "inviaOrdine" ,idTav: this.idTavolo, ordine: ordine})

    this.reset()
  }

  reset(){
    this.swtPane = true;
    this.swtVeggie = false;
    this.swtKetchup = true;
    this.swtMaionese = true;

    this.swtPatatine = true;
    this.swtPeperoni = true;

    this.swtPancake = true;
    this.swtNutella = true;
    this.swtMarmellata = false;

    this.imgPancake.nativeElement.src = "img/PancakeNutella.png"
    this.imgSalsiccia.nativeElement.src = "img/Salsiccia.png"

    this.closeModal()
  }

}

