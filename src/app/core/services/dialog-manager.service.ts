import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {
  private dialogService = inject(DialogService);

  private dialogRef: DynamicDialogRef | undefined = undefined;

  openDialog(component: any, config?: DynamicDialogConfig): DynamicDialogRef {
    const defaultConfig: DynamicDialogConfig = {
      modal: true,
      draggable: false,
      ...config
    };

    this.dialogRef = this.dialogService.open(component, defaultConfig);

    this.dialogRef.onClose.pipe(take(1)).subscribe(() => {
      this.dialogRef = undefined;
    });

    return this.dialogRef;
  }

  closeDialog(): void {
    if (!this.dialogRef) {
      return;
    }

    this.dialogRef.close();
    this.dialogRef = undefined;
  }
}
