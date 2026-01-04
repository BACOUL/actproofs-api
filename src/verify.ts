// src/verify.ts
//
// ActSpec v0.1 — Offline Verification
//
// This module performs a STRICT, OFFLINE verification of an ActProof.
// Network access is NOT required.
//
// VERIFICATION GUARANTEES:
// - Spec version lock (anti-downgrade)
// - Structural integrity
// - Algorithm enforcement (Ed25519 only)
// - RFC 8785 canonicalization
// - Full payload signature coverage
//
// Any failure => proof is INVALID.

import * as ed from '@noble/ed25519';
import { canonicalizePayload } from './canonicalize';

// Canonical ActProof interface (ActSpec v0.1)
export interface ActProof {
  spec: 'actspec-v0.1';
  id: string;
  issued_at: string;
  manifest_hash: string;
  issuer: {
    id: string;
  };
  signature: {
    alg: 'Ed25519';
    value: string; // hex-encoded signature
  };
}

/**
 * Verify an ActProof (offline, cryptographic + logical checks).
 *
 * @param proof - ActProof object to verify
 * @param publicKeyHex - Issuer public key (hex, from .well-known)
 * @returns true if the proof is valid and compliant, false otherwise
 */
export async function verifyActProof(
  proof: ActProof,
  publicKeyHex: string
): Promise<boolean> {
  try {
    // 1. SPEC VERSION LOCK
    if (proof.spec !== 'actspec-v0.1') {
      return false;
    }

    // 2. STRUCTURAL INTEGRITY
    if (
      !proof.id ||
      !proof.issued_at ||
      !proof.manifest_hash ||
      !proof.issuer?.id ||
      !proof.signature
    ) {
      return false;
    }

    // 3. ALGORITHM ENFORCEMENT
    if (proof.signature.alg !== 'Ed25519') {
      return false;
    }

    // 4. SEPARATE PAYLOAD FROM SIGNATURE
    const { signature, ...payload } = proof;

    // 5. CANONICALIZATION (RFC 8785)
    const canonicalPayload = canonicalizePayload(payload);

    // 6. CRYPTOGRAPHIC VERIFICATION
    const messageBytes = new TextEncoder().encode(canonicalPayload);
    const signatureBytes = ed.etc.hexToBytes(signature.value);
    const publicKeyBytes = ed.etc.hexToBytes(publicKeyHex);

    return await ed.verify(signatureBytes, messageBytes, publicKeyBytes);
  } catch {
    // Fail-safe: reject on any unexpected error
    return false;
  }
}
