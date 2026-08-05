const THEME = {
  him: { accent: '#ff4655', dim: 'rgba(255,70,85,0.14)', label: 'His workout' },
  her: { accent: '#2dd4bf', dim: 'rgba(45,212,191,0.14)', label: 'Her workout' }
};

let actx = null;
function beep(freq, dur, delay = 0, vol = 0.16) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const t0 = actx.currentTime + delay;
    const o = actx.createOscillator();
    const g = actx.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g);
    g.connect(actx.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  } catch (e) {}
}
const beepStart = () => { beep(880, 0.12); beep(880, 0.12, 0.18); };
const beepRest = () => beep(440, 0.5);
const beepTick = () => beep(660, 0.08);
const beepDone = () => { beep(880, 0.15); beep(660, 0.15, 0.2); beep(990, 0.4, 0.4); };

function setDurOf(ex) {
  if (ex.type === 'time') return ex.time;
  let d = ex.reps * ex.anim.dur;
  if (ex.eachSide) d *= 2;
  return d;
}

function entryLabel(ex) {
  const base = ex.type === 'time' ? ex.time + 's' : (ex.eachSide ? ex.reps + ' reps / leg' : ex.reps + ' reps');
  return ex.sets + ' set' + (ex.sets > 1 ? 's' : '') + ' × ' + base;
}

function planFromRoutine(side, routine) {
  return routine.items.map((id) => {
    const ex = EXERCISES[id];
    return { ex, sets: ex.sets, setDur: setDurOf(ex), rest: ex.rest };
  });
}

