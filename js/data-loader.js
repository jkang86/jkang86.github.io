/* ============================================
   Data Loader — Gaming Analytics Hub
   Loads live/cached JSON data with sample fallback
   ============================================ */

const DataLoader = (() => {
  const STATUS = {
    LIVE: 'live',
    CACHED: 'cached',
    SAMPLE: 'sample'
  };

  async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  function getTimeSince(isoDate) {
    if (!isoDate) return '';
    const diff = Date.now() - new Date(isoDate).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  async function loadGamingData() {
    let sampleData = null;
    let lolData = null;
    const status = {
      lol: { source: STATUS.SAMPLE, lastUpdated: null }
    };

    // Always load sample data as the baseline fallback
    try {
      sampleData = await fetchJSON('data/sample-data.json');
    } catch (err) {
      console.warn('Could not load sample data:', err.message);
      sampleData = {
        lol: {
          championWinRates: { labels: ['Champion'], data: [50] },
          rankProgression: { labels: ['N/A'], data: [0] },
          roleDistribution: { labels: ['N/A'], data: [1] },
          kdaTrend: { labels: ['N/A'], data: [0] },
          mostPlayed: { labels: ['N/A'], data: [0] },
          champAvgStats: { labels: ['KDA', 'CS/min', 'Damage/min', 'Vision/min', 'Gold/min'], datasets: [] }
        },
        hexStats: [
          { label: 'Mechanics', value: 50 },
          { label: 'Game Sense', value: 50 },
          { label: 'Teamwork', value: 50 },
          { label: 'Aggression', value: 50 },
          { label: 'Economy', value: 50 },
          { label: 'Clutch', value: 50 }
        ]
      };
    }

    // Try loading live/cached LoL data
    try {
      lolData = await fetchJSON('data/lol-data.json');
      if (lolData && lolData.championWinRates) {
        status.lol.source = STATUS.CACHED;
        status.lol.lastUpdated = lolData.lastUpdated;
        status.lol.timeSince = getTimeSince(lolData.lastUpdated);
      } else {
        lolData = null;
      }
    } catch (err) {
      lolData = null;
    }

    // Merge: use live/cached data where available, fall back to sample
    const result = {
      lol: {
        championWinRates: (lolData && lolData.championWinRates) || sampleData.lol.championWinRates,
        rankProgression: (lolData && lolData.rankProgression) || sampleData.lol.rankProgression,
        roleDistribution: (lolData && lolData.roleDistribution) || sampleData.lol.roleDistribution,
        kdaTrend: (lolData && lolData.kdaTrend) || sampleData.lol.kdaTrend,
        mostPlayed: (lolData && lolData.mostPlayed) || sampleData.lol.mostPlayed,
        champAvgStats: (lolData && lolData.champAvgStats) || sampleData.lol.champAvgStats
      },
      hexStats: sampleData.hexStats,
      status
    };

    updateStatusTooltips(status);
    updateSubtitle(status);

    return result;
  }

  function updateStatusTooltips(status) {
    document.querySelectorAll('.data-status-tooltip').forEach(el => {
      const source = el.dataset.source; // 'lol'
      const info = status[source];
      if (!info) return;

      const dot = el.querySelector('.status-dot');
      const text = el.querySelector('.tooltip-text');
      if (!dot || !text) return;

      if (info.source === STATUS.CACHED) {
        dot.className = 'status-dot cached';
        text.textContent = `Cached: ${info.timeSince || 'recently'}`;
      } else if (info.source === STATUS.LIVE) {
        dot.className = 'status-dot live';
        text.textContent = 'Live Data';
      } else {
        dot.className = 'status-dot sample';
        text.textContent = 'Sample Data';
      }
    });
  }

  function updateSubtitle(status) {
    const subtitle = document.querySelector('.page-header .section-subtitle');
    if (!subtitle) return;

    if (status.lol.source !== STATUS.SAMPLE) {
      subtitle.textContent = 'Live gaming analytics dashboard powered by real match data';
    } else {
      subtitle.textContent = 'Sample dashboards demonstrating data visualization skills through gaming data';
    }
  }

  return { loadGamingData };
})();
