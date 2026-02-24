/* ============================================
   Chart.js + D3.js Visualizations
   Gaming Analytics Hub — Dynamic Data
   ============================================ */

document.addEventListener('DOMContentLoaded', async () => {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded yet');
    return;
  }

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
  const gridColor = () => isDark() ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textColor = () => isDark() ? '#B0B0B0' : '#4a4a4a';

  // T1 color palette
  const T1 = {
    red: '#E2012D',
    redAlpha: 'rgba(226, 1, 45, 0.7)',
    gold: '#C9A84C',
    goldAlpha: 'rgba(201, 168, 76, 0.7)',
    white: '#FFFFFF',
    whiteAlpha: 'rgba(255,255,255,0.5)',
    darkRed: '#B3001F',
    lightRed: '#FF1744',
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: textColor(), font: { family: "'Rajdhani', sans-serif", size: 12 } }
      }
    },
    scales: {
      x: { ticks: { color: textColor() }, grid: { color: gridColor() } },
      y: { ticks: { color: textColor() }, grid: { color: gridColor() } }
    }
  };

  // Load data from data-loader (with fallback to sample)
  let data;
  if (typeof DataLoader !== 'undefined') {
    try {
      data = await DataLoader.loadGamingData();
    } catch (err) {
      console.warn('DataLoader failed, using inline fallback:', err.message);
    }
  }

  // Ultimate inline fallback if DataLoader is unavailable
  if (!data) {
    data = {
      lol: {
        championWinRates: { labels: ['Jinx', 'Ahri', 'Yasuo', 'Lux', 'Thresh', 'Lee Sin', 'Zed'], data: [56, 53, 48, 54, 51, 47, 49] },
        rankProgression: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'], data: [45, 62, 58, 75, 88, 72, 91, 100, 95, 110] },
        roleDistribution: { labels: ['Top', 'Jungle', 'Mid', 'ADC', 'Support'], data: [15, 20, 30, 25, 10] },
        kdaTrend: { labels: ['Match 1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'], data: [2.5, 1.8, 3.2, 2.1, 2.8, 1.5, 3.5, 2.3, 3.0, 4.0, 2.0, 2.7] },
        mostPlayed: { labels: ['Jinx', 'Ahri', 'Yasuo', 'Lux', 'Thresh', 'Lee Sin'], data: [12, 10, 8, 7, 6, 5] },
        champAvgStats: { labels: ['KDA', 'CS/min', 'Damage/min', 'Vision/min', 'Gold/min'], datasets: [
          { champion: 'Jinx', data: [3.2, 7.5, 5.8, 0.8, 4.2] },
          { champion: 'Ahri', data: [2.8, 6.2, 6.5, 1.2, 3.8] },
          { champion: 'Yasuo', data: [2.1, 8.0, 7.2, 0.5, 4.5] }
        ]}
      },
      hexStats: [
        { label: 'Mechanics', value: 78 }, { label: 'Game Sense', value: 85 },
        { label: 'Teamwork', value: 90 }, { label: 'Aggression', value: 65 },
        { label: 'Economy', value: 72 }, { label: 'Clutch', value: 80 }
      ]
    };
  }

  // Helper to generate bar colors cycling through T1 palette
  function barColors(count) {
    const palette = [T1.red, T1.gold, T1.redAlpha, T1.goldAlpha, T1.darkRed, T1.lightRed, T1.goldAlpha];
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
  }

  // ============================
  // LOL: Champion Win Rates (Bar)
  // ============================
  const lolWinCtx = document.getElementById('lolWinRateChart');
  if (lolWinCtx) {
    const d = data.lol.championWinRates;
    new Chart(lolWinCtx, {
      type: 'bar',
      data: {
        labels: d.labels,
        datasets: [{
          label: 'Win Rate %',
          data: d.data,
          backgroundColor: barColors(d.labels.length),
          borderColor: T1.gold,
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        ...commonOptions,
        plugins: { ...commonOptions.plugins, legend: { display: false } },
        scales: {
          x: { ticks: { color: textColor() }, grid: { display: false } },
          y: {
            beginAtZero: false,
            min: Math.max(0, Math.min(...d.data) - 10),
            max: Math.min(100, Math.max(...d.data) + 10),
            ticks: { color: textColor(), callback: v => v + '%' },
            grid: { color: gridColor() }
          }
        }
      }
    });
  }

  // ============================
  // LOL: Rank Progression (Line)
  // ============================
  const lolRankCtx = document.getElementById('lolRankChart');
  if (lolRankCtx) {
    const d = data.lol.rankProgression;
    new Chart(lolRankCtx, {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [{
          label: 'LP (League Points)',
          data: d.data,
          borderColor: T1.red,
          backgroundColor: 'rgba(226, 1, 45, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: T1.gold,
          pointBorderColor: T1.red,
          pointRadius: 5,
          pointHoverRadius: 7,
        }]
      },
      options: {
        ...commonOptions,
        plugins: { ...commonOptions.plugins, legend: { display: false } },
      }
    });
  }

  // ============================
  // LOL: Role Distribution (Doughnut)
  // ============================
  const lolRoleCtx = document.getElementById('lolRoleChart');
  if (lolRoleCtx) {
    const d = data.lol.roleDistribution;
    new Chart(lolRoleCtx, {
      type: 'doughnut',
      data: {
        labels: d.labels,
        datasets: [{
          data: d.data,
          backgroundColor: [T1.red, T1.gold, T1.darkRed, T1.lightRed, T1.goldAlpha],
          borderColor: isDark() ? '#1a1a1a' : '#ffffff',
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: textColor(),
              font: { family: "'Rajdhani', sans-serif", size: 12 },
              padding: 16,
              usePointStyle: true,
            }
          }
        }
      }
    });
  }

  // ============================
  // LOL: KDA Trend (Line)
  // ============================
  const lolKDACtx = document.getElementById('lolKDAChart');
  if (lolKDACtx) {
    const d = data.lol.kdaTrend;
    new Chart(lolKDACtx, {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [{
          label: 'KDA Ratio',
          data: d.data,
          borderColor: T1.gold,
          backgroundColor: 'rgba(201, 168, 76, 0.1)',
          fill: true,
          tension: 0.3,
          pointBackgroundColor: T1.red,
          pointBorderColor: T1.gold,
          pointRadius: 4,
          pointHoverRadius: 6,
        }]
      },
      options: {
        ...commonOptions,
        plugins: { ...commonOptions.plugins, legend: { display: false } },
      }
    });
  }

  // ============================
  // LOL: Champion Avg Stats (Radar)
  // ============================
  const lolStatsCtx = document.getElementById('lolChampStatsChart');
  if (lolStatsCtx) {
    const d = data.lol.champAvgStats;
    const radarColors = [
      { border: T1.red, bg: 'rgba(226, 1, 45, 0.15)' },
      { border: T1.gold, bg: 'rgba(201, 168, 76, 0.15)' },
      { border: T1.lightRed, bg: 'rgba(255, 23, 68, 0.10)' },
      { border: T1.darkRed, bg: 'rgba(179, 0, 31, 0.10)' },
      { border: T1.goldAlpha, bg: 'rgba(201, 168, 76, 0.08)' },
    ];
    const datasets = (d.datasets || []).map((ds, i) => ({
      label: ds.champion,
      data: ds.data,
      borderColor: radarColors[i % radarColors.length].border,
      backgroundColor: radarColors[i % radarColors.length].bg,
      pointBackgroundColor: radarColors[i % radarColors.length].border,
      pointRadius: 3,
    }));
    new Chart(lolStatsCtx, {
      type: 'radar',
      data: {
        labels: d.labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: textColor(),
              font: { family: "'Rajdhani', sans-serif", size: 11 },
              padding: 12,
              usePointStyle: true,
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            ticks: { color: textColor(), backdropColor: 'transparent' },
            grid: { color: gridColor() },
            pointLabels: {
              color: textColor(),
              font: { family: "'Rajdhani', sans-serif", size: 11, weight: 600 }
            }
          }
        }
      }
    });
  }

  // ============================
  // LOL: Most Played Champions (Horizontal Bar)
  // ============================
  const lolMostCtx = document.getElementById('lolMostPlayedChart');
  if (lolMostCtx) {
    const d = data.lol.mostPlayed;
    new Chart(lolMostCtx, {
      type: 'bar',
      data: {
        labels: d.labels,
        datasets: [{
          label: 'Games Played',
          data: d.data,
          backgroundColor: barColors(d.labels.length),
          borderColor: T1.gold,
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: textColor() }, grid: { color: gridColor() } },
          y: { ticks: { color: textColor() }, grid: { display: false } }
        }
      }
    });
  }

  // ============================
  // D3.js: Player Stat Hexagon
  // ============================
  const d3Container = document.getElementById('d3HexChart');
  if (d3Container && typeof d3 !== 'undefined') {
    const width = 350;
    const height = 350;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 130;

    const stats = data.hexStats || [
      { label: 'Mechanics', value: 78 }, { label: 'Game Sense', value: 85 },
      { label: 'Teamwork', value: 90 }, { label: 'Aggression', value: 65 },
      { label: 'Economy', value: 72 }, { label: 'Clutch', value: 80 },
    ];

    const angleStep = (Math.PI * 2) / stats.length;

    const svg = d3.select(d3Container)
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', 'auto')
      .style('max-width', '350px');

    // Background hexagon rings
    [0.25, 0.5, 0.75, 1].forEach(scale => {
      const points = stats.map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        return [
          centerX + radius * scale * Math.cos(angle),
          centerY + radius * scale * Math.sin(angle)
        ];
      });
      svg.append('polygon')
        .attr('points', points.map(p => p.join(',')).join(' '))
        .attr('fill', 'none')
        .attr('stroke', isDark() ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')
        .attr('stroke-width', 1);
    });

    // Axis lines
    stats.forEach((_, i) => {
      const angle = angleStep * i - Math.PI / 2;
      svg.append('line')
        .attr('x1', centerX)
        .attr('y1', centerY)
        .attr('x2', centerX + radius * Math.cos(angle))
        .attr('y2', centerY + radius * Math.sin(angle))
        .attr('stroke', isDark() ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)')
        .attr('stroke-width', 1);
    });

    // Data polygon
    const dataPoints = stats.map((s, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const r = (s.value / 100) * radius;
      return [centerX + r * Math.cos(angle), centerY + r * Math.sin(angle)];
    });

    svg.append('polygon')
      .attr('points', dataPoints.map(p => p.join(',')).join(' '))
      .attr('fill', 'rgba(226, 1, 45, 0.2)')
      .attr('stroke', T1.red)
      .attr('stroke-width', 2);

    // Data points
    dataPoints.forEach(p => {
      svg.append('circle')
        .attr('cx', p[0])
        .attr('cy', p[1])
        .attr('r', 4)
        .attr('fill', T1.gold)
        .attr('stroke', T1.red)
        .attr('stroke-width', 1.5);
    });

    // Labels
    stats.forEach((s, i) => {
      const angle = angleStep * i - Math.PI / 2;
      const labelR = radius + 24;
      const x = centerX + labelR * Math.cos(angle);
      const y = centerY + labelR * Math.sin(angle);
      svg.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', isDark() ? '#B0B0B0' : '#4a4a4a')
        .attr('font-family', "'Rajdhani', sans-serif")
        .attr('font-size', '12px')
        .attr('font-weight', '600')
        .text(`${s.label} (${s.value})`);
    });
  }
});
