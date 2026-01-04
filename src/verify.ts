// src/verify.ts
//
// ActSpec v0.1 — Verification

import { canonicalizePayload } from './canonicalize.js';
import type { ActProof, VerificationResult } from './types.js';

export function verifyActProof(_proof: ActProof): VerificationResult {
  // impl placeholder
  return { valid: true };
}
