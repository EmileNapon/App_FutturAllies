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
        { label: 'Cafe des Allies' },
        { label: 'Formations externes' }
      ]
    },

    {
      label: 'Audition',
      icon: 'menu_book',
      children: [
        { label: 'Domaines', route: 'domaine' },
        { label: 'Parcours de formations' },
        { label: 'Cours libres'},
        { label: 'Cours payants'}
      ]
    },
    {
      label: 'Offres',
      icon: 'work',
      children: [
        { label: 'Emplois' },
        { label: 'Stages'}
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
        { label: 'Organismes de certifications' },
        { label: 'Certifications disponibles' },
        { label: 'Certifications délivrées' }
      ]
    },

    {
      label: 'Interactions',
      icon: 'chat', // ou 'notifications', ou 'comment'
      children: [
        { label: 'Notifications'},
        { label: 'Messages' },
        { label: 'Mails'}
      ]
    },

   
    {
      label: 'Paramètres',
      icon: 'settings',
      children: [
        { label: 'Thèmes'},
        { label: 'Apparence'},
        { label: 'Politique d’utilisation' }
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
