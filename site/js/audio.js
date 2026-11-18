(function (g) {
  'use strict';
  var el, btn, wrap, playing = false, paused = false, wasPlaying = false, bound = false;

  function icon(on) {
    var ns = 'http://www.w3.org/2000/svg', s = document.createElementNS(ns, 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('fill', 'none');
    s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '1.75');
    s.setAttribute('stroke-linecap', 'round');
    s.setAttribute('stroke-linejoin', 'round');
    s.setAttribute('class', 'icon');
    var p = document.createElementNS(ns, 'path'); p.setAttribute('d', 'M9 18V5l12-2v13');
    var c1 = document.createElementNS(ns, 'circle'); c1.setAttribute('cx', '6'); c1.setAttribute('cy', '18'); c1.setAttribute('r', '3');
    var c2 = document.createElementNS(ns, 'circle'); c2.setAttribute('cx', '18'); c2.setAttribute('cy', '16'); c2.setAttribute('r', '3');
    s.append(p, c1, c2);
    if (!on) {
      var l = document.createElementNS(ns, 'line');
      l.setAttribute('x1', '2'); l.setAttribute('y1', '2'); l.setAttribute('x2', '22'); l.setAttribute('y2', '22');
      s.append(l);
    }
    return s;
  }

  function sync() {
    if (!btn) return;
    btn.classList.toggle('is-playing', playing);
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    btn.textContent = '';
    btn.appendChild(icon(playing));
  }

  function play() {
    if (!el) return;
    var p = el.play();
    if (p && p.then) {
      p.then(function () { playing = true; paused = false; sync(); })
       .catch(function () { playing = false; sync(); });
    } else { playing = true; paused = false; sync(); }
  }

  function pause(byUser) {
    if (!el) return;
    el.pause();
    playing = false;
    if (byUser) paused = true;
    sync();
  }

  function toggle() { playing ? pause(true) : play(); }

  function onVis() {
    if (!el) return;
    if (document.hidden) { wasPlaying = playing; if (playing) pause(false); }
    else if (wasPlaying && !paused) play();
  }

  function init(cfg, enabled) {
    wrap = document.getElementById('audio-control');
    btn = document.getElementById('btn-audio-toggle');
    if (!wrap || !btn) return;
    var src = cfg && cfg.src ? String(cfg.src).trim() : '';
    if (!enabled || !src) { wrap.hidden = true; return; }
    el = new Audio();
    el.preload = 'none';
    el.loop = cfg.loop !== false;
    el.src = src;
    wrap.hidden = false;
    sync();
    btn.onclick = toggle;
    if (!bound) { document.addEventListener('visibilitychange', onVis); bound = true; }
  }

  g.WeddingAudio = { init: init, play: play, toggle: toggle };
})(window);
