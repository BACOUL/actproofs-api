import { createHash } from 'crypto';
import canonicalize from 'canonicalize';

// Le mot-clé "export" est OBLIGATOIRE ici
export function hashPayload(payload: any): string {
  const canonical = canonicalize(payload);
  if (!canonical) {
    throw new Error("Canonicalization failed: Payload cannot be empty or circular");
  }
  return createHash('sha256').update(canonical).digest('hex');
}
