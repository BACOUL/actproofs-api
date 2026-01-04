// src/index.ts
//
// ActProofs API — Public Entry Point
// ActSpec v0.1

export type {
  ActSpecVersion,
  AuthorizationManifest,
  ActProofPayload,
  ActProofSignature,
  ActProof,
  VerificationResult,
  ActSpecTestVector,
  ActSpecTestSuite
} from './types.js';

export { canonicalizePayload } from './canonicalize.js';
export { verifyActProof } from './verify.js';
