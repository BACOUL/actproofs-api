# actproofs-api

Reference implementation of the **ActSpec v0.1** standard for issuing and verifying cryptographic proofs of authorization (ActProofs).

This repository provides a **minimal, auditable, and normative** implementation intended for:
- implementers,
- auditors,
- compliance and governance reviews.

It is intentionally simple.

---

## What This Repository Is

- A **reference implementation** of ActSpec v0.1
- A **cryptographic correctness baseline**
- A **testable and verifiable codebase**
- An **offline-verifiable authorization proof system**

It demonstrates how to:
- canonicalize authorization payloads (RFC 8785),
- hash authorization manifests,
- sign and verify ActProofs using Ed25519,
- validate proofs against official compliance test vectors.

---

## What This Repository Is NOT

- ❌ NOT a production service
- ❌ NOT a hosted API
- ❌ NOT a full SDK
- ❌ NOT an IAM / policy engine
- ❌ NOT a workflow orchestrator

This code certifies **authorization existence**, not execution, identity, or correctness.

---

## Repository Structure

src/ ├─ index.ts          # Public entry point ├─ types.ts          # ActProof & spec types ├─ canonicalize.ts   # RFC 8785 JSON Canonicalization ├─ hash.ts           # SHA-256 hashing helpers └─ verify.ts         # ActProof verification logic
tests/ └─ verify.test.ts    # Compliance test suite
fixtures/ └─ actspec-v0.1.test-vectors.json  # Official normative test vectors

---

## Cryptographic Design

- **Signature algorithm:** Ed25519
- **Hash algorithm:** SHA-256
- **Canonicalization:** RFC 8785 (JSON Canonicalization Scheme)

The signature always covers the **entire canonicalized ActProof payload**, not only the manifest hash.

---

## Verification Model

Verification is fully **offline** and requires only:
1. The ActProof JSON object
2. The issuer public key
3. RFC 8785–compliant canonicalization
4. Ed25519 signature verification

Optional online checks (revocation, trust status) are out of scope for this repository.

---

## Test Vectors & Compliance

This repository includes **official ActSpec v0.1 test vectors**.

To be considered ActSpec-compliant, an implementation MUST:
- pass all positive vectors,
- fail all negative vectors,
- reconstruct canonical payloads locally,
- ignore the `canonical_payload` field except for debugging.

---

## Specification

- **Standard:** ActSpec v0.1  
- **Specification repository:** https://github.com/BACOUL/actspec

---

## License

Apache-2.0

---

## Status

- Specification: **Stable**
- Implementation: **Reference**
- Intended use: **Normative / Audit / Education**

Authorization without proof is liability.
