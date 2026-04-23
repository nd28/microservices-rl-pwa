// Microservices Dojo — Cozy SPA Logic

const DB_KEY = 'dojo_data_v2';

/* ============================================
   DATA
   ============================================ */
const CONCEPTS = [
  {
    id: 1,
    title: 'What Are Microservices?',
    body: 'Microservices architecture structures an application as a collection of loosely coupled, independently deployable services. Each service is responsible for a specific business capability.',
    principle: 'A microservice should be small enough that a single team can fully understand and own it.',
    diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem;">
      <div style="padding:0.75rem 2rem;background:var(--accent);color:#fff;border-radius:10px;font-weight:700;font-size:0.9375rem;">Monolith</div>
      <div style="font-size:1.5rem;color:var(--text-dim);">↓</div>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;justify-content:center;">
        <div style="padding:0.5rem 1rem;background:var(--success);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Auth</div>
        <div style="padding:0.5rem 1rem;background:var(--info);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Orders</div>
        <div style="padding:0.5rem 1rem;background:var(--warning);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Payment</div>
      </div>
    </div>`,
    quiz: {
      question: 'Which is NOT a characteristic of microservices?',
      options: [
        { text: 'Independently deployable', correct: false },
        { text: 'Owns its own database', correct: false },
        { text: 'Shares code with other services', correct: true },
        { text: 'Has a single responsibility', correct: false }
      ]
    },
    resources: [
      { title: 'Microservices — Martin Fowler', url: 'https://martinfowler.com/articles/microservices.html', type: 'article' },
      { title: 'Microservices.io Resource Guide', url: 'https://microservices.io/', type: 'article' },
      { title: 'AWS Microservices Overview', url: 'https://aws.amazon.com/microservices/', type: 'article' }
    ]
  },
  {
    id: 2,
    title: 'Database Per Service',
    body: 'Each microservice should have its own database. This ensures loose coupling — you can change one service\'s data model without affecting others.',
    principle: 'Sharing a database between services creates hidden coupling. If Service A changes a table, Service B might break.',
    diagram: `<div style="display:flex;justify-content:center;gap:1.5rem;padding:0.5rem;">
      <div style="text-align:center;">
        <div style="padding:0.5rem 1rem;background:var(--info);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;margin-bottom:0.5rem;">User Service</div>
        <div style="padding:0.75rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.8125rem;color:var(--text-dim);">Users DB</div>
      </div>
      <div style="text-align:center;">
        <div style="padding:0.5rem 1rem;background:var(--success);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;margin-bottom:0.5rem;">Order Service</div>
        <div style="padding:0.75rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.8125rem;color:var(--text-dim);">Orders DB</div>
      </div>
    </div>`,
    quiz: {
      question: 'Why should each service have its own database?',
      options: [
        { text: 'To save storage costs', correct: false },
        { text: 'To ensure services can evolve independently', correct: true },
        { text: 'To make backups easier', correct: false }
      ]
    },
    resources: [
      { title: 'Database Per Service Pattern', url: 'https://microservices.io/patterns/data/database-per-service.html', type: 'article' },
      { title: 'Polyglot Persistence', url: 'https://martinfowler.com/bliki/PolyglotPersistence.html', type: 'article' },
      { title: 'Shared Database Anti-Pattern', url: 'https://microservices.io/patterns/data/shared-database.html', type: 'article' }
    ]
  },
  {
    id: 3,
    title: 'API Gateway',
    body: 'An API Gateway is a single entry point for all clients. It handles routing, authentication, rate limiting, and response aggregation.',
    principle: 'Clients should not talk directly to individual services. The gateway shields complexity.',
    diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem;">
      <div style="padding:0.5rem 2rem;background:var(--accent);color:#fff;border-radius:10px;font-weight:700;font-size:0.9375rem;">API Gateway</div>
      <div style="display:flex;gap:0.25rem;"><div style="width:2px;height:18px;background:var(--border-glass);"></div><div style="width:2px;height:18px;background:var(--border-glass);"></div><div style="width:2px;height:18px;background:var(--border-glass);"></div></div>
      <div style="display:flex;gap:0.5rem;">
        <div style="padding:0.5rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.75rem;color:var(--text-dim);">Auth</div>
        <div style="padding:0.5rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.75rem;color:var(--text-dim);">Orders</div>
        <div style="padding:0.5rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.75rem;color:var(--text-dim);">Pay</div>
      </div>
    </div>`,
    quiz: {
      question: 'What does an API Gateway NOT do?',
      options: [
        { text: 'Route requests to services', correct: false },
        { text: 'Handle authentication', correct: false },
        { text: 'Store business data', correct: true }
      ]
    },
    resources: [
      { title: 'API Gateway Pattern', url: 'https://microservices.io/patterns/apigateway.html', type: 'article' },
      { title: 'Spring Cloud Gateway Docs', url: 'https://docs.spring.io/spring-cloud-gateway/docs/current/reference/html/', type: 'docs' },
      { title: 'Netflix Zuul Overview', url: 'https://github.com/Netflix/zuul', type: 'article' }
    ]
  },
  {
    id: 4,
    title: 'Circuit Breaker',
    body: 'When a service calls another that is failing, repeated calls can overwhelm the failing service and cascade to the whole system. A Circuit Breaker stops calls after a threshold of failures, giving the downstream service time to recover.',
    principle: 'Fail fast and protect the system. A circuit breaker has three states: closed (normal), open (blocking calls), and half-open (testing recovery).',
    diagram: `<div style="display:flex;align-items:center;justify-content:center;gap:0.75rem;padding:0.5rem;">
      <div style="padding:0.5rem 1rem;background:var(--accent);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Service A</div>
      <div style="font-size:1.25rem;">→</div>
      <div style="padding:0.5rem 1rem;background:var(--error);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">OPEN</div>
      <div style="font-size:1.25rem;">✕</div>
      <div style="padding:0.5rem 1rem;background:var(--warning);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Service B</div>
    </div>`,
    quiz: {
      question: 'What is the main purpose of a Circuit Breaker?',
      options: [
        { text: 'Encrypt traffic between services', correct: false },
        { text: 'Prevent cascading failures by stopping calls to unhealthy services', correct: true },
        { text: 'Load balance requests across instances', correct: false }
      ]
    },
    resources: [
      { title: 'Circuit Breaker Pattern', url: 'https://microservices.io/patterns/reliability/circuit-breaker.html', type: 'article' },
      { title: 'Release It! — Michael Nygard', url: 'https://pragprog.com/titles/mnee2/release-it-second-edition/', type: 'book' },
      { title: 'Resilience4j Library', url: 'https://resilience4j.readme.io/', type: 'docs' }
    ]
  },
  {
    id: 5,
    title: 'Service Discovery',
    body: 'In dynamic environments, service instances come and go. Service Discovery allows services to find each other without hard-coding addresses. A registry keeps track of healthy instances.',
    principle: 'Services should not know where other services live. They ask the registry, and the registry tells them.',
    diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;padding:0.5rem;">
      <div style="padding:0.5rem 1.5rem;background:var(--accent);color:#fff;border-radius:8px;font-weight:700;font-size:0.875rem;">Service Registry</div>
      <div style="display:flex;gap:1rem;margin-top:0.25rem;">
        <div style="padding:0.5rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.75rem;color:var(--text-dim);">Order</div>
        <div style="padding:0.5rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.75rem;color:var(--text-dim);">Payment</div>
        <div style="padding:0.5rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.75rem;color:var(--text-dim);">Inventory</div>
      </div>
    </div>`,
    quiz: {
      question: 'Why is Service Discovery needed?',
      options: [
        { text: 'To encrypt service-to-service communication', correct: false },
        { text: 'To track which service instances are healthy and available', correct: true },
        { text: 'To store service configuration', correct: false }
      ]
    },
    resources: [
      { title: 'Service Discovery Pattern', url: 'https://microservices.io/patterns/server-side-discovery.html', type: 'article' },
      { title: 'Consul by HashiCorp', url: 'https://www.consul.io/', type: 'tool' },
      { title: 'Eureka — Netflix', url: 'https://github.com/Netflix/eureka', type: 'tool' }
    ]
  },
  {
    id: 6,
    title: 'Observability',
    body: 'You cannot fix what you cannot see. Observability means logs, metrics, and traces that let you understand the internal state of distributed systems from their external outputs.',
    principle: 'The three pillars: logs (what happened), metrics (how much), traces (where it went).',
    diagram: `<div style="display:flex;justify-content:center;gap:0.5rem;padding:0.5rem;">
      <div style="text-align:center;padding:0.75rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:10px;min-width:70px;">
        <div style="font-size:1.25rem;margin-bottom:0.25rem;">📝</div>
        <div style="font-size:0.6875rem;font-weight:700;color:var(--text-dim);">Logs</div>
      </div>
      <div style="text-align:center;padding:0.75rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:10px;min-width:70px;">
        <div style="font-size:1.25rem;margin-bottom:0.25rem;">📊</div>
        <div style="font-size:0.6875rem;font-weight:700;color:var(--text-dim);">Metrics</div>
      </div>
      <div style="text-align:center;padding:0.75rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:10px;min-width:70px;">
        <div style="font-size:1.25rem;margin-bottom:0.25rem;">🔍</div>
        <div style="font-size:0.6875rem;font-weight:700;color:var(--text-dim);">Traces</div>
      </div>
    </div>`,
    quiz: {
      question: 'Which of these is NOT a pillar of observability?',
      options: [
        { text: 'Logs', correct: false },
        { text: 'Metrics', correct: false },
        { text: 'Encryption', correct: true }
      ]
    },
    resources: [
      { title: 'Distributed Tracing', url: 'https://opentelemetry.io/', type: 'docs' },
      { title: 'The Three Pillars', url: 'https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/', type: 'book' },
      { title: 'Prometheus Metrics', url: 'https://prometheus.io/', type: 'tool' }
    ]
  },
  {
    id: 7,
    title: 'Containers',
    body: 'Containers package an application with everything it needs to run — code, runtime, libraries, and settings. This makes deployments consistent across environments.',
    principle: 'It works on my machine is not acceptable. Containers ensure it works everywhere.',
    diagram: `<div style="display:flex;justify-content:center;gap:0.5rem;padding:0.5rem;">
      <div style="padding:0.5rem 1rem;background:var(--info);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">App</div>
      <div style="padding:0.5rem 1rem;background:var(--success);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Runtime</div>
      <div style="padding:0.5rem 1rem;background:var(--warning);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Libs</div>
    </div>`,
    quiz: {
      question: 'What is the main benefit of containers?',
      options: [
        { text: 'Faster CPU performance', correct: false },
        { text: 'Consistent environment across dev, test, and production', correct: true },
        { text: 'Automatic code generation', correct: false }
      ]
    },
    resources: [
      { title: 'Docker Overview', url: 'https://docs.docker.com/get-started/overview/', type: 'docs' },
      { title: 'Containers vs VMs', url: 'https://www.docker.com/resources/what-container/', type: 'article' },
      { title: 'OCI Specifications', url: 'https://opencontainers.org/', type: 'docs' }
    ]
  },
  {
    id: 8,
    title: 'Kubernetes',
    body: 'Kubernetes automates the deployment, scaling, and management of containerized applications. It handles scheduling, self-healing, and rolling updates.',
    principle: 'Let the platform handle the infrastructure. You focus on the application.',
    diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;padding:0.5rem;">
      <div style="padding:0.5rem 1.5rem;background:var(--accent);color:#fff;border-radius:8px;font-weight:700;font-size:0.875rem;">Kubernetes</div>
      <div style="display:flex;gap:0.5rem;">
        <div style="padding:0.5rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.75rem;color:var(--text-dim);">Pod</div>
        <div style="padding:0.5rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.75rem;color:var(--text-dim);">Pod</div>
        <div style="padding:0.5rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.75rem;color:var(--text-dim);">Pod</div>
      </div>
    </div>`,
    quiz: {
      question: 'What does Kubernetes NOT do?',
      options: [
        { text: 'Scale applications up and down', correct: false },
        { text: 'Replace failed containers automatically', correct: false },
        { text: 'Write your application code', correct: true }
      ]
    },
    resources: [
      { title: 'Kubernetes Docs', url: 'https://kubernetes.io/docs/home/', type: 'docs' },
      { title: 'K8s Patterns', url: 'https://k8spatterns.io/', type: 'book' },
      { title: 'Minikube for Local Dev', url: 'https://minikube.sigs.k8s.io/', type: 'tool' }
    ]
  },
  {
    id: 9,
    title: 'CI/CD',
    body: 'Continuous Integration and Continuous Delivery automate building, testing, and deploying code. Every change is automatically validated and can be released with confidence.',
    principle: 'Manual deployments are risky. Automate everything that can be automated.',
    diagram: `<div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.5rem;">
      <div style="padding:0.5rem 0.75rem;background:var(--info);color:#fff;border-radius:8px;font-size:0.75rem;font-weight:700;">Code</div>
      <div style="font-size:1rem;">→</div>
      <div style="padding:0.5rem 0.75rem;background:var(--success);color:#fff;border-radius:8px;font-size:0.75rem;font-weight:700;">Build</div>
      <div style="font-size:1rem;">→</div>
      <div style="padding:0.5rem 0.75rem;background:var(--warning);color:#fff;border-radius:8px;font-size:0.75rem;font-weight:700;">Test</div>
      <div style="font-size:1rem;">→</div>
      <div style="padding:0.5rem 0.75rem;background:var(--accent);color:#fff;border-radius:8px;font-size:0.75rem;font-weight:700;">Deploy</div>
    </div>`,
    quiz: {
      question: 'What is the main goal of CI/CD?',
      options: [
        { text: 'Reduce the need for code reviews', correct: false },
        { text: 'Automate building, testing, and deploying so releases are safe and fast', correct: true },
        { text: 'Write tests instead of developers', correct: false }
      ]
    },
    resources: [
      { title: 'GitHub Actions', url: 'https://docs.github.com/en/actions', type: 'docs' },
      { title: 'Continuous Delivery Book', url: 'https://martinfowler.com/books/continuousDelivery.html', type: 'book' },
      { title: 'Argo CD', url: 'https://argo-cd.readthedocs.io/', type: 'tool' }
    ]
  }
];

const CHALLENGES = [
  {
    id: 1,
    title: 'The Shared Database Trap',
    difficulty: 'easy',
    story: 'Two services need user data. One reads from the other\'s table directly. What\'s wrong?',
    code: `// User Service
const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);

// Order Service  
const order = await db.query(\`
  SELECT o.*, u.name, u.email 
  FROM orders o
  JOIN users u ON o.user_id = u.id
\`);`,
    options: [
      { text: 'The query is too slow', correct: false },
      { text: 'Order Service directly queries User\'s table', correct: true },
      { text: 'Missing error handling', correct: false }
    ],
    feedback: {
      correct: 'Correct. Services should own their data. Use APIs, not direct queries.',
      wrong: 'Think about service boundaries. Direct table access breaks loose coupling.'
    }
  },
  {
    id: 2,
    title: 'Missing Resilience',
    difficulty: 'medium',
    story: 'This service calls two others. If one is slow, everything breaks. What should be added?',
    code: `async function getUserProfile(userId) {
  const user = await fetch(\`http://user-service/users/\${userId}\`);
  const orders = await fetch(\`http://order-service/orders/\${userId}\`);
  return { user, orders };
}`,
    options: [
      { text: 'Add authentication headers', correct: false },
      { text: 'Add timeout, retry, and circuit breaker', correct: true },
      { text: 'Use a faster server', correct: false }
    ],
    feedback: {
      correct: 'Exactly. Timeouts, retries, and circuit breakers protect your system from cascading failures.',
      wrong: 'Speed isn\'t the root issue. What happens when a dependency fails?'
    }
  },
  {
    id: 3,
    title: 'Synchronous Chain',
    difficulty: 'hard',
    story: 'A request travels through 5 services one after another. What\'s the risk?',
    code: `// API Gateway → User Service → 
//   Order Service → Inventory Service → 
//     Payment Service → Notification Service`,
    options: [
      { text: 'It\'s fine, just add caching', correct: false },
      { text: 'Cascading failure risk - use async events', correct: true },
      { text: 'Merge all services into one', correct: false }
    ],
    feedback: {
      correct: 'Right. Long synchronous chains multiply latency and failure risk. Events decouple them.',
      wrong: 'Think about what happens if the Inventory Service goes down mid-request.'
    }
  },
  {
    id: 4,
    title: 'Tight Coupling via DTO',
    difficulty: 'easy',
    story: 'Service B imports a class from Service A and uses it directly. What problem does this create?',
    code: `// In Service B
import { UserDTO } from '@service-a/shared-dtos';

function processOrder(order) {
  const user = new UserDTO(order.userData);
  // ...
}`,
    options: [
      { text: 'It violates service boundaries and creates tight coupling', correct: true },
      { text: 'It makes the code run slower', correct: false },
      { text: 'It improves type safety across services', correct: false }
    ],
    feedback: {
      correct: 'Correct. Sharing code/DTOs between services couples them together. Use your own models.',
      wrong: 'Think about what happens when Service A changes that DTO class.'
    }
  },
  {
    id: 5,
    title: 'No Health Checks',
    difficulty: 'medium',
    story: 'A load balancer sends traffic to a service instance that cannot connect to its database. What is missing?',
    code: `app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});`,
    options: [
      { text: 'A real health endpoint that checks critical dependencies', correct: true },
      { text: 'More logging', correct: false },
      { text: 'A bigger load balancer', correct: false }
    ],
    feedback: {
      correct: 'Right. A proper /health endpoint should verify the database, not just return "ok".',
      wrong: 'The root status says "ok" even when the service is actually broken. What should it check?'
    }
  },
  {
    id: 6,
    title: 'Config in Code',
    difficulty: 'medium',
    story: 'Database credentials are hard-coded in the source code. What principle does this violate?',
    code: `const dbConfig = {
  host: 'prod-db.internal',
  user: 'admin',
  password: 'secret123'
};`,
    options: [
      { text: 'Externalized configuration — config should come from environment, not code', correct: true },
      { text: 'Nothing, this is a common and safe practice', correct: false },
      { text: 'The service is using the wrong database driver', correct: false }
    ],
    feedback: {
      correct: 'Exactly. Configuration should be externalized so the same artifact runs in any environment.',
      wrong: 'Think about deploying the same code to dev, staging, and production with different settings.'
    }
  }
];

