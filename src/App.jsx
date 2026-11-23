import { useState, useEffect, useRef, useCallback } from 'react';
import {
  CheckCircle as CHECK_CIRCLE,
  Circle as CIRCLE,
  ChevronDown as CHEVRON_DOWN,
  ChevronUp as CHEVRON_UP,
  Heart as HEART,
  BookOpen as BOOK_OPEN,
  BarChart3 as BAR_CHART_3,
  Clock as CLOCK,
  Play as PLAY,
  Pause as PAUSE,
  RotateCcw as ROTATE_CCW,
} from 'lucide-react';
import {
  DISCLAIMER,
  SAFETY_BOX,
  adultChecklist,
  adultPhaseDefinitions,
  kidsGoldenRules,
  kidsMoves,
  kidsPhaseDefinitions,
  careGuide,
} from './plan';

/* ──────────────────────────────────────────────
 * localStorage helpers (flatfeet_ prefix)
 * ────────────────────────────────────────────── */

function read(key, fallback) {
  try {
    const v = localStorage.getItem('flatfeet_' + key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem('flatfeet_' + key, JSON.stringify(value));
}

function todayKey() {
  return new Date().toDateString();
}

/* ──────────────────────────────────────────────
 * Sub-components
 * ────────────────────────────────────────────── */

function PainScore({ onSave }) {
  const [val, setVal] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    const hist = read('history', {});
    const entry = hist[todayKey()];
    if (entry && entry.pain !== undefined) {
      setVal(entry.pain);
      setSaved(entry.pain);
    }
  }, []);

  const handleSave = () => {
    if (val === null || val < 0 || val > 10) return;
    const hist = read('history', {});
    hist[todayKey()] = { pain: val };
    write('history', hist);
    setSaved(val);
    onSave && onSave(val);
  };

  return (
    <div className="bg-stone-100 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
        <HEART className="w-4 h-4" />
        Today's Pain Score
      </h3>
      {saved !== null ? (
        <div className="text-center">
          <span className="text-4xl font-bold text-green-800">{saved}</span>
          <span className="text-stone-500 text-sm ml-1">/ 10</span>
          <p className="text-xs text-stone-500 mt-1">Saved {todayKey()}</p>
        </div>
      ) : (
        <div>
          <div className="flex gap-1 justify-center flex-wrap">
            {Array.from({ length: 11 }, (_, i) => (
              <button
                key={i}
                onClick={() => setVal(i)}
                className={`w-9 h-9 rounded-full text-sm font-bold transition ${
                  val === i
                    ? i <= 3
                      ? 'bg-green-500 text-white ring-2 ring-green-700'
                      : i <= 6
                        ? 'bg-yellow-500 text-white ring-2 ring-yellow-700'
                        : 'bg-red-500 text-white ring-2 ring-red-700'
                    : 'bg-white text-stone-600 border border-stone-300 hover:border-green-600'
                }`}
              >
                {i}
              </button>
            ))}
          </div>
          <button
            onClick={handleSave}
            disabled={val === null}
            className="mt-3 w-full py-2 rounded-lg bg-green-700 text-white font-semibold text-sm disabled:opacity-40 hover:bg-green-800"
          >
            Save Pain Score
          </button>
        </div>
      )}
    </div>
  );
}

