# SiloSentry

Made-up grain-bin / SaaS IoT OEM used to illustrate [Dataplicity](https://www.dataplicity.com/).

**Site:** [silosentry.com](https://silosentry.com) (GitHub Pages)

The point of the site is to feel like looking **inside** a working Dataplicity-supported company: device classes and Networks, **Device Class Pulse** (fleet progression / drift over time), **fleet jobs** (act across many devices), then Wormhole and terminal for the ones that need a human.

## Local preview

```bash
cd silosentry
python3 -m http.server 4173
# open http://localhost:4173
```

## GitHub Pages

1. Repo Settings → Pages → Deploy from branch `main` / root `/`
2. Custom domain: `silosentry.com` (CNAME file is already in the repo)
3. DNS for `silosentry.com` / `www` points at GitHub Pages (managed in Dataplicity prod DNS Terraform)

## Search engine files

Published at the site root:

- `robots.txt`
- `sitemap.xml`
- `llms.txt` (explicitly labels SiloSentry as a fictional Dataplicity example)

## Demo data

Pulse history and fleet jobs for the local SiloSentry org can be seeded with:

`dataplicity-prelude/scripts/seed_silosentry_pulse_fleet.py`
