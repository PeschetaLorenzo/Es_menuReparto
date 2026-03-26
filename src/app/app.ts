import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Utente } from './utente/utente';
import { Cucina } from './cucina/cucina';
import { Cassa } from './cassa/cassa';

@Component({
  selector: 'app-root',
  imports: [Utente, Cucina, Cassa],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CenaReparto');

  login:string = ''

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const tav = params.get('ut');
      console.log(tav);
      if(tav)
        this.login = tav;
    });
  }
}
