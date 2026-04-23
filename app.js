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

function getEpisodeDescription(num) {
  const descriptions = {
    1: 'Build a monolith baseline, then split it into 2 microservices. Experience the pain of direct HTTP calls without resilience.',
    2: 'Add health checks, timeouts, and retry logic. Test failure scenarios and feel the relief.',
    3: 'Build the same feature 3 ways: REST, Messaging, and gRPC. Compare latency, failure handling, and complexity.',
    4: 'Split a shared database into database-per-service. Experience eventual consistency and cross-service data needs.',
    5: 'Implement circuit breaker and bulkhead patterns. Load test and watch them prevent cascade failures.',
    6: 'Add an API Gateway for routing, auth, and response aggregation. Avoid turning it into an orchestrator.',
    7: 'Replace hardcoded URLs with dynamic service discovery using Consul, Eureka, or Kubernetes DNS.',
    8: 'Add structured logging, Prometheus metrics, and distributed tracing with Jaeger or Zipkin.',
    9: 'Convert Docker Compose setup to Kubernetes manifests. Deploy to a local cluster.',
    10: 'Externalize configuration and implement secrets management. Practice environment-specific configs.',
    11: 'Build an automated CI/CD pipeline with testing, building, and deployment stages.',
    12: 'Implement event sourcing or CQRS. Understand event replay and read model separation.',
    13: 'Implement the Saga pattern for distributed transactions. Handle compensation on failure.',
    14: 'Install Istio or Linkerd. Implement mTLS, traffic splitting, and canary deployments.',
    15: 'Run chaos experiments. Intentionally break services and fix discovered weaknesses.',
    16: 'Design and start building a multi-service capstone project for your portfolio.',
    17: 'Load test, identify bottlenecks, optimize critical paths, and add strategic caching.',
    18: 'Implement zero-trust networking, proper authN/authZ, and security scanning.',
    19: 'Create runbooks, define SLOs/SLIs, and build operational alerting.',
    20: 'Refactor your Episode 1 code with everything you learned. Compare and document your growth.'
  };
  return descriptions[num] || '';
}

