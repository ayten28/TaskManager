import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  animations: [
    trigger('slideDown', [
      state('void', style({ height: '0' })),
      state('*', style({ height: '*' })),
      transition('void <=> *', animate('250ms ease-in-out'))
    ])
  ]
})
export class CommentsComponent {

}
