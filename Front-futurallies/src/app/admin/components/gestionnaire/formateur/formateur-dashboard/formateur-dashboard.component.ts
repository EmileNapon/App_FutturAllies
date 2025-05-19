
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Annonce, CustomUser, Module } from '../../programme-talent/models/tousModel';
import { UtilisateurService } from '../../programme-talent/services/utilisateur.service';
import { ModuleService } from '../../programme-talent/services/module.service';
import { ModuleFormationService } from '../../programme-talent/services/moduleFormation.service';
import { FormationService } from '../../programme-talent/services/formation.service';
import { DasbordEtudiantService } from 'src/app/dasbord-etudiant/service-model/dasbord-etudiant.service';
import { SeanceService } from '../../programme-talent/services/seance.service';
import { AnnonceService } from '../../programme-talent/services/annonce.service';


@Component({
    selector: 'app-formateur-dashboard',
    templateUrl: './formateur-dashboard.component.html',
    styleUrls: ['./formateur-dashboard.component.css'],
    standalone: false
})
export class FormateurDashboardComponent implements OnInit {


  utilisateurs: CustomUser[] = [];
  etudiants: CustomUser[] = [];
  encadrants: CustomUser[] = [];

  modules: Module[] = [];
  selectedModules: { moduleId: number, formateurIds: number[] }[] = [];  // Stocker les formateurs pour chaque module

  formations: any[] = [];
  dasbordId: any;
    
  shutDetail!: boolean;
  showDetail!: boolean;

modulesFormations:any[]=[]
FiltresmodulesFormations: any[]=[]
FiltresModules:any[]=[]
FiltresSeances:any[]=[]
seances:any[]=[]
annonceForm!: FormGroup;

statuts:boolean=true

formationId!:number
formationid!:number
formationWithModules: any[]=[]

annonces: any[] = [];

filtereAnnonces:any[]=[]
formationId_for_annonce!:number

formationForm!: FormGroup;

showFormation:boolean= false;
showGroupe:boolean = false;
showListe: boolean = false;
showCalendar:boolean = false;
showExo: boolean = false;
showWebinar:boolean= false;
showAjoutModule: boolean = false;


isAnnonceCreationVisible:boolean =false

showAnnonce:boolean=false

  constructor(
    private utilisateurService: UtilisateurService,
    private moduleService: ModuleService,
    private moduleFormationService: ModuleFormationService, 
    private formationService :FormationService,
    private router: Router, private route: ActivatedRoute, private DasbordService: DasbordEtudiantService,   
    private seanceService: SeanceService,private fb: FormBuilder, 
    private annonceService: AnnonceService, 
    
  ) { }


///////////////////////////////////////////////////

// updateFormation(): void {
//   if (this.formationForm.valid) {
//     const updatedFormation: Formation = { id: this.formationId, ...this.formationForm.value };
//     this.formationService.updateFormation(updatedFormation).subscribe(() => {
//       console.log('|||||||||||||||||||||||||||||||||||||||||||||||------|||||||||||||||')
//     });
//   }
// }

///////////////////////////////////////////////////


  
  ngOnInit():void{
    this.dasbordId = this.route.snapshot.paramMap.get('dasbordId');
    this.formationId_for_annonce = this.route.snapshot.params['dasbordId'];
    this.loadFormations()



    console.log('gggggggggggggg')
   
    this.shutDetail = true;
    this.showDetail = false;

   
    this.loadModules()
    this.loadFormateurs()
    this.loadSeances()


    this.InitForm();
    this.annonceForm.patchValue({
    })


    this.formationId = this.route.snapshot.params['id'];
    this.formationid=this.formationId

    
    this.annonceForm.patchValue({
      date_publication: new Date(),
      heure: new Date().getTime,
      // heure: new Date().getTime,
    });
       
      

  }

  
  InitForm():void{
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      lieu: ['', Validators.required],
      date_cours: ['', Validators.required],
      description: ['', Validators.required],
      heure: ['', Validators.required],
      formation : this.dasbordId
    });
  }





  iniFormsFormation():void{


    this.formationForm = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  

  onShowAnnonce(){
    this.showAnnonce = true;
    this.showFormation = false;
    this.showGroupe = false;
    this.showListe = false;
    this.showCalendar = false;
    this.showExo = false;
    this.showWebinar = false;
  }

  onShowFormation(){
    this.showAnnonce = false;
    this.showFormation = true;
    this.showGroupe = false;
    this.showListe = false;
    this.showCalendar = false;
    this.showExo = false;
    this.showWebinar = false;
  }

  onShowGroupe(){
    this.showAnnonce = false;
    this.showFormation = false;
    this.showGroupe = true;
    this.showListe = false;
    this.showCalendar = false;
    this.showExo = false;
    this.showWebinar = false;
  }

  onShowListe(){
    this.showAnnonce = false;
    this.showFormation = false;
    this.showGroupe = false;
    this.showListe = true;
    this.showCalendar = false;
    this.showExo = false;
    this.showWebinar = false;
  }

  onShowCalendar(){
    this.showAnnonce = false;
    this.showFormation = false;
    this.showGroupe = false;
    this.showListe = false;
    this.showCalendar = true;
    this.showExo = false;
    this.showWebinar = false;
    
  }

  onShowExo(){
    this.showAnnonce = false;
    this.showFormation = false;
    this.showGroupe = false;
    this.showListe = false;
    this.showCalendar = false;
    this.showExo = true;
    this.showWebinar = false;
  }

  onShowWebinaire(){
    this.showAnnonce = false;
    this.showFormation = false;
    this.showGroupe = false;
    this.showListe = false;
    this.showCalendar = false;
    this.showExo = false;
    this.showWebinar = true;
  }

  onAjoutModule(){
    this.showAnnonce = false;
    this.showFormation = false;
    this.showGroupe = false;
    this.showListe = false;
    this.showCalendar = true;
    this.showExo = false;
    this.showWebinar = false;
    this.showAjoutModule = true;

  }

  onShutAjoutModule(){
    this.showAjoutModule = false;
  }
  







  onShutDetail(){
    this.shutDetail = false;
    this.showDetail = true;
  }
  onShowDetail(){
    this.shutDetail = true;
    this.showDetail = false;
  }
 
getGroupes() {
  const groupes = [];
  for (let i = 0; i < this.utilisateurs.length; i += 3) {
      // Filtrer uniquement les étudiants pour former les groupes
      const etudiants = this.utilisateurs.filter(user => user.role === 'etudiant');
      
      // Ajouter les étudiants par groupes de 3
      groupes.push(etudiants.slice(i, i + 3));
  }
  return groupes;
}






 


  // Méthode pour obtenir le nom d'un module à partir de son ID
  getModuleName(moduleId: number): string {
    const module = this.modules.find(m => m.id === moduleId);
    return module ? module.nom_module : 'Module inconnu';
  }
  

  // Gestion de la sélection des modules
  onModuleSelectionChange(moduleId: number, event: any): void {
    if (event.target.checked) {
      // Ajouter le module à la sélection s'il n'existe pas déjà
      if (!this.selectedModules.some(selected => selected.moduleId === moduleId)) {
        this.selectedModules.push({ moduleId, formateurIds: [] });
      }
    } else {
      // Retirer le module de la sélection si la case est décochée
      this.selectedModules = this.selectedModules.filter(selected => selected.moduleId !== moduleId);
    }
  }

  // Gestion de la sélection des formateurs pour un module
  onFormateurSelectionChange(moduleId: number, formateurId: number, event: any): void {
    const module = this.selectedModules.find(selected => selected.moduleId === moduleId);
    if (module) {
      if (event.target.checked) {
        // Ajouter le formateur sélectionné à la liste des formateurs pour ce module
        module.formateurIds.push(formateurId);
      } else {
        // Retirer le formateur s'il est désélectionné
        module.formateurIds = module.formateurIds.filter(id => id !== formateurId);
      }
    }
  }
  

  loadFormations(): void {
    this.formationService.getFormations().subscribe(
      (data) => {
        this.formations = data;
        this.filterDataInscrit()
        this.loadAnnonces()

      },
      (error) => {
        console.error('Erreur lors du chargement des formations:', error);
      }
    );
  }

  filteredIncritsFormations:any[]=[]


  filterDataInscrit(): void {
    
    this.filteredIncritsFormations= this.formations.filter(formation => formation.id==this.dasbordId);
}



deleteFormation(id: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
    this.formationService.deleteFormation(id).subscribe(() => {
      this.router.navigate([`/admin/formation`]);
    });
  }
}







loadModules(): void {
  this.moduleService.getModules().subscribe(
    (data) => {
      this.modules = data;
      console.log('kkkkkkkkkkkkkkkkkkkkkkkk', this.modules)
      this.loadModulesFormations()
    },
    (error) => {
      console.error('Erreur lors du chargement des modules:', error);
    }
  );
}


loadModulesFormations(): void {
  this.moduleFormationService.getModuleFormations().subscribe(
    (data) => {
      this.modulesFormations = data;
      this.FiltresmodulesFormations= this.modulesFormations.filter(moduleFormation=>moduleFormation.formation==this.dasbordId);
      this.FiltresModules= this.modules.filter(modul=>this.FiltresmodulesFormations.some(filModulFormation=>filModulFormation.module==modul.id));
    this.loadSeances()
    },
    (error) => {
      console.error('Erreur lors du chargement des modules:', error);
    }
  );
}


