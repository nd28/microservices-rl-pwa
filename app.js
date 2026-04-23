// Microservices Mastery PWA - Main App Logic
// Uses localStorage for offline data persistence

const DB_KEY = 'microservices_rl_data';

// Initialize data structure
function getData() {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : {
    episodes: {},
    reflections: [],
    currentEpisode: null,
    totalReward: 0,
    startedAt: new Date().toISOString()
  };
}

function saveData(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

// Navigation
function initNavigation() {
  const menuBtn = document.getElementById('menuBtn');
  const navDrawer = document.getElementById('navDrawer');
  const navOverlay = document.getElementById('navOverlay');
  
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navDrawer.classList.toggle('open');
      navOverlay.classList.toggle('open');
    });
  }
  
  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      navDrawer.classList.remove('open');
      navOverlay.classList.remove('open');
    });
  }
}

// Dashboard
function updateDashboard() {
  const data = getData();
  const completed = Object.values(data.episodes).filter(e => e.status === 'completed').length;
  const inProgress = Object.values(data.episodes).filter(e => e.status === 'in-progress').length;
  
  const completedEl = document.getElementById('completedCount');
  if (completedEl) completedEl.textContent = completed;
  
  const rewardEl = document.getElementById('totalReward');
  if (rewardEl) rewardEl.textContent = data.totalReward;
  
  const phaseEl = document.getElementById('currentPhase');
  if (phaseEl) {
    let phase = 1;
    if (completed >= 3) phase = 2;
    if (completed >= 8) phase = 3;
    if (completed >= 15) phase = 4;
    phaseEl.textContent = phase;
  }
  
  const explorationEl = document.getElementById('explorationRate');
  if (explorationEl) {
    let rate = '80%';
    if (completed >= 3) rate = '50%';
    if (completed >= 8) rate = '30%';
    if (completed >= 15) rate = '10%';
    explorationEl.textContent = rate;
  }
  
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  if (progressBar && progressPercent) {
    const percent = Math.round((completed / 20) * 100);
    progressBar.style.width = percent + '%';
    progressPercent.textContent = percent + '%';
  }
  
  // Current episode card
  const currentEpisodeEl = document.getElementById('currentEpisode');
  if (currentEpisodeEl) {
    if (data.currentEpisode && data.episodes[data.currentEpisode]) {
      const ep = data.episodes[data.currentEpisode];
      currentEpisodeEl.innerHTML = `
        <div class="episode-item in-progress" style="margin-bottom: 0.75rem;">
          <div class="episode-header">
            <span class="episode-number">EP ${data.currentEpisode}</span>
            <span class="episode-status status-progress">In Progress</span>
          </div>
          <div class="episode-title">${getEpisodeTitle(data.currentEpisode)}</div>
          <div class="episode-meta">Started: ${new Date(ep.date).toLocaleDateString()}</div>
        </div>
        <button class="btn btn-primary" onclick="location.href='tracker.html'">Continue Episode</button>
      `;
    }
  }
}

function getEpisodeTitle(num) {
  const titles = {
    1: 'Hello Distributed World',
    2: 'Adding Resilience',
    3: 'Communication Patterns Lab',
    4: 'The Database Split',
    5: 'Circuit Breaker & Bulkhead',
    6: 'API Gateway',
    7: 'Service Discovery',
    8: 'Observability Deep Dive',
    9: 'Docker Compose to Kubernetes',
    10: 'Config & Secrets Management',
    11: 'CI/CD Pipeline',
    12: 'Event Sourcing or CQRS',
    13: 'Saga Pattern',
    14: 'Service Mesh',
    15: 'Chaos Engineering',
    16: 'Capstone Project Start',
    17: 'Performance Optimization',
    18: 'Security Hardening',
    19: 'Operational Excellence',
    20: 'Final Review & Transfer'
  };
  return titles[num] || 'Unknown Episode';
}

// Episode List
function renderEpisodeList() {
  const data = getData();
  
  // Update status badges
  for (let i = 1; i <= 20; i++) {
    const statusEl = document.getElementById(`status-${i}`);
    const item = document.querySelector(`[data-episode="${i}"]`);
    
    if (statusEl && data.episodes[i]) {
      const ep = data.episodes[i];
      statusEl.textContent = ep.status === 'completed' ? 'Done' : 
                             ep.status === 'in-progress' ? 'Active' : 'Pending';
      statusEl.className = `episode-status status-${ep.status === 'completed' ? 'completed' : ep.status === 'in-progress' ? 'progress' : 'pending'}`;
      
      if (item) {
        item.classList.remove('completed', 'in-progress');
        if (ep.status === 'completed') item.classList.add('completed');
        if (ep.status === 'in-progress') item.classList.add('in-progress');
      }
    }
  }
  
  // Update phase progress
  updatePhaseProgress(1, 3, 'phase1Progress', 'phase1Bar');
  updatePhaseProgress(4, 8, 'phase2Progress', 'phase2Bar');
  updatePhaseProgress(9, 15, 'phase3Progress', 'phase3Bar');
  updatePhaseProgress(16, 20, 'phase4Progress', 'phase4Bar');
}

