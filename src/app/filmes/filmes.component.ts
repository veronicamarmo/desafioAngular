import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CriarFilmes, CriarUsuario } from '../models/salvar-usuario.model';
import { SalvarFilmesService } from '../service/service-filmes.service';



@Component({
  selector: 'app-usuario',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})

export class FilmesComponent implements OnInit {


  form!: FormGroup;
  filmes!: CriarFilmes[];
  error = "Este campo é obrigatório";
  filmesId!: number
  verificarEditar: boolean = false

  constructor(
    private formBulider: FormBuilder,
    private salvarFilmesService: SalvarFilmesService) { }

  ngOnInit(): void {

    this.lerDadosFilmes()

    this.form = this.formBulider.group({

      filmes: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required])
    });


  }


  lerDadosFilmes() {

    this.salvarFilmesService.lerFilmes().subscribe({
      next: (filmes: CriarFilmes[]) => {
        this.filmes = filmes;
      },
      error: () => {
        console.log("erro lerFilmes");
      }
    });

  }

  salvarDadosFilmes() {

    console.log(this.filmes[(this.filmes.length) - 1]);
    const id = this.filmes[(this.filmes.length) - 1].id + 1;
    const filmes = this.form.controls["filmes"].value;
    const genero = this.form.controls["genero"].value;

    const Filmes: CriarFilmes = { id: id, filmes: filmes, genero: genero };

    this.salvarFilmesService.salvarFilmes(Filmes).subscribe({
      next: () => {
        console.log("salvou");
        this.lerDadosFilmes()
      },
      error: () => {
        console.log("erro salvarFilmes");

      }
    });

  }

  deleteDadosFilmes(idFilmes: number) {

    this.salvarFilmesService.deleteFilmes(idFilmes).subscribe({
      next: () => {
        console.log("deletou")
        this.lerDadosFilmes()
      },
      error: () => {
        console.log("erro delete");

      }
    })

  }


  EditarCliente1() {
    const id = this.filmesId
    const filmes = this.form.controls["filmes"].value;
    const genero = this.form.controls["genero"].value;


    const filme: CriarFilmes = {
      id: id, filmes: filmes, genero: genero
    }

    this.salvarFilmesService.editarFilmes(filme).subscribe({
      next: () => {
        console.log("editou");

        this.lerDadosFilmes()
      },
      error: () => {
        console.log("erro");

      }
    })
    this.verificarEditar = false
    this.form.reset()
  }

  EditarCliente2(itemFilmes: CriarFilmes) {
    this.filmesId = itemFilmes.id
    this.form.controls["filmes"].setValue(itemFilmes.filmes)
    this.form.controls["genero"].setValue(itemFilmes.genero)
    this.verificarEditar = true
  }
}