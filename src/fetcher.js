import fetch from 'node-fetch';
import toml from 'toml';

export async function fetchStellarToml(domain) {
  const url = `https://${domain}/.well-known/stellar.toml`;
  const res = await fetch(url, { timeout: 5000 });
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  return toml.parse(await res.text());
}
