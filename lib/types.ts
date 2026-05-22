/** Shared request/response contracts for the mock API routes. */

export interface CreateEntryResponse {
  entryId: string;
  message: string;
}

export interface VerifyEntryResponse {
  verified: true;
  selected: true;
  entryNumber: number;
}

export interface CountdownResponse {
  targetIso: string;
  secondsRemaining: number;
}

export interface ApiError {
  error: string;
}