const SKILL_NODES = [
  { id: 1, name: 'Containers', icon: '📦' },
  { id: 2, name: 'REST APIs', icon: '🔗' },
  { id: 3, name: 'Data', icon: '🗄️' },
  { id: 4, name: 'Resilience', icon: '🛡️' },
  { id: 5, name: 'Gateway', icon: '🚪' },
  { id: 6, name: 'Discovery', icon: '🔍' },
  { id: 7, name: 'Observability', icon: '📊' },
  { id: 8, name: 'K8s', icon: '☸️' },
  { id: 9, name: 'CI/CD', icon: '🚀' }
];

const BADGES = [
  { id: 'first', name: 'First Step', icon: '🌱' },
  { id: 'streak3', name: '3-Day Streak', icon: '🍃' },
  { id: 'quiz', name: 'Quiz Master', icon: '🎯' },
  { id: 'bug', name: 'Bug Hunter', icon: '🐛' },
  { id: 'architect', name: 'Architect', icon: '🏗️' },
  { id: 'speed', name: 'Speed Demon', icon: '⚡' },
  { id: 'scholar', name: 'Scholar', icon: '📚' },
  { id: 'master', name: 'Grand Master', icon: '🏆' }
];

const REFLECTION_PROMPTS = [
  'I learned...',
  "I'm stuck on...",
  'I want to try...'
];

