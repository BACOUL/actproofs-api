import { createHash } from 'crypto';
import canonicalize from 'canonicalize';

/**
 * Calcule le hash SHA-256 d'un payload après canonicalisation RFC 8785.
 * C'est cette fonction que src/index.ts cherche !
 */
export function hashPayload(payload: any): string {
  // 1. Canonicalisation (JCS)
  const canonical = canonicalize(payload);
  
  if (!canonical) {
    throw new Error("Canonicalization failed: Payload cannot be empty");
  }

  // 2. Hash SHA-256
  return createHash('sha256').update(canonical).digest('hex');
}

/**
 * (Optionnel) Garde cette fonction si tu t'en sers ailleurs pour des chaînes brutes
 */
export function sha256Hex(input: string): string {
  return createHash('sha256').update(input, 'utf8').digest('hex');
}
