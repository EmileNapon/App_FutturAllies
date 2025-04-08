import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateEnpresiseService } from './service/create-entreprise.service';


@Component({
  selector: 'app-edit-etudiants',
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './create-entreprise.component.html',
  styleUrl: './create-entreprise.component.css'
})
export class CreateEntreprisetComponent implements OnInit {


  registrationForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private createEnpresiseService: CreateEnpresiseService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: [null],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      role:'employeur', 
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
                formData.append('prenom', this.registrationForm.value['prenom']);
                formData.append('phone_number', this.registrationForm.value.phone_number);
                formData.append('password', this.registrationForm.value.phone_number);
                formData.append('role', this.registrationForm.value.role);

                // Ajouter l'image si elle est sélectionnée
                if (this.selectedFile) {
                  formData.append('profile_pic', this.selectedFile, this.selectedFile.name);
                }

                formData.forEach((value, key) => {
                  console.log(`${key}: ${value}`);
                });
                this.createEnpresiseService.createUser(formData).subscribe((response) => {
                  console.log('Utilisateur enregistré avec succès', response);
                  this.router.navigate(['/admin/entreprises']);
                });     
            }


  
OnAnnuler(): void{
  this.router.navigate(['/admin/entreprises']);
}
}
