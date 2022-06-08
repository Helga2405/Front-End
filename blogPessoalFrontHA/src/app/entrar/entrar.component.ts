import { Component, OnInit } from '@angular/core';
import { UserLogin } from './../model/UserLogin';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }
  ngOnInit(){
    window.scroll(0,0)
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe({
      next: (resp: UserLogin)=>{
        this.userLogin = resp
        environment.token = this.userLogin.token
        environment.nome = this.userLogin.nome
        environment.foto = this.userLogin.foto
        environment.id = this.userLogin.id
        this.router.navigate(['/inicio'])
      },
      error: erro => {
        if(erro.status == 401){
          alert(' Usuário ou senha incorretos!')
        }
      },
    });   
  }
}