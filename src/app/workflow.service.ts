import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  workflow = [
    {
      'status': 'Repair requested',
      'nextStep': 'Enter tracking information',
      'isAdmin': false,
      'widget':'trackingInfo'
    },
    {
      'status': 'Watch shipped',
      'nextStep': 'Receive watch',
      'isAdmin': true,
      'widget':'nextStatus'
    },
    {
      'status': 'Watch received',
      'nextStep': 'Create estimate',
      'isAdmin': true,
      'widget':'createEstimate'
    },
    {
      'status': 'Estimate created',
      'nextStep': 'Review estimate',
      'isAdmin': false,
      'widget':'reviewEstimate'
    },
    {
      'status': 'Estimate approved',
      'nextStep': 'Accept payment',
      'isAdmin': true,
      'widget':'nextStatus'
    },
    {
      'status': 'Payment accepted',
      'nextStep': 'Order parts',
      'isAdmin': true,
      'widget':'nextStatus'
    },
    {
      'status': 'Parts ordered',
      'nextStep': 'Receive all parts, start service',
      'isAdmin': true,
      'widget':'nextStatus'
    },
    {
      'status': 'All parts received, service started',
      'nextStep': 'Complete service',
      'isAdmin': true,
      'widget':'nextStatus'
    },
    {
      'status': 'Service completed',
      'nextStep': 'Return completed watch',
      'isAdmin': true,
      'widget':'trackingInfo'
    },
    {
      'status': 'Watch shipped back',
      'nextStep': '',
      'isAdmin': false,
      'widget':''
    }
  ];
  
  workflowStatuses = this.workflow.map(x => x.status);
  
  getStatusInfo(status){
    return this.workflow.find(x => x.status === status);
  }
    
  getNextStatus(status) {
    let i  = this.workflowStatuses.indexOf(status);
    let nextStatus = i < this.workflowStatuses.length - 1 ? this.workflowStatuses[i + 1] : '';
    return nextStatus;
  }

  isAdminStatus(status){
    console.log('status',JSON.stringify(this.getStatusInfo(status)));
    return this.getStatusInfo(status).isAdmin;
  }

  getOrderSeverity(status,isAdmin) {
    if ('Watch shipped back' === status) return 'success';
    return this.isAdminStatus(status) === isAdmin ? 'warning' : 'primary';
  }
}
