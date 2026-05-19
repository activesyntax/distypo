import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatButton, MatIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer { }
