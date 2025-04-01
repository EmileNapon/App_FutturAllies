import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditApprenantsService } from './service/list-etudiant-service';


@Component({
  selector: 'app-edit-etudiants',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-apprenant.component.html',
  styleUrl: './edit-apprenant.component.css'
})
export class EditEtudiantsComponent implements OnInit {


  apprenantForm: FormGroup;
  apprenantId!: number;

  filtreEncadrants:any[]=[]
  apprenantEdit:any=''

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private editApprenantsService : EditApprenantsService

  ) {
    this.apprenantForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      role: ['apprenant', Validators.required],

    });
  }

  ngOnInit(): void {
    this.apprenantId = this.route.snapshot.params['updateApprenant'];
    this.LoadApprenantEdit();
  
  }

  LoadApprenantEdit():void{
    this.editApprenantsService.getApprenantById(this.apprenantId).subscribe((data) => {
      this.apprenantEdit = data;
      this.filtreloadApprenant()
    });
  }
  filtreloadApprenant():void{
      this.apprenantForm.patchValue({
        nom: this.apprenantEdit.nom,
        prenom: this.apprenantEdit.prenom,
        email: this.apprenantEdit.email,
        phone_number: this.apprenantEdit.phone_number,
        role: 'apprenant',
      });
    
  }
  updateApprenant(): void {
    if (this.apprenantForm.valid) {
    const formData = new FormData();
    formData.append('nom', this.apprenantForm.value.nom);
    formData.append('prenom', this.apprenantForm.value.prenom);
    formData.append('email', this.apprenantForm.value.email);
    formData.append('phone_number', this.apprenantForm.value.phone_number);
    formData.append('role', this.apprenantForm.value.role);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
      this.editApprenantsService.updateApprenant(this.apprenantId, this.apprenantForm.value).subscribe(() => {
        this.router.navigate(['/admin/apprenants']);
      });
    }
  }


  

}
