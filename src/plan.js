// Flat Feet Care — all clinical/content data (zero UI)
// Source: guide-flat-feet.txt, post-arch-exercises.txt, post-superhero-kids.txt
// All clinical content derived verbatim from the three published pages.

const DISCLAIMER =
  "This app is for general patient education and is not a substitute for an examination and individualized medical advice.";

const SAFETY_BOX = {
  title: "Safety",
  body: "Exercises should not be painful — stop if there is sharp pain. Skip the strengthening program and ask a clinician first with an acute injury, fracture, or recent foot/ankle surgery, or with diabetic neuropathy / reduced sensation. With diabetes or reduced feeling, check the feet daily.",
};

// ──────────────────────────────────────────────
// ADULT CHECKLIST — dosages exactly as published
// Source: post-arch-exercises.txt
// ──────────────────────────────────────────────

const adultChecklist = [
  {
    id: "short-foot",
    name: "Short Foot (Arch Doming)",
    description:
      "Draw the ball of your foot toward your heel without curling your toes.",
    dosage: "3 sets × 8–12 reps, hold 5–10 s, 3–5 days/week",
  },
  {
    id: "toe-piano",
    name: "Toe Piano (Scales)",
    description:
      "Lift all toes, tap down one by one from pinky to big toe.",
    dosage: "10 cycles, 3 sets per foot",
  },
  {
    id: "toe-splay",
    name: "Toe Splay (Yoga Toes)",
    description: "Spread all toes as far apart as possible.",
    dosage: "20 reps, 2 sets",
  },
  {
    id: "marble-pickups",
    name: "Marble Pickups",
    description: "Use toes to grab marble, drop into cup.",
    dosage: "15 per foot, 2–3 rounds",
  },
  {
    id: "towel-scrunches",
    name: "Towel Scrunches (Max Effort)",
    description: "Pull towel toward you with toes.",
    dosage: "15–30 reps per foot to volitional failure",
  },
  {
    id: "intrinsic-isometric",
    name: "Intrinsic Isometric (Heel Raise)",
    description: "Rise onto balls of feet, hold.",
    dosage: "5–6 reps, hold 20 s",
  },
];

const adultPhaseDefinitions = [
  {
    id: "settling",
    label: "Weeks 1–2 Settling in",
    description:
      "Learn the movements. Focus on perfect form and relaxed toes.",
  },
  {
    id: "building",
    label: "Weeks 3–6 Building Strength",
    description: "More reps, longer holds, added resistance over time.",
  },
  {
    id: "holding",
    label: "Week 6–8+ Holding Alignment",
    description:
      "Measurable improvements within 8–12 weeks of consistent practice. Give it 6–8 weeks for the short foot exercise.",
  },
];

// ──────────────────────────────────────────────
// KIDS — 6 SUPERHERO MOVES + 3 PHASE TABLES
// Source: post-superhero-kids.txt
// ──────────────────────────────────────────────

const kidsGoldenRules = [
  "Barefoot is best",
  'No "eagle claws" (keep toes long/relaxed, no curling)',
  "Breathe (never hold breath)",
  'No pain — sharp pain means tell a grown-up',
];

