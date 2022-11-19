import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CriarGenero } from '../models/salvar-usuario.model';
import { SalvarGenerosService } from '../service/service-genero.service';



@Component({
  selector: 'app-usuario',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})

export class GeneroComponent implements OnInit {


  form!: FormGroup;
  error = "Este campo é obrigatório";
  genero!: CriarGenero[];
  generosId!: number
  verificarEditar: boolean = false

  constructor(
    private formBulider: FormBuilder,
    private salvarGenerosService: SalvarGenerosService) { }

  ngOnInit(): void {

    this.lerDadosGenero()

    this.form = this.formBulider.group({

      genero: new FormControl('', [Validators.required])

    });


  }


  lerDadosGenero() {

    this.salvarGenerosService.lerGenero().subscribe({
      next: (genero: CriarGenero[]) => {
        this.genero = genero;
      },
      error: () => {
        console.log("erro lerGenero");
      }
    });

  }

  salvarDadosGenero() {

    console.log(this.genero[(this.genero.length) - 1]);
    const id = this.genero[(this.genero.length) - 1].id + 1;
    const genero = this.form.controls["genero"].value;

    const Genero: CriarGenero = { id: id, genero: genero };

    this.salvarGenerosService.salvarGenero(Genero).subscribe({
      next: () => {
        console.log("salvou");
        this.lerDadosGenero()
      },
      error: () => {
        console.log("erro salvarGenero");

      }
    });

  }

  deleteDadosGenero(idGenero: number) {

    this.salvarGenerosService.deleteGenero(idGenero).subscribe({
      next: () => {
        console.log("deletou")
        this.lerDadosGenero()
      },
      error: () => {
        console.log("erro delete");

      }
    })

  }

  EditarCliente1() {
    const id = this.generosId
    const genero = this.form.controls["genero"].value;

    const generos: CriarGenero = { id: id, genero: genero }

    this.salvarGenerosService.editarGenero(generos).subscribe({
      next: () => {
        console.log("editou genero");
        this.lerDadosGenero()
        
      },
      error: () => {
        console.log("erro");

      }
    })
    this.verificarEditar = false
    this.form.reset()
  }

  EditarCliente2(itemGenero: CriarGenero) {
    this.generosId = itemGenero.id
    this.form.controls["genero"].setValue(itemGenero.genero)
    this.verificarEditar = true
  }
}
