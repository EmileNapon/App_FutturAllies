import { Component, OnInit } from '@angular/core';
import { Formation } from '../models/tousModel';
import { FormationService } from '../services/formation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleService } from '../services/module.service';
import { ModuleFormationService } from '../services/moduleFormation.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { AuthService } from 'src/app/gestion-utilisateurs/connexion/service-connexion/service-connexion.service';

@Component({
  selector: 'app-formateur-formations',
  templateUrl: './formateur-formations.component.html',
  styleUrl: './formateur-formations.component.css',
  standalone:false
})
export class FormateurFormationsComponent implements OnInit {

   
  formationsActifs:number=0
  formationsNotActifs:number=0
  formations: Formation[] = [];
  loading:boolean=false

  page: number = 1; // Current page
  size: number = 5; // Default items per page
  sizeOptions: number[] = [5, 10, 20, 100]; // Page size options
  totalPages: number = 1; // Total number of pages
  paginatedFormations: Formation[] = []; // Paginated apprenants for display


  module : any[]=[]
  modulesFormations: any[]=[]
 // formationId!:number
  formationWithModules: any[]=[]

  searchTerm: string = '';
  sortOrder: string = '';
   
  encadrantDetail:any=null
  encadrantId !:number
  userInfo: { email: string | null, firstName: string | null, lastName: string | null, profilePic: string | null, id: string | null, role: string | null, is_superuser:boolean | null  } | null = null;
  dasbordFormateurId!: number

 VoirProgrammeTalentListVisible!:boolean
 IisVisibleDetail!: boolean


  constructor(
    private formationService: FormationService,
    private router: Router,
    private moduleService : ModuleService,
    private moduleFormationService  : ModuleFormationService,
    private route: ActivatedRoute, 
    private utilisateurService: UtilisateurService,
    private serviceAuth: AuthService,
  ) {}





  ngOnInit(): void {
    this.userInfo = (this.serviceAuth.getUserInfo());
    this.dasbordFormateurId = Number(this.route.snapshot.paramMap.get('dasbordFormateurId'));
    this.VoirProgrammeTalentListVisible=true
    this.IisVisibleDetail=false
  //  this.formationId = this.route.snapshot.params['FormationId'];
    this.loadFormations1();
    this.loadModules()
    this.loadModulesFormations()
    this.LoadEncadrantDetail()
  }


    ngVoirProgrammeTalentList():void{
    this.VoirProgrammeTalentListVisible=true
  }


  loadFormations(): void {
    this.formationService.getFormations().subscribe(
      (data) => {
        this.formations = data;
        console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv',this.formations)
      },
      (error) => {
        console.error('Erreur lors du chargement des formations:', error);
      }
    );
  }

  LoadEncadrantDetail():void{
    this.utilisateurService.getEncadrantByIds(Number(this.userInfo?.id)).subscribe((data) => {
      this.encadrantDetail = data;
    });
  }


  loadModules(): void {
    this.moduleService.getModules().subscribe(data => {
      this.module = data;
      
      
    });
  }

  loadModulesFormations(): void {
    this.moduleFormationService.getModuleFormations().subscribe(
      (data) => {
        this.modulesFormations = data;
        
       
      },
      (error) => {
        console.error('Erreur lors du chargement des modules:', error);
      }
    );
  }

  allerDetail(encadrantId:number):void{
    this.router.navigate([`/formateurs/${encadrantId}/detail/`])
  }

  filterModulesForFormation(formationId: number): any[] {
    // Filtre les relations ModuleFormation par formationId
    const moduleIds = this.modulesFormations.filter(moduleFormation => moduleFormation.formation === formationId)
      .map(moduleFormation => moduleFormation.module);
  
    // Retourne les modules correspondants
    return this.module.filter(module => moduleIds.includes(module.id));
  }



  deleteFormation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ? ')) {
      this.formationService.deleteFormation(id).subscribe(() => {
        this.loadFormations(); // Recharger la liste après la suppression
      });
    }
  }

  onSelectFormation(DasbordFormationId: number): void {
    this.router.navigate([`${DasbordFormationId}/formateurprogramme`]); 
  }
    







  loadFormations1(): void {

    this.loading = true;
    const filters: any = { };
  
    if (this.searchTerm) filters.search = this.searchTerm;
    if (this.sortOrder) filters.ordering = this.sortOrder;

    this.formationService.getFormations1(filters).subscribe(
      (data) => {
        this.formations = data;
        this.totalPages = Math.ceil(this.formations.length / this.size);
        this.updatePaginatedFormations();
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }


  updatePaginatedFormations(): void {
    const startIndex = (this.page - 1) * this.size;
    const endIndex = startIndex + this.size;
    this.paginatedFormations = this.formations.slice(startIndex, endIndex);
  }



  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.updatePaginatedFormations();
    }
  }
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePaginatedFormations();
    }

  }
  changePageSize(newSize: number): void {
    if (this.sizeOptions.includes(newSize)) {
      this.size = newSize;
      this.page = 1; // Reset to first page
      this.totalPages = Math.ceil(this.formations.length / this.size);
      this.updatePaginatedFormations();
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newSize = parseInt(selectElement.value, 10);
    this.changePageSize(newSize);
  }


}
