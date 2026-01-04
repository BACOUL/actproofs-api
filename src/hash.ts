// src/hash.ts
import { createHash } from 'crypto';
import canonicalize from 'canonicalize';

// L'export doit s'appeler EXACTEMENT 'hashPayload'
export function hashPayload(payload: any): string {
  // 1. Canonicalisation (JCS)
  const canonical = canonicalize(payload);
  if (!canonical) throw new Error("Canonicalization failed");

  // 2. Hash SHA-256
  return createHash('sha256').update(canonical).digest('hex');
}
