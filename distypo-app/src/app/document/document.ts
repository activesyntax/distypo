import { Component } from '@angular/core';

@Component({
  selector: 'app-document',
  imports: [],
  templateUrl: './document.html',
  styleUrl: './document.scss',
})
export class Document {
  articleText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

(More paragraphs here…)`;
}
