export type HttpErrorFieldCode =
  'auth/missing-email' |
  'auth/email-already-in-use' |
  'auth/invalid-email' |
  'auth/missing-password'

export type HttpErrorCode =
  HttpErrorFieldCode |
  'auth/invalid-credential'
