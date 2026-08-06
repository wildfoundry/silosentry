# SiloSentry

Fictional Midwest agtech OEM — Dataplicity’s [Rocket Rides](https://rocketrides.io/)-style reference company.

**Site:** [silosentry.com](https://silosentry.com) (GitHub Pages from this repo)

This is an *inverse* product site: it shows how SiloSentry would actually operate grain-bin gateways on [Dataplicity](https://www.dataplicity.com/) (provisioning, Wormhole, terminal, alerts, status, OEM licences/RMA), not a co-op marketing pitch.

## Local preview

```bash
cd silosentry
python3 -m http.server 4173
# open http://localhost:4173
```

## GitHub Pages

1. Repo Settings → Pages → Deploy from branch `main` / root `/`
2. Custom domain: `silosentry.com` (CNAME file is already in the repo)
3. At your DNS host, point `silosentry.com` (and optionally `www`) at GitHub Pages

## Source story

Long-form playbook and screenshot capture live in `dataplicity-prelude` under `docs/articles/silosentry-oem-playbook/`.
