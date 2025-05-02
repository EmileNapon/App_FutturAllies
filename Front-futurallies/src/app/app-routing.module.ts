import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturationComponent } from './gestion-abonnements-premium/facturation/facturation.component';
import { PremiumEmployeurComponent } from './gestion-abonnements-premium/premium-employeur/premium-employeur.component';
import { PremiumCandidatComponent } from './gestion-abonnements-premium/premium-candidat/premium-candidat.component';
import { PremiumEtudiantComponent } from './gestion-abonnements-premium/premium-etudiant/premium-etudiant.component';
import { ModuleFormationCertificationComponent } from './module-formation-certification/module-formation-certification.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ContenuLibreComponent } from './module-formation-certification/contenu-libre/contenu-libre.component';
import { GestionUtilisateursComponent } from './gestion-utilisateurs/gestion-utilisateurs.component';
import { RegistrationComponent } from './gestion-utilisateurs/inscription/inscription.component';
import { ConnexionComponent } from './gestion-utilisateurs/connexion/connexion.component';
import { AcceuilFormationComponent } from './module-formation-certification/acceuil-formation/acceuil-formation.component';
import { EtablissementsComponent } from './orientations/etablissements/etablissements.component';
import { OrientationsComponent } from './orientations/orientations.component';
import { OrientationAcceuilComponent } from './orientations/orientation-acceuil/orientation-acceuil.component';
import { ModuleComponent } from './module-formation-certification/domaines-listes/domaines.component';

import { CoursComponent } from './module-formation-certification/cours/cours.component';

import { CertificationComponent } from './module-formation-certification/certification/certification.component';
import { CertificationContenuComponent } from './module-formation-certification/certification-contenu/certification-contenu.component';
import { certificationContenuChapitreComponent } from './module-formation-certification/certification-contenu_chapitre/certification-contenu_chapitre';
import { WebinarListComponent } from './module-formation-certification/webinar/components/webinar-list/webinar-list.component';
import { WebinarDetailsComponent } from './module-formation-certification/webinar/components/webinar-details/webinar-details.component';
import { WebinarEnrollComponent } from './module-formation-certification/webinar/components/webinar-enrollment/webinar-enrollment.component';
import { WebinarManagementComponent } from './module-formation-certification/webinar/components/webinar-management/webinar-management.component';
import { ChapitreComponent } from './module-formation-certification/chapitre/chapitre.component';

import { FormationDetailComponent } from './module-formation-certification/prog-talent/formation/formation-detail/formation-detail.component';


import { FormationComponent } from './module-formation-certification/prog-talent/formation/formation.component';
import { InscriptionPragraTalentComponent } from './module-formation-certification/prog-talent/formation/formation-detail/inscription-pragra-talent/inscription-pragra-talent.component';
import { DasbordEtudiantComponent } from './dasbord-etudiant/dasbord-etudiant.component';
import { DasbordEtudiantTalentComponent } from './module-formation-certification/etudiant/dasbord-etudiant-talent/dasbord-etudiant-talent.component';

import { LoginComponent } from './admin/components/login/login.component';
import { DashboardComponent } from './offer/components/dashboard/dashboard/dashboard.component';

import { UserProfileTypeComponent } from './payment/components/user-profile-type/user-profile-type.component';
import { AcceuilNosServicesComponent } from './acceuil-NosServices/acceuil-NosServices';



const routes: Routes = [


{path: "test1", component: AcceuilNosServicesComponent},


  {path:'subscription', component:UserProfileTypeComponent}, 



  

  {path:'',component:AcceuilComponent},
  {path:'dasbord',component : DasbordEtudiantComponent},
  {path:'facturation', component:FacturationComponent},
  {path:'premiumCandidat', component:PremiumCandidatComponent},
  {path:'premiumEmployeur', component:PremiumEmployeurComponent},
  {path:'premiumEtudiant', component:PremiumEtudiantComponent},
  {path:'acceuil', component:AcceuilComponent},
  {path:'dashboard',component:DashboardComponent},

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },

  { path: 'admin-login', component: LoginComponent },
  { path: 'webinar-list', component: WebinarListComponent },
  { path: 'webinar-details/:id/detail', component: WebinarDetailsComponent },
  { path: 'webinar-enroll/:id/incription', component: WebinarEnrollComponent },
  { path: 'webinar-dashboard', component: WebinarManagementComponent},

  {path:'formation',component:ModuleFormationCertificationComponent,children:[
    {path:'contenuLibre', component:ContenuLibreComponent}, 

]},



{path: 'progTalent', component: FormationComponent},
{path:'formation/:FormationId/detail', component:FormationDetailComponent},   
{path:'formation/:FormationId/inscrit', component:InscriptionPragraTalentComponent},   
{path: 'dasbord/:DasbordFormationId/dasbord-etudiant', component: DasbordEtudiantTalentComponent},
{path: 'dasbord-prog-talent', component: DasbordEtudiantComponent},


  {path:'domaines', component:AcceuilFormationComponent},
  {path:'domaines/:domaineId/modules', component:ModuleComponent},  
  {path:'modules/:coursId/cours', component:CoursComponent},
  {path:'cours/:chapitreId/chapitres', component:ChapitreComponent},

  {path:'programme-talent/:programmeId/programme', component:ChapitreComponent}, 
  {path:'certification', component:CertificationComponent},
  {path:'certification/:idCertification/certification', component:CertificationContenuComponent},
  {path:'certification', component:CertificationComponent},
  {path:'certification/:idCertification/certification', component:CertificationContenuComponent},

  {path:'parcours/:idCertificationContenuChapitre', component:certificationContenuChapitreComponent},
  // {path:'parcours-certificat/:idQuiz/quiz', component:certificationContenuChapitreComponent},

  {path:'usersPages',component:GestionUtilisateursComponent,children:[
    {path:'register', component:RegistrationComponent}, 
    {path:'login', component:ConnexionComponent},
  ]},
  



  {path:'orientation',component:OrientationsComponent,children:[
    {path:'orientationAcceuil', component:OrientationAcceuilComponent},
    {path:'etablissement', component:EtablissementsComponent},

  ]},


{
  path: "offers", 
  loadChildren:()=>import('./offer/offer.module').then(m=>m.OfferModule)
}

  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
