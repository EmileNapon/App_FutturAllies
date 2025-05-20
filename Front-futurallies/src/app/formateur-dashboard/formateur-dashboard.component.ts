import { AuthService } from 'src/app/gestion-utilisateurs/connexion/service-connexion/service-connexion.service';
import { Component, OnInit } from '@angular/core';
import { FormationService } from './services/formation.service';
import { ModuleService } from './services/module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleFormationService } from './services/moduleFormation.service';
import { CustomUser, Formation, Module } from './models/tousModel';
import { FormGroup } from '@angular/forms';
import { SeanceService } from './services/seance.service';
import { AnnonceService } from './services/annonce.service';
import { UtilisateurService } from './services/utilisateur.service';


@Component({
  selector: 'app-formateur-dashboard',
  standalone:false,
  templateUrl: './formateur-dashboard.component.html',
  styleUrl: './formateur-dashboard.component.css'
})
export class FormateurDashboardComponent implements OnInit {

formationsActifs:number=0
formationsNotActifs:number=0
formations: Formation[] = [];
loading:boolean=false

module : any[]=[]
modulesFormations: any[]=[]
formationId!:number
formationWithModules: any[]=[]
filtreEncadrants:any[]=[]
  
filteredIncritsFormations:any[]=[]
seancesAvecEncadrants:any[]=[] 

utilisateurs: CustomUser[] = [];
etudiants: CustomUser[] = [];
encadrants: CustomUser[] = [];

modules: Module[] = [];
selectedModules: { moduleId: number, formateurIds: number[] }[] = [];  // Stocker les formateurs pour chaque module

dasbordId: any;
  

FiltresmodulesFormations: any[]=[]
FiltresModules:any[]=[]
FiltresSeances:any[]=[]
seances:any[]=[]
annonceForm!: FormGroup;

annonces: any[] = [];

filtereAnnonces:any[]=[]

formationId_for_annonce!: number

FiltreSeancesFormateur:any[]=[]
seancesEncadrantsFilter:any[]=[]
FiltreModuleFormateur:any[]=[]
moduleFiltres:any[]=[]
formationsFiltres:any[]=[]
FiltreFormationFormateur:any[]=[]

 userInfo: { email: string | null, firstName: string | null, lastName: string | null, profilePic: string | null, id: string | null, role: string | null, is_superuser:boolean | null  } | null = null;



 constructor(
    private formationService: FormationService,
    private router: Router,
    private moduleService : ModuleService,
    private moduleFormationService  : ModuleFormationService,
    private route: ActivatedRoute, 
    private seanceService: SeanceService,
    private annonceService: AnnonceService,
    private utilisateurService: UtilisateurService,
    private serviceAuth: AuthService,
  ) {}



  ngOnInit(): void {
    this.userInfo = (this.serviceAuth.getUserInfo());
    

    this.loadFormations()
    this.loadFormateurs()

  }




  loadFormations(): void {
    this.formationService.getFormations().subscribe(
      (data) => {
        this.formations = data;
        this.loadModules()
      },
      (error) => {
        console.error('Erreur lors du chargement des formations:', error);
      }
    );
  }

  
  FormationsFiltre:any[]=[]
  modulesFiltrenoveau:any[]=[]
  loadModules(): void {
    this.moduleService.getModules().subscribe(data => {
      this.module = data;
      this.loadSeances()
      this.loadModulesFormations()
    });
  }

  loadModulesFormations(): void {
    this.moduleFormationService.getModuleFormations().subscribe(
      (data) => {
        this.modulesFormations = data;  
        this.modulesFiltrenoveau= this.modulesFormations.filter(mof=>this.module.some(m=>m.id==mof.module)) 
        this.FormationsFiltre= this.formations.filter(form=>this.modulesFiltrenoveau.some(mf=>mf.formation==form.id)) 
        console.log('modulesFiltrenoveau',this.modulesFiltrenoveau)
        console.log('modulesFormationsFiltre',this.FormationsFiltre)
      },
      (error) => {
        console.error('Erreur lors du chargement des modules:', error);
      }
    );
  }




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
  



  loadSeances(): void {
    this.seanceService.getSeances().subscribe(
      (data) => {
        this.seances = data;

        this.seancesAvecEncadrants = this.seances.map(seance => ({
          ...seance,
          encadrants: this.encadrants.filter(user => seance.user.includes(user.id))
        }));
        // const userId = Number(this.userInfo?.id);
        // this.seancesEncadrantsFilter = this.seancesAvecEncadrants.filter(seance =>
        //   seance.user.includes(18))

          this.moduleFiltres= this.module.filter(mod=>this.seancesAvecEncadrants.some(se=>se.module==mod.id))   
      },
      (error) => {
        console.error('Erreur lors du chargement des formations:', error);
      }
    );
  }

loadAnnonces(): void {
    this.annonceService.getAnnonces().subscribe(data => {
    this.annonces = data;
    this.filtereAnnonces= this.annonces.filter(annon => annon.formation==this.formationId_for_annonce);
  });
}


  filterDataInscrit(): void {
    
    this.filteredIncritsFormations= this.formations.filter(formation => formation.id==this.dasbordId);
   }


  // Méthode pour filtrer les séances par module
  getSeancesByModule(moduleId: number): any[] {
    return this.seances.filter(seance => seance.module === moduleId);
  }
  

      filterModulesForFormation(formationId: number): any[] {
    // Filtre les relations ModuleFormation par formationId
    const moduleIds = this.modulesFormations.filter(moduleFormation => moduleFormation.formation === formationId)
      .map(moduleFormation => moduleFormation.module);
  
    // Retourne les modules correspondants
    return this.module.filter(module => moduleIds.includes(module.id));
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
  

}
