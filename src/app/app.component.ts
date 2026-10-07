import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header class="site-header">
      <nav class="menu">
        <a routerLink="/home" routerLinkActive="active">Home</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
      </nav>
    </header>

    <main class="container">
      <router-outlet></router-outlet>
    </main>

    <footer class="site-footer">
      <small>{{ title }} &copy; {{ year }} · Angular 18 + Firestore</small>
    </footer>
  `
})
export class AppComponent {
  title = 'LifeGoals';
  year = new Date().getFullYear();
}
