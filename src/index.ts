// src/index.ts
//
// ActProofs API — Public Entry Point
// ActSpec v0.1 reference implementation
//
// This file defines the ONLY public exports of the package.
// Everything exported here MUST exist and compile.

export type {
  ActSpecVersion,
  AuthorizationManifest,
  ActProofPayload,
  ActProofSignature,
  ActProof,
  VerificationResult,
  ActSpecTestVector,
  ActSpecTestSuite
} from './types';

export { canonicalizePayload } from './canonicalize';

export { verifyActProof } from './verify';
