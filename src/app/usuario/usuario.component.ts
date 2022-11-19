import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CriarUsuario } from '../models/salvar-usuario.model';
import { SalvarUsuarioService } from '../service/salvar-usuario.service';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {


  form!: FormGroup;
  usuario!: CriarUsuario[];
  error = "Este campo é obrigatório";
  usuariosId!: number
  verificarEditar: boolean = false

  constructor(
    private formBulider: FormBuilder,
    private salvarUsuarioService: SalvarUsuarioService) { }

  ngOnInit(): void {

    this.lerDadosUsurios()

    this.form = this.formBulider.group({

      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required]),
    });


  }


  lerDadosUsurios() {

    this.salvarUsuarioService.lerUsuarios().subscribe({
      next: (usuario: CriarUsuario[]) => {
        this.usuario = usuario;
      },
      error: () => {
        console.log("erro lerUsuario");
      }
    });

  }

  salvarDadosUsuarios() {

    console.log(this.usuario[(this.usuario.length) - 1]);
    const id = this.usuario[(this.usuario.length) - 1].id + 1;
    const nome = this.form.controls["nome"].value;
    const email = this.form.controls["email"].value;
    const telefone = this.form.controls["telefone"].value;

    const usuario: CriarUsuario = { id: id, nome: nome, email: email, telefone: telefone };

    this.salvarUsuarioService.salvarUsuarios(usuario).subscribe({
      next: () => {
        console.log("salvou");
        this.lerDadosUsurios()
      },
      error: () => {
        console.log("erro salvarusuario");

      }
    });

  }

  deleteDadosUsuarios(idUsuario: number) {

    this.salvarUsuarioService.deleteUsuario(idUsuario).subscribe({
      next: () => {
        console.log("deletou")
        this.lerDadosUsurios()
      },
      error: () => {
        console.log("erro delete");

      }
    })

  }

  EditarCliente1() {
    const id = this.usuariosId
    const nome = this.form.controls["nome"].value;
    const email = this.form.controls["email"].value;
    const telefone = this.form.controls["telefone"].value;

    const usuario: CriarUsuario = { id: id, nome: nome, email: email, telefone: telefone }

    this.salvarUsuarioService.editarUsuario(usuario).subscribe({
      next: () => {
        console.log("editou");

        this.lerDadosUsurios()
      },
      error: () => {
        console.log("erro");

      }
    })
    this.verificarEditar = false
    this.form.reset()
  }

  EditarCliente2(itemUsuario: CriarUsuario) {
    this.usuariosId = itemUsuario.id
    this.form.controls["nome"].setValue(itemUsuario.nome)
    this.form.controls["email"].setValue(itemUsuario.email)
    this.form.controls["telefone"].setValue(itemUsuario.telefone)
    this.verificarEditar = true
  }
}