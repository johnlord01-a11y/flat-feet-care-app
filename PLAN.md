# PLAN — Flat Feet Care App

## Architecture Reference

This app follows the same architecture as the gout-care-app (family pattern):
- `src/plan.js` — all clinical/content data, zero UI
- `src/App.jsx` — React UI, imports everything from `plan.js`
- `src/index.css` — Tailwind imports + `@theme` palette definitions
- `src/main.jsx` — React entry point
- `package.json` — React + Vite + Tailwind (`@tailwindcss/vite` + `tailwindcss` v4)
- `vite.config.js` — `@vitejs/plugin-react` + `@tailwindcss/vite`

## Content Inventory

### Source 1: `source/guide-flat-feet.txt` — Condition Guide

**What flat feet are**
- Flexible vs rigid flat feet
- Flexible = arch appears when sitting or on tiptoe, disappears standing
- Newly collapsing arch on one side = posterior tibial tendon issue → evaluate early

**Sit-to-stand check (excursion)**
- Arch movement between sitting and standing matters at least as much as height
- Arch lifts off floor = excursion present

**Two home checks**
- Wet footprint test — pattern on wet surface shows arch type
- Ti-p Toe test + "too many toes" sign — can't do tiptoe on one side = possible posterior tibial tendon

**Step 1: The Right Shoe (Support Ladder)**
- 4 levels: minimalist → neutral/cushioned → stability → motion control
- Most people land on stability
- Very active or very flexible feet may need motion control

**Step 2: An Arch Support, Sized by Your Arch**
- Sizing rule: start from measured foot size, go one size down (very flexible feet go up to two sizes down)
- Fit test: hold support under bare foot, pull toes back — arch lifts off = too long; lines up but too low = go higher
- Orthotic shouldn't hurt; no break-in period

**The Short Foot Exercise**
- What it trains: intrinsic foot muscles (first metatarsal head toward heel, no toe curling)
- Give it 6–8 weeks
- Toe-curling mistake: toes must stay flat

**Young feet and old feet**
- Flexible feet respond fast when supported; stiffen over time if unsupported → early support matters

**When to see a podiatrist**
- Guide's list of indications

**Get help right away** (same-day list)
- Warm/red/swollen foot especially with diabetes
- Sudden pop + arch collapse
- Injury with no weight-bearing
- Non-healing sore

**ER signs**
- Cold/pale/blue painful foot
- High fever with a red hot swollen foot

### Source 2: `source/post-arch-exercises.txt` — Adult Exercises

**Dosages (as published):**
- Short Foot (Arch Doming): draw ball of foot toward heel without curling toes — 3 sets × 8–12 reps, hold 5–10 s, 3–5 days/week
- Toe Piano (Scales): lift all toes, tap down one by one from pinky to big toe — 10 cycles, 3 sets per foot
- Toe Splay (Yoga Toes): spread all toes as far apart as possible — 20 reps, 2 sets
- Marble Pickups: use toes to grab marble, drop into cup — 15 per foot, 2–3 rounds
- Towel Scrunches (Max Effort): pull towel toward you with toes — 15–30 reps per foot to volitional failure
- Intrinsic Isometric (Heel Raise): rise onto balls of feet, hold — 5–6 reps, hold 20 s

**Progressive overload:** more reps, longer holds, added resistance over time
**Timeline:** measurable improvements within 8–12 weeks of consistent practice

### Source 3: `source/post-superhero-kids.txt` — Kids Program

**The 6 Secret Ninja Moves:**
1. Turtle Shell (Arch Builder) — dome the arch without curling toes
2. Pencil Pinchers (Toe Spacer Squeeze) — squeeze pens between toes
3. Side-Sweeper (Arch Anchor) — sweep front of foot inward with band, heel glued
4. Coin Crusher (Big Toe Driver) — squish coin under big toe while heel lift
5. Rocket Blast-Off (Power Push-Off) — squeeze tennis ball between heels, tiptoe up
6. Slow-Mo Toe Lifts (Front Shin Controller) — pull toes toward nose, lower in 4 sec

**4 Golden Rules:**
- Barefoot is best
- No "eagle claws" (keep toes long/relaxed, no curling)
- Breathe (never hold breath)
- No pain — sharp pain means tell a grown-up