/* ============================================
   STATE
   ============================================ */
let modalStack = [];
let currentConceptId = null;
let currentChallengeId = null;
let currentMood = null;
let currentPromptIndex = null;
let quizAnsweredCorrectly = false;

function getData() {
  const raw = localStorage.getItem(DB_KEY);
  const defaults = {
    theme: 'auto',
    soundEnabled: false,
    xp: 0,
    level: 1,
    streak: 0,
    lastActive: null,
    conceptsCompleted: [],
    challengesCompleted: [],
    bookmarks: [],
    lastReviewed: {},
    reflections: [],
    draftReflection: null,
    startedAt: new Date().toISOString()
  };
  if (!raw) return defaults;
  const data = JSON.parse(raw);
  // merge new fields for upgrades
  return { ...defaults, ...data };
}

function saveData(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

/* ============================================
   THEME
   ============================================ */
function applyTheme(mode) {
  if (mode === 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(prefersDark ? 'dark' : 'light');
  } else {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(mode);
  }
}

function initTheme() {
  const data = getData();
  applyTheme(data.theme);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getData().theme === 'auto') applyTheme('auto');
  });
}

function toggleTheme() {
  const data = getData();
  const modes = ['auto', 'light', 'dark'];
  const idx = modes.indexOf(data.theme);
  data.theme = modes[(idx + 1) % modes.length];
  saveData(data);
  applyTheme(data.theme);
  renderProfile();
}

/* ============================================
    SOUND
    ============================================ */
function playSound(type) {
  const data = getData();
  if (!data.soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'error') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }
    setTimeout(() => ctx.close(), 500);
  } catch (e) { /* ignore */ }
}

function toggleSound() {
  const data = getData();
  data.soundEnabled = !data.soundEnabled;
  saveData(data);
  renderProfile();
  if (data.soundEnabled) playSound('success');
}

/* ============================================
    GREETING
    ============================================ */
function updateGreeting() {
  const hour = new Date().getHours();
  let text = 'Good evening';
  if (hour >= 5 && hour < 12) text = 'Good morning';
  else if (hour >= 12 && hour < 17) text = 'Good afternoon';
  else if (hour >= 17 && hour < 21) text = 'Good evening';
  else text = 'Good night';
  document.getElementById('greeting').textContent = text;
}

/* ============================================
   ROUTER
   ============================================ */
function showSection(name) {
  closeModal();
  document.querySelectorAll('.app-main').forEach(el => el.classList.remove('active'));
  document.getElementById(name + 'Section').classList.add('active');
  document.querySelectorAll('.dock-item').forEach(el => {
    el.classList.toggle('active', el.dataset.section === name);
  });
}

