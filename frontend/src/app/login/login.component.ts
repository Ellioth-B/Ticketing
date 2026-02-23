import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  pwd = '';
  
  //Icon visibility
  showPwd = false;

  constructor(private auth: AuthService, private router: Router) { }

  connect() {
    this.auth.login(this.username, this.pwd).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => alert('Login incorrect')
    });
  }

}
