import { TestBed } from '@angular/core/testing';

import { DialogManagerService } from './dialog-manager.service';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { mockDialogService } from '../../testing/mock-services';
import { Component } from '@angular/core';
import { DEFAULT_DIALOG_CONFIG } from '../../shared/helpers/dialog-config';
import { mockDynamicDialogRef } from '../../testing/test-helpers';

@Component({
  selector: 'app-test',
  template: ''
})
class MockComponent {
}

describe('DialogManagerService', () => {
  let service: DialogManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DialogService, useValue: mockDialogService }
      ]
    });
    service = TestBed.inject(DialogManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when openDialog is called', () => {
    it('should open dialog with no config', () => {
      service.openDialog(MockComponent);
      expect(mockDialogService.open).toHaveBeenCalledWith(MockComponent, DEFAULT_DIALOG_CONFIG);
      expect(service.dialogRef).toEqual(mockDynamicDialogRef);
    });

    it('should open dialog with provided config', () => {
      const config: DynamicDialogConfig = {
        header: 'test',
        modal: false,
        data: { test: true },
        position: 'start'
      };

      service.openDialog(MockComponent, config);
      expect(mockDialogService.open).toHaveBeenCalledWith(MockComponent, {
        ...DEFAULT_DIALOG_CONFIG,
        ...config
      });
      expect(service.dialogRef).toEqual(mockDynamicDialogRef);
    });
  });

  it('should close dialog when closeDialog is called', () => {
    service.openDialog(MockComponent);

    expect(mockDialogService.open).toHaveBeenCalledWith(MockComponent, DEFAULT_DIALOG_CONFIG);
    expect(service.dialogRef).toEqual(mockDynamicDialogRef);

    service.closeDialog();
    expect(mockDynamicDialogRef.close).toHaveBeenCalled();
    expect(service.dialogRef).toBeUndefined();
  });

  it('should close dialog when dialogRef onClose emits event', () => {
    service.openDialog(MockComponent);

    expect(mockDialogService.open).toHaveBeenCalledWith(MockComponent, DEFAULT_DIALOG_CONFIG);
    expect(service.dialogRef).toEqual(mockDynamicDialogRef);

    mockDynamicDialogRef.onClose.next(null);
    expect(service.dialogRef).toBeUndefined();
  });
});
