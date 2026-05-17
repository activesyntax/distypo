import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Workspace } from './workspace/workspace';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Workspace],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('distypo-app');
}
