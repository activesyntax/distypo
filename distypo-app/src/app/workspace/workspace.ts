import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DocumentInfo } from '@app/document-info/document-info';
import { Issues } from '@app/issues/issues';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-workspace',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatListModule, MatIconModule,
    DocumentInfo, Issues
  ],

  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace { }

