import { DynamicDialogConfig } from 'primeng/dynamicdialog';

export const DEFAULT_DIALOG_CONFIG: DynamicDialogConfig = {
  modal: true,
  draggable: false,
  dismissableMask: true,
  height: 'auto',
  width: '50vw',
  breakpoints: {
    '1200px': '50vw',
    '992px': '60vw',
    '768px': '70vw',
    '576px': '80vw',
    '0px': '90vw'
  }
};