**Phase 1: Superhero Training Camp (Weeks 1–4)** — 4–5 days/week, 15 min
- Turtle Shell: 3 × 12 reps, hold 5 s (seated, focus: perfect dome, relaxed toes)
- Pencil Pinchers: 3 × 12 reps, hold 5 s (focus: gentle steady squeeze)
- Side-Sweeper: 3 × 12 reps (focus: glue heel to floor)
- Coin Crusher: 3 × 10 reps (focus: squash hard)
- Rocket Blast-Off: 3 × 10 reps (focus: don't drop ball)
- Slow-Mo Toe Lifts: 3 × 12 reps (focus: count to 4 on way down)

**Phase 2: Building Super Strength (Weeks 5–8)** — 3 days/week, 20 min (standing)
- Standing Turtle Shell: 4 × 8 reps, hold 8 s
- Standing Pencil Pinchers: 3 × 10 reps, hold 5 s
- Heavy Side-Sweeper: 4 × 8 reps (thicker band)
- Flamingo Coin Crusher: 3 × 8 reps/leg (balance on one leg)
- Flamingo Blast-Off: 3 × 8 reps/leg (squeeze ball on one leg)
- Heavy Slow-Mo Lifts: 3 × 10 reps (thicker band, slow lower)

**Phase 3: Superhero Moves in Real Life (Weeks 9–12+)** — 2–3 days/week, 20 min
- Balancing Turtle Shell: 3 × 30+ sec holds (on one foot)
- Squatting Turtle Shell: 3 × 8 reps (keep dome while squatting)
- Super-Heavy Sweeper: 3 × 8 reps (toughest band)
- Step-Edge Coin Crusher: 3 × 8 reps/leg (heels off step)
- Step-Edge Blast-Off: 3 × 8 reps/leg (rocket launch off step)
- Super-Heavy Toe Lifts: 3 × 8 reps (toughest band, super slow lower)

**Kids red-flag list** ("When to Get Care Right Away"):
- Foot pain keeping child from sports/play or waking at night
- Flat foot that is stiff, or only one foot flat
- Frequent ankle sprains, tripping, or limp
- Pain/swelling/redness on inside of foot/ankle
- Sharp pain during exercise that doesn't settle
- Calluses, blisters, shoes wearing unevenly

## Palette

Forest/fern green family (distinct from gout's violet):
- Primary: deep green `#166534` (green-800)
- Background: soft warm paper `#F7F5EF` (custom warm off-white)
- Text: dark green `#14532D` (green-900)
- Accent variants: green-50 through green-950 for states
- Stone neutrals for cards/borders (same as gout family)

```
--color-green-50:  #f0fdf4
--color-green-100: #dcfce7
--color-green-200: #bbf7d0
--color-green-300: #86efac
--color-green-400: #4ade80
--color-green-500: #22c55e
--color-green-600: #16a34a
--color-green-700: #166534   ← primary
--color-green-800: #14532d   ← ink text
--color-green-900: #0f2e1a
--color-green-950: #071a0e
--color-paper:     #F7F5EF  ← background
```

## localStorage Keys

All keys prefixed `flatfeet_`:
- `flatfeet_mode` — `"adults"` or `"kids"` (toggle at top)
- `flatfeet_start_date` — date string for phase tracking (when user starts the program)
- `flatfeet_tasks` — JSON object `{ taskId: true/false }` (daily checklist state)
- `flatfeet_tasks_date` — date string (`new Date().toDateString()`)
- `flatfeet_history` — JSON object `{ dateKey: { pain: number } }` (pain scores by date)
- `flatfeet_kids_week` — integer (week counter for kids phase, from start_date)

## Build Chain — FLAT (v3 rule 7)

Cards are a linear chain — each produces ONE named file. No sub-card trees.

1. **Scaffold** → `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/index.css`
2. **plan.js** → `src/plan.js` (all content from the three source files, no UI, no meds)
3. **App.jsx** → `src/App.jsx` (three tabs: Today, Care Guide, Progress; adult/kids toggle; checklist; pain scores; phase tracker)
4. **Build & Test** → verify `npm run build` produces `dist/`

Each card builds on the previous one. No card starts until its parent is done.

## Constraints

- **No medication content** — the flat-feet sources have no medication doses; the app adds none.
- **No employer/clinic names** — grep the entire project for names.
- **Disclaimer** — "This app is for general patient education and is not a substitute for an examination and individualized medical advice."
- **Education only**
- **No publishing/deploying** — human review ends the chain.
