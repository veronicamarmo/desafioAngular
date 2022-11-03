import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  texto: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url)

    if (this.router.url === '/home') {
      this.texto = 'Conheça nossa Coletânea'
    }
    else if (this.router.url === '/usuario') {
      this.texto = 'Faça o Cadastro de usuários e edite, caso necessário Pronto para cadastrar? '
    }
    else if (this.router.url === '/filmes') {
      this.texto = 'Cadastre os filmes de sua preferência  '
    }
    else {
      this.texto = 'Cadastre os gêneros dos filmes'
    }
  }

}