function getEpisodeResources(num) {
  const resources = {
    1: {
      docs: [
        { title: 'Martin Fowler - Microservices', url: 'https://martinfowler.com/articles/microservices.html' },
        { title: 'Docker Docs - Get Started', url: 'https://docs.docker.com/get-started/' },
        { title: 'Docker Compose Overview', url: 'https://docs.docker.com/compose/' }
      ],
      videos: [
        { title: 'What are Microservices?', url: 'https://www.youtube.com/results?search_query=what+are+microservices' },
        { title: 'Docker Tutorial for Beginners', url: 'https://www.youtube.com/results?search_query=docker+tutorial+beginners' }
      ],
      tools: ['Docker', 'Docker Compose', 'FastAPI/Flask/Express'],
      keywords: ['monolith', 'service boundary', 'containerization']
    },
    2: {
      docs: [
        { title: 'Microsoft - Retry Pattern', url: 'https://docs.microsoft.com/en-us/azure/architecture/patterns/retry' },
        { title: 'Health Check Endpoint Pattern', url: 'https://microservices.io/patterns/observability/health-check-api.html' },
        { title: 'Tenacity (Python Retries)', url: 'https://github.com/jd/tenacity' }
      ],
      videos: [
        { title: 'Timeouts, Retries, Backoff', url: 'https://www.youtube.com/results?search_query=microservices+timeout+retry+backoff' }
      ],
      tools: ['Tenacity', 'Polly', 'Resilience4j'],
      keywords: ['health check', 'timeout', 'retry', 'backoff', 'resilience']
    },
    3: {
      docs: [
        { title: 'REST vs gRPC vs GraphQL', url: 'https://www.moesif.com/blog/technical/graphql/rest-vs-graphql-vs-grpc/' },
        { title: 'RabbitMQ Tutorials', url: 'https://www.rabbitmq.com/getstarted.html' },
        { title: 'NATS Documentation', url: 'https://docs.nats.io/' },
        { title: 'gRPC Docs', url: 'https://grpc.io/docs/' }
      ],
      videos: [
        { title: 'Async vs Sync Microservices', url: 'https://www.youtube.com/results?search_query=async+vs+sync+microservices' }
      ],
      tools: ['RabbitMQ', 'NATS', 'gRPC', 'Redis Streams', 'Kafka'],
      keywords: ['REST', 'gRPC', 'messaging', 'async', 'sync', 'event-driven']
    },
    4: {
      docs: [
        { title: 'Database per Service Pattern', url: 'https://microservices.io/patterns/data/database-per-service.html' },
        { title: 'Eventual Consistency', url: 'https://martinfowler.com/articles/201701-event-driven.html' },
        { title: 'CQRS Pattern', url: 'https://martinfowler.com/bliki/CQRS.html' }
      ],
      videos: [
        { title: 'Database Per Service Explained', url: 'https://www.youtube.com/results?search_query=database+per+service+microservices' }
      ],
      tools: ['PostgreSQL', 'MongoDB', 'Redis', 'Flyway', 'Liquibase'],
      keywords: ['database per service', 'eventual consistency', 'data ownership', 'bounded context']
    },
    5: {
      docs: [
        { title: 'Circuit Breaker Pattern', url: 'https://martinfowler.com/bliki/CircuitBreaker.html' },
        { title: 'Bulkhead Pattern', url: 'https://docs.microsoft.com/en-us/azure/architecture/patterns/bulkhead' },
        { title: 'Resilience4j Docs', url: 'https://resilience4j.readme.io/' }
      ],
      videos: [
        { title: 'Circuit Breaker Explained', url: 'https://www.youtube.com/results?search_query=circuit+breaker+pattern+explained' }
      ],
      tools: ['Resilience4j', 'Polly', 'Hystrix (legacy)', 'Envoy'],
      keywords: ['circuit breaker', 'bulkhead', 'cascade failure', 'fail-fast']
    },
    6: {
      docs: [
        { title: 'API Gateway Pattern', url: 'https://microservices.io/patterns/apigateway.html' },
        { title: 'Kong Docs', url: 'https://docs.konghq.com/' },
        { title: 'NGINX Reverse Proxy', url: 'https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/' }
      ],
      videos: [
        { title: 'API Gateway Pattern', url: 'https://www.youtube.com/results?search_query=api+gateway+pattern+microservices' }
      ],
      tools: ['Kong', 'NGINX', 'Spring Cloud Gateway', 'Traefik'],
      keywords: ['API gateway', 'routing', 'aggregation', 'edge service']
    },
    7: {
      docs: [
        { title: 'Service Discovery Pattern', url: 'https://microservices.io/patterns/client-side-discovery.html' },
        { title: 'Consul Docs', url: 'https://www.consul.io/docs' },
        { title: 'Eureka (Netflix)', url: 'https://github.com/Netflix/eureka' }
      ],
      videos: [
        { title: 'Service Discovery in Microservices', url: 'https://www.youtube.com/results?search_query=service+discovery+microservices' }
      ],
      tools: ['Consul', 'Eureka', 'etcd', 'Kubernetes DNS'],
      keywords: ['service discovery', 'service registry', 'load balancing']
    },
    8: {
      docs: [
        { title: 'The 3 Pillars of Observability', url: 'https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/ch04.html' },
        { title: 'Prometheus Docs', url: 'https://prometheus.io/docs/' },
        { title: 'Jaeger Tracing', url: 'https://www.jaegertracing.io/docs/' },
        { title: 'OpenTelemetry', url: 'https://opentelemetry.io/docs/' }
      ],
      videos: [
        { title: 'Observability in Microservices', url: 'https://www.youtube.com/results?search_query=observability+microservices+prometheus+grafana' }
      ],
      tools: ['Prometheus', 'Grafana', 'Jaeger', 'ELK Stack', 'OpenTelemetry'],
      keywords: ['observability', 'metrics', 'logging', 'tracing', 'monitoring']
    },
    9: {
      docs: [
        { title: 'Kubernetes Basics', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' },
        { title: 'kubectl Cheat Sheet', url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/' },
        { title: 'Helm Docs', url: 'https://helm.sh/docs/' }
      ],
      videos: [
        { title: 'Kubernetes Tutorial for Beginners', url: 'https://www.youtube.com/results?search_query=kubernetes+tutorial+beginners' }
      ],
      tools: ['kubectl', 'Minikube/kind/k3d', 'Helm', 'Kustomize'],
      keywords: ['kubernetes', 'orchestration', 'pods', 'services', 'deployments']
    },
    10: {
      docs: [
        { title: '12-Factor App Config', url: 'https://12factor.net/config' },
        { title: 'Kubernetes ConfigMaps & Secrets', url: 'https://kubernetes.io/docs/concepts/configuration/' },
        { title: 'HashiCorp Vault', url: 'https://www.vaultproject.io/docs' }
      ],
      videos: [
        { title: 'Config Management in K8s', url: 'https://www.youtube.com/results?search_query=kubernetes+configmaps+secrets+tutorial' }
      ],
      tools: ['Kubernetes ConfigMaps', 'Vault', 'AWS Secrets Manager', 'Doppler'],
      keywords: ['configuration', 'secrets', 'environment variables', '12-factor']
    },
    11: {
      docs: [
        { title: 'GitHub Actions Docs', url: 'https://docs.github.com/en/actions' },
        { title: 'GitLab CI/CD', url: 'https://docs.gitlab.com/ee/ci/' },
        { title: 'ArgoCD', url: 'https://argo-cd.readthedocs.io/' }
      ],
      videos: [
        { title: 'CI/CD for Microservices', url: 'https://www.youtube.com/results?search_query=cicd+microservices+pipeline' }
      ],
      tools: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'ArgoCD', 'Tekton'],
      keywords: ['CI/CD', 'pipeline', 'GitOps', 'automation', 'deployment']
    },
    12: {
      docs: [
        { title: 'Event Sourcing Pattern', url: 'https://martinfowler.com/eaaDev/EventSourcing.html' },
        { title: 'CQRS by Martin Fowler', url: 'https://martinfowler.com/bliki/CQRS.html' },
        { title: 'Axon Framework', url: 'https://docs.axoniq.io/' }
      ],
      videos: [
        { title: 'Event Sourcing Explained', url: 'https://www.youtube.com/results?search_query=event+sourcing+cqrs+explained' }
      ],
      tools: ['Axon', 'EventStoreDB', 'Kafka', 'PostgreSQL'],
      keywords: ['event sourcing', 'CQRS', 'event store', 'read model', 'command']
    },
    13: {
      docs: [
        { title: 'Saga Pattern', url: 'https://microservices.io/patterns/data/saga.html' },
        { title: 'Choreography vs Orchestration', url: 'https://solace.com/blog/microservices-choreography-vs-orchestration/' },
        { title: 'Camunda Saga', url: 'https://camunda.com/blog/2021/12/saga-pattern/' }
      ],
      videos: [
        { title: 'Saga Pattern in Microservices', url: 'https://www.youtube.com/results?search_query=saga+pattern+microservices' }
      ],
      tools: ['Camunda', 'Temporal', 'Netflix Conductor', 'Apache Camel'],
      keywords: ['saga', 'distributed transaction', 'compensation', 'choreography', 'orchestration']
    },
    14: {
      docs: [
        { title: 'Istio Docs', url: 'https://istio.io/latest/docs/' },
        { title: 'Linkerd Docs', url: 'https://linkerd.io/2/overview/' },
        { title: 'Service Mesh Pattern', url: 'https://philcalcado.com/2017/08/03/pattern_service_mesh.html' }
      ],
      videos: [
        { title: 'Service Mesh Explained', url: 'https://www.youtube.com/results?search_query=service+mesh+istio+explained' }
      ],
      tools: ['Istio', 'Linkerd', 'Consul Connect', 'Kuma'],
      keywords: ['service mesh', 'mTLS', 'sidecar', 'traffic management', 'canary']
    },
    15: {
      docs: [
        { title: 'Chaos Engineering Principles', url: 'https://principlesofchaos.org/' },
        { title: 'Chaos Monkey (Netflix)', url: 'https://netflix.github.io/chaosmonkey/' },
        { title: 'Litmus Chaos', url: 'https://litmuschaos.io/' }
      ],
      videos: [
        { title: 'Chaos Engineering Explained', url: 'https://www.youtube.com/results?search_query=chaos+engineering+explained' }
      ],
      tools: ['Chaos Monkey', 'Litmus', 'Gremlin', 'Chaos Mesh'],
      keywords: ['chaos engineering', 'failure injection', 'resilience testing', 'game day']
    },
    16: {
      docs: [
        { title: 'Domain-Driven Design', url: 'https://martinfowler.com/bliki/DomainDrivenDesign.html' },
        { title: 'Bounded Context', url: 'https://martinfowler.com/bliki/BoundedContext.html' },
        { title: 'C4 Model for Architecture', url: 'https://c4model.com/' }
      ],
      videos: [
        { title: 'Designing Microservices Architecture', url: 'https://www.youtube.com/results?search_query=designing+microservices+architecture' }
      ],
      tools: ['Structurizr', 'draw.io', 'Miro', 'PlantUML'],
      keywords: ['architecture', 'design', 'bounded context', 'DDD', 'C4 model']
    },
    17: {
      docs: [
        { title: 'Systems Performance', url: 'http://www.brendangregg.com/sysperfbook.html' },
        { title: 'Redis Caching Strategies', url: 'https://redis.io/docs/manual/perf/' },
        { title: 'k6 Load Testing', url: 'https://k6.io/docs/' }
      ],
      videos: [
        { title: 'Performance Tuning Microservices', url: 'https://www.youtube.com/results?search_query=performance+tuning+microservices' }
      ],
      tools: ['k6', 'Locust', 'JMeter', 'Redis', 'pprof'],
      keywords: ['performance', 'load testing', 'caching', 'latency', 'throughput']
    },
    18: {
      docs: [
        { title: 'OAuth 2.0', url: 'https://oauth.net/2/' },
        { title: 'Zero Trust Architecture', url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf' },
        { title: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' }
      ],
      videos: [
        { title: 'Microservices Security Best Practices', url: 'https://www.youtube.com/results?search_query=microservices+security+best+practices' }
      ],
      tools: ['Keycloak', 'OAuth2 Proxy', 'Cert-Manager', 'Falco'],
      keywords: ['security', 'zero trust', 'mTLS', 'OAuth', 'JWT', 'authorization']
    },
    19: {
      docs: [
        { title: 'Google SRE Book', url: 'https://sre.google/sre-book/table-of-contents/' },
        { title: 'SLIs, SLOs, SLAs', url: 'https://sre.google/workbook/implementing-slos/' },
        { title: 'Runbook Template', url: 'https://www.pagerduty.com/resources/learn/what-is-a-runbook/' }
      ],
      videos: [
        { title: 'SRE & Operational Excellence', url: 'https://www.youtube.com/results?search_query=sre+operational+excellence' }
      ],
      tools: ['PagerDuty', 'Opsgenie', 'VictorOps', 'Grafana OnCall'],
      keywords: ['SRE', 'SLO', 'SLI', 'runbook', 'on-call', 'alerting']
    },
    20: {
      docs: [
        { title: 'Refactoring by Martin Fowler', url: 'https://refactoring.com/' },
        { title: 'Architecture Decision Records', url: 'https://adr.github.io/' }
      ],
      videos: [
        { title: 'Microservices Lessons Learned', url: 'https://www.youtube.com/results?search_query=microservices+lessons+learned' }
      ],
      tools: ['All learned tools'],
      keywords: ['refactoring', 'lessons learned', 'ADR', 'retrospective', 'growth']
    }
  };
  return resources[num] || { docs: [], videos: [], tools: [], keywords: [] };
}

// Episode Detail Modal
function showEpisodeDetail(episodeNum) {
  const data = getData();
  const ep = data.episodes[episodeNum];
  const res = getEpisodeResources(episodeNum);
  const title = getEpisodeTitle(episodeNum);
  const description = getEpisodeDescription(episodeNum);
  const status = ep ? ep.status : 'pending';
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'episodeModal';
  modal.innerHTML = `
    <div class="modal-content fade-in">
      <div class="modal-header">
        <div>
          <span class="episode-number">EP ${episodeNum}</span>
          <h2 style="margin-top: 0.5rem; font-size: 1.2rem;">${title}</h2>
        </div>
        <button class="modal-close" onclick="closeEpisodeModal()">&times;</button>
      </div>
      
      <div class="modal-body">
        <p class="text-secondary" style="line-height: 1.6; margin-bottom: 1rem;">${description}</p>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <span class="episode-status status-${status === 'completed' ? 'completed' : status === 'in-progress' ? 'progress' : 'pending'}">
            ${status === 'completed' ? 'Done' : status === 'in-progress' ? 'In Progress' : 'Pending'}
          </span>
          ${res.keywords.map(k => `<span style="background: var(--bg-card); padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; color: var(--text-secondary);">${k}</span>`).join('')}
        </div>
        
        ${ep && ep.reward !== undefined ? `
        <div class="reward-display" style="margin-bottom: 1rem; padding: 1rem;">
          <div class="reward-value" style="font-size: 2rem;">${ep.reward}</div>
          <div class="reward-label">Reward</div>
        </div>
        ` : ''}
        
        <div class="card" style="margin-bottom: 1rem;">
          <div class="card-title">📚 Documentation</div>
          ${res.docs.length > 0 ? res.docs.map(d => `
            <a href="${d.url}" target="_blank" rel="noopener" class="resource-link" onclick="hapticLight()">
              <span>${d.title}</span>
              <span style="color: var(--text-secondary);">↗</span>
            </a>
          `).join('') : '<p class="text-sm text-secondary">No docs yet.</p>'}
        </div>
        
        <div class="card" style="margin-bottom: 1rem;">
          <div class="card-title">🎥 Videos</div>
          ${res.videos.length > 0 ? res.videos.map(v => `
            <a href="${v.url}" target="_blank" rel="noopener" class="resource-link" onclick="hapticLight()">
              <span>${v.title}</span>
              <span style="color: var(--text-secondary);">↗</span>
            </a>
          `).join('') : '<p class="text-sm text-secondary">No videos yet.</p>'}
        </div>
        
        <div class="card" style="margin-bottom: 1rem;">
          <div class="card-title">🛠️ Tools</div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${res.tools.map(t => `<span style="background: var(--bg-card); padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.85rem; border: 1px solid var(--border);">${t}</span>`).join('')}
          </div>
        </div>
        
        ${ep && ep.keyInsight ? `
        <div class="card" style="margin-bottom: 1rem;">
          <div class="card-title">💡 Your Insight</div>
          <p class="text-sm" style="color: var(--accent-light);">${ep.keyInsight}</p>
        </div>
        ` : ''}
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="closeEpisodeModal()">Close</button>
        <button class="btn btn-primary" onclick="closeEpisodeModal(); location.href='./tracker.html?episode=${episodeNum}'">
          ${status === 'completed' ? 'Edit Log' : 'Start / Log'}
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  hapticLight();
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeEpisodeModal();
  });
}

function closeEpisodeModal() {
  const modal = document.getElementById('episodeModal');
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 200);
  }
}

// Toast Notifications
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  hapticLight();
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Haptic Feedback
function hapticLight() {
  if (navigator.vibrate) {
    navigator.vibrate(15);
  }
}

function hapticMedium() {
  if (navigator.vibrate) {
    navigator.vibrate([20, 30, 20]);
  }
}

function hapticSuccess() {
  if (navigator.vibrate) {
    navigator.vibrate([10, 50, 20]);
  }
}

function hapticError() {
  if (navigator.vibrate) {
    navigator.vibrate([30, 40, 30, 40, 30]);
  }
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

function startOrViewEpisode(episodeNum) {
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
    
    showToast(`Episode ${episodeNum} started!`, 'success');
    
    // Show detail modal first
    showEpisodeDetail(episodeNum);
  } else {
    // Show episode detail modal with resources
    showEpisodeDetail(episodeNum);
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
  hapticSuccess();
  showToast('Episode saved successfully!', 'success');
  
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
  hapticSuccess();
  showToast('Reflection saved!', 'success');
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
  // Check URL params for episode pre-selection
  const urlParams = new URLSearchParams(window.location.search);
  const episodeParam = urlParams.get('episode');
  if (episodeParam && document.getElementById('episodeSelect')) {
    document.getElementById('episodeSelect').value = episodeParam;
  }
  
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
