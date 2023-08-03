import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PopUpComponent } from './pop-up.component';

@Injectable()
export class PopUpService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    message: string,
    btnOkText: string,
    btnCancelText: string ,
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(PopUpComponent, { size: dialogSize });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

}