function updatePhaseProgress(start, end, labelId, barId) {
  const data = getData();
  let completed = 0;
  for (let i = start; i <= end; i++) {
    if (data.episodes[i] && data.episodes[i].status === 'completed') completed++;
  }
  const total = end - start + 1;
  const label = document.getElementById(labelId);
  const bar = document.getElementById(barId);
  
  if (label) label.textContent = `${completed}/${total}`;
  if (bar) bar.style.width = `${(completed / total) * 100}%`;
}

function showEpisodeDetail(episodeNum) {
  const data = getData();
  const ep = data.episodes[episodeNum];
  
  if (!ep || ep.status === 'pending') {
    // Start this episode
    if (!data.episodes[episodeNum]) {
      data.episodes[episodeNum] = {
        status: 'in-progress',
        date: new Date().toISOString(),
        reward: 0
      };
    } else {
      data.episodes[episodeNum].status = 'in-progress';
    }
    data.currentEpisode = episodeNum;
    saveData(data);
    
    // Redirect to tracker
    location.href = 'tracker.html';
  } else {
    // Show episode details
    alert(`${getEpisodeTitle(episodeNum)}\nStatus: ${ep.status}\nReward: ${ep.reward || 0}\n\nGo to Tracker to view full log.`);
  }
}

// Tracker
function calculateReward() {
  let total = parseInt(document.getElementById('baseReward')?.value || 50);
  
  document.querySelectorAll('#trackerForm input[type="checkbox"][data-points]').forEach(cb => {
    if (cb.checked) {
      total += parseInt(cb.dataset.points);
    }
  });
  
  const rewardDisplay = document.getElementById('totalCalculatedReward');
  if (rewardDisplay) {
    rewardDisplay.textContent = total;
    rewardDisplay.style.color = total >= 60 ? 'var(--success)' : total >= 0 ? 'var(--accent-light)' : 'var(--danger)';
  }
  
  return total;
}

function saveEpisodeLog() {
  const episodeNum = document.getElementById('episodeSelect').value;
  const date = document.getElementById('episodeDate').value;
  const status = document.getElementById('episodeStatus').value;
  const reward = calculateReward();
  const whatWorked = document.getElementById('whatWorked').value;
  const policyUpdate = document.getElementById('policyUpdate').value;
  const keyInsight = document.getElementById('keyInsight').value;
  const difficulty = document.getElementById('difficulty').value;
  
  if (!episodeNum) {
    alert('Please select an episode');
    return;
  }
  
  const data = getData();
  data.episodes[episodeNum] = {
    status,
    date: date || new Date().toISOString(),
    reward,
    whatWorked,
    policyUpdate,
    keyInsight,
    difficulty
  };
  
  // Recalculate total reward
  data.totalReward = Object.values(data.episodes).reduce((sum, ep) => sum + (ep.reward || 0), 0);
  
  if (status === 'in-progress') {
    data.currentEpisode = episodeNum;
  } else if (status === 'completed' && data.currentEpisode === episodeNum) {
    data.currentEpisode = null;
  }
  
  saveData(data);
  
  // Show success
  const btn = document.querySelector('#trackerForm button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Saved!';
  btn.style.background = 'var(--success)';
  
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 1500);
  
  renderEpisodeHistory();
}

function renderEpisodeHistory() {
  const data = getData();
  const historyEl = document.getElementById('episodeHistory');
  
  if (!historyEl) return;
  
  const episodes = Object.entries(data.episodes)
    .filter(([_, ep]) => ep.status !== 'pending')
    .sort((a, b) => new Date(b[1].date) - new Date(a[1].date));
  
  if (episodes.length === 0) {
    historyEl.innerHTML = '<p class="text-secondary text-center" style="padding: 1rem;">No episodes logged yet.</p>';
    return;
  }
  
  historyEl.innerHTML = episodes.map(([num, ep]) => `
    <div class="reflect-card" style="margin-bottom: 0.75rem;">
      <div class="episode-header" style="margin-bottom: 0.5rem;">
        <span style="font-weight: 600;">EP ${num}: ${getEpisodeTitle(num)}</span>
        <span class="episode-status status-${ep.status === 'completed' ? 'completed' : 'progress'}">
          ${ep.status === 'completed' ? 'Done' : 'Active'}
        </span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span class="text-sm text-secondary">${new Date(ep.date).toLocaleDateString()}</span>
        <span class="text-sm" style="color: ${ep.reward >= 60 ? 'var(--success)' : ep.reward >= 0 ? 'var(--accent-light)' : 'var(--danger)'};">
          Reward: ${ep.reward}
        </span>
      </div>
      ${ep.keyInsight ? `<div class="text-sm" style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid var(--border);">
        <strong>Insight:</strong> ${ep.keyInsight}
      </div>` : ''}
    </div>
  `).join('');
}

