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
