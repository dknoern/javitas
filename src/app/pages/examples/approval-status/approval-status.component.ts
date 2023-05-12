import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-approval-status',
  templateUrl: './approval-status.component.html',
  styleUrls: ['./approval-status.component.scss']
})
export class ApprovalStatusComponent {

  @Input() status = '';

}
