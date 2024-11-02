import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MessageService } from 'primeng/api';
import { mockMessageService } from '../../testing/mock-services';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: MessageService, useValue: mockMessageService }]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when showMessage is called', () => {
    it('should call add with default parameters', () => {
      const parameters = {
        severity: 'error',
        detail: 'Error',
        life: 5000
      };

      service.showMessage('Error', 'error');
      expect(mockMessageService.add).toHaveBeenCalledWith(parameters);
    });

    it('should call add with provided time', () => {
      const parameters = {
        severity: 'success',
        detail: 'Success',
        life: 10000
      };

      service.showMessage('Success', 'success', 10000);
      expect(mockMessageService.add).toHaveBeenCalledWith(parameters);
    });
  });
});
