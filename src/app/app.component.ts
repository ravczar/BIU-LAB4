import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // nazwa dyrektywy
  templateUrl: './app.component.html', // ścieżka do pliku z szablonem html
  styleUrls: ['./app.component.css'] // ścieżki do plikow css 
})
export class AppComponent {
  title = 'app works!';
}
