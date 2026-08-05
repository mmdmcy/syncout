const JOINTS = ['head', 'sL', 'eL', 'wL', 'sR', 'eR', 'wR', 'hip', 'hL', 'kL', 'aL', 'hR', 'kR', 'aR'];

const SPACE = 200;
const FLOOR = 180;

function F(a) {
  const o = {};
  JOINTS.forEach((j, i) => (o[j] = a[i]));
  return o;
}

function lerp(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

class StickFigure {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SPACE * dpr;
    canvas.height = SPACE * dpr;
    this.ctx.scale(dpr, dpr);
    this.anim = null;
    this.colors = { fig: '#f5f7fa', accent: '#ffffff', prop: '#3a4152' };
    this.started = 0;
    this.raf = 0;
  }

  play(anim, colors) {
    this.anim = anim;
    if (colors) this.colors = Object.assign(this.colors, colors);
    this.started = performance.now();
    cancelAnimationFrame(this.raf);
    const loop = () => {
      this.frame();
      this.raf = requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    cancelAnimationFrame(this.raf);
  }

  frame() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, SPACE, SPACE);
    if (!this.anim) return;
    const kf = this.anim.kf;
    const dur = this.anim.dur || 2;
    const t = ((performance.now() - this.started) / 1000) % dur;
    this.drawScene(kf, t, kf[kf.length - 1].t);
  }

  drawScene(kf, t, total) {
    const ctx = this.ctx;
    const props = this.anim.props || {};
    this.drawProps(props);
    let a = kf[0], b = kf[kf.length - 1], p = 0;
    for (let i = 0; i < kf.length - 1; i++) {
      if (t >= kf[i].t && t <= kf[i + 1].t) {
        a = kf[i]; b = kf[i + 1];
        p = (t - a.t) / (b.t - a.t);
        break;
      }
    }
    p = 0.5 - 0.5 * Math.cos(Math.PI * p);
    const pose = {};
    JOINTS.forEach((j) => (pose[j] = lerp(a.p[j], b.p[j], p)));
    this.drawFigure(pose);
  }

  drawProps(props) {
    const ctx = this.ctx;
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(8, FLOOR);
    ctx.lineTo(SPACE - 8, FLOOR);
    ctx.stroke();
    if (props.chair) {
      const c = props.chair;
      ctx.fillStyle = 'rgba(255,255,255,0.14)';
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 2;
      ctx.fillRect(c.x, c.y, c.w, c.h);
      ctx.strokeRect(c.x, c.y, c.w, c.h);
    }
    if (props.wall) {
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(props.wall.x, 30);
      ctx.lineTo(props.wall.x, FLOOR);
      ctx.stroke();
    }
    if (props.table) {
      const tb = props.table;
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(tb.x1, tb.y);
      ctx.lineTo(tb.x2, tb.y);
      ctx.stroke();
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(tb.x1 + 8, tb.y);
      ctx.lineTo(tb.x1 + 8, FLOOR);
      ctx.moveTo(tb.x2 - 8, tb.y);
      ctx.lineTo(tb.x2 - 8, FLOOR);
      ctx.stroke();
    }
  }

  drawFigure(pose) {
    const ctx = this.ctx;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const sh = pose.sL[0] + (pose.sR[0] - pose.sL[0]) / 2;
    const sv = pose.sL[1] + (pose.sR[1] - pose.sL[1]) / 2;
    ctx.strokeStyle = this.colors.fig;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(pose.hip[0], pose.hip[1]);
    ctx.lineTo(sh, sv);
    ctx.stroke();
    ctx.lineWidth = 4.5;
    for (const [j1, j2, j3] of [['sL', 'eL', 'wL'], ['sR', 'eR', 'wR'], ['hL', 'kL', 'aL'], ['hR', 'kR', 'aR']]) {
      ctx.beginPath();
      ctx.moveTo(pose[j1][0], pose[j1][1]);
      ctx.lineTo(pose[j2][0], pose[j2][1]);
      ctx.lineTo(pose[j3][0], pose[j3][1]);
      ctx.stroke();
    }
    ctx.fillStyle = this.colors.accent;
    ctx.beginPath();
    ctx.arc(pose.head[0], pose.head[1], 4.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = this.colors.accent;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(sh, sv, 3.4, 0, Math.PI * 2);
    ctx.stroke();
  }
}