// Reflections
function saveReflection() {
  const mood = document.getElementById('moodValue').value;
  const learned = document.getElementById('learnedToday').value;
  const challenges = document.getElementById('challenges').value;
  const policyUpdate = document.getElementById('policyUpdateReflect').value;
  const tags = document.getElementById('reflectTags').value;
  
  if (!learned.trim()) {
    alert('Please share what you learned');
    return;
  }
  
  const data = getData();
  data.reflections.unshift({
    date: new Date().toISOString(),
    mood,
    learned,
    challenges,
    policyUpdate,
    tags
  });
  
  saveData(data);
  
  // Reset form
  document.getElementById('reflectForm').reset();
  document.querySelectorAll('.mood-btn').forEach(b => {
    b.style.background = '';
    b.style.borderColor = '';
  });
  document.getElementById('moodValue').value = '';
  
  renderReflections();
  
  // Show success
  const btn = document.querySelector('#reflectForm button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Saved!';
  btn.style.background = 'var(--success)';
  
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 1500);
}

function renderReflections() {
  const data = getData();
  const journalEl = document.getElementById('reflectionJournal');
  
  if (!journalEl) return;
  
  if (data.reflections.length === 0) {
    journalEl.innerHTML = '<p class="text-secondary text-center" style="padding: 1rem;">No reflections yet. Start journaling!</p>';
    return;
  }
  
  const moodClasses = {
    great: 'mood-great',
    good: 'mood-good',
    okay: 'mood-okay',
    hard: 'mood-hard'
  };
  
  const moodEmojis = {
    great: '🤩',
    good: '😊',
    okay: '😐',
    hard: '😰'
  };
  
  journalEl.innerHTML = data.reflections.slice(0, 20).map(ref => `
    <div class="reflect-card fade-in">
      <div class="reflect-date">${new Date(ref.date).toLocaleDateString()} ${new Date(ref.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      ${ref.mood ? `<span class="reflect-mood ${moodClasses[ref.mood] || 'mood-good'}">${moodEmojis[ref.mood] || ''} ${ref.mood}</span>` : ''}
      <div class="reflect-content" style="margin-top: 0.75rem;">
        <p style="margin-bottom: 0.5rem;"><strong>Learned:</strong> ${ref.learned}</p>
        ${ref.challenges ? `<p style="margin-bottom: 0.5rem; color: var(--text-secondary);"><strong>Challenge:</strong> ${ref.challenges}</p>` : ''}
        ${ref.policyUpdate ? `<p style="color: var(--accent-light);"><strong>Policy:</strong> ${ref.policyUpdate}</p>` : ''}
      </div>
      ${ref.tags ? `<div style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--text-secondary);">${ref.tags}</div>` : ''}
    </div>
  `).join('');
}

// Quick reflect from dashboard
function quickReflect() {
  location.href = 'reflect.html';
}

// Tips
function showRandomTip() {
  const tips = [
    "Start with Episode 1: Build a monolith and then split it. Experience the pain before the patterns.",
    "Negative rewards are the best teachers. Don't skip the failure scenarios!",
    "Try building the same feature with REST, Messaging, AND gRPC to truly understand trade-offs.",
    "Health checks aren't optional - they're how orchestrators know your service is alive.",
    "The database split (Episode 4) is where most tutorials skip ahead. Don't skip it!",
    "Observability is not logging. You need logs, metrics, AND traces.",
    "Circuit breakers prevent cascade failures. Experience this by intentionally breaking a dependency.",
    "Shared databases create hidden coupling. The penalty is -80 for a reason!",
    "Don't start with Kubernetes. Docker Compose teaches you the fundamentals first.",
    "Eventual consistency is a feature, not a bug. Embrace it in Episode 4."
  ];
  
  const tipEl = document.getElementById('dailyTip');
  if (tipEl) {
    const today = new Date().getDate();
    tipEl.textContent = tips[today % tips.length];
  }
}

// Export / Import
function exportData() {
  const data = getData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `microservices-rl-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  // Close drawer
  document.getElementById('navDrawer').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('open');
}

function resetData() {
  if (confirm('Are you sure? This will delete ALL your progress and reflections!')) {
    localStorage.removeItem(DB_KEY);
    location.reload();
  }
}

// Install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  const installPrompt = document.getElementById('installPrompt');
  if (installPrompt && !localStorage.getItem('install_dismissed')) {
    installPrompt.classList.add('show');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  
  const installBtn = document.getElementById('installBtn');
  const installPrompt = document.getElementById('installPrompt');
  
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          installPrompt.classList.remove('show');
        }
        deferredPrompt = null;
      }
    });
  }
  
  if (installPrompt) {
    installPrompt.addEventListener('click', (e) => {
      if (e.target === installPrompt) {
        installPrompt.classList.remove('show');
        localStorage.setItem('install_dismissed', 'true');
      }
    });
  }
});

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => console.log('SW registered'))
    .catch(err => console.log('SW registration failed', err));
}