function initDock() {
  document.querySelectorAll('.dock-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      if (section === 'profile') {
        renderProfile();
        openModal('profileModal');
      } else {
        showSection(section);
      }
    });
  });
}

/* ============================================
   MODALS
   ============================================ */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  const overlay = document.getElementById('modalOverlay');
  if (modalStack.length === 0) overlay.classList.add('open');
  modal.classList.add('open');
  modalStack.push(id);
}

function closeModal() {
  if (modalStack.length === 0) return;
  const id = modalStack.pop();
  const modal = document.getElementById(id);

  if (id === 'reflectionModal') {
    const text = document.getElementById('reflectionText').value.trim();
    if (text || currentMood || currentPromptIndex !== null) {
      const data = getData();
      data.draftReflection = { text, mood: currentMood, promptIndex: currentPromptIndex };
      saveData(data);
    }
  }

  modal.classList.remove('open');
  if (modalStack.length === 0) {
    document.getElementById('modalOverlay').classList.remove('open');
  }
}

function initModals() {
  document.getElementById('modalOverlay').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  document.querySelectorAll('.modal').forEach(modal => {
    let startY = 0;
    modal.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    }, { passive: true });
    modal.addEventListener('touchend', (e) => {
      const endY = e.changedTouches[0].clientY;
      if (endY - startY > 80 && modal.scrollTop <= 5) {
        closeModal();
      }
    }, { passive: true });
  });
}

/* ============================================
   CELEBRATION
   ============================================ */
function triggerCelebration() {
  const layer = document.getElementById('celebrationLayer');
  layer.classList.remove('active');
  void layer.offsetWidth; // reflow
  layer.classList.add('active');
  setTimeout(() => layer.classList.remove('active'), 1500);
}

/* ============================================
   HOME
   ============================================ */
function pickMission(type, id) {
  if (type === 'learn') {
    showSection('learn');
    const firstIncomplete = CONCEPTS.find(c => !getData().conceptsCompleted.includes(c.id));
    if (firstIncomplete) setTimeout(() => openConcept(firstIncomplete.id), 220);
  } else if (type === 'play') {
    showSection('play');
    const firstIncomplete = CHALLENGES.find(c => !getData().challengesCompleted.includes(c.id));
    if (firstIncomplete) setTimeout(() => openChallenge(firstIncomplete.id), 220);
  } else if (type === 'review') {
    renderProfile();
    openModal('profileModal');
    setTimeout(() => openReflection(), 280);
  } else if (type === 'concept' && id) {
    showSection('learn');
    setTimeout(() => openConcept(id), 220);
  }
}

