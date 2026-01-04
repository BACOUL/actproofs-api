/*
 * ActProofs API — Public Entry Point
 * ActSpec v0.1
 *
 * This file defines the ONLY supported public surface of the library.
 * Internal files MUST NOT be imported directly by consumers.
 */

// Public types (normative)
export type {
  ActProof,
  ActProofSignature,
  IssuerDescriptor,
} from './types';

// Public verification function (normative)
export { verifyActProof } from './verify';
