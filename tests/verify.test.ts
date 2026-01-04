// tests/verify.test.ts
import fs from 'fs';
import path from 'path';
import { verifyActProof } from '../src/index';
import type { ActProof } from '../src/types';

// Load official ActSpec v0.1 test vectors
const vectorsPath = path.resolve(
  process.cwd(),
  'fixtures/actspec-v0.1.test-vectors.json'
);

const testSuite = JSON.parse(fs.readFileSync(vectorsPath, 'utf-8'));

describe('ActSpec v0.1 — Compliance Test Suite', () => {
  const PUBLIC_KEY: string = testSuite.test_keys.public_key_hex;

  testSuite.vectors.forEach((vector: any) => {
    test(`[${vector.id}] ${vector.name}`, async () => {
      const proof: ActProof = {
        ...vector.input,
        signature: vector.signature,
      };

      const result = await verifyActProof(proof, PUBLIC_KEY);

      if (vector.expected_verify === true) {
        expect(result).toBe(true);
      } else {
        expect(result).toBe(false);
      }
    });
  });
});
