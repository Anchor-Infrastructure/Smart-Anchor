// Normalizes raw stellar.toml data into a standardized anchor capabilities object
export function parseAnchorMetadata(domain, raw) {
  const services = raw.SERVICES ?? {};
  const currencies = raw.CURRENCIES ?? [];

  return {
    domain,
    name: raw.ORG_NAME ?? domain,
    network: raw.NETWORK_PASSPHRASE ?? null,
    capabilities: {
      sep6:  !!services.TRANSFER_SERVER,
      sep10: !!services.WEB_AUTH_ENDPOINT,
      sep12: !!services.KYC_SERVER,
      sep24: !!services.TRANSFER_SERVER_SEP0024,
      sep31: !!services.DIRECT_PAYMENT_SERVER,
      sep38: !!services.ANCHOR_QUOTE_SERVER,
    },
    endpoints: {
      transferServer:     services.TRANSFER_SERVER ?? null,
      transferServerSep24: services.TRANSFER_SERVER_SEP0024 ?? null,
      webAuth:            services.WEB_AUTH_ENDPOINT ?? null,
      kyc:                services.KYC_SERVER ?? null,
      directPayment:      services.DIRECT_PAYMENT_SERVER ?? null,
      anchorQuote:        services.ANCHOR_QUOTE_SERVER ?? null,
    },
    currencies: currencies.map(c => ({
      code:   c.code,
      issuer: c.issuer ?? null,
      status: c.status ?? 'live',
      deposit:    c.deposit ?? false,
      withdraw:   c.withdraw ?? false,
    })),
  };
}
