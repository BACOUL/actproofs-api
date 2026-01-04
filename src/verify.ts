// src/verify.ts
//
// ActSpec v0.1 — Offline Verification
//
// Performs STRICT, OFFLINE verification of an ActProof.
//
// Guarantees:
// - Spec version lock
// - Structural validation
// - Algorithm enforcement (Ed25519 only)
// - RFC 8785 canonicalization
// - Full payload signature verification
//
// Any failure => INVALID proof.

import * as ed from '@noble/ed25519';
import { TextEncoder } from 'node:util';

import { canonicalizePayload } from './canonicalize';
import type { ActProof, VerificationResult } from './types';

/**
 * Verify an ActProof (offline).
 *
 * @param proof - ActProof object to verify
 * @param publicKeyHex - Issuer public key (hex-encoded)
 * @returns VerificationResult
 */
export async function verifyActProof(
  proof: ActProof,
  publicKeyHex: string
): Promise<VerificationResult> {
  try {
    /* 1. SPEC VERSION LOCK */
    if (proof.spec !== 'actspec-v0.1') {
      return { valid: false, reason: 'Invalid spec version' };
    }

    /* 2. STRUCTURAL INTEGRITY */
    if (
      !proof.id ||
      !proof.issued_at ||
      !proof.manifest_hash ||
      !proof.issuer?.id ||
      !proof.signature
    ) {
      return { valid: false, reason: 'Malformed proof structure' };
    }

    /* 3. ALGORITHM ENFORCEMENT */
    if (proof.signature.alg !== 'Ed25519') {
      return { valid: false, reason: 'Unsupported signature algorithm' };
    }

    /* 4. SEPARATE PAYLOAD FROM SIGNATURE */
    const { signature, ...payload } = proof;

    /* 5. CANONICALIZATION (RFC 8785) */
    const canonicalPayload = canonicalizePayload(payload);

    /* 6. CRYPTOGRAPHIC VERIFICATION */
    const encoder = new TextEncoder();
    const messageBytes = encoder.encode(canonicalPayload);

    const signatureBytes = ed.etc.hexToBytes(signature.value);
    const publicKeyBytes = ed.etc.hexToBytes(publicKeyHex);

    const isValid = await ed.verify(
      signatureBytes,
      messageBytes,
      publicKeyBytes
    );

    return isValid
      ? { valid: true }
      : { valid: false, reason: 'Invalid signature' };
  } catch {
    // Fail-safe: reject on any unexpected error
    return { valid: false, reason: 'Verification error' };
  }
}
