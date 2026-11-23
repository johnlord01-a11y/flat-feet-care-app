# SPEC — Flat Feet Care App

A patient-education companion app for flat feet (flexible flatfoot), modeled on
the existing care apps in this family (plantar fasciitis, Achilles, gout).
React + Vite + Tailwind. All clinical content lives in `src/plan.js`; the UI in
`src/App.jsx`. State in localStorage under the prefix `flatfeet_`.

## Sources — the ONLY content allowed

Everything clinical in this app comes from three published pages, included in
this project under `source/`:

1. `source/guide-flat-feet.txt` — "Flat Feet: The Sit-to-Stand Arch Test and
   Why Most Arch Supports Don't Fit" (the condition guide)
2. `source/post-arch-exercises.txt` — "Arch Strengthening Exercises for Flat
   Feet & Foot Pain"
3. `source/post-superhero-kids.txt` — "Superhero Feet: A 12-Week Foot Strength
   Program for Kids With Flexible Flat Feet"

Do not invent exercises, dosages, statistics, timelines, or claims. If a detail
is not in the sources, it does not go in the app. No medication content at all —
the sources print no doses for this condition and the app adds none.

## Hard rules

- Education only. The disclaimer appears in the app: "This app is for general
  patient education and is not a substitute for an examination and
  individualized medical advice."
- NEVER name any employer, clinic, hospital, or practice anywhere — including
  code comments. (A previous app in this family shipped an employer name in a
  source comment. That must not happen again.)
- No publishing, pushing, or deploying. The app is built locally; a human
  review card ends the chain.

## Shape

Two audience modes, toggled at the top: **Adults** and **Kids (6+)**. The mode
changes the Today checklist, the phase tracker, and which red-flag list shows.
Three tabs, like the rest of the family: **Today**, **Care Guide**, **Progress**.

### Today tab

- Daily pain score (0–10) with save, stored by date.
- Daily checklist for the current mode (below); checking items persists by date.
- Short Foot guided timer (Adults mode): hold 8 s / relax 5 s, 10 reps,
  3 sets — the guide's published range is hold 5–10 s, 8–12 reps, 3 sets,
  once or twice a day. A "level" selector follows the guide's progression:
  Seated → Standing → One leg → While walking.

Adults checklist (dosages exactly as published):
- Short Foot (arch doming) — 3 sets of 8–12, hold 5–10 s
- Toe Piano — 10 cycles, 3 sets per foot
- Toe Splay — 20 reps, 2 sets
- Marble Pickups — 15 per foot, 2 rounds
- Towel Scrunches — 15–30 reps per foot

Kids checklist — the 6 Superhero moves, with sets/reps for the child's current
phase (the app tracks the program week from a start date the parent sets):
1. Turtle Shell (Arch Builder)
2. Pencil Pinchers (Toe Spacer Squeeze)
3. Side-Sweeper (Arch Anchor)
4. Coin Crusher (Big Toe Driver)
5. Rocket Blast-Off (Power Push-Off)
6. Slow-Mo Toe Lifts (Front Shin Controller)

Phase tables (sets/reps/holds) are in `source/post-superhero-kids.txt` —
Phase 1 weeks 1–4, Phase 2 weeks 5–8, Phase 3 weeks 9–12+. Use them verbatim.
Kids mode also shows the 4 Golden Rules (barefoot is best; no "eagle claws";
breathe; no pain — sharp pain means tell a grown-up).

### Care Guide tab (accordion sections, from the guide)

1. **What flat feet are** — flexible vs rigid; most are flexible; a newly
   collapsing arch on one side is a different problem (posterior tibial
   tendon) and should be evaluated early.
2. **The sit-to-stand check (excursion)** — how far the arch moves between
   sitting and standing matters at least as much as how high it is.
3. **Two home checks** — the wet footprint test; the tiptoe test and the
   "too many toes" sign.
4. **Step 1: the right shoe** — support ladder: minimalist → neutral /
   cushioned → stability → motion control. Most people land on stability;
   very active or very flexible feet may need motion control.
5. **Step 2: an arch support, sized by your arch** — the sizing rule: start
   from measured foot size, go one size down (very flexible feet up to two);
   the fit test (hold support under bare foot, pull toes back — arch lifts
   off = too long; lines up but too low = go higher). An orthotic shouldn't
   hurt and has no break-in period.
6. **The short foot exercise** — what it trains, the toe-curling mistake,
   give it 6–8 weeks.
7. **Young feet and old feet** — flexible feet respond fast when supported;
   flexible deformities can stiffen over time, which is why early support
   matters.
8. **When to see a podiatrist** — the guide's list.
9. **Get help right away** — the guide's same-day list (warm/red/swollen foot
   especially with diabetes; sudden pop + arch collapse; injury with no
   weight-bearing; non-healing sore) and ER signs (cold/pale/blue painful
   foot; high fever with a red hot swollen foot). In Kids mode this section
   shows the kids post's "When to Get Care Right Away" list instead.

Safety box (always visible in the Care Guide): exercises should not be
painful — stop if there is sharp pain. Skip the strengthening program and ask
a clinician first with an acute injury, fracture, or recent foot/ankle
surgery, or with diabetic neuropathy / reduced sensation. With diabetes or
reduced feeling, check the feet daily.

### Progress tab

- Pain-score history (last 14 entries) with a simple trend.
- Phase tracker:
  - Adults: Weeks 1–2 Settling in / Weeks 3–6 Building strength /
    Week 6–8+ Holding alignment (the guide's 6–8 week horizon).
  - Kids: Phase 1 Training Camp (wk 1–4) / Phase 2 Building Super Strength
    (wk 5–8) / Phase 3 Real Life (wk 9–12+).
- Two-week check-in: if pain scores are not improving after two weeks of
  good support, show the guide's advice — if the foot still hurts after a
  few weeks of good support, get a full exam.

## Look

Forest/fern green palette (this family's other apps use teal, warm amber,
and violet — stay distinct): primary deep green (#166534 family), soft warm
paper background (#F7F5EF), dark green ink text. Clean, calm, readable.
Mobile-first single column.

## Acceptance

- `npm run build` passes; dist/ produced.
- plan.js contains only source-derived content; no medication names or doses
  anywhere; no employer/clinic names anywhere (grep the whole project).
- Disclaimer present. localStorage keys all start with `flatfeet_`.
- TEST card runs the build and a headless smoke check and attaches output.
