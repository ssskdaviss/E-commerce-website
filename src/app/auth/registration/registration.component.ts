import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  signUpForm = this.fb.group({
    email: ['', ],
    password: ['',/* [Validators.required, this.englishValidator, Validators.minLength(8)],*/],
    nickname: ['', /*[Validators.required, this.englishValidator]*/],
    phoneNumber: ['', /*[Validators.required, this.phoneNumberValidator]*/],
    balance: 0,
  },
    {
      validators: [],
    }
  );

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.router.navigate(['/home'])
    }
  }

  public editingIndex: number | null = null;

  public onSubmit(): void {
    if (this.signUpForm.valid) {
      const userData = this.signUpForm.value;

      this.http.get<User[]>('http://localhost:3000/users').subscribe(
        (users: User[]) => {
          //check if email already exists
          const emailExists = users.some(
            (user) => user.email === userData.email
          );
          if (emailExists) {
            alert('Email already exists. Choose a different email');
          } else {
            this.http
              .post('http://localhost:3000/users', userData)
              .subscribe((response) => {
                console.log('User data saved:', response);
              });
            this.signUpForm.reset();
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }

  public englishValidator(control: FormControl): ValidationErrors | null {
    const pattern = /^[a-zA-Z0-9]*$/;
    const value = control.value;
    if (!pattern.test(value)) {
      return { englishValidator: true };
    }
    return null;
  }

  public phoneNumberValidator(control: FormControl): ValidationErrors | null {
    const pattern = /^\+995\d{9}$/;
    const value = control.value;
    if (!pattern.test(value)) {
      return { phoneNumberFormat: true };
    }
    return null;
  }

  public resetForm(): void {
    this.signUpForm.reset();
    this.editingIndex = null;
  }
}


