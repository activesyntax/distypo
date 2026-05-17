import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Document } from '../document/document';

@Component({
  selector: 'app-workspace',
  imports: [MatTabsModule, Document],
  templateUrl: './workspace.html',
  styleUrl: './workspace.css',
})
export class Workspace { }
