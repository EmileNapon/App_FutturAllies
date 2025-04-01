import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEncadrantService } from './service/create-encadrant.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-etudiants',
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './create-encadrant.component.html',
  styleUrl: './create-encadrant.component.css'
})
export class CreateEncadrantComponent implements OnInit {


  registrationForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private editEncadrantService: CreateEncadrantService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required],
      phone_number: ['', Validators.required],
      image: ['', Validators.required],
      specialite:['', Validators.required],
      fonction:['', Validators.required],
      role:'formateur', 
      profile_pic:[null],
    });
  }


  selectedFile: File | null = null;


  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }


  onSubmit(): void {
                const formData = new FormData();

                formData.append('email', this.registrationForm.value.email);
                formData.append('nom', this.registrationForm.value.nom);
                formData.append('prenom', this.registrationForm.value.prenom);
                formData.append('phone_number', this.registrationForm.value.phone_number);
                formData.append('password', this.registrationForm.value.password);
                formData.append('role', this.registrationForm.value.role);
                formData.append('fonction', this.registrationForm.value.fonction);
                formData.append('specialite', this.registrationForm.value.specialite);
                // Ajouter l'image si elle est sélectionnée
                if (this.selectedFile) {
                  formData.append('profile_pic', this.selectedFile, this.selectedFile.name);
                }

                formData.forEach((value, key) => {
                  console.log(`${key}: ${value}`);
                });
                this.editEncadrantService.createUser(formData).subscribe((response) => {
                  console.log('Utilisateur enregistré avec succès', response);
                  this.router.navigate(['/admin/formateurs']);
                });     
            }


  

}
