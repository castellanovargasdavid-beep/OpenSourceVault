# Link Acquisition Opportunities

Research-only (WebSearch), per the PRD's explicit rule: **no outreach sent**,
no PBNs, no comment spam, no purchased links. Every opportunity below is
identified for a human to evaluate and act on manually, not automated.

Format: `site | URL | why relevant | target asset | outreach angle | priority`.

---

### 1. awesome-selfhosted / awesome-selfhosted-data (GitHub)
- **URL**: `github.com/awesome-selfhosted/awesome-selfhosted-data`
- **Why relevant**: One of the highest-authority, most-cited lists in the
  self-hosting niche; its data already powers `selfhosted.libhunt.com` and
  several alternative frontends (awweso.me, theravenhub, etc.) — a mention
  here has outsized downstream reach.
- **Important constraint found during research**: this repo lists
  **self-hostable software projects**, not directory/review/tool sites —
  AltFreeStack would **not** qualify as a normal entry (it isn't something
  you `docker run` on your own server). The README does maintain a
  separate "Additional Resources"/external-links section listing adjacent
  non-software resources (other awesome-lists, privacy directories like
  PRISM Break) — this is the only section where a submission would be
  plausible, and only on the strength of being a genuinely useful tool, not
  as a disguised backlink.
- **Target asset**: the Stack Builder + `/api/catalog` dataset (the latter
  is the more defensible fit for a "resources" section, since it's
  machine-readable data, closer in spirit to the other dataset-ish
  resources already listed there).
- **Outreach angle**: a PR against the README's resources section,
  following its exact formatting/alphabetical conventions, describing
  `/api/catalog` factually (what fields, what it's derived from) — not a
  promotional pitch.
- **Priority**: Medium. High authority, but a narrow/uncertain fit (maintainer
  discretion on whether a directory site belongs in "Additional Resources"
  at all) — don't over-invest outreach effort here before the dataset has
  any real-world usage to point to.

### 2. r/selfhosted (Reddit)
- **URL**: `reddit.com/r/selfhosted`
- **Why relevant**: The largest, most active self-hosting community;
  genuinely useful free tools (calculators, compatibility matrices) do get
  organically shared and discussed there when posted as "I built this" by
  someone who actually uses the tool, not as a drive-by link drop.
- **Target asset**: the savings/cost calculators, or the `/api/catalog`
  dataset framed as "resource requirements for N self-hosted tools, as
  structured data."
- **Outreach angle**: NOT outreach — a first-person "I built X, here's why"
  post from a real account with a history in the community, only if/when
  there's a genuine update worth sharing. Explicitly not scripted or
  automated.
- **Priority**: Low-effort, high-risk-if-done-wrong — this community is
  known for down-voting anything that reads as self-promotion. Only
  actionable by a human who already participates there, never as a
  one-off drop.

### 3. r/homelab (Reddit)
- **URL**: `reddit.com/r/homelab`
- **Why relevant**: Hardware/infrastructure-focused sibling community to
  r/selfhosted — the RAM/resource-matrix angle (via Stack Builder or
  `/api/catalog`) is a closer fit here than general tool discovery.
- **Target asset**: Stack Builder's resource-aggregation view (total RAM/
  storage/GPU needs across a multi-tool stack).
- **Outreach angle**: Same caveat as #2 — first-person, only if genuinely
  relevant to an ongoing discussion, never a cold post.
- **Priority**: Low-effort, same risk profile as #2.

### 4. Self-Host Weekly (selfh.st)
- **URL**: `selfh.st/weekly/`
- **Why relevant**: A recurring newsletter/roundup specifically for the
  self-hosting niche — the kind of publication that links out to genuinely
  useful new tools/resources as part of its normal roundup format (not a
  paid placement), which is a much lower-friction, more natural fit than a
  Reddit post.
- **Target asset**: Either the `/api/catalog` dataset (novel, concrete,
  easy to describe in one sentence) or a specific Stack Builder feature.
- **Outreach angle**: A short, factual submission/suggestion to the
  newsletter's maintainer (most such newsletters have a submission form or
  public contact) — describing what the resource is and why it's useful,
  not a sales pitch.
- **Priority**: Medium-high — this is the most natural-fit, lowest-risk
  channel found in this research; a real submission here is reasonable for
  a human to send once the dataset has been live long enough to not look
  brand new.

### 5. Matrix / homelab Matrix communities
- **Why relevant**: Repeatedly cited as the de facto decentralized chat
  protocol within this niche, with many self-hosting-focused rooms.
- **Not detailed further**: no specific room/community was identified with
  enough confidence to name here without risking recommending the wrong
  venue — flagged as a category worth a human's own research if they
  already participate in this space, not a specific target.
- **Priority**: Not actionable from this research alone.

---

## Explicitly ruled out
- Any awesome-list or directory that only accepts self-hostable *software*
  (awesome-sysadmin, awesome-github-alternatives) — AltFreeStack is a
  directory/tool site, not software you self-host, so it's a structural
  mismatch, not a submission-quality issue.
- Comment sections, forum signatures, or any placement where the primary
  purpose would be the link itself rather than a genuine contribution to
  the discussion — excluded per the PRD's explicit "no anchors artificiales"
  / "no enlaces irrelevantes" rule.

## Summary judgment
This niche's realistic, legitimate link-acquisition surface is narrow and
mostly manual/relationship-based (newsletters, genuine community
participation) rather than directory-submission-based, because
AltFreeStack's own content type (a directory/tool site) doesn't fit the
dominant list format (self-hostable software) in its own niche. The
`/api/catalog` dataset was specifically chosen as this task's one
implemented linkable asset (see CRO_EXPERIMENTS.md EXP-006) because it's the
one genuinely novel thing to point any of these channels at.