// Supprimer module 
deleteModule( id: number): void {
  
  if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
    // Étape 1: Récupérer les séances liées au module
    const seancesDuModule = this.getSeancesByModule(id);

    // Étape 2: Supprimer les séances liées au module
    seancesDuModule.forEach(seance => {
      this.seanceService.deleteSeance(seance.id).subscribe(
        () => {
          console.log(`Séance ${seance.id} supprimée`);
        },
        (error) => {
          console.error('Erreur lors de la suppression des séances:', error);
        }
      );
    });
    console.log('[[[[]]]]=========================|||||||=====]', this.dasbordId)
    this.moduleFormationService.deleteModuleFormation(this.dasbordId,id).subscribe(() => {
      this.loadModules(); // Recharger la liste après la suppression
    });

  }
}




filtreEncadrants:any[]=[]


// Charger les formateurs (utilisateurs avec rôle 'encadrant')
loadFormateurs(): void {
  this.utilisateurService.getFormateurs().subscribe(
    (data) => {
      this.encadrants = data;
    },
    (error) => {
      console.error('Erreur lors du chargement des formateurs:', error);
    }
  );
}

seancesAvecEncadrants:any[]=[]
loadSeances(): void {
  this.seanceService.getSeances().subscribe(
    (data) => {
      this.seances = data;
      this.seancesAvecEncadrants = this.seances.map(seance => ({
        ...seance,
        encadrants: this.encadrants.filter(user => seance.user.includes(user.id))
      }));
      console.log('@@@@@@@@@@@@@@', this.seancesAvecEncadrants)
      

    },
    (error) => {
      console.error('Erreur lors du chargement des formations:', error);
    }
  );
}


// suppression de seances
deleteSeance(id: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
    this.seanceService.deleteSeance(id).subscribe(() => {
      this.loadSeances(); // Recharger la liste après la suppression
      
    });
  }
}






showAnnonceList:boolean=true
showAnnonceButton:boolean=true
showAnnonceFormulaire:boolean=false
// ismodify:boolean=false
isCreateFormulaireAnnonce():void{
  this.showAnnonceList=false
  this.showAnnonceButton=false
  this.showAnnonceFormulaire=true
  console.log('this.showAnnonceFormulaire=true', this.showAnnonceFormulaire)

}


  // Méthode pour ajouter une nouvelle annonce
  ajouterAnnonce(): void {
    if (this.annonceForm.valid) {
      let newAnnonce: Annonce =this.annonceForm.value;
      this.annonceService.addAnnonce(newAnnonce).subscribe(() => {
        this.showAnnonceList=true
        this.showAnnonceButton=true
        this.showAnnonceFormulaire=false
        this.loadAnnonces()
        this.annonceForm.reset();
 
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de annonce', error); // Gérer les erreurs
        }
      );
    }
  }

  annulerAnnonce() :void{
    this.showAnnonceList=true
    this.showAnnonceButton=true
    this.showAnnonceFormulaire=false



    this.showFormation = false;
    this.showGroupe = false;
    this.showListe = false;
    this.showCalendar = false;
    this.showExo = false;
    this.showWebinar = false;
    this.showAjoutModule = false;
    this.shutDetail = true;
    this.showDetail = false;
    this.statuts=false

    
  }
  


  
  // Méthode pour filtrer les séances par module
  getSeancesByModule(moduleId: number): any[] {
    return this.seances.filter(seance => seance.module === moduleId);
  }
  
  onSelectModule( formationId :string,seanceId: string): void {
    this.router.navigate([`/admin/create/${formationId}/${seanceId}/seance`]);
  }

  
  onSelectFormation(id: string): void {
    this.router.navigate([`/admin/update/${id}/formation`]); 
  }

  onSelectFormationModule(id: string): void {
    this.router.navigate([`/admin/Module-formation/${id}/formation`]); 
  }


  filterModulesForFormation(formationId: number): any[] {
    // Filtre les relations ModuleFormation par formationId
    const moduleIds = this.FiltresmodulesFormations.filter(moduleFormation => moduleFormation.formation === formationId)
      .map(moduleFormation => moduleFormation.module);
  
    // Retourne les modules correspondants
    return this.modules.filter(module => moduleIds.includes(module.id));
  }










  nombreAffichage: number = 5; // Valeur par défaut
  optionsAffichage: number[] = [3, 5, 10, 100, 0]; // 0 pour 'Tout'
  
  
   annoncesAffichees() {
    if (this.nombreAffichage == 0) {
      return this.filtereAnnonces;
    }
    return this.filtereAnnonces.slice(0, this.nombreAffichage);
  }
  

    // Charger les annonces à partir du service
    loadAnnonces(): void {
      this.annonceService.getAnnonces().subscribe(data => {
        this.annonces = data;
        this.filtereAnnonces= this.annonces.filter(annon => annon.formation==this.formationId_for_annonce);
      });
    }

  supprimerAnnonce(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      this.annonceService.deleteAnnonce(id).subscribe(() =>  {
        this.loadAnnonces();
      });
      
    }
  }


}
