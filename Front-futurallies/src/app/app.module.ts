import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ModuleFormationCertificationModule } from './module-formation-certification/module-formation-certification.module';
import { RouterModule } from '@angular/router';
import { PremiumEtudiantComponent } from './gestion-abonnements-premium/premium-etudiant/premium-etudiant.component';
import { GestionUtilisateursModule } from './gestion-utilisateurs/gestion-utilisateurs.module';

import { OrientationsModule } from './orientations/orientations.module';
import { FooterComponent} from './header-footer/footer/footer.component'
import{HeaderPrincipaleComponent} from './header-footer/header-principal/headerPrincipale';
import { HeaderGestionnaireComponent } from './header-footer/header-gestionnaire/header-gestionnaire.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor'; // Chemin vers ton intercepteur
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DasbordEtudiantComponent } from './dasbord-etudiant/dasbord-etudiant.component';
import { OfferModule } from './offer/offer.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormatDatePipe } from './module-formation-certification/a_pipes/datePipe';

import { AcceuilNosServicesComponent } from './acceuil-NosServices/acceuil-NosServices';
import { FormateurDashboardComponent } from './formateur-dashboard/formateur-dashboard.component';
import { FormateurFormationsComponent } from './formateur-dashboard/formateur-formations/formateur-formations.component';
import { AnnoncesComponent } from './formateur-dashboard/annonces/annonces.component';
import { FormateurEvaluationComponent } from './formateur-dashboard/formateur-Evaluation/formateur-Evaluation';
import { DetailEncadrantComponent } from './formateur-dashboard/detail-encadrant/detail-encadrant.component';
import { QuizComponent } from './formateur-dashboard/quiz/quiz.component';
import { QuizDetailComponent } from './formateur-dashboard/quiz-detail/quiz-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    AcceuilComponent,PremiumEtudiantComponent, HeaderPrincipaleComponent, HeaderGestionnaireComponent,
     DasbordEtudiantComponent, FooterComponent,AcceuilNosServicesComponent, FormateurDashboardComponent, 
     FormateurFormationsComponent,AnnoncesComponent, FormateurEvaluationComponent, DetailEncadrantComponent,
     QuizComponent, QuizDetailComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,FormsModule,
    BrowserAnimationsModule,  MatSlideToggleModule,
    AppRoutingModule, RouterModule, GestionUtilisateursModule, OrientationsModule, ModuleFormationCertificationModule, OfferModule, MatDividerModule, MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