function getReviewConcept() {
  const data = getData();
  const completed = CONCEPTS.filter(c => data.conceptsCompleted.includes(c.id));
  if (completed.length < 2) return null;
  // pick one not reviewed today
  const today = new Date().toDateString();
  const candidates = completed.filter(c => {
    const last = data.lastReviewed[c.id];
    return !last || new Date(last).toDateString() !== today;
  });
  if (candidates.length === 0) {
    // all reviewed today, pick random completed
    return completed[Math.floor(Math.random() * completed.length)];
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function renderHome() {
  const data = getData();
  const needed = data.level * 500;
  const totalXp = (data.level - 1) * 500 + data.xp;
  const pct = Math.min((data.xp / needed) * 100, 100);
  document.getElementById('homeLevel').textContent = 'Level ' + data.level;
  document.getElementById('homeXpFill').style.width = pct + '%';
  document.getElementById('homeXpText').textContent = totalXp + ' XP';
  const streakEl = document.getElementById('homeStreak');
  if (streakEl) streakEl.textContent = data.streak > 0 ? `🔥 ${data.streak} day${data.streak === 1 ? '' : 's'}` : '';

  // Missions
  const review = getReviewConcept();
  const missionsEl = document.getElementById('homeMissions');
  if (missionsEl) {
    missionsEl.innerHTML = '';
    if (review) {
      missionsEl.innerHTML += `
        <button class="mission-card" onclick="pickMission('concept', ${review.id})">
          <div class="mission-icon">🔄</div>
          <div class="mission-info">
            <div class="mission-title">Review: ${review.title}</div>
            <div class="mission-meta">5 min · Spaced Repetition</div>
          </div>
        </button>`;
    }
    missionsEl.innerHTML += `
      <button class="mission-card" onclick="pickMission('learn')">
        <div class="mission-icon">🎓</div>
        <div class="mission-info">
          <div class="mission-title">Learn: ${getNextConceptName()}</div>
          <div class="mission-meta">15 min · Concept</div>
        </div>
      </button>
      <button class="mission-card" onclick="pickMission('play')">
        <div class="mission-icon">🎮</div>
        <div class="mission-info">
          <div class="mission-title">Play: Spot the Anti-Pattern</div>
          <div class="mission-meta">10 min · Challenge</div>
        </div>
      </button>
      <button class="mission-card" onclick="pickMission('review')">
        <div class="mission-icon">🌿</div>
        <div class="mission-info">
          <div class="mission-title">Reflect: Journal Entry</div>
          <div class="mission-meta">5 min · Mindful</div>
        </div>
      </button>`;
  }
}

function getNextConceptName() {
  const data = getData();
  const next = CONCEPTS.find(c => !data.conceptsCompleted.includes(c.id));
  return next ? next.title : 'All concepts done';
}

/* ============================================
   LEARN — SKILL PATH (ALL UNLOCKED)
   ============================================ */
function renderSkillPath() {
  const data = getData();
  const container = document.getElementById('skillPath');
  container.innerHTML = '';

  SKILL_NODES.forEach((node, index) => {
    const conceptId = index + 1;
    const hasConcept = conceptId <= CONCEPTS.length;
    const isDone = hasConcept && data.conceptsCompleted.includes(conceptId);

    const btn = document.createElement('button');
    btn.className = `skill-node ${isDone ? 'node-done' : ''} ${!isDone && hasConcept ? 'node-current' : ''}`;
    btn.innerHTML = `
      <div class="node-circle">${isDone ? '✓' : node.icon}</div>
      <div class="node-name">${node.name}</div>
    `;
    if (hasConcept) {
      btn.addEventListener('click', () => openConcept(conceptId));
    } else {
      btn.disabled = true;
    }
    container.appendChild(btn);

    if (index < SKILL_NODES.length - 1) {
      const conn = document.createElement('div');
      conn.className = `connector ${isDone ? 'done' : ''}`;
      container.appendChild(conn);
    }
  });
}

/* ============================================
   CONCEPT MODAL
   ============================================ */
function openConcept(id) {
  const concept = CONCEPTS.find(c => c.id === id);
  if (!concept) return;
  currentConceptId = id;
  const data = getData();
  const isDone = data.conceptsCompleted.includes(id);
  const isBookmarked = data.bookmarks.includes(id);
  const doneBadge = isDone ? `<div style="display:inline-flex;align-items:center;gap:0.375rem;background:var(--success-bg);color:var(--success);padding:0.375rem 0.875rem;border-radius:100px;font-size:0.8125rem;font-weight:700;margin-bottom:0.75rem;"><span>✓</span> Completed</div>` : '';

  document.getElementById('conceptBody').innerHTML = `
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;">
      <div>${doneBadge}<div class="concept-number">${id}</div><h3 class="concept-title" style="margin-bottom:0;">${concept.title}</h3></div>
      <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark(${id})" aria-label="Bookmark">${isBookmarked ? '★' : '☆'}</button>
    </div>
    <p class="cozy-text">${concept.body}</p>
    <div class="diagram-box">${concept.diagram}</div>
    <p class="cozy-text" style="font-size:0.9375rem;"><strong>Principle:</strong> ${concept.principle}</p>
  `;
  document.getElementById('conceptFooter').innerHTML = `
    <button class="btn btn-primary" onclick="openQuiz(${id})">Quiz Me</button>
    <button class="btn btn-secondary" onclick="openResources(${id})">Resources</button>
    <button class="btn btn-secondary" onclick="closeModal()">Dismiss</button>
  `;
  openModal('conceptModal');
}

function toggleBookmark(id) {
  const data = getData();
  const idx = data.bookmarks.indexOf(id);
  if (idx >= 0) {
    data.bookmarks.splice(idx, 1);
  } else {
    data.bookmarks.push(id);
  }
  saveData(data);
  openConcept(id);
  renderProfile();
}

/* ============================================
   QUIZ MODAL (SEPARATE)
   ============================================ */
function openQuiz(id) {
  const concept = CONCEPTS.find(c => c.id === id);
  if (!concept) return;
  quizAnsweredCorrectly = false;

  document.getElementById('quizBody').innerHTML = `
    <div class="concept-number">${id}</div>
    <h3 class="concept-title">${concept.title}</h3>
    <div class="quiz-question">${concept.quiz.question}</div>
    <div class="quiz-options">
      ${concept.quiz.options.map((opt, i) => `
        <button class="quiz-option" data-correct="${opt.correct}" onclick="checkAnswer(this, ${opt.correct}, ${id})">${opt.text}</button>
      `).join('')}
    </div>
    <div id="quizFeedback" style="margin-top:0.75rem;font-weight:700;font-size:0.9375rem;"></div>
  `;
  document.getElementById('quizFooter').innerHTML = `
    <button class="btn btn-secondary" onclick="closeModal()">Dismiss</button>
  `;
  openModal('quizModal');
}

function checkAnswer(btn, isCorrect, conceptId) {
  const options = btn.parentElement.querySelectorAll('.quiz-option');
  options.forEach(opt => { opt.disabled = true; opt.style.pointerEvents = 'none'; });
  const feedback = document.getElementById('quizFeedback');

  if (isCorrect) {
    btn.classList.add('correct');
    feedback.style.color = 'var(--success)';
    feedback.textContent = '✓ That is correct.';
    quizAnsweredCorrectly = true;
    triggerCelebration();
    addXP(25);
    hapticSuccess();
    const data = getData();
    if (!data.conceptsCompleted.includes(conceptId)) {
      data.conceptsCompleted.push(conceptId);
      saveData(data);
      renderSkillPath();
      renderProfile();
      renderHome();
    }
    const nextConcept = CONCEPTS.find(c => c.id > conceptId);
    const nextBtn = nextConcept ? `<button class="btn btn-primary" onclick="closeModal();setTimeout(()=>openConcept(${nextConcept.id}),180)">Next Concept →</button>` : '';
    document.getElementById('quizFooter').innerHTML = `
      ${nextBtn}
      <button class="btn btn-secondary" onclick="closeModal()">Done</button>
    `;
  } else {
    btn.classList.add('wrong');
    const correctOpt = Array.from(options).find(opt => opt.dataset.correct === 'true');
    if (correctOpt) correctOpt.classList.add('correct');
    feedback.style.color = 'var(--error)';
    feedback.textContent = 'Not quite. That is okay.';
    hapticError();
    document.getElementById('quizFooter').innerHTML = `
      <button class="btn btn-secondary" onclick="closeModal()">Dismiss</button>
    `;
  }
}

/* ============================================
   RESOURCES MODAL
   ============================================ */
function openResources(id) {
  const concept = CONCEPTS.find(c => c.id === id);
  if (!concept || !concept.resources) return;

  document.getElementById('resourcesBody').innerHTML = `
    <h3 class="modal-title" style="margin-bottom:1rem">${concept.title}</h3>
    <div class="resource-list">
      ${concept.resources.map(r => `
        <a class="resource-item" href="${r.url}" target="_blank" rel="noopener noreferrer">
          <div class="resource-icon">${getResourceIcon(r.type)}</div>
          <div class="resource-info">
            <div class="resource-title">${r.title}</div>
            <div class="resource-type">${r.type}</div>
          </div>
          <div class="resource-arrow">→</div>
        </a>
      `).join('')}
    </div>
  `;
  openModal('resourcesModal');
}

function getResourceIcon(type) {
  const map = { article: '📄', video: '🎬', docs: '📖', book: '📚', podcast: '🎧', tool: '🛠️' };
  return map[type] || '🔗';
}

/* ============================================
   PLAY — CHALLENGES
   ============================================ */
function renderChallenges() {
  const data = getData();
  const container = document.getElementById('challengeList');
  container.innerHTML = '';
  CHALLENGES.forEach(ch => {
    const isDone = data.challengesCompleted.includes(ch.id);
    const card = document.createElement('button');
    card.className = 'challenge-card';
    const diffEmoji = ch.difficulty === 'easy' ? '🌱' : ch.difficulty === 'medium' ? '🍃' : '🌿';
    card.innerHTML = `
      <div class="challenge-difficulty difficulty-${ch.difficulty}">
        <span>${diffEmoji}</span>
        <span>${ch.difficulty}</span>
      </div>
      <div class="challenge-title">${ch.title}</div>
      <div class="challenge-desc">${ch.story}</div>
      ${isDone ? '<div style="color:var(--success);font-weight:700;font-size:0.875rem;margin-top:0.5rem;">Completed</div>' : ''}
    `;
    card.addEventListener('click', () => openChallenge(ch.id));
    container.appendChild(card);
  });
}

function openChallenge(id) {
  const ch = CHALLENGES.find(c => c.id === id);
  if (!ch) return;
  currentChallengeId = id;

  const diffEmoji = ch.difficulty === 'easy' ? '🌱' : ch.difficulty === 'medium' ? '🍃' : '🌿';
  document.getElementById('challengeBody').innerHTML = `
    <div class="challenge-difficulty difficulty-${ch.difficulty}">
      <span>${diffEmoji}</span>
      <span>${ch.difficulty}</span>
    </div>
    <h3 class="challenge-title">${ch.title}</h3>
    <p class="cozy-text">${ch.story}</p>
    <button class="code-toggle" id="codeToggle" onclick="toggleCode()">Show Code</button>
    <pre class="code-block" id="codeBlock"><code>${escapeHtml(ch.code)}</code></pre>
    <div class="quiz-options" id="challengeOptions">
      ${ch.options.map(opt => `
        <button class="quiz-option" data-correct="${opt.correct}" onclick="checkChallenge(this, ${opt.correct}, ${id})">${opt.text}</button>
      `).join('')}
    </div>
    <div id="challengeFeedback" style="margin-top:0.75rem;font-weight:700;font-size:0.9375rem;"></div>
  `;
  openModal('challengeModal');
}

function toggleCode() {
  const block = document.getElementById('codeBlock');
  const btn = document.getElementById('codeToggle');
  block.classList.toggle('visible');
  btn.textContent = block.classList.contains('visible') ? 'Hide Code' : 'Show Code';
}

function checkChallenge(btn, isCorrect, challengeId) {
  const options = document.getElementById('challengeOptions').querySelectorAll('.quiz-option');
  options.forEach(opt => { opt.disabled = true; opt.style.pointerEvents = 'none'; });
  const feedback = document.getElementById('challengeFeedback');
  const ch = CHALLENGES.find(c => c.id === challengeId);

  if (isCorrect) {
    btn.classList.add('correct');
    feedback.style.color = 'var(--success)';
    feedback.textContent = '✓ ' + ch.feedback.correct;
    triggerCelebration();
    addXP(50);
    hapticSuccess();
    const data = getData();
    if (!data.challengesCompleted.includes(challengeId)) {
      data.challengesCompleted.push(challengeId);
      saveData(data);
      renderChallenges();
      renderProfile();
      renderHome();
    }
    document.getElementById('challengeFooter').innerHTML = `
      <button class="btn btn-primary" onclick="closeModal()">Done</button>
    `;
  } else {
    btn.classList.add('wrong');
    const correctOpt = Array.from(options).find(opt => opt.dataset.correct === 'true');
    if (correctOpt) correctOpt.classList.add('correct');
    feedback.style.color = 'var(--error)';
    feedback.textContent = ch.feedback.wrong;
    hapticError();
    document.getElementById('challengeFooter').innerHTML = `
      <button class="btn btn-primary" onclick="retryChallenge(${challengeId})">Try Again</button>
      <button class="btn btn-secondary" onclick="closeModal()">Dismiss</button>
    `;
  }
}

function retryChallenge(challengeId) {
  openChallenge(challengeId);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ============================================
   PROFILE
   ============================================ */
function renderProfile() {
  const data = getData();
  const needed = data.level * 500;
  const pct = Math.min((data.xp / needed) * 100, 100);
  document.getElementById('profileLevel').textContent = data.level;
  document.getElementById('profileXpFill').style.width = pct + '%';
  document.getElementById('profileXpText').textContent = `${data.xp} / ${needed} XP`;

  const totalEarnedXP = (data.level - 1) * 500 + data.xp;
  const earned = [];
  if (totalEarnedXP > 0 || data.conceptsCompleted.length > 0 || data.challengesCompleted.length > 0) earned.push('first');
  if (data.streak >= 3) earned.push('streak3');
  if (data.conceptsCompleted.length >= 3) earned.push('quiz');
  if (data.challengesCompleted.length >= 3) earned.push('bug');
  if (data.level >= 3) earned.push('architect');
  if (totalEarnedXP >= 1200) earned.push('speed');
  if (data.conceptsCompleted.length >= 6) earned.push('scholar');
  if (data.level >= 5) earned.push('master');

  const grid = document.getElementById('profileBadges');
  grid.innerHTML = '';
  BADGES.forEach(badge => {
    const isEarned = earned.includes(badge.id);
    const cell = document.createElement('div');
    cell.className = `badge-cell ${isEarned ? 'earned' : ''}`;
    cell.innerHTML = `
      <div class="badge-icon">${isEarned ? badge.icon : '🔒'}</div>
      <div class="badge-name">${badge.name}</div>
    `;
    grid.appendChild(cell);
  });

  const labels = { auto: 'Auto', light: 'Light', dark: 'Dark' };
  document.getElementById('themeLabel').textContent = labels[data.theme] || 'Auto';
  document.getElementById('soundLabel').textContent = data.soundEnabled ? 'On' : 'Off';

  // Bookmarks section
  const bookmarksContainer = document.getElementById('profileBookmarks');
  if (bookmarksContainer) {
    if (data.bookmarks.length === 0) {
      bookmarksContainer.innerHTML = '<div style="color:var(--text-dim);font-size:0.875rem;text-align:center;padding:0.5rem 0;">No bookmarks yet. Star a concept to save it.</div>';
    } else {
      bookmarksContainer.innerHTML = data.bookmarks.map(id => {
        const c = CONCEPTS.find(x => x.id === id);
        return `<button class="bookmark-row" onclick="closeModal();setTimeout(()=>openConcept(${id}),180)">${c ? c.title : 'Concept ' + id}</button>`;
      }).join('');
    }
  }
}

/* ============================================
   REFLECTION
   ============================================ */
function openReflection() {
  const data = getData();
  const draft = data.draftReflection;

  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.prompt-card').forEach(b => b.classList.remove('selected'));
  document.getElementById('reflectionInputArea').classList.add('hidden');
  document.getElementById('reflectionText').value = '';
  currentMood = null;
  currentPromptIndex = null;

  if (draft) {
    if (draft.mood) pickMood(draft.mood);
    if (draft.promptIndex !== null) pickPrompt(draft.promptIndex);
    if (draft.text) document.getElementById('reflectionText').value = draft.text;
  }

  openModal('reflectionModal');
}

function pickMood(mood) {
  currentMood = mood;
  document.querySelectorAll('.mood-btn').forEach(b => {
    b.classList.toggle('selected', b.dataset.mood === mood);
  });
}

function pickPrompt(index) {
  currentPromptIndex = index;
  document.querySelectorAll('.prompt-card').forEach((b, i) => {
    b.classList.toggle('selected', i === index);
  });
  document.getElementById('reflectionPromptLabel').textContent = REFLECTION_PROMPTS[index];
  document.getElementById('reflectionInputArea').classList.remove('hidden');
  setTimeout(() => document.getElementById('reflectionText').focus(), 100);
}

function saveReflection() {
  const text = document.getElementById('reflectionText').value.trim();
  if (!text || currentPromptIndex === null) {
    showToast('Pick a prompt and write something first.', 'info');
    return;
  }
  const data = getData();
  data.reflections.push({
    prompt: REFLECTION_PROMPTS[currentPromptIndex],
    text,
    mood: currentMood,
    date: new Date().toISOString()
  });
  data.draftReflection = null;
  saveData(data);
  addXP(25, true);
  showToast('Reflection saved. +25 XP', 'success');
  closeModal();
}

/* ============================================
   XP & STREAK
   ============================================ */
function addXP(amount, silent) {
  const data = getData();
  data.xp += amount;
  const needed = data.level * 500;
  if (data.xp >= needed) {
    data.level++;
    data.xp -= needed;
    if (!silent) showToast(`Level up! You're level ${data.level}.`, 'success');
  } else if (!silent) {
    showToast(`+${amount} XP`, 'success');
  }
  saveData(data);
  renderHome();
  renderProfile();
}

function checkStreak() {
  const data = getData();
  const today = new Date().toDateString();
  const last = data.lastActive ? new Date(data.lastActive).toDateString() : null;
  if (last !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (last === yesterday.toDateString()) {
      data.streak++;
    } else {
      data.streak = 1;
    }
    data.lastActive = new Date().toISOString();
    saveData(data);
    if (data.streak >= 3) renderProfile();
  }
}

/* ============================================
   DATA TOOLS
   ============================================ */
function exportData() {
  const data = getData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dojo-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Data exported.', 'success');
}

function resetData() {
  if (confirm('Reset all progress? This cannot be undone.')) {
    localStorage.removeItem(DB_KEY);
    location.reload();
  }
}

/* ============================================
   TOASTS & HAPTICS
   ============================================ */
function showToast(message, type) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 2200);
}

function hapticSuccess() {
  if (navigator.vibrate) navigator.vibrate([10, 40, 15]);
  playSound('success');
}
function hapticError() {
  if (navigator.vibrate) navigator.vibrate([25, 30, 25]);
  playSound('error');
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateGreeting();
  checkStreak();
  initDock();
  initModals();
  renderHome();
  renderSkillPath();
  renderChallenges();
  renderProfile();
});

// Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(() => console.log('SW registered'))
    .catch(err => console.log('SW failed', err));
}
