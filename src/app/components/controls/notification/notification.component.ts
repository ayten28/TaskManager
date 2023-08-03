import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() _header : string = '';
  @Input() _message: string = '';
  @Input() _alertType: string = '';

}
