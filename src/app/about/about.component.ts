import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  contacto = {
    nombre: 'Hugo Ernesto Cervantes Ponce',
    email: 'nemessiz.xd@gmail.com',
    github: 'https://github.com/hugocep'
  };
}
