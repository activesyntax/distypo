import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Workspace } from './workspace/workspace';
import { Header } from './header/header'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Workspace],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('distypo-app');
}
