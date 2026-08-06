# SiloSentry

Made-up grain-bin / SaaS IoT OEM used to illustrate [Dataplicity](https://www.dataplicity.com/).

**Site:** [silosentry.com](https://silosentry.com) (GitHub Pages)

Enough product context to be believable (edge sensors + cloud), then the focus is how Dataplicity runs the fleet: provision, Wormhole, terminal, alerts, status, OEM ops. Clearly fictional.

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
