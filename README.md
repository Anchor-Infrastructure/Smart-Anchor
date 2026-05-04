# Smart-Anchor
A service that aggregates and standardizes anchor capabilities (deposits, withdrawals, KYC, quotes) from their metadata.

This project builds a discovery layer that parses anchor metadata from stellar.toml and exposes a unified API showing what each anchor supports in real time. It normalizes inconsistencies across implementations and enables wallets, apps, and developers to dynamically select anchors based on capabilities like deposits, withdrawals, quotes, and KYC requirements. The system includes caching, validation, and fallback mechanisms to handle missing or invalid metadata, improving reliability across the ecosystem.
