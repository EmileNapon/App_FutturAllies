import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './service-inscription/service-inscription.service';
import { User } from './interface-inscription/interface-inscription';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.css'],
    standalone: false
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: [null],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // password2: ['', Validators.required],
      phone_number: ['', Validators.required],
      specialite:['', Validators.required],
      role: ['', Validators.required]
    });
  }


  isApprenant(): boolean {
    return this.registrationForm.get('role')?.value === 'apprenant';
  }

  isEntreprise(): boolean {
    return this.registrationForm.get('role')?.value === 'employeur';
  }

  onSubmit(): void {


    if (this.registrationForm.valid) {
      const formData = new FormData();
      formData.append('nom', this.registrationForm.get('nom')?.value);
      if(this.registrationForm.get('role')?.value === 'employeur'){
        const x= this.registrationForm.value['prenom'] = null
        formData.append('prenom', this.registrationForm.value['prenom']);
      }
      if(this.registrationForm.get('role')?.value === 'apprenant'){
        formData.append('prenom', this.registrationForm.get('prenom')?.value);
      }
      formData.append('email', this.registrationForm.get('email')?.value);
      formData.append('phone_number', this.registrationForm.get('phone_number')?.value);
      formData.append('password', this.registrationForm.get('password')?.value);
      formData.append('specialite', this.registrationForm.get('specialite')?.value);
      formData.append('role', this.registrationForm.get('role')?.value);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      this.userService.registerUser(formData).subscribe(
        response => {
          console.log('Inscription réussie !', response);
          this.router.navigate(['/usersPages/login']);
        },
        error => {
          console.error('Erreur lors de l\'inscription', error);
        }
      );
    } else {
      console.error('Formulaire invalide !');
    }

  }
   
    
  

 
}
