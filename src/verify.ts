// src/verify.ts
//
// ActSpec v0.1 — Offline Verification

import * as ed from '@noble/ed25519';
import { TextEncoder } from 'node:util';

import { canonicalizePayload } from './canonicalize.js';
import type { ActProof, VerificationResult } from './types.js';

export async function verifyActProof(
  proof: ActProof,
  publicKeyHex: string
): Promise<VerificationResult> {
  try {
    if (proof.spec !== 'actspec-v0.1') {
      return { valid: false, reason: 'Invalid spec version' };
    }

    if (
      !proof.id ||
      !proof.issued_at ||
      !proof.manifest_hash ||
      !proof.issuer?.id ||
      !proof.signature
    ) {
      return { valid: false, reason: 'Malformed proof structure' };
    }

    if (proof.signature.alg !== 'Ed25519') {
      return { valid: false, reason: 'Unsupported algorithm' };
    }

    const { signature, ...payload } = proof;
    const canonicalPayload = canonicalizePayload(payload);

    const messageBytes = new TextEncoder().encode(canonicalPayload);
    const signatureBytes = ed.etc.hexToBytes(signature.value);
    const publicKeyBytes = ed.etc.hexToBytes(publicKeyHex);

    const ok = await ed.verify(signatureBytes, messageBytes, publicKeyBytes);

    return ok ? { valid: true } : { valid: false, reason: 'Invalid signature' };
  } catch {
    return { valid: false, reason: 'Verification error' };
  }
}
