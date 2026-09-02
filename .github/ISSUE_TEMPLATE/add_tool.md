---
name: Add a tool
about: Suggest an open-source tool to add to the catalog
title: "Add: "
labels: new-tool
assignees: ""
---

<!--
Before opening this: is the tool already in the catalog? Check
https://altfreestack.com or search src/data/tools.ts.

Prefer to add it yourself instead of waiting? See "How to Contribute" in the
README — a PR editing src/data/tools.ts gets merged much faster than an issue.
-->

## Tool name

<!-- e.g. "Plane" -->

## What SaaS product does it replace?

<!-- e.g. "Jira, Asana, Linear" — the paid tool someone would be comparing this against -->

## Website

<!-- Official homepage URL -->

## Source code repository

<!-- GitHub/GitLab/Codeberg URL -->

## License

<!-- The *actual* license from the repo's LICENSE file — e.g. MIT, Apache-2.0,
     AGPL-3.0, "Fair-code" — not just "it's open source". This matters:
     several tools we already list turned out to be AGPL or source-available
     rather than permissive once someone actually checked. -->

## Docker Compose snippet

<!-- If the project has an official docker-compose.yml, paste it here (or a
     link to where it lives in their repo/docs). If you're not sure it
     works, say so — we'll verify before merging. Leave this blank if the
     tool genuinely isn't deployable via Docker Compose (e.g. it only ships
     an installer script). -->

```yaml

```

## 1-click deploy URL (optional)

<!-- If the project offers an official one-click deploy template (Railway,
     Coolify, etc.), the URL for it. Leave blank otherwise. -->

## Category

<!-- Which existing category fits best? See the list in src/lib/types.ts
     (ToolCategory) — Productivity, Analytics, DevTools, CRM, AI, Storage,
     Ecommerce, VideoConferencing, PasswordManagers, AuthIdentity, CloudPaas,
     MonitoringLogs, MarketingForms. If none fit, say so and we'll discuss
     adding a new one. -->

## Why does it belong here?

<!-- One or two honest sentences: what's it good at, and what's the catch
     (if any)? A tool with zero listed drawbacks reads as unreviewed. -->
