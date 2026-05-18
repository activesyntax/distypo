import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-document',
  imports: [],
  templateUrl: './document.html',
  styleUrl: './document.scss',
})
export class Document {
  selected = signal<string | null>('noon');
  select(id: string) { this.selected.set(id); }
  keep(id: string) { /* az eredeti marad — issue feloldva */ }
  fix(id: string) { /* javasolt csere alkalmazása */ }
  edit(id: string) { /* inline szerkesztő megnyitása */ }
}