function ChecklistItem({ item, checked, onToggle }) {
  return (
    <label className="flex items-start gap-3 py-2 cursor-pointer select-none">
      <button
        onClick={() => onToggle(item.id)}
        className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
          checked
            ? 'bg-green-700 border-green-700'
            : 'border-stone-400 hover:border-green-600'
        }`}
      >
        {checked && <CHECK_CIRCLE className="w-5 h-5 text-white" />}
      </button>
      <div>
        <span className={`text-sm font-medium ${checked ? 'text-stone-400 line-through' : 'text-stone-800'}`}>
          {item.name}
        </span>
        <p className="text-xs text-stone-500">{item.dosage}</p>
      </div>
    </label>
  );
}

function AdultChecklist({ tasks, onToggle }) {
  return (
    <div className="bg-stone-100 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
        <CHECK_CIRCLE className="w-4 h-4" />
        Today's Exercises
      </h3>
      <div className="space-y-1">
        {adultChecklist.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            checked={!!tasks[item.id]}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

function ShortFootTimer() {
  const [phase, setPhase] = useState('rest'); // 'hold' | 'rest' | 'idle'
  const [countdown, setCountdown] = useState(0);
  const [rep, setRep] = useState(1);
  const [setNum, setSetNum] = useState(1);
  const [level, setLevel] = useState(0); // 0=Seated, 1=Standing, 2=One leg, 3=While walking
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const done = rep > 10 && setNum > 3;

  const levels = ['Seated', 'Standing', 'One leg', 'While walking'];
  const holdTime = 8;
  const restTime = 5;

  useEffect(() => {
    if (running && phase !== 'idle') {
      intervalRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            if (phase === 'hold') {
              setPhase('rest');
              setCountdown(restTime);
              return restTime;
            } else {
              if (rep < 10 && setNum <= 3) {
                setRep((r) => r + 1);
                setPhase('hold');
                setCountdown(holdTime);
                return holdTime;
              } else if (setNum < 3) {
                setSetNum((s) => s + 1);
                setRep(1);
                setPhase('hold');
                setCountdown(holdTime);
                return holdTime;
              } else {
                setPhase('idle');
                setRunning(false);
                if (intervalRef.current) clearInterval(intervalRef.current);
                return 0;
              }
            }
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, phase]);

  const start = () => {
    setPhase('hold');
    setCountdown(holdTime);
    setRep(1);
    setSetNum(1);
    setRunning(true);
  };

  const reset = () => {
    setRunning(false);
    setPhase('idle');
    setCountdown(0);
    setRep(1);
    setSetNum(1);
  };

  if (done && !running) {
    return (
      <div className="bg-green-50 border border-green-300 rounded-lg p-4 text-center">
        <p className="text-green-800 font-bold text-lg">✓ All 3 sets complete!</p>
        <p className="text-green-700 text-sm mt-1">Level: {levels[level]}</p>
        <button onClick={reset} className="mt-2 px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-800">
          <ROTATE_CCW className="w-4 h-4 inline mr-1" /> Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
        <CLOCK className="w-4 h-4" />
        Short Foot Guided Timer
      </h3>

      {/* Level selector */}
      <div className="mb-3">
        <label className="text-xs text-stone-500 mb-1 block">Level</label>
        <div className="flex gap-1 flex-wrap">
          {levels.map((l, i) => (
            <button
              key={i}
              onClick={() => {
                setLevel(i);
                reset();
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                level === i
                  ? 'bg-green-700 text-white'
                  : 'bg-white text-stone-600 border border-stone-300 hover:border-green-600'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <p className="text-xs text-stone-500 mb-3">
        {levels[level]} · {holdTime}s hold / {restTime}s rest · 10 reps × 3 sets
      </p>

      {/* Timer display */}
      {running && (
        <div className="text-center py-4">
          <div className={`text-5xl font-bold ${phase === 'hold' ? 'text-green-700' : 'text-stone-400'}`}>
            {countdown}
          </div>
          <p className={`text-sm font-semibold mt-1 ${phase === 'hold' ? 'text-green-700' : 'text-stone-500'}`}>
            {phase === 'hold' ? 'HOLD' : 'RELAX'}
          </p>
          <p className="text-xs text-stone-400 mt-2">
            Rep {rep} · Set {setNum} / 3
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2 mt-3">
        {!running ? (
          <button
            onClick={start}
            className="flex-1 py-2 bg-green-700 text-white rounded-lg font-semibold text-sm hover:bg-green-800 flex items-center justify-center gap-2"
          >
            <PLAY className="w-4 h-4" /> Start
          </button>
        ) : (
          <button
            onClick={() => {
              setRunning(false);
              if (intervalRef.current) clearInterval(intervalRef.current);
            }}
            className="flex-1 py-2 bg-yellow-500 text-white rounded-lg font-semibold text-sm hover:bg-yellow-600 flex items-center justify-center gap-2"
          >
            <PAUSE className="w-4 h-4" /> Pause
          </button>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 bg-stone-300 text-stone-700 rounded-lg text-sm hover:bg-stone-400"
        >
          <ROTATE_CCW className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function KidsChecklist({ week, tasks, onToggle }) {
  // Determine current phase from week
  let phaseDef;
  let phaseIdx;
  if (week <= 4) {
    phaseIdx = 0;
    phaseDef = kidsPhaseDefinitions[0];
  } else if (week <= 8) {
    phaseIdx = 1;
    phaseDef = kidsPhaseDefinitions[1];
  } else {
    phaseIdx = 2;
    phaseDef = kidsPhaseDefinitions[2];
  }

  const getExercise = (move) => {
    if (phaseIdx === 0) return move.phase1;
    if (phaseIdx === 1) return move.phase2;
    return move.phase3;
  };

  const renderDosage = (move, dosage) => {
    if (!dosage) return '—';
    if (Array.isArray(dosage)) {
      return dosage
        .map((v) => `${v.name}: ${v.sets}×${v.reps}${v.focus ? ' — ' + v.focus : ''}`)
        .join('\n');
    }
    return `${dosage.sets}×${dosage.reps}${dosage.hold ? ' hold ' + dosage.hold : ''}${dosage.focus ? ' — ' + dosage.focus : ''}${dosage.per ? ' / ' + dosage.per : ''}`;
  };

  return (
    <div className="bg-stone-100 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-green-800 mb-1 flex items-center gap-2">
        <CHECK_CIRCLE className="w-4 h-4" />
        Superhero Moves
      </h3>
      <p className="text-xs text-stone-500 mb-3">
        {phaseDef.label} · {phaseDef.schedule}
      </p>

      {/* Golden Rules */}
      <div className="bg-green-50 rounded-lg p-3 mb-3">
        <h4 className="text-xs font-bold text-green-800 mb-2">🌟 4 Golden Rules</h4>
        <ul className="text-xs text-stone-700 space-y-1">
          {kidsGoldenRules.map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      </div>

      {/* Exercises */}
      <div className="space-y-3">
        {kidsMoves.map((move) => {
          const dosage = getExercise(move);
          const checked = !!tasks[move.id];
          return (
            <div key={move.id} className={`rounded-lg p-3 transition ${checked ? 'bg-green-100' : 'bg-white border border-stone-200'}`}>
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <button
                  onClick={() => onToggle(move.id)}
                  className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                    checked
                      ? 'bg-green-700 border-green-700'
                      : 'border-stone-400 hover:border-green-600'
                  }`}
                >
                  {checked && <CHECK_CIRCLE className="w-5 h-5 text-white" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${checked ? 'text-stone-500' : 'text-stone-800'}`}>
                      {move.name}
                    </span>
                    {checked && <span className="text-xs text-green-600">✓</span>}
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">{move.description}</p>
                  {dosage && (
                    <p className="text-xs text-green-700 mt-1 font-medium">
                      {Array.isArray(dosage)
                        ? dosage.map((v) => `${v.name}: ${v.sets}×${v.reps}${v.focus ? ' — ' + v.focus : ''}`).join(' | ')
                        : `${dosage.sets}×${dosage.reps}${dosage.hold ? ' hold ' + dosage.hold : ''}${dosage.focus ? ' — ' + dosage.focus : ''}${dosage.per ? ' / ' + dosage.per : ''}`
                      }
                    </p>
                  )}
                  {move.watchOut && (
                    <p className="text-xs text-amber-600 mt-1 italic">⚠ {move.watchOut}</p>
                  )}
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CareGuide() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div>
      {/* Safety box — always visible */}
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-4">
        <h3 className="text-sm font-bold text-amber-800 mb-1 flex items-center gap-2">
          <HEART className="w-4 h-4" />
          {SAFETY_BOX.title}
        </h3>
        <p className="text-xs text-amber-700 leading-relaxed">{SAFETY_BOX.body}</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-stone-100 rounded-lg p-3 mb-4 text-xs text-stone-500 italic">
        {DISCLAIMER}
      </div>

      {/* Accordion sections */}
      {careGuide.map((section, i) => (
        <div key={section.id} className="mb-2 border border-stone-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between p-3 bg-white hover:bg-stone-50 transition"
          >
            <span className="text-sm font-semibold text-green-800 pr-2">{section.title}</span>
            {openIdx === i ? (
              <CHEVRON_UP className="w-4 h-4 text-stone-400 shrink-0" />
            ) : (
              <CHEVRON_DOWN className="w-4 h-4 text-stone-400 shrink-0" />
            )}
          </button>
          {openIdx === i && (
            <div className="px-3 pb-3 text-xs text-stone-700 leading-relaxed border-t border-stone-100 pt-2">
              <div dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, '<br />') }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Progress() {
  const [mode, setMode] = useState(read('mode', 'adults'));
  const [history, setHistory] = useState(() => read('history', {}));
  const [startDate, setStartDate] = useState(read('start_date', null));
  const [kidsWeek, setKidsWeek] = useState(read('kids_week', 1));

  const entries = Object.entries(history)
    .slice(-14)
    .map(([dateKey, val]) => ({ dateKey, ...val }));

  const trend = entries.length >= 2 ? entries[entries.length - 1].pain - entries[0].pain : 0;

  // Phase computation
  const currentPhase = () => {
    if (mode === 'kids') {
      if (startDate) {
        const start = new Date(startDate);
        const now = new Date();
        const diffWeeks = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
        const computedWeek = Math.max(1, diffWeeks + 1);
        setKidsWeek(computedWeek);
        if (computedWeek !== kidsWeek) {
          write('kids_week', computedWeek);
        }
        if (computedWeek <= 4) return kidsPhaseDefinitions[0];
        if (computedWeek <= 8) return kidsPhaseDefinitions[1];
        return kidsPhaseDefinitions[2];
      }
      return kidsPhaseDefinitions[0];
    }
    if (startDate) {
      const start = new Date(startDate);
      const now = new Date();
      const diffWeeks = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
      if (diffWeeks < 2) return adultPhaseDefinitions[0];
      if (diffWeeks < 6) return adultPhaseDefinitions[1];
      return adultPhaseDefinitions[2];
    }
    return adultPhaseDefinitions[0];
  };

  const phase = currentPhase();

  const twoWeeksCheckIn = () => {
    if (!startDate) return false;
    const start = new Date(startDate);
    const now = new Date();
    const diffDays = (now - start) / (24 * 60 * 60 * 1000);
    return diffDays >= 14;
  };

  const painLabel = (v) => {
    if (v <= 3) return 'mild';
    if (v <= 6) return 'moderate';
    return 'severe';
  };

  return (
    <div>
      {/* Disclaimer */}
      <div className="bg-stone-100 rounded-lg p-3 mb-4 text-xs text-stone-500 italic">
        {DISCLAIMER}
      </div>

      {/* Phase tracker */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h3 className="text-sm font-semibold text-green-800 mb-1">Current Phase</h3>
        <p className="text-base font-bold text-green-800">{phase.label}</p>
        {phase.weeks && <p className="text-xs text-stone-500 mt-1">{phase.weeks}</p>}
        {phase.schedule && <p className="text-xs text-stone-500">{phase.schedule}</p>}
        {phase.goal && <p className="text-xs text-stone-600 mt-2">{phase.goal}</p>}
        {phase.description && <p className="text-xs text-stone-600 mt-2">{phase.description}</p>}
      </div>

      {/* Pain history */}
      <div className="bg-stone-100 rounded-lg p-4 mb-4">
        <h3 className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
          <BAR_CHART_3 className="w-4 h-4" />
          Pain History (Last 14 Entries)
        </h3>

        {entries.length === 0 ? (
          <p className="text-sm text-stone-400 text-center py-4">No pain scores recorded yet. Go to the Today tab to log your first score.</p>
        ) : (
          <>
            {/* Simple bar chart */}
            <div className="flex items-end gap-1 h-32 mb-3">
              {entries.map((e, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <span className="text-[10px] text-stone-500 mb-0.5">{e.pain}</span>
                  <div
                    className={`w-full rounded-t-sm transition-all ${
                      e.pain <= 3
                        ? 'bg-green-500'
                        : e.pain <= 6
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                    style={{ height: `${(e.pain / 10) * 100}%`, minHeight: '4px' }}
                  />
                  <span className="text-[9px] text-stone-400 mt-0.5 truncate w-full text-center">
                    {new Date(e.dateKey).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>

            {/* Trend */}
            <div className="text-center text-sm">
              <span className="font-semibold">Trend: </span>
              {trend < 0 ? (
                <span className="text-green-700">↓ Improving ({trend})</span>
              ) : trend > 0 ? (
                <span className="text-red-600">↑ Worsening (+{trend})</span>
              ) : (
                <span className="text-stone-500">→ No change</span>
              )}
            </div>

            {/* Most recent */}
            <div className="mt-2 text-xs text-stone-500 text-center">
              Latest: {new Date(entries[entries.length - 1].dateKey).toLocaleDateString()} · Pain: {entries[entries.length - 1].pain}/10 ({painLabel(entries[entries.length - 1].pain)})
            </div>
          </>
        )}
      </div>

      {/* Two-week check-in */}
      {twoWeeksCheckIn() && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-bold text-blue-800 mb-1">Two-Week Check-In</h3>
          <p className="text-xs text-blue-700 leading-relaxed">
            If your pain is not improving after two weeks of good support and consistent exercises, get a full exam. A clinician can check whether you need a different shoe, a properly sized arch support, or further evaluation.
          </p>
        </div>
      )}

      {/* Start date setup (for phase tracking) */}
      <div className="bg-stone-100 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-green-800 mb-2">Program Start Date</h3>
        <input
          type="date"
          value={startDate || ''}
          onChange={(e) => {
            const v = e.target.value;
            setStartDate(v);
            write('start_date', v);
            if (mode === 'kids') {
              const start = new Date(v);
              const now = new Date();
              const diffWeeks = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
              setKidsWeek(Math.max(1, diffWeeks + 1));
              write('kids_week', Math.max(1, diffWeeks + 1));
            }
          }}
          className="w-full px-3 py-2 rounded-lg border border-stone-300 text-sm text-stone-700 bg-white"
        />
        {startDate && (
          <p className="text-xs text-stone-500 mt-1">
            Phase automatically updates based on weeks since start date.
          </p>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
 * Main App
 * ────────────────────────────────────────────── */

export default function App() {
  const [mode, setMode] = useState(read('mode', 'adults'));
  const [tab, setTab] = useState('today'); // 'today' | 'guide' | 'progress'
  const [startDate, setStartDate] = useState(read('start_date', null));
  const [kidsWeek, setKidsWeek] = useState(read('kids_week', 1));
  const [tasks, setTasks] = useState(() => read('tasks', {}));
  const [tasksDate, setTasksDate] = useState(() => read('tasks_date', ''));

  // Reset daily checklist if new day
  useEffect(() => {
    const dk = todayKey();
    if (tasksDate !== dk) {
      setTasks({});
      setTasksDate(dk);
      write('tasks_date', dk);
    }
  }, []);

  // Persist mode
  useEffect(() => {
    write('mode', mode);
  }, [mode]);

  // Persist tasks
  useEffect(() => {
    if (tasksDate) {
      write('tasks', tasks);
      write('tasks_date', tasksDate);
    }
  }, [tasks, tasksDate]);

  // Compute kids week from start date
  useEffect(() => {
    if (mode === 'kids' && startDate) {
      const start = new Date(startDate);
      const now = new Date();
      const diffWeeks = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000));
      const w = Math.max(1, diffWeeks + 1);
      if (w !== kidsWeek) {
        setKidsWeek(w);
        write('kids_week', w);
      }
    }
  }, [mode, startDate]);

  const toggleTask = (id) => {
    setTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePainSaved = useCallback(() => {}, []);

  const tabs = [
    { id: 'today', label: 'Today', icon: CHECK_CIRCLE },
    { id: 'guide', label: 'Care Guide', icon: BOOK_OPEN },
    { id: 'progress', label: 'Progress', icon: BAR_CHART_3 },
  ];

  return (
    <div className="min-h-screen bg-paper text-stone-800">
      {/* Header */}
      <header className="bg-green-800 text-white py-4 px-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-center">Flat Feet Care</h1>
          <p className="text-center text-green-200 text-xs mt-1">Daily Recovery Plan</p>

          {/* Mode toggle */}
          <div className="flex justify-center mt-3">
            <div className="bg-green-900 rounded-lg p-1 flex">
              <button
                onClick={() => setMode('adults')}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${
                  mode === 'adults' ? 'bg-white text-green-800' : 'text-green-200 hover:text-white'
                }`}
              >
                Adults
              </button>
              <button
                onClick={() => setMode('kids')}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${
                  mode === 'kids' ? 'bg-white text-green-800' : 'text-green-200 hover:text-white'
                }`}
              >
                Kids (6+)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-lg mx-auto flex">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 px-2 text-center text-sm font-semibold transition border-b-2 ${
                tab === t.id
                  ? 'border-green-700 text-green-800 bg-green-50'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
              }`}
            >
              <t.icon className="w-4 h-4 inline mr-1" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-lg mx-auto p-4 pb-8">
        {tab === 'today' && (
          <div className="space-y-4">
            {/* Pain score */}
            <PainScore onSave={handlePainSaved} />

            {/* Mode-specific content */}
            {mode === 'adults' ? (
              <>
                <AdultChecklist tasks={tasks} onToggle={toggleTask} />
                <ShortFootTimer />
              </>
            ) : (
              <>
                <KidsChecklist week={kidsWeek} tasks={tasks} onToggle={toggleTask} />
                {startDate && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-green-800">
                      Current Week: {kidsWeek}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      Phase auto-updates from start date
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {tab === 'guide' && <CareGuide />}

        {tab === 'progress' && (
          <div>
            <Progress />
            {mode === 'kids' && startDate && (
              <div className="bg-stone-100 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-green-800 mb-2">Kids Phase Progress</h3>
                <p className="text-xs text-stone-500">
                  Week {kidsWeek} · {phase?.label || 'Phase 1'}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  The 6 Superhero moves change each phase. Check the Today tab to see what your child should do now.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer disclaimer */}
      <footer className="max-w-lg mx-auto px-4 py-4 text-center">
        <p className="text-[10px] text-stone-400">{DISCLAIMER}</p>
      </footer>
    </div>
  );
}
