import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionnairesModulesServiceService } from './gestionnaires-modules-service/gestionnaires-modules-service.service';

@Component({
    selector: 'app-gestionnaire-modules',
    templateUrl: './gestionnaire-modules.component.html',
    styleUrls: ['./gestionnaire-modules.component.css'],
    standalone: false
})
export class GestionnaireModulesComponent implements OnInit{



 
  constructor(private moduleService:GestionnairesModulesServiceService ,  private fb: FormBuilder, private router: ActivatedRoute, private route:Router) { }
  selectedModuleIndex:string=""
  __iconDelete__:boolean=false
  __addModule__:boolean=false
  loading: boolean=false

  ondelete():void{
    this.__iconDelete__=!this.__iconDelete__
  }




  onVoirModule():void{
    this.__iconDelete__=false
  }


  selecterModule(module:string){
    this.__iconDelete__=false
    this.selectedModuleIndex=module
      
  }

  OnAdd():void{
    this.__addModule__=!this.__addModule__
    this.__iconDelete__=false
  }


  iddomaineGestionnaireId: string | null = null;
  __moduleGestionnaire__: any[] = [];
  __filteredModulesGestionnaire__: any[] = [];
 
 
  
  
  ngOnInit(): void {
    this.iddomaineGestionnaireId = this.router.snapshot.paramMap.get('iddomaineGestionnaireId');
    this.loadModulegestionnaire();
    this.InitFormModule()
   
  }
  
  loadModulegestionnaire(): void {
    this.moduleService.getModule().subscribe(data => {
      this.__moduleGestionnaire__ = data;
      this.filterModulesGestionnaire()
      this.loading=true
      console.log( this.iddomaineGestionnaireId)
    });
  }



  filterModulesGestionnaire(): void {
    if (this.iddomaineGestionnaireId) {
      this.__filteredModulesGestionnaire__ = this.__moduleGestionnaire__.filter(module => module.domaine == this.iddomaineGestionnaireId);
      console.log( this.__moduleGestionnaire__)
    }
  }


  onSelectModule(coursGestionnaireId: string): void {
    this.route.navigate([`/admin/${coursGestionnaireId}/cours`]); // Redirection vers la page des matières du domaine sélectionné
 
  }





  ModuleForm!: FormGroup;

  InitFormModule(): void {
    this.ModuleForm = this.fb.group({ 
      nom_module: '',
    });
  }


  ajouterNouvelleModule(moduleNom: string): void {
    if (this.iddomaineGestionnaireId) {
    const nouvelleMatiere = {
        // Le nom ou autre attribut de la nouvelle matière
        domaine: this.iddomaineGestionnaireId,  // Associer la matière au domaine sélectionné
        nom_module:moduleNom,
    }
    

      this.moduleService.addModule(nouvelleMatiere).subscribe(response => {
        console.log('Nouvelle matière ajoutée avec succès', response);
        this.loadModulegestionnaire()
        
        // Optionnel : Actualiser la liste des matières après ajout
        this.filterModulesGestionnaire();
      });
    } else {
      console.error('Aucun domaine sélectionné');
      this.loadModulegestionnaire()
    }
  }
  





 

  onSubmit(){
    const nom_module= this.ModuleForm.value.nom_module;
    console.log("////////////////////////////////",nom_module)
    this.ajouterNouvelleModule(nom_module)
    this.loadModulegestionnaire()
    this.OnAdd();
   
  }


}
