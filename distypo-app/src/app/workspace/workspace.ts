import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-workspace',
  imports: [MatTabsModule],
  templateUrl: './workspace.html',
  styleUrl: './workspace.css',
})
export class Workspace { }
