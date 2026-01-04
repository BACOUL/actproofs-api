// src/hash.ts
//
// ActSpec v0.1 — Normative Hash Utilities
//
// This module defines the ONLY acceptable hashing behavior
// for ActSpec v0.1 implementations.
//
// Rules (NORMATIVE):
// - SHA-256 ONLY
// - UTF-8 input
// - Hex lowercase output
// - No truncation
// - No base64
// - No prefixes added here (handled by caller if needed)

import { createHash } from 'crypto';

/**
 * Hash a canonical UTF-8 string using SHA-256.
 *
 * @param canonicalString - RFC 8785 canonicalized string
 * @returns hex-encoded SHA-256 digest
 */
export function sha256Hex(canonicalString: string): string {
  if (typeof canonicalString !== 'string') {
    throw new Error('sha256Hex expects a string input');
  }

  return createHash('sha256')
    .update(canonicalString, 'utf8')
    .digest('hex');
}

/**
 * Hash helper that returns an ActSpec-compliant manifest hash.
 *
 * Output format:
 *   sha256:<hex>
 *
 * @param canonicalString - RFC 8785 canonicalized manifest
 */
export function manifestHash(canonicalString: string): string {
  return `sha256:${sha256Hex(canonicalString)}`;
}
