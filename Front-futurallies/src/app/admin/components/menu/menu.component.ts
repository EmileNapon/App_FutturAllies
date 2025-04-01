import { Component, Input, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    standalone:false
})
export class MenuComponent implements OnDestroy, AfterViewInit {
  // @Input() menuItems: any[] = [];

  
  menuItems = [
    { 
      label: 'Tableau de bord', 
      icon: 'dashboard', 
      route: 'dashboard' 
    },
    {
      label: 'Utilisateurs',
      icon: 'people',
      children: [
        { label: 'Apprenants', route: 'apprenants' },
        { label: 'Formateurs', route: 'formateurs' },
        { label: 'Entreprises', route: 'entreprises' },
        // { label: 'Administrateurs', route: 'list/users/admins' },
      ]
    },

    {
      label: 'Formations',
      icon: 'library_books',
      children: [
        { label: 'Prog. Talent', route: 'formation' },
        { label: 'Webinaires', route: 'webinaire' },
        { label: 'Cafe des Allies', route: 'trainings/coffee' },
        { label: 'Formations externes', route: 'trainings/externes' }
      ]
    },

    {
      label: 'Audition',
      icon: 'menu_book',
      children: [
        { label: 'Domaines', route: 'domaine' },
        { label: 'Parcours de formations', route: '/training-paths' },
        { label: 'Cours libres', route: '/free-courses' },
        { label: 'Cours payants', route: '/paid-courses' }
      ]
    },
    {
      label: 'Offres',
      icon: 'work',
      children: [
        { label: 'Emplois', route: 'list/offers/jobs' },
        { label: 'Stages', route: '/internships' }
      ]
    },
    {
      label: 'Écoles',
      icon: 'school',
      children: [
        { label: 'Universités', route: '/universities' },
        { label: 'Instituts', route: '/institutes' },
        { label: 'Centres de formations', route: '/training-centers' }
      ]
    },
    {
      label: 'Certifications',
      icon: 'verified',
      children: [
        { label: 'Organismes de certifications', route: '/certification-bodies' },
        { label: 'Certifications disponibles', route: '/available-certifications' },
        { label: 'Certifications délivrées', route: '/issued-certifications' }
      ]
    },
    {
      label: 'Rapports',
      icon: 'assessment',
      children: [
        { label: 'Rapports de performance', route: '/performance-reports' },
        { label: 'Rapports d’audit', route: '/audit-reports' }
      ]
    },
    {
      label: 'Interactions',
      icon: 'chat', // ou 'notifications', ou 'comment'
      children: [
        { label: 'Notifications', route: 'interaction/notifications' },
        { label: 'Messages', route: 'interaction/messages' },
        { label: 'Mails', route: 'interaction/mails' }
      ]
    },
    {
      label: 'Support',
      icon: 'help', // Icône d'aide ou de support
      children: [
        { label: 'FAQ', route: '/faq' },
        { label: 'Tickets de support', route: '/support/tickets' },
        { label: 'Aide en ligne', route: '/support/help' }
      ]
    },
    {
      label: 'Historique',
      icon: 'history', // Icône d'historique
      children: [
        { label: 'Logs d’audit', route: '/audit-logs' },
        { label: 'Modifications récentes', route: '/recent-changes' },
      ]
    },
    {
      label: 'Paramètres',
      icon: 'settings',
      children: [
        { label: 'Thèmes', route: '/themes' },
        { label: 'Apparence', route: '/appearance' },
        { label: 'Politique d’utilisation', route: '/policy' }
      ]
    },
];

  
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Vous pouvez ajouter ici des initialisations supplémentaires si nécessaire
  }

  ngOnDestroy(): void {
    // Nettoyage des tooltips
    const tooltips = this.el.nativeElement.querySelectorAll('.mat-tooltip');
    tooltips.forEach((tooltip: HTMLElement) => {
      this.el.nativeElement.removeChild(tooltip);
    });
  }
}
