import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceCreateComponent } from './components/resource-create/resource-create.component';
import { ResourceEditComponent } from './components/resource-edit/resource-edit.component';
import { ResourceDetailsComponent } from './components/resource-details/resource-details.component';
import { WebinarManagementComponent } from '../module-formation-certification/webinar/components/webinar-management/webinar-management.component';
import { ListEtudiantsComponent } from './components/utilisateurs/apprenants/list-apprenants/list-apprenants.component';
import { DetailEtudiantsComponent } from './components/utilisateurs/apprenants/detail-apprenant/detail-apprenant.component';
import { EditEtudiantsComponent } from './components/utilisateurs/apprenants/edit-apprenant/edit-apprenant.component';
import { ListEncadrantComponent } from './components/utilisateurs/encadrants/list-encadrants/list-encadrants.component';
import { DetailEncadrantComponent } from './components/utilisateurs/encadrants/detail-encadrant/detail-encadrant.component';
import { EditEncadrantComponent } from './components/utilisateurs/encadrants/edit-encadrant/edit-encadrant.component';
import { CreateEncadrantComponent } from './components/utilisateurs/encadrants/create-encadrant/create-encadrant.component';
import { ListEntrepriseComponent } from './components/utilisateurs/entreprise/list-entreprise/list-entreprise.component';
import { DetailEntrepriseComponent } from './components/utilisateurs/entreprise/detail-entreprise/detail-entreprise.component';
import { EditEntrepriseComponent } from './components/utilisateurs/entreprise/edit-entreprise/edit-entreprise.component';
import { CreateEntreprisetComponent } from './components/utilisateurs/entreprise/create-entreprise/create-entreprise.component';
import { GestionnaireDomaineComponent } from './components/gestionnaire/gestionnaire-domaine/gestionnaire-domaine.component';
import { GestionnaireModulesComponent } from './components/gestionnaire/gestionnaire-modules/gestionnaire-modules.component';
import { GestionnaireCoursComponent } from './components/gestionnaire/gestionnaire-cours/gestionnaire-cours.component';
import { GestionnaireChapitreComponent } from './components/gestionnaire/gestionnaire-chapitre/gestionnaire-chapitre.component';
import { GestionnaireFormationComponent } from './components/gestionnaire/programme-talent/formation/formation.component';
import { GestionnaireDasbordProgTalentComponent } from './components/gestionnaire/programme-talent/dasbord-prog-talent/dasbord-prog-talent.component';
import { AjoutFormationComponent } from './components/gestionnaire/programme-talent/formation/ajout-formation/ajout-formation.component';
import { ModificationFormationComponent } from './components/gestionnaire/programme-talent/formation/modification-formation/modification-formation.component';
import { AjoutSeanceComponent } from './components/gestionnaire/programme-talent/seance/ajout-seance/ajout-seance.component';
import { ModificationSeanceComponent } from './components/gestionnaire/programme-talent/seance/modification-seance/modification-seance.component';
import { AnnonceComponent } from './components/gestionnaire/programme-talent/annonce/annonce.component';
import { AjoutAnnonceComponent } from './components/gestionnaire/programme-talent/annonce/ajout-annonce/ajout-annonce.component';
import { ModificationAnnonceComponent } from './components/gestionnaire/programme-talent/annonce/modification-annonce/modification-annonce.component';
import { AjoutEncadrantComponent } from './components/gestionnaire/programme-talent/encadrant/ajout-encadrant/ajout-encadrant.component';
import { ModifEncadrantComponent } from './components/gestionnaire/programme-talent/encadrant/modif-encadrant/modif-encadrant.component';
import { GestionnaireFormationDetailComponent } from './components/gestionnaire/programme-talent/formation/formation-detail/formation-detail.component';
import { ajoutModuleComponent } from './components/gestionnaire/programme-talent/formation/ajout-formation/ajouterModule/ajouteModule.component';



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },  // Redirection vers dashboard si l'URL est vide
      { path: 'dashboard', component: DashboardComponent},

      {path: 'apprenants', component: ListEtudiantsComponent},
      {path: 'apprenants/:detailApprenant/detail', component: DetailEtudiantsComponent},
      {path: 'apprenants/:updateApprenant/update', component: EditEtudiantsComponent},

      {path: 'formateurs', component: ListEncadrantComponent},
      {path: 'formateurs/:detailFormateur/detail', component: DetailEncadrantComponent},
      {path: 'formateurs/:updateFormateur/update', component: EditEncadrantComponent},
      {path:'create-formateur', component:CreateEncadrantComponent},


      {path: 'entreprises', component: ListEntrepriseComponent},
      {path: 'entreprises/:detailEntreprise/detail', component: DetailEntrepriseComponent},
      {path: 'entreprises/:updateEntreprise/update', component: EditEntrepriseComponent},
      {path:'create-entreprise', component:CreateEntreprisetComponent},

      // {path: 'formateur', component: EncadrantComponent},
      // {path: 'etudiants', component: EtudiantComponent},

      { path: 'list/:resourceType', component: ResourceListComponent },
      { path: 'list/:resourceType/:resourceChild', component: ResourceListComponent },
      { path: 'create/:resourceType', component: ResourceCreateComponent },
      { path: 'edit/:resourceType/:id', component: ResourceEditComponent },
      { path: 'details/:resourceType/:id', component: ResourceDetailsComponent },
      {path:'domaine', component:GestionnaireDomaineComponent},
      {path:':iddomaineGestionnaireId/module', component:GestionnaireModulesComponent},
      {path:':idmoduleGestionnaireId/cours', component:GestionnaireCoursComponent},
      {path:':idcoursGestionnaireId/chapitre', component:GestionnaireChapitreComponent},
      {path: 'formation', component: GestionnaireFormationComponent},
      {path: ':dasbordId/programme-talent', component: GestionnaireDasbordProgTalentComponent},
      // {path: 'formation/:formationId/detail', component: GestionnaireFormationDetailComponent},
      
      // {path:'gestionnaire/:idchapitreGestionnaireId/gestionnaire-contenu', component:GestionnaireModifierContenuCoursComponent},
      // {path:'gestionnaire/gestionnaire-certificat', component:GestionnaireCertificatComponent},
      // {path:'gestionnaire/:certificatGestionnaireId/GestionnaireCertificat', component:GestionnaireCertificatCoursComponent},
      
      {path: 'dasbord/:dasbordId/dasbord-prog-talent', component: GestionnaireDasbordProgTalentComponent},
      {path: 'formation', component: GestionnaireFormationComponent},
      { path: 'ajouter-formation', component: AjoutFormationComponent },
      { path: 'update/:id/formation', component: ModificationFormationComponent },
      {path: 'create-seance/:id', component: AjoutSeanceComponent},
      {path: 'modification-seance/:id', component: ModificationSeanceComponent},

      {path: 'list-annonce', component: AnnonceComponent},
      {path: 'ajouter-annonce', component: AjoutAnnonceComponent},
      {path: 'modification-annonce/:id', component: ModificationAnnonceComponent},

      
      {path: 'ajout-encadrant', component: AjoutEncadrantComponent},

      {path: 'modification-encadrant/:id', component: ModifEncadrantComponent},
      {path: 'formation-detail/:id', component: GestionnaireFormationDetailComponent},
      {path:'Module-formation/:id_joutFormation/formation', component : ajoutModuleComponent},
      {path:'create/:id_joutFormation/:seanceId/seance', component : AjoutSeanceComponent},
      // {path:'create-formateur', component:CreationFormateurComponent},
      {path:'webinaire', component:WebinarManagementComponent},
      
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}