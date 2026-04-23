// Microservices Dojo - Main App Logic

const DB_KEY = 'dojo_data';

// Initialize data
function getData() {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : {
    xp: 0,
    level: 1,
    streak: 0,
    lastActive: null,
    conceptsLearned: [],
    challengesSolved: [],
    quizzesPassed: 0,
    reflections: [],
    startedAt: new Date().toISOString()
  };
}

function saveData(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

// Add XP
function addXP(amount) {
  const data = getData();
  data.xp += amount;
  
  // Level up logic
  const xpNeeded = data.level * 500;
  if (data.xp >= xpNeeded) {
    data.level++;
    data.xp -= xpNeeded;
    showToast(`Level Up! You're now Level ${data.level}!`, 'success');
  } else {
    showToast(`+${amount} XP`, 'success');
  }
  
  saveData(data);
}

// Check streak
function checkStreak() {
  const data = getData();
  const today = new Date().toDateString();
  const last = data.lastActive ? new Date(data.lastActive).toDateString() : null;
  
  if (last !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (last === yesterday.toDateString()) {
      data.streak++;
    } else if (last !== today) {
      data.streak = 1;
    }
    
    data.lastActive = new Date().toISOString();
    saveData(data);
  }
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

// Quiz Logic
function checkAnswer(btn, isCorrect, quizId) {
  const quizContainer = document.getElementById(`quiz-${quizId}`);
  const allOptions = quizContainer.querySelectorAll('.quiz-option');
  
  allOptions.forEach(opt => {
    opt.disabled = true;
    opt.style.pointerEvents = 'none';
  });
  
  if (isCorrect) {
    btn.classList.add('correct');
    addXP(25);
    hapticSuccess();
  } else {
    btn.classList.add('wrong');
    // Highlight correct answer
    allOptions.forEach(opt => {
      if (opt.onclick.toString().includes('true')) {
        opt.classList.add('correct');
      }
    });
    showToast('Not quite! Review the concept and try again.', 'error');
    hapticError();
  }
}

// Challenge Logic
function checkChallenge(btn, isCorrect, challengeId) {
  const optionsContainer = document.getElementById(`challenge-${challengeId}-options`);
  const feedbackEl = document.getElementById(`challenge-${challengeId}-feedback`);
  const allOptions = optionsContainer.querySelectorAll('.quiz-option');
  
  allOptions.forEach(opt => {
    opt.disabled = true;
    opt.style.pointerEvents = 'none';
  });
  
  feedbackEl.style.display = 'block';
  
  if (isCorrect) {
    btn.classList.add('correct');
    feedbackEl.style.background = 'var(--success-bg)';
    feedbackEl.style.color = 'var(--success)';
    feedbackEl.textContent = '✅ Correct! Great job spotting the issue.';
    addXP(50);
    hapticSuccess();
  } else {
    btn.classList.add('wrong');
    allOptions.forEach(opt => {
      if (opt.onclick.toString().includes('true')) {
        opt.classList.add('correct');
      }
    });
    feedbackEl.style.background = 'var(--error-bg)';
    feedbackEl.style.color = 'var(--error)';
    feedbackEl.textContent = '❌ Not quite. Think about service boundaries and coupling.';
    hapticError();
  }
}

// Toast Notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Haptic Feedback
function hapticSuccess() {
  if (navigator.vibrate) navigator.vibrate([10, 50, 20]);
}

function hapticError() {
  if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
}

// Export Data
function exportData() {
  const data = getData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `microservices-dojo-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Data exported!', 'success');
}

// Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

// Init
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  checkStreak();
});

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('SW registered'))
    .catch(err => console.log('SW registration failed', err));
}