function shuffle(a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function planFromDuration(side, minutes) {
  const pool = GENERATOR_POOLS[side];
  const target = minutes * 60;
  const order = side === 'him' ? ['push', 'shoulders', 'back', 'legs', 'core'] : ['core', 'glutes', 'legs'];
  const plan = [];
  let total = 0;
  const add = (id, sets, rest) => {
    const ex = EXERCISES[id];
    const setDur = setDurOf(ex);
    const entry = { ex, sets, setDur, rest };
    plan.push(entry);
    total += sets * setDur + (sets - 1) * rest;
  };
  for (const id of shuffle(pool.warmup)) add(id, 1, 0);
  let round = 0;
  const used = {};
  const mainBudget = target * (side === 'him' ? 0.62 : 0.68);
  while (total < mainBudget) {
    let added = false;
    for (const g of order) {
      let cands = pool[g].filter((id) => !used[id]);
      if (!cands.length) cands = pool[g];
      const id = cands[round % cands.length];
      used[id] = 1;
      add(id, g === 'core' ? 2 : 3, side === 'him' ? 45 : 25);
      added = true;
      if (total >= mainBudget) break;
    }
    round++;
    if (!added) break;
  }
  if (total < target * 0.82) {
    for (const id of pool.stretch) add(id, 1, 0);
  }
  return plan;
}

const App = {
  sides: [],
  panels: [],
  setupSel: {},

  home() {
    this.stopAll();
    this.show('home-view');
  },

  show(id) {
    for (const v of document.querySelectorAll('.view')) v.hidden = true;
    document.getElementById(id).hidden = false;
    window.scrollTo(0, 0);
  },

  solo(side) {
    this.sides = [side];
    this.openSetup();
  },

  split() {
    this.sides = ['him', 'her'];
    this.openSetup();
  },

  openSetup() {
    this.setupSel = {};
    const cols = document.getElementById('setup-cols');
    cols.innerHTML = '';
    for (const side of this.sides) {
      const card = document.createElement('div');
      card.className = 'setup-card';
      card.style.setProperty('--accent', THEME[side].accent);
      card.style.setProperty('--accent-dim', THEME[side].dim);
      const t = THEME[side];
      let list = '';
      for (const r of ROUTINES[side]) {
        list += `<button class="routine-opt" data-id="${r.id}" data-name="${r.name}">
          <span class="dot"></span><span><span class="r-name">${r.name}</span><br><span class="r-desc">${r.desc}</span></span>
        </button>`;
      }
      card.innerHTML = `
        <h3>${t.label}</h3>
        <div class="routine-list">${list}</div>
        <h3 style="margin-top:1.2rem">…or give me ${side === 'him' ? 'a build' : 'a flow'} for</h3>
        <div class="duration-chips">
          ${[10, 15, 20, 30, 45].map((m) => `<button class="dur-chip" data-min="${m}">${m} min</button>`).join('')}
        </div>
        <p class="chip-note">${side === 'him'
          ? 'Generated plan hits chest, shoulders, back, legs and core with built-in rests.'
          : 'Generated mat flow covers core, glutes and legs with built-in rests.'}</p>`;
      cols.appendChild(card);
      const def = ROUTINES[side][0];
      this.setupSel[side] = { type: 'routine', id: def.id, name: def.name };
    }
    this.bindSetupEvents();
    document.getElementById('setup-title').textContent =
      this.sides.length === 2 ? 'Choose your sessions' : (this.sides[0] === 'him' ? 'His session' : 'Her session');
    this.show('setup-view');
    this.renderSetupSel();
  },

  bindSetupEvents() {
    document.querySelectorAll('#setup-cols .setup-card').forEach((card, ci) => {
      const side = this.sides[ci];
      card.querySelectorAll('.routine-opt').forEach((b) => {
        b.onclick = () => {
          this.setupSel[side] = { type: 'routine', id: b.dataset.id, name: b.dataset.name };
          this.renderSetupSel();
        };
      });
      card.querySelectorAll('.dur-chip').forEach((b) => {
        b.onclick = () => {
          this.setupSel[side] = { type: 'gen', mins: Number(b.dataset.min) };
          this.renderSetupSel();
        };
      });
    });
  },

  renderSetupSel() {
    document.querySelectorAll('#setup-cols .setup-card').forEach((card, ci) => {
      const side = this.sides[ci];
      const sel = this.setupSel[side];
      card.querySelectorAll('.routine-opt').forEach((b) => {
        b.classList.toggle('sel', sel.type === 'routine' && sel.id === b.dataset.id);
      });
      card.querySelectorAll('.dur-chip').forEach((b) => {
        b.classList.toggle('sel', sel.type === 'gen' && sel.mins === Number(b.dataset.min));
      });
    });
  },

  begin() {
    this.stopAll();
    this.panels = [];
    const wrap = document.getElementById('panels');
    wrap.innerHTML = '';
    wrap.classList.toggle('two', this.sides.length === 2);
    for (const side of this.sides) {
      const sel = this.setupSel[side];
      const plan = sel.type === 'routine'
        ? planFromRoutine(side, ROUTINES[side].find((r) => r.id === sel.id))
        : planFromDuration(side, sel.mins);
      const p = new Panel(side, plan, sel);
      this.panels.push(p);
      wrap.appendChild(p.el);
    }
    this.show('workout-view');
  },

  stopAll() {
    for (const p of this.panels) p.stop();
  }
};

class Panel {
  constructor(side, plan, sel) {
    this.side = side;
    this.plan = plan;
    this.theme = THEME[side];
    this.idx = 0;
    this.setsLeft = 0;
    this.phase = 'ready';
    this.rem = 0;
    this.paused = false;
    this.timer = null;
    this.title = sel.type === 'routine' ? sel.name : `${sel.mins} min generated plan`;
    this.build();
    this.canvas = this.el.querySelector('canvas');
    this.fig = new StickFigure(this.canvas);
    this.renderEx(0);
    this.updateClock();
  }

  build() {
    const t = this.theme;
    const el = document.createElement('div');
    el.className = 'panel ' + this.side;
    el.style.setProperty('--accent', t.accent);
    el.style.setProperty('--accent-dim', t.dim);
    el.innerHTML = `
      <div class="panel-head">
        <div>
          <div class="panel-title">${t.label}</div>
          <div class="panel-sub">${this.title}</div>
        </div>
        <div class="panel-controls">
          <button class="btn ${this.side}" data-act="toggle">Start</button>
          <button class="btn" data-act="skip">Skip</button>
          <button class="btn" data-act="end">End</button>
        </div>
      </div>
      <div class="ex-card">
        <div class="fig-wrap"><canvas></canvas></div>
        <div class="ex-info">
          <h3></h3>
          <div class="muscles"></div>
          <div class="ex-meta"><span class="meta-txt"></span><small>Do the full set, then rest until the timer says go.</small></div>
          <details class="steps"><summary>How to do it</summary><ol></ol></details>
        </div>
      </div>
      <div class="phase">
        <div class="phase-label">ready<b>Press start when you're set</b></div>
        <div class="clock">0:00</div>
      </div>
      <div class="progress"><div></div></div>
      <div class="prog-text"><span class="prog-now"></span><span class="prog-set"></span></div>
      <div class="upnext"></div>`;
    el.querySelectorAll('button[data-act]').forEach((b) => {
      b.onclick = () => this.act(b.dataset.act);
    });
    this.el = el;
  }

  entry() { return this.plan[this.idx]; }
  totalSets() { return this.plan.reduce((n, e) => n + e.sets, 0); }

  setsDone() {
    let n = 0;
    for (let i = 0; i < this.idx; i++) n += this.plan[i].sets;
    if (this.phase === 'rest') n += this.plan[this.idx].sets - this.setsLeft;
    if (this.phase === 'ex') n += this.plan[this.idx].sets - this.setsLeft + 1;
    return n;
  }

  renderEx(i) {
    const e = this.plan[i];
    const ex = e.ex;
    this.el.querySelector('.ex-info h3').textContent = ex.name;
    const chips = this.el.querySelector('.muscles');
    chips.innerHTML = ex.muscles.map((m) => `<span class="muscle-chip">${m}</span>`).join('');
    this.el.querySelector('.meta-txt').textContent = entryLabel(ex);
    const ol = this.el.querySelector('details.steps ol');
    ol.innerHTML = ex.steps.map((s) => `<li>${s}</li>`).join('');
    this.el.querySelector('details').open = false;
    const next = this.plan[i + 1];
    this.el.querySelector('.upnext').textContent = next ? `Next: ${next.ex.name}` : 'Last one — finish strong';
  }

  startSet() {
    const e = this.entry();
    this.phase = 'ex';
    this.rem = e.setDur;
    this.renderEx(this.idx);
    this.fig.play(e.ex.anim, { fig: this.theme.accent, accent: this.theme.accent });
    beepStart();
    this.label('exercise', e.ex.name + (this.setsLeft > 1 ? ` — set ${this.plan[this.idx].sets - this.setsLeft + 1} of ${e.sets}` : ''));
    this.updateClock();
  }

  startRest() {
    const e = this.entry();
    this.phase = 'rest';
    this.rem = e.rest;
    this.fig.stop();
    beepRest();
    this.label('rest', 'Breathe — next set in a moment');
    this.updateClock();
  }

  label(kind, text) {
    this.el.querySelector('.phase-label').innerHTML = `<span style="color:${kind === 'rest' ? this.theme.accent : 'inherit'}">${kind}</span><b>${text}</b>`;
  }

  afterSet() {
    this.setsLeft--;
    if (this.setsLeft > 0) {
      this.startRest();
      return;
    }
    this.idx++;
    if (this.idx >= this.plan.length) {
      this.finish();
      return;
    }
    this.setsLeft = this.plan[this.idx].sets;
    if (this.entry().rest > 0) this.startRest();
    else this.startSet();
  }

  finish() {
    this.phase = 'done';
    this.rem = 0;
    this.fig.stop();
    beepDone();
    this.el.querySelector('.ex-card').innerHTML =
      `<div class="finish-box">Session complete!<small>${this.theme.label.toLowerCase()} — same time tomorrow?</small></div>`;
    this.label('done', 'All sets finished');
    this.updateClock();
  }

  tick() {
    if (this.phase === 'ready' || this.phase === 'done' || this.paused) return;
    if (this.phase === 'rest' && this.rem <= 4 && this.rem > 1) beepTick();
    this.rem -= 1;
    if (this.rem <= 0) {
      if (this.phase === 'ex') this.afterSet();
      else this.startSet();
    }
    this.updateClock();
  }

  updateClock() {
    const c = this.el.querySelector('.clock');
    const m = Math.floor(Math.max(0, this.rem) / 60);
    const s = Math.ceil(Math.max(0, this.rem) % 60);
    c.textContent = m + ':' + String(s).padStart(2, '0');
    c.classList.toggle('rest', this.phase === 'rest');
    if (this.phase === 'ready') {
      this.el.querySelector('.prog-now').textContent = 'Ready';
      this.el.querySelector('.prog-set').textContent = '';
      return;
    }
    if (this.phase === 'done') {
      this.el.querySelector('.progress > div').style.width = '100%';
      this.el.querySelector('.prog-now').textContent = 'Complete';
      this.el.querySelector('.prog-set').textContent = '';
      return;
    }
    const done = this.setsDone();
    const total = this.totalSets();
    const frac = this.phase === 'rest'
      ? done / total
      : (done - (1 - (this.rem / this.entry().setDur))) / total;
    this.el.querySelector('.progress > div').style.width = Math.min(100, frac * 100) + '%';
    this.el.querySelector('.prog-now').textContent = `Exercise ${Math.min(this.idx + 1, this.plan.length)} of ${this.plan.length}`;
    const e = this.entry();
    this.el.querySelector('.prog-set').textContent = this.phase === 'rest'
      ? `Rest ${Math.ceil(this.rem)}s`
      : `Set ${e.sets - this.setsLeft + 1} of ${e.sets}`;
  }

  act(action) {
    if (action === 'toggle') {
      if (this.phase === 'ready') {
        this.idx = 0;
        this.setsLeft = this.plan[0].sets;
        this.startSet();
        this.startTimer();
        this.el.querySelector('button[data-act="toggle"]').textContent = 'Pause';
        return;
      }
      if (this.phase === 'done') { this.App_home(); return; }
      this.paused = !this.paused;
      this.el.querySelector('button[data-act="toggle"]').textContent = this.paused ? 'Resume' : 'Pause';
      return;
    }
    if (action === 'skip') {
      if (this.phase === 'ex') this.afterSet();
      else if (this.phase === 'rest') { this.startSet(); }
      return;
    }
    if (action === 'end') App.home();
  }

  App_home() { App.home(); }

  startTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.tick(), 1000);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    this.fig && this.fig.stop();
  }
}

fetch('/api/ip')
  .then((r) => r.json())
  .then((d) => {
    const ip = d.ips[0];
    if (ip) document.getElementById('lanip').textContent = ip + ':' + d.port;
  })
  .catch(() => {});
