import { Component } from '@angular/core';
import { RegisterService } from './service/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  username: string = '';
  age: number | null = null;
  phone: string = '';
  errorMessage: string = '';

  constructor(private registerService: RegisterService, private router: Router) {}

  onRegister() {
    if (this.isFormValid()) {
      const userData = {
        name: this.name,
        surname: this.surname,
        username: this.username,
        age: this.age,
        phone: this.phone,
        email: this.email,
        password: this.password
      };
      console.log('Datos enviados:', userData);

      this.registerService.postUser(userData).subscribe(
        (response) => {
          console.log('Se ha registrado con exito: ', response)
          alert('Se ha registrado con éxito');
          this.router.navigate(['/login']); 
        },
        (error) => {
          console.error('Error en el registro:', error);
          this.errorMessage = 'Ocurrió un error en el registro. Intente nuevamente.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios correctamente.';
    }
  }

  isFormValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.surname.trim().length > 0 &&
      this.username.trim().length > 0 &&
      this.age !== null &&
      this.age >= 18 &&
      this.phone.trim().length > 0 &&
      this.email.trim().length > 0 &&
      this.password.trim().length > 0
    );
  }
}
