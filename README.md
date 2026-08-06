# SiloSentry

Made-up Midwest agtech OEM used to illustrate [Dataplicity](https://www.dataplicity.com/).

**Site:** [silosentry.com](https://silosentry.com) (GitHub Pages from this repo)

Inverse product site: shows how a grain-bin sensor company would actually operate gateways on Dataplicity (provisioning, Wormhole, terminal, alerts, status, OEM licences/RMA) — not a co-op sales pitch. Clearly fictional; the ops model is meant to feel real.

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
