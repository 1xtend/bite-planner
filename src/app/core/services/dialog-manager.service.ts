import { inject, Injectable } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs';
import { DEFAULT_DIALOG_CONFIG } from '../../shared/helpers/dialog-config';

@Injectable({
  providedIn: 'root'
})
export class DialogManagerService {
  private dialogService = inject(DialogService);

  dialogRef: DynamicDialogRef | undefined = undefined;

  openDialog(component: any, config?: DynamicDialogConfig): DynamicDialogRef {
    const dialogConfig: DynamicDialogConfig = {
      ...DEFAULT_DIALOG_CONFIG,
      ...config
    };

    this.dialogRef = this.dialogService.open(component, dialogConfig);

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
