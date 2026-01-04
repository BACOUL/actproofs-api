// src/types.ts
//
// ActSpec v0.1 — Normative Type Definitions
// These types define the exact data structures used for
// canonicalization, signing, verification, and test vectors.
//
// Any implementation claiming ActSpec v0.1 compliance
// MUST be structurally compatible with these definitions.

export type ActSpecVersion = 'actspec-v0.1';

/**
 * Authorization Manifest (client-side, NOT transmitted)
 * Included here for completeness and tooling,
 * but NEVER signed or sent in clear.
 */
export interface AuthorizationManifest {
  actor: {
    id: string;
    type?: string;
  };
  action: {
    type: string;
    target?: string;
  };
  context?: Record<string, unknown>;
  constraints?: Record<string, unknown>;
}

/**
 * Canonical payload that is signed by the Issuer.
 * This object MUST be canonicalized using RFC 8785
 * before hashing or signature verification.
 */
export interface ActProofPayload {
  spec: ActSpecVersion;
  id: string;
  issued_at: string; // ISO 8601 UTC
  manifest_hash: string; // e.g. "sha256:..."
  issuer: {
    id: string;
  };
}

/**
 * Cryptographic signature container
 */
export interface ActProofSignature {
  alg: 'Ed25519';
  value: string; // hex-encoded signature bytes
}

/**
 * Complete ActProof object (portable receipt)
 */
export interface ActProof extends ActProofPayload {
  signature: ActProofSignature;
}

/**
 * Issuer descriptor (out-of-band trust anchor)
 * NOT embedded in the proof itself.
 */
export interface IssuerDescriptor {
  id: string;
  name?: string;
  public_key: string; // hex-encoded Ed25519 public key
}

/**
 * Verification result (helper type)
 */
export interface VerificationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Test Vector Definitions (fixtures)
 */
export interface ActSpecTestVector {
  id: string;
  name: string;
  description: string;
  expected_verify: boolean;
  input: ActProofPayload;
  canonical_payload: string;
  signature: ActProofSignature;
}

export interface ActSpecTestSuite {
  meta: {
    description: string;
    format: string;
    version: string;
    verification_scope: 'offline-only';
    last_updated: string;
    normative_warning: string;
  };
  test_keys: {
    description: string;
    public_key_hex: string;
    private_key_hex: string;
  };
  vectors: ActSpecTestVector[];
}