const kidsMoves = [
  {
    id: "turtle-shell",
    name: "Turtle Shell (Arch Builder)",
    description:
      "Dome the arch without curling toes. Sit in a chair with your feet flat. Without curling your toes, slide the ball of your foot back toward your heel to make a little 'turtle shell' dome under your arch. Hold it, then relax.",
    watchOut: "Keep your toes totally flat — no gripping!",
    phase1: { sets: 3, reps: 12, hold: "5 sec", focus: "Make a perfect dome; relaxed toes" },
    phase2: { sets: 4, reps: 8, hold: "8 sec", focus: "Do it standing up on both feet" },
    phase3: [
      { name: "Balancing Turtle Shell", sets: 3, reps: "30+ sec holds", focus: "Hold the dome while on one foot" },
      { name: "Squatting Turtle Shell", sets: 3, reps: 8, focus: "Keep the dome while doing a slow squat" },
    ],
  },
  {
    id: "pencil-pinchers",
    name: "Pencil Pinchers (Toe Spacer Squeeze)",
    description:
      "Let a grown-up put a capped pen or the blunt end of a pencil between your big toe and the next toe, and another between your two little toes. Squeeze the pens gently like you're trying to hold them in place.",
    watchOut: "Make sure all your toes are helping to squeeze, not just the big one.",
    phase1: { sets: 3, reps: 12, hold: "5 sec", focus: "Gentle, steady squeeze" },
    phase2: { sets: 3, reps: 10, hold: "5 sec", focus: "Stand up; spread toes wide first" },
    phase3: null,
  },
  {
    id: "side-sweeper",
    name: "Side-Sweeper (Arch Anchor)",
    description:
      "Sit down. A grown-up will loop a stretchy band around the inside of your foot. Keep your heel glued to the floor like it's stuck in mud, and sweep the front of your foot inward against the band.",
    watchOut: "Don't let your heel lift up!",
    phase1: { sets: 3, reps: 12, focus: "Glue the heel to the floor" },
    phase2: { sets: 4, reps: 8, focus: "Use a thicker stretchy band" },
    phase3: { name: "Super-Heavy Sweeper", sets: 3, reps: 8, focus: "Use the toughest band" },
  },
  {
    id: "coin-crusher",
    name: "Coin Crusher (Big Toe Driver)",
    description:
      "Stand up and hold a chair. Put a coin right under the ball of your big toe. Lift your heels just a tiny bit off the floor. As you lift, squish that coin into the floor as hard as you can!",
    watchOut: "Don't roll to the outside of your foot. Squash the coin!",
    phase1: { sets: 3, reps: 10, focus: "Squash the coin hard" },
    phase2: { name: "Flamingo Coin Crusher", sets: 3, reps: 8, per: "leg", focus: "Balance on one leg" },
    phase3: { name: "Step-Edge Coin Crusher", sets: 3, reps: 8, per: "leg", focus: "Heels hanging off a step" },
  },
  {
    id: "rocket-blastoff",
    name: "Rocket Blast-Off (Power Push-Off)",
    description:
      "Stand up and squeeze a tennis ball tightly between your heels. Go up on your tiptoes like a rocket blasting off, but don't drop the ball! Come down super slowly.",
    watchOut: "Don't let your heels drift apart — keep squishing the ball.",
    phase1: { sets: 3, reps: 10, focus: "Don't drop the tennis ball" },
    phase2: { name: "Flamingo Blast-Off", sets: 3, reps: 8, per: "leg", focus: "Squeeze ball on one leg" },
    phase3: { name: "Step-Edge Blast-Off", sets: 3, reps: 8, per: "leg", focus: "Do the rocket launch off a step" },
  },
  {
    id: "slowmo-toe-lifts",
    name: "Slow-Mo Toe Lifts (Front Shin Controller)",
    description:
      "A grown-up will put a band over the top of your foot. Pull your toes up toward your nose, then lower them back to the floor in super slow-motion (count to 4!).",
    watchOut: "Don't let the band snap your foot down fast. You are in control!",
    phase1: { sets: 3, reps: 12, focus: "Count to 4 on the way down" },
    phase2: { name: "Heavy Slow-Mo Lifts", sets: 3, reps: 10, focus: "Use a thicker band; slow lower" },
    phase3: { name: "Super-Heavy Toe Lifts", sets: 3, reps: 8, focus: "Toughest band, super slow lower" },
  },
];

