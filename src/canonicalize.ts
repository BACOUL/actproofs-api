// src/canonicalize.ts
//
// ActSpec v0.1 — Canonicalization (RFC 8785)
//
// NORMATIVE RULES:
// - MUST use RFC 8785 (JSON Canonicalization Scheme)
// - MUST sort object keys lexicographically
// - MUST produce compact JSON (no whitespace)
// - MUST preserve numbers per IEEE 754 (handled by lib)
// - MUST return a deterministic string or throw
//
// This file is the ONLY acceptable canonicalization entrypoint
// for ActSpec v0.1 implementations.

import canonicalize from 'canonicalize';

/**
 * Canonicalize a JSON-compatible object using RFC 8785 (JCS).
 *
 * @param payload - Plain JS object to canonicalize
 * @returns Canonicalized JSON string (deterministic)
 */
export function canonicalizePayload(payload: unknown): string {
  const result = canonicalize(payload as any);

  if (typeof result !== 'string') {
    throw new Error('Canonicalization failed: invalid payload');
  }

  return result;
}
