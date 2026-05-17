import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Workspace } from './workspace/workspace';
import { MatToolbar } from '@angular/material/toolbar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, Workspace],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('distypo-app');
}
