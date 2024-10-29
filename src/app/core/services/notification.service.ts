import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Severity } from '../../shared/models/types/severity.type';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageService = inject(MessageService);

  showMessage(text: string, type: Severity, life: number = 5000): void {
    this.messageService.add({
      severity: type,
      detail: text,
      life
    });
  }
}
