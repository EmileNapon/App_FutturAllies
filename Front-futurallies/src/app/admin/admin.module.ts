import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceEditComponent } from './components/resource-edit/resource-edit.component';
import { ResourceCreateComponent } from './components/resource-create/resource-create.component';
import { ResourceDetailsComponent } from './components/resource-details/resource-details.component';
import { LoginComponent } from './components/login/login.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MenuComponent } from './components/menu/menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { CreationFormateurComponent } from './components/gestionnaire/creation-formateur/creation-formateur.component';
import { FormateurDashboardComponent } from './components/gestionnaire/formateur/formateur-dashboard/formateur-dashboard.component';
import { FormateurEvaluationComponent } from './components/gestionnaire/formateur/formateur-Evaluation/formateur-Evaluation';
import { ListFormateurComponent } from './components/gestionnaire/formateur/list-formateur/list-formateur.component';
import { GestionnaireAcceuilComponent } from './components/gestionnaire/gestionnaire-acceuil/gestionnaire-acceuil.component';
import { GestionnaireCertificatComponent } from './components/gestionnaire/gestionnaire-certificat/gestionnaire-certificat.component';
import { GestionnaireCertificatCoursComponent } from './components/gestionnaire/gestionnaire-certificat-cours/gestionnaire-certificat-cours.component';
import { GestionnaireChapitreComponent } from './components/gestionnaire/gestionnaire-chapitre/gestionnaire-chapitre.component';
import { GestionnaireModifierContenuCoursComponent } from './components/gestionnaire/gestionnaire-modifier-contenu-cours/gestionnaire-modifier-contenu-cours.component';
import { GestionnaireCoursComponent } from './components/gestionnaire/gestionnaire-cours/gestionnaire-cours.component';
import { GestionnaireDomaineComponent } from './components/gestionnaire/gestionnaire-domaine/gestionnaire-domaine.component';
import { GestionnaireModulesComponent } from './components/gestionnaire/gestionnaire-modules/gestionnaire-modules.component';
import { EncadrantComponent } from './components/gestionnaire/programme-talent/encadrant/encadrant.component';
import { AjoutAnnonceComponent } from './components/gestionnaire/programme-talent/annonce/ajout-annonce/ajout-annonce.component';
import { ModificationAnnonceComponent } from './components/gestionnaire/programme-talent/annonce/modification-annonce/modification-annonce.component';
import { GestionnaireDasbordProgTalentComponent } from './components/gestionnaire/programme-talent/dasbord-prog-talent/dasbord-prog-talent.component';
import { AjoutEncadrantComponent } from './components/gestionnaire/programme-talent/encadrant/ajout-encadrant/ajout-encadrant.component';
import { ModifEncadrantComponent } from './components/gestionnaire/programme-talent/encadrant/modif-encadrant/modif-encadrant.component';
import { FooterComponent } from './components/gestionnaire/programme-talent/footer/footer.component';
import { GestionnaireFormationComponent } from './components/gestionnaire/programme-talent/formation/formation.component';
import { ajoutModuleComponent } from './components/gestionnaire/programme-talent/formation/ajout-formation/ajouterModule/ajouteModule.component';
import { AjoutFormationComponent } from './components/gestionnaire/programme-talent/formation/ajout-formation/ajout-formation.component';
import { GestionnaireFormationDetailComponent } from './components/gestionnaire/programme-talent/formation/formation-detail/formation-detail.component';
import { ModificationFormationComponent } from './components/gestionnaire/programme-talent/formation/modification-formation/modification-formation.component';
import { GroupeEtudiantComponent } from './components/gestionnaire/programme-talent/groupe-etudiant/groupe-etudiant.component';
import { HeaderComponent } from './components/gestionnaire/programme-talent/header/header.component';
import { ModificationSeanceComponent } from './components/gestionnaire/programme-talent/seance/modification-seance/modification-seance.component';
import { AjoutSeanceComponent } from './components/gestionnaire/programme-talent/seance/ajout-seance/ajout-seance.component';
import { EtudiantComponent } from './components/gestionnaire/programme-talent/etudiant/etudiant.component';
import { AnnonceComponent } from './components/gestionnaire/programme-talent/annonce/annonce.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    LoginComponent,
    AdminComponent,
    MenuComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    ResourceListComponent,
    ResourceEditComponent,
    ResourceCreateComponent,
    ResourceDetailsComponent,
    ConfirmationDialogComponent,

    CreationFormateurComponent,FormateurDashboardComponent,FormateurEvaluationComponent,ListFormateurComponent, GestionnaireAcceuilComponent,
    GestionnaireCertificatComponent, GestionnaireCertificatCoursComponent, GestionnaireChapitreComponent, GestionnaireCoursComponent, GestionnaireDomaineComponent,
    GestionnaireModifierContenuCoursComponent, GestionnaireModulesComponent,ModificationSeanceComponent,EtudiantComponent,

    AjoutAnnonceComponent, ModificationAnnonceComponent, GestionnaireDasbordProgTalentComponent, AjoutEncadrantComponent, ModifEncadrantComponent, EncadrantComponent,

    FooterComponent, ajoutModuleComponent, AjoutFormationComponent, GestionnaireFormationDetailComponent, ModificationFormationComponent, GestionnaireFormationComponent,

    GroupeEtudiantComponent, AjoutSeanceComponent, AnnonceComponent,
  ],
  imports: [

    AdminRoutingModule,
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatInputModule,
    MatBadgeModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxChartsModule,
    MatDividerModule, MatIconModule, ReactiveFormsModule, FormsModule,  MatIconModule,

    CKEditorModule,
  ],
  exports: [
    LoginComponent,
    AdminComponent,
    MenuComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    ResourceListComponent,
    ResourceEditComponent,
    ResourceCreateComponent,
    ResourceDetailsComponent,
    ConfirmationDialogComponent,
  ]
})

export class AdminModule { }
