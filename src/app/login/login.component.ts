import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MatCardModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { LoginService } from '../service/login/login.service';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, UtilsService]
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  userId: string;
  userPassword: string;

  constructor(private router: Router, private loginService: LoginService, private utils: UtilsService) { }

  ngOnInit() {
    this.errorMessage = "";
    this.userId = "";
    this.userPassword = "";
  }

  login() {
    if (this.userId == "") {
      this.errorMessage = "Favor informar o usuário!";
    } else if (this.userPassword == "") {
      this.errorMessage = "Favor informar a senha!";
    } else {
      this.errorMessage = "";      
      const params = {
        "login": this.userId,
        "senha": this.utils.encriptPassword(this.userPassword)
      }
      this.loginService.validarLogin(params).subscribe(
        response => {          
          this.errorMessage = null;
          localStorage.setItem('id_token', response.headers._headers.get("authorization"));
          localStorage.setItem('userId', this.userId);
          this.loginService.obterRestaurante(params).subscribe(
          response => {
            localStorage.setItem("restaurante", response._body);
            this.router.navigate(['inicio']);
          },
          error => {
            this.utils.showDialog("Ops!", "Ocorreu um erro ao tentar realizar o login!\n" + JSON.parse(error._body).message, false);
          });          
        },
        error => {                    
          if (JSON.parse(error._body).error == "Unauthorized"){
            this.errorMessage = "Usuário ou senha inválidos!";
          }  else {
            this.utils.showDialog("Ops!", "Ocorreu um erro! =(\n" + error._body.message, false);
          }
        }
      );
    }
  }

  cadastrarUsuario() {
    this.router.navigate(["cadastro"]);
  }

  alterarSenha() {
    this.router.navigate(["senha"]);
  }

}
