import { createHash } from 'crypto';
import canonicalize from 'canonicalize';

/**
 * Hash a payload using SHA-256 after RFC 8785 canonicalization.
 * @param payload The JSON object to hash
 * @returns The hex-encoded SHA-256 hash
 */
export function hashPayload(payload: any): string {
  // 1. Canonicalisation (JCS)
  const canonical = canonicalize(payload);
  
  // Sécurité : on refuse de hacher rien du tout
  if (!canonical) {
    throw new Error("Canonicalization failed: Payload cannot be empty");
  }

  // 2. Hash SHA-256
  return createHash('sha256').update(canonical).digest('hex');
}