const kidsPhaseDefinitions = [
  {
    id: "phase-1",
    label: "Phase 1: Superhero Training Camp",
    weeks: "Weeks 1–4",
    schedule: "4–5 days/week, 15 min",
    goal: "Learn how to use your ninja muscles while sitting down.",
  },
  {
    id: "phase-2",
    label: "Phase 2: Building Super Strength",
    weeks: "Weeks 5–8",
    schedule: "3 days/week, 20 min",
    goal: "Do the moves standing up to make gravity work for us!",
  },
  {
    id: "phase-3",
    label: "Phase 3: Superhero Moves in Real Life",
    weeks: "Weeks 9–12+",
    schedule: "2–3 days/week, 20 min",
    goal: "Use your new strong feet for balancing, squatting, and moving!",
  },
];

// ──────────────────────────────────────────────
// CARE GUIDE — sections from guide-flat-feet.txt
// ──────────────────────────────────────────────

const careGuide = [
  {
    id: "what-flat-feet-are",
    title: "What Flat Feet Are",
    content: `There are two broad kinds, and the difference matters:

- **Flexible flat foot:** the arch appears when you sit, stand on tiptoe, or pull your big toe back, and flattens when you stand. This is by far the most common type, in children and adults.

- **Rigid flat foot:** the arch stays flat even off the ground or on tiptoe. This is less common and should be examined, because it can come from a fused connection between foot bones (tarsal coalition), arthritis, or an old injury.

In adults, an arch that newly collapses on one side is a different problem. The most common cause is a failing tendon on the inside of the ankle (the posterior tibial tendon). That is called progressive collapsing foot deformity, previously called adult-acquired flatfoot, and it should be evaluated early.

Most young children have flat-looking feet, and the arch usually develops over the first several years. A flexible, painless flat foot in a child usually needs no treatment.`,
  },
  {
    id: "sit-to-stand-check",
    title: "The Sit-to-Stand Check (Excursion)",
    content: `How far the arch moves between sitting and standing matters at least as much as how high it is.

Look at your arch while you're sitting with your foot relaxed, then stand up and look again. The difference between the two is what matters — what I call **excursion**.

A flexible arch can drop flat when you stand. When it drops, three things happen:
- Your foot gets longer.
- The front of your foot drifts outward, away from your other foot.
- The joints in your foot stop lining up the way they were designed to.`,
  },
  {
    id: "two-home-checks",
    title: "Two Home Checks",
    content: `These are not a diagnosis, but they help you see what your foot is doing.

**The wet footprint test**
Wet your bare foot, stand normally on a piece of brown paper or a dry patio, and step off. A typical arch leaves a band along the outside about half as wide as the ball of the foot. A flat foot fills in most of the inside. A high arch leaves only a thin strip, or a gap.

**The tiptoe and "too many toes" checks**
Stand up on your toes. In a flexible flat foot, the arch should reappear and the heel should swing inward. If the arch stays flat, or rising on your toes is painful or hard to do on one leg, have it checked.

Next, have someone stand behind you while you stand normally. They will usually see one or two of your smaller toes peeking out past the outside of your heel. When the arch collapses and the front of the foot drifts outward, they see three or more. Podiatrists call this the "too many toes" sign. If it is new, or worse on one side, see your podiatrist or doctor.`,
  },
  {
    id: "shoe-ladder",
    title: "Step 1: The Right Shoe — Support Ladder",
    content: `Athletic shoes come in a clear order of support, from least to most:

1. **Minimalist**
2. **Neutral / cushioned**
3. **Stability**
4. **Motion control**

I don't pick a shoe by whether someone has a "flat foot" or a "high arch." Instead I compare where the foot sits when it's off the ground to where it sits when the person is standing on it. The bigger the difference, the more support the person needs. For most people, that means a stability shoe. For people who are very active or very flexible, I go to motion control.`,
  },
  {
    id: "arch-support-sizing",
    title: "Step 2: An Arch Support, Sized by Your Arch",
    content: `**The sizing rule:** start from measured foot size, go one size down. Very flexible feet: up to two sizes down. Example: wear an 11? Try a 10 to 10½.

**The fit test:** hold the arch support up against the bottom of your bare foot and pull your toes back toward your shin.
- If your arch comes off the orthotic, it's too long. Get a shorter one.
- If your arch lines up but the orthotic isn't high enough, get a higher-arch orthotic.

An orthotic shouldn't hurt. There shouldn't be a break-in period. If it hurts, it's likely the wrong size or shape for your foot.`,
  },
  {
    id: "short-foot-exercise",
    title: "The Short Foot Exercise",
    content: `**What it trains:** intrinsic foot muscles (first metatarsal head toward heel, no toe curling).

**How to do it:**
- Sit with your bare foot flat on the floor.
- Without curling your toes, draw the ball of your foot back toward your heel, as if you were making your foot shorter. Your arch should rise.
- Hold for 5 to 10 seconds, relax, and repeat 8 to 12 times. Do 3 sets, once or twice a day.
- After a week or two, when that gets easy, do it standing, then on one leg, then while you walk.

**The toe-curling mistake:** keep the toes long and relaxed, and let the arch do the work. If your toes are clawing or your heel is lifting, you're using the wrong muscles.

**Give it 6–8 weeks.** Most people start to feel more control within a few weeks.`,
  },
  {
    id: "young-old-feet",
    title: "Young Feet and Old Feet",
    content: `I divide the feet I see into two groups: young feet and old feet. I don't mean your age. I mean how flexible the foot still is.

**Young feet** respond quickly when supported — when the deformity can be reduced, they often get better fast.

**Old feet** are harder. After years of sitting in the wrong position, the body adapts. The soft tissues shorten, the joints stiffen, and eventually the foot can't be put back into good alignment. Flexible foot deformities can become rigid over time. That's the strongest reason to deal with this early.`,
  },
  {
    id: "when-to-see-podiatrist",
    title: "When to See a Podiatrist",
    content: `See your podiatrist or doctor if:
- Foot, heel, arch, or ankle pain lasts more than a few weeks despite supportive shoes.
- One foot is flattening more than the other.
- The inside of your ankle is painful or swollen or you have trouble rising up on your toes on one leg.
- A child's flat foot is stiff, painful, or causes frequent ankle sprains.
- You have diabetes or reduced feeling in your feet and notice a change in foot shape.`,
  },
  {
    id: "same-day-list",
    title: "Get Help Right Away",
    content: `Flat feet by themselves are not an emergency. Get care the same day if you have:
- A foot that is suddenly warm, red, and swollen, especially if you have diabetes or neuropathy.
- A sudden pop or new pain on the inside of the ankle, followed by the arch collapsing on that side.
- An injury after which you cannot put weight on the foot, or the foot looks misshapen.
- A wound, blister, or sore on the foot that is not healing, especially with diabetes or poor circulation.

**Go to an emergency room right away if:**
- A foot or toe suddenly turns cold, pale, or blue and painful.
- You have a high fever with a red, hot, swollen foot.`,
  },
  {
    id: "kids-red-flags",
    title: "Kids Red-Flag List — When to Get Care Right Away",
    content: `In Kids mode, the same-day section above is replaced with this list:
- Foot pain that keeps your child from sports or play, or that wakes them at night.
- A flat foot that is stiff, or only one foot is flat.
- Frequent ankle sprains, tripping, or a limp.
- Pain, swelling, or redness on the inside of the foot or ankle.
- Sharp pain during any exercise that doesn't settle with rest.
- Calluses, blisters, or shoes that wear out very unevenly.`,
  },
];

// ──────────────────────────────────────────────
// EXPORTS — consumed by App.jsx
// ──────────────────────────────────────────────

export {
  DISCLAIMER,
  SAFETY_BOX,
  adultChecklist,
  adultPhaseDefinitions,
  kidsGoldenRules,
  kidsMoves,
  kidsPhaseDefinitions,
  careGuide,
};
