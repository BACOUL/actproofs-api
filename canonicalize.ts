// src/canonicalize.ts
//
// RFC 8785 – JSON Canonicalization Scheme (JCS)
// Normative implementation for ActSpec v0.1
//
// Rules enforced:
// - UTF-8
// - Object keys sorted lexicographically (Unicode code points)
// - No insignificant whitespace
// - Numbers serialized per ECMAScript JSON rules (no NaN / Infinity)
// - Arrays preserved in order
// - Strings escaped per JSON spec
//
// This function MUST be used before hashing or signature verification.

export function canonicalize(value: unknown): string {
  return serialize(value);
}

function serialize(value: unknown): string {
  if (value === null) {
    return 'null';
  }

  switch (typeof value) {
    case 'boolean':
      return value ? 'true' : 'false';

    case 'number':
      if (!Number.isFinite(value)) {
        throw new Error('Invalid number for canonical JSON');
      }
      // JSON.stringify already applies the correct numeric formatting
      return JSON.stringify(value);

    case 'string':
      // JSON.stringify applies correct escaping
      return JSON.stringify(value);

    case 'object':
      if (Array.isArray(value)) {
        return serializeArray(value);
      }
      return serializeObject(value as Record<string, unknown>);

    default:
      throw new Error(`Unsupported type in canonical JSON: ${typeof value}`);
  }
}

function serializeArray(arr: unknown[]): string {
  const elements = arr.map((el) => serialize(el));
  return `[${elements.join(',')}]`;
}

function serializeObject(obj: Record<string, unknown>): string {
  const keys = Object.keys(obj).sort(); // Lexicographic (Unicode code points)

  const properties: string[] = [];

  for (const key of keys) {
    const val = obj[key];
    if (val === undefined) {
      // RFC 8785: undefined is not a valid JSON value
      continue;
    }
    properties.push(`${JSON.stringify(key)}:${serialize(val)}`);
  }

  return `{${properties.join(',')}}`;
}
