import { UserMetadata } from '@angular/fire/auth';

export interface UserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  metadata: UserMetadata;
}
