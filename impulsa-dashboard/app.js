/* IMPULSA · Interacción: tabs de ranking, filtros de misiones y modal de evidencias */
(function () {
  'use strict';

  function norm(str) {
    return (str || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  document.addEventListener('DOMContentLoaded', function () {
    /* ---------- TABS DE RANKING ---------- */
    var tabs = Array.prototype.slice.call(
      document.querySelectorAll('.tabs__label[role="tab"]')
    );

    function activate(tab, setFocus) {
      tabs.forEach(function (t) {
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        var selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        if (panel) {
          panel.classList.toggle('is-active', selected);
          panel.hidden = !selected;
        }
      });
      if (setFocus) tab.focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') next = tabs[0];
        if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); activate(next, true); }
      });
    });

    if (tabs.length) {
      activate(tabs.filter(function (t) {
        return t.getAttribute('aria-selected') === 'true';
      })[0] || tabs[0], false);
    }

    /* ---------- FILTROS + BÚSQUEDA DE MISIONES ---------- */
    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-filter]'));
    var missions = Array.prototype.slice.call(document.querySelectorAll('.missions .mission'));
    var search = document.getElementById('mission-search');
    var empty = document.getElementById('missions-empty');
    var count = document.getElementById('missions-count');
    var current = 'todas';

    function apply() {
      var q = norm(search && search.value);
      var visible = 0;

      missions.forEach(function (m) {
        var catEl = m.querySelector('.mission__cat');
        var cat = norm(catEl && catEl.textContent);
        var text = norm(m.textContent);
        var matchCat = current === 'todas' || cat === current;
        var matchText = !q || text.indexOf(q) !== -1;
        var show = matchCat && matchText;
        m.hidden = !show;
        m.classList.toggle('is-hidden', !show);
        if (show) visible++;
      });

      if (empty) empty.hidden = visible !== 0;
      if (count) {
        count.textContent = visible
          ? 'Mostrando ' + visible + ' de ' + missions.length + ' misiones'
          : '';
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        current = norm(chip.getAttribute('data-filter'));
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle('chip--active', on);
          c.setAttribute('aria-pressed', String(on));
        });
        apply();
      });
    });

    if (search) {
      search.addEventListener('input', apply);
      search.addEventListener('search', apply);
    }
    if (missions.length) apply();

    /* ---------- MODAL DE EVIDENCIAS ---------- */
    var modal = document.getElementById('evidence-modal');
    var form = document.getElementById('evidence-form');
    var files = document.getElementById('evidence-files');
    var filelist = document.getElementById('evidence-filelist');
    var titleEl = document.getElementById('evidence-title');
    var subEl = document.getElementById('evidence-sub');
    var badgeEl = document.getElementById('evidence-badge');
    var toast = document.getElementById('toast');
    var lastFocus = null;
    var toastTimer = null;

    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.hidden = false;
      toast.classList.add('is-visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toast.classList.remove('is-visible');
        setTimeout(function () { toast.hidden = true; }, 250);
      }, 3200);
    }

    function openModal(mission) {
      if (!modal) return;
      lastFocus = document.activeElement;
      var name = mission.querySelector('.mission__title');
      var desc = mission.querySelector('.mission__desc');
      var reward = mission.querySelector('.reward');
      var badge = mission.querySelector('.badge');
      var cat = mission.querySelector('.mission__cat');

      if (titleEl) titleEl.textContent = name ? name.textContent : 'Subir evidencias';
      if (subEl) {
        subEl.textContent =
          (cat ? cat.textContent + ' · ' : '') +
          (reward ? reward.textContent : '') +
          (desc ? ' — ' + desc.textContent : '');
      }
      if (badgeEl && badge) {
        badgeEl.textContent = badge.textContent;
        badgeEl.className = badge.className;
        badgeEl.id = 'evidence-badge';
      }

      if (form) form.reset();
      if (filelist) filelist.innerHTML = '';
      modal.hidden = false;
      document.body.classList.add('has-modal');
      var first = modal.querySelector('textarea, input, button');
      if (first) first.focus();
    }

    function closeModal() {
      if (!modal || modal.hidden) return;
      modal.hidden = true;
      document.body.classList.remove('has-modal');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    missions.forEach(function (mission) {
      Array.prototype.slice.call(mission.querySelectorAll('.btn')).forEach(function (btn) {
        if (btn.disabled) return;
        var label = norm(btn.textContent);
        if (label.indexOf('evidencia') === -1 && label.indexOf('ver mision') === -1) return;
        btn.addEventListener('click', function () { openModal(mission); });
      });
    });

    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) closeModal();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    if (files && filelist) {
      files.addEventListener('change', function () {
        filelist.innerHTML = '';
        Array.prototype.slice.call(files.files).forEach(function (f) {
          var li = document.createElement('li');
          li.className = 'filelist__item';
          li.innerHTML =
            '<span>📄 ' + f.name + '</span><b>' + Math.max(1, Math.round(f.size / 1024)) + ' KB</b>';
          filelist.appendChild(li);
        });
      });
    }

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        closeModal();
        showToast('✅ Evidencia enviada. Queda en estado “En validación”.');
      });
    }

    /* ---------- SELECTOR DE TEMPORADAS ---------- */
    var SEASONS = {
      s1: {
        period: 'Periodo 1',
        season: { value: '14.350', max: '20.000', pct: 71.7, missions: '9.100', inst: '5.250' },
        league: { value: '48.920', pct: 62, trend: '▲ +2.480' },
        rank: { num: 2, text: '2.º de 18 salones', diff: '1.240 pts', trend: '▲ Subiste 1 posición', pill: 'Estable' },
        states: { ok: 12, review: 3, off: 1 },
        seasonTable: [
          ['11°B', '15.590', '—'], ['10°A', '14.350', '-1.240'], ['9°C', '13.870', '-1.720'],
          ['10°B', '12.410', '-3.180'], ['8°A', '11.905', '-3.685'], ['11°A', '10.240', '-5.350'],
          ['9°A', '9.780', '-5.810']
        ],
        leagueTable: [
          ['9°C', '52.300', '—'], ['10°A', '48.920', '-3.380'], ['11°B', '47.150', '-5.150'],
          ['10°B', '43.880', '-8.420'], ['11°A', '40.010', '-12.290'], ['8°A', '38.460', '-13.840'],
          ['9°A', '35.720', '-16.580']
        ]
      },
      s2: {
        period: 'Periodo 2',
        season: { value: '16.980', max: '20.000', pct: 84.9, missions: '10.430', inst: '6.550' },
        league: { value: '65.900', pct: 74, trend: '▲ +3.120' },
        rank: { num: 1, text: '1.º de 18 salones', diff: '0 pts', trend: '▲ Subiste 1 posición', pill: 'En racha' },
        states: { ok: 18, review: 2, off: 1 },
        seasonTable: [
          ['10°A', '16.980', '—'], ['11°B', '16.240', '-740'], ['10°B', '14.720', '-2.260'],
          ['9°C', '14.180', '-2.800'], ['11°A', '12.860', '-4.120'], ['8°A', '12.100', '-4.880'],
          ['9°A', '10.540', '-6.440']
        ],
        leagueTable: [
          ['10°A', '65.900', '—'], ['9°C', '64.480', '-1.420'], ['11°B', '63.390', '-2.510'],
          ['10°B', '58.600', '-7.300'], ['11°A', '52.870', '-13.030'], ['8°A', '50.560', '-15.340'],
          ['9°A', '46.260', '-19.640']
        ]
      },
      s3: {
        period: 'Periodo 3',
        season: { value: '11.240', max: '20.000', pct: 56.2, missions: '7.140', inst: '4.100' },
        league: { value: '77.140', pct: 81, trend: '▼ -640' },
        rank: { num: 3, text: '3.º de 18 salones', diff: '2.310 pts', trend: '▼ Bajaste 2 posiciones', pill: 'En riesgo' },
        states: { ok: 9, review: 5, off: 2 },
        seasonTable: [
          ['11°B', '13.550', '—'], ['9°C', '12.900', '-650'], ['10°A', '11.240', '-2.310'],
          ['10°B', '10.980', '-2.570'], ['8°A', '9.860', '-3.690'], ['11°A', '9.320', '-4.230'],
          ['9°A', '8.410', '-5.140']
        ],
        leagueTable: [
          ['11°B', '78.940', '—'], ['10°A', '77.140', '-1.800'], ['9°C', '76.380', '-2.560'],
          ['10°B', '69.580', '-9.360'], ['11°A', '62.190', '-16.750'], ['8°A', '60.420', '-18.520'],
          ['9°A', '54.670', '-24.270']
        ]
      },
      s4: {
        period: 'Periodo 4',
        season: { value: '18.620', max: '20.000', pct: 93.1, missions: '11.470', inst: '7.150' },
        league: { value: '95.760', pct: 96, trend: '▲ +4.980' },
        rank: { num: 1, text: '1.º de 18 salones', diff: '0 pts', trend: '▲ Subiste 1 posición', pill: 'Líder' },
        states: { ok: 24, review: 1, off: 0 },
        seasonTable: [
          ['10°A', '18.620', '—'], ['11°B', '17.980', '-640'], ['9°C', '16.410', '-2.210'],
          ['10°B', '15.230', '-3.390'], ['11°A', '13.940', '-4.680'], ['8°A', '13.180', '-5.440'],
          ['9°A', '11.760', '-6.860']
        ],
        leagueTable: [
          ['10°A', '95.760', '—'], ['11°B', '94.920', '-840'], ['9°C', '92.790', '-2.970'],
          ['10°B', '84.810', '-10.950'], ['11°A', '76.130', '-19.630'], ['8°A', '73.600', '-22.160'],
          ['9°A', '66.430', '-29.330']
        ]
      }
    };

    var MY_ROOM = '10°A';
    var $ = function (id) { return document.getElementById(id); };

    function renderTable(tbody, rows) {
      if (!tbody) return;
      tbody.innerHTML = '';
      rows.forEach(function (r, i) {
        var pos = i + 1;
        var tr = document.createElement('tr');
        if (pos === 1) tr.className = 'is-first';
        if (r[0] === MY_ROOM) tr.className = (tr.className ? tr.className + ' ' : '') + 'is-me';
        var posClass = pos <= 3 ? 'pos pos--' + pos : 'pos';
        var name = r[0] === MY_ROOM ? r[0] + ' <span class="you">Tu salón</span>' : r[0];
        var diffClass = r[2].indexOf('-') === 0 ? ' class="neg"' : '';
        tr.innerHTML =
          '<td><span class="' + posClass + '">' + pos + '</span></td>' +
          '<td>' + name + '</td><td>' + r[1] + '</td>' +
          '<td' + diffClass + '>' + r[2] + '</td>';
        tbody.appendChild(tr);
      });
    }

    function setTrend(el, text) {
      if (!el) return;
      el.textContent = text;
      el.className = 'trend ' + (text.indexOf('▼') === 0 ? 'trend--down' : 'trend--up');
    }

    function renderSeason(key) {
      var d = SEASONS[key];
      if (!d) return;

      if ($('kpi-period')) $('kpi-period').textContent = d.period;
      if ($('season-value')) {
        $('season-value').innerHTML = d.season.value + ' <small>/ ' + d.season.max + ' pts</small>';
      }
      if ($('season-bar')) $('season-bar').style.width = d.season.pct + '%';
      if ($('season-progress')) {
        $('season-progress').setAttribute(
          'aria-label',
          String(d.season.pct).replace('.', ',') + '% del máximo de temporada'
        );
      }
      if ($('season-missions')) $('season-missions').textContent = d.season.missions;
      if ($('season-inst')) $('season-inst').textContent = d.season.inst;

      if ($('league-value')) {
        $('league-value').innerHTML = d.league.value + ' <small>pts acumulados</small>';
      }
      if ($('league-bar')) $('league-bar').style.width = d.league.pct + '%';
      setTrend($('league-trend'), d.league.trend);

      if ($('rank-num')) $('rank-num').textContent = d.rank.num;
      if ($('rank-text')) $('rank-text').textContent = d.rank.text;
      if ($('rank-diff')) $('rank-diff').textContent = d.rank.diff;
      setTrend($('rank-trend'), d.rank.trend);
      if ($('rank-pill')) $('rank-pill').textContent = d.rank.pill;

      if ($('state-ok')) $('state-ok').textContent = d.states.ok;
      if ($('state-review')) $('state-review').textContent = d.states.review;
      if ($('state-off')) $('state-off').textContent = d.states.off;

      renderTable($('season-table'), d.seasonTable);
      renderTable($('league-table'), d.leagueTable);

      if ($('footer-note')) {
        $('footer-note').textContent =
          'IMPULSA · ' + (select && select.options[select.selectedIndex]
            ? select.options[select.selectedIndex].textContent.split(' · ')[0]
            : 'Temporada') +
          ' — Los puntos institucionales son asignados por coordinación.';
      }
    }

    var select = document.getElementById('season');
    if (select) {
      select.addEventListener('change', function () {
        renderSeason(select.value);
        showToast('Mostrando datos de ' + select.options[select.selectedIndex].textContent);
      });
      renderSeason(select.value);
    }
  });
})();

