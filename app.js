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
    phase: 'foundations',
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
    phase: 'foundations',
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
    phase: 'foundations',
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
    phase: 'core',
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
    phase: 'core',
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
    phase: 'core',
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
    phase: 'core',
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
    phase: 'core',
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
    phase: 'core',
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
  },
  {
    id: 10,
    title: 'Event Sourcing',
    body: 'Instead of storing only the current state, Event Sourcing stores every change as an event. The current state is derived by replaying events. This gives you a complete audit trail and temporal queries.',
    principle: 'State is a projection of events. The truth is the log, not the table.',
    phase: 'orchestration',
    diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;padding:0.5rem;">
      <div style="display:flex;flex-direction:column;gap:0.25rem;">
        <div style="padding:0.375rem 1rem;background:var(--info);color:#fff;border-radius:6px;font-size:0.75rem;font-weight:700;">OrderCreated</div>
        <div style="padding:0.375rem 1rem;background:var(--info);color:#fff;border-radius:6px;font-size:0.75rem;font-weight:700;">PaymentReceived</div>
        <div style="padding:0.375rem 1rem;background:var(--info);color:#fff;border-radius:6px;font-size:0.75rem;font-weight:700;">OrderShipped</div>
      </div>
      <div style="font-size:1rem;">↓ replay</div>
      <div style="padding:0.5rem 1.5rem;background:var(--accent);color:#fff;border-radius:8px;font-weight:700;font-size:0.875rem;">Current State</div>
    </div>`,
    quiz: {
      question: 'What is the main advantage of Event Sourcing?',
      options: [
        { text: 'Faster read queries', correct: false },
        { text: 'Complete audit trail and ability to rebuild state from history', correct: true },
        { text: 'Simpler code than CRUD', correct: false }
      ]
    },
    resources: [
      { title: 'Event Sourcing Pattern', url: 'https://microservices.io/patterns/data/event-sourcing.html', type: 'article' },
      { title: 'Martin Fowler on Event Sourcing', url: 'https://martinfowler.com/eaaDev/EventSourcing.html', type: 'article' },
      { title: 'EventStoreDB', url: 'https://www.eventstore.com/', type: 'tool' }
    ]
  },
  {
    id: 11,
    title: 'Saga Pattern',
    body: 'A Saga manages long-running transactions across multiple services by breaking them into a sequence of local transactions. If one step fails, compensating transactions undo previous steps.',
    principle: 'Distributed transactions are evil. Use sagas: do work, then compensate if needed.',
    phase: 'orchestration',
    diagram: `<div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.5rem;">
      <div style="padding:0.5rem 0.75rem;background:var(--success);color:#fff;border-radius:8px;font-size:0.75rem;font-weight:700;">Reserve</div>
      <div style="font-size:1rem;">→</div>
      <div style="padding:0.5rem 0.75rem;background:var(--success);color:#fff;border-radius:8px;font-size:0.75rem;font-weight:700;">Pay</div>
      <div style="font-size:1rem;">→</div>
      <div style="padding:0.5rem 0.75rem;background:var(--error);color:#fff;border-radius:8px;font-size:0.75rem;font-weight:700;">Fail</div>
      <div style="font-size:1rem;">←</div>
      <div style="padding:0.5rem 0.75rem;background:var(--warning);color:#fff;border-radius:8px;font-size:0.75rem;font-weight:700;">Refund</div>
    </div>`,
    quiz: {
      question: 'How does a Saga handle failure?',
      options: [
        { text: 'Locks all resources until completion', correct: false },
        { text: 'Runs compensating transactions to undo previous steps', correct: true },
        { text: 'Retries the failed step indefinitely', correct: false }
      ]
    },
    resources: [
      { title: 'Saga Pattern', url: 'https://microservices.io/patterns/data/saga.html', type: 'article' },
      { title: 'Orchestration vs Choreography', url: 'https://camunda.com/blog/2023/02/orchestration-vs-choreography/', type: 'article' },
      { title: 'Temporal.io', url: 'https://temporal.io/', type: 'tool' }
    ]
  },
  {
    id: 12,
    title: 'CQRS',
    body: 'Command Query Responsibility Segregation separates read and write operations into different models. Commands update state; queries read optimized views. This lets you scale reads and writes independently.',
    principle: 'Reads and writes have different needs. Do not force one model to do both.',
    phase: 'orchestration',
    diagram: `<div style="display:flex;justify-content:center;gap:1rem;padding:0.5rem;">
      <div style="text-align:center;">
        <div style="padding:0.5rem 1rem;background:var(--error);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;margin-bottom:0.5rem;">Commands</div>
        <div style="padding:0.75rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.8125rem;color:var(--text-dim);">Write Model</div>
      </div>
      <div style="text-align:center;">
        <div style="padding:0.5rem 1rem;background:var(--success);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;margin-bottom:0.5rem;">Queries</div>
        <div style="padding:0.75rem;background:var(--bg-deep);border:2px solid var(--border-glass);border-radius:8px;font-size:0.8125rem;color:var(--text-dim);">Read Model</div>
      </div>
    </div>`,
    quiz: {
      question: 'What problem does CQRS solve?',
      options: [
        { text: 'Security vulnerabilities', correct: false },
        { text: 'Different optimization needs for reads vs writes', correct: true },
        { text: 'Database connection pooling', correct: false }
      ]
    },
    resources: [
      { title: 'CQRS Pattern', url: 'https://microservices.io/patterns/data/cqrs.html', type: 'article' },
      { title: 'Martin Fowler on CQRS', url: 'https://martinfowler.com/bliki/CQRS.html', type: 'article' },
      { title: 'Axon Framework', url: 'https://axoniq.io/', type: 'tool' }
    ]
  },
  {
    id: 13,
    title: 'BFF Pattern',
    body: 'Backend for Frontend creates a dedicated backend for each client type (mobile, web, IoT). It aggregates and optimizes APIs for that specific client instead of forcing one generic API to serve all.',
    principle: 'Different clients have different needs. One size fits none.',
    phase: 'orchestration',
    diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding:0.5rem;">
      <div style="display:flex;gap:0.5rem;">
        <div style="padding:0.5rem 1rem;background:var(--info);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Mobile BFF</div>
        <div style="padding:0.5rem 1rem;background:var(--success);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Web BFF</div>
      </div>
      <div style="font-size:1.5rem;color:var(--text-dim);">↓</div>
      <div style="padding:0.5rem 2rem;background:var(--accent);color:#fff;border-radius:10px;font-weight:700;font-size:0.9375rem;">API Gateway</div>
    </div>`,
    quiz: {
      question: 'Why use BFF instead of a single API Gateway?',
      options: [
        { text: 'To reduce infrastructure cost', correct: false },
        { text: 'To optimize data payloads and aggregation per client type', correct: true },
        { text: 'To replace the need for authentication', correct: false }
      ]
    },
    resources: [
      { title: 'BFF Pattern', url: 'https://samnewman.io/patterns/architectural/bff/', type: 'article' },
      { title: 'Netflix BFF Talk', url: 'https://www.youtube.com/watch?v=m32EdvitXy4', type: 'video' }
    ]
  },
  {
    id: 14,
    title: 'Sidecar Pattern',
    body: 'A Sidecar deploys helper components alongside your main application container in the same Pod. It handles cross-cutting concerns like logging, monitoring, configuration, or proxying without polluting the main app code.',
    principle: 'Keep the app pure. Offload infrastructure concerns to a companion container.',
    phase: 'orchestration',
    diagram: `<div style="display:flex;justify-content:center;gap:1rem;padding:0.5rem;">
      <div style="text-align:center;">
        <div style="padding:0.75rem 1rem;background:var(--accent);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;margin-bottom:0.5rem;">App Container</div>
        <div style="padding:0.75rem 1rem;background:var(--info);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Sidecar</div>
      </div>
    </div>`,
    quiz: {
      question: 'What is a typical use case for a Sidecar?',
      options: [
        { text: 'Running the main business logic', correct: false },
        { text: 'Handling cross-cutting concerns like logging and proxying', correct: true },
        { text: 'Storing application state', correct: false }
      ]
    },
    resources: [
      { title: 'Sidecar Pattern', url: 'https://microservices.io/patterns/deployment/sidecar.html', type: 'article' },
      { title: 'Istio Service Mesh', url: 'https://istio.io/', type: 'tool' },
      { title: 'Envoy Proxy', url: 'https://www.envoyproxy.io/', type: 'tool' }
    ]
  },
  {
    id: 15,
    title: 'Strangler Fig Pattern',
    body: 'Instead of rewriting a monolith in one big bang, the Strangler Fig pattern gradually replaces monolith functionality by routing traffic to new microservices over time. The old system is "strangled" until nothing remains.',
    principle: 'Big bang rewrites fail. Migrate incrementally and prove value at each step.',
    phase: 'orchestration',
    diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;padding:0.5rem;">
      <div style="padding:0.5rem 2rem;background:var(--warning);color:#fff;border-radius:10px;font-weight:700;font-size:0.9375rem;">Monolith</div>
      <div style="font-size:1.5rem;color:var(--text-dim);">↓</div>
      <div style="display:flex;gap:0.5rem;">
        <div style="padding:0.5rem 0.75rem;background:var(--success);color:#fff;border-radius:8px;font-size:0.75rem;font-weight:700;">Auth MS</div>
        <div style="padding:0.5rem 0.75rem;background:var(--info);color:#fff;border-radius:8px;font-size:0.75rem;font-weight:700;">Orders MS</div>
      </div>
    </div>`,
    quiz: {
      question: 'What is the core idea of the Strangler Fig pattern?',
      options: [
        { text: 'Rewrite everything at once', correct: false },
        { text: 'Gradually replace monolith functionality with microservices', correct: true },
        { text: 'Add a wrapper around the monolith forever', correct: false }
      ]
    },
    resources: [
      { title: 'Strangler Fig Pattern', url: 'https://martinfowler.com/bliki/StranglerFigApplication.html', type: 'article' },
      { title: 'AWS Migration Hub', url: 'https://aws.amazon.com/migration-hub/', type: 'tool' }
    ]
  },
  {
    id: 16,
    title: 'Bulkhead Pattern',
    body: 'Bulkhead isolates failures by partitioning resources into pools. If one pool is overwhelmed, others continue operating. Named after ship bulkheads that prevent flooding from spreading.',
    principle: 'Do not let one bad client or service consume all your resources.',
    phase: 'meta',
    diagram: `<div style="display:flex;justify-content:center;gap:0.5rem;padding:0.5rem;">
      <div style="padding:1rem;background:var(--bg-deep);border:2px solid var(--success);border-radius:8px;font-size:0.75rem;font-weight:700;color:var(--text);">Pool A</div>
      <div style="padding:1rem;background:var(--bg-deep);border:2px solid var(--error);border-radius:8px;font-size:0.75rem;font-weight:700;color:var(--text);">Pool B</div>
      <div style="padding:1rem;background:var(--bg-deep);border:2px solid var(--success);border-radius:8px;font-size:0.75rem;font-weight:700;color:var(--text);">Pool C</div>
    </div>`,
    quiz: {
      question: 'What does the Bulkhead pattern prevent?',
      options: [
        { text: 'Data inconsistency', correct: false },
        { text: 'One failing component from consuming all resources', correct: true },
        { text: 'Network latency', correct: false }
      ]
    },
    resources: [
      { title: 'Bulkhead Pattern', url: 'https://microservices.io/patterns/reliability/bulkhead.html', type: 'article' },
      { title: 'Release It! Book', url: 'https://pragprog.com/titles/mnee2/release-it-second-edition/', type: 'book' }
    ]
  },
  {
    id: 17,
    title: 'Retry Pattern',
    body: 'Transient failures are common in distributed systems. The Retry pattern reattempts a failed operation with backoff strategies (linear, exponential, jitter) instead of failing immediately.',
    principle: 'Networks glitch. Retry with backoff, but do not retry forever.',
    phase: 'meta',
    diagram: `<div style="display:flex;align-items:center;justify-content:center;gap:0.5rem;padding:0.5rem;">
      <div style="padding:0.5rem 1rem;background:var(--error);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Fail</div>
      <div style="font-size:1rem;">→ wait 1s →</div>
      <div style="padding:0.5rem 1rem;background:var(--warning);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Fail</div>
      <div style="font-size:1rem;">→ wait 2s →</div>
      <div style="padding:0.5rem 1rem;background:var(--success);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">OK</div>
    </div>`,
    quiz: {
      question: 'When should you NOT use retries?',
      options: [
        { text: 'On network timeout', correct: false },
        { text: 'On non-idempotent operations without deduplication', correct: true },
        { text: 'On database connection errors', correct: false }
      ]
    },
    resources: [
      { title: 'Retry Pattern', url: 'https://microservices.io/patterns/reliability/retry.html', type: 'article' },
      { title: 'AWS Exponential Backoff', url: 'https://docs.aws.amazon.com/general/latest/gr/api-retries.html', type: 'docs' },
      { title: 'Polly .NET Library', url: 'https://github.com/App-vNext/Polly', type: 'tool' }
    ]
  },
  {
    id: 18,
    title: 'Idempotency',
    body: 'An operation is idempotent if performing it multiple times has the same effect as performing it once. In distributed systems, retries and duplicates are inevitable. Idempotency keys make operations safe to repeat.',
    principle: 'Design for duplicates. The network will retry your requests.',
    phase: 'meta',
    diagram: `<div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;padding:0.5rem;">
      <div style="padding:0.5rem 1.5rem;background:var(--accent);color:#fff;border-radius:8px;font-weight:700;font-size:0.875rem;">POST /pay idempotency-key: abc</div>
      <div style="font-size:1rem;color:var(--text-dim);">× 3 retries</div>
      <div style="padding:0.5rem 1.5rem;background:var(--success);color:#fff;border-radius:8px;font-weight:700;font-size:0.875rem;">Charged once</div>
    </div>`,
    quiz: {
      question: 'Why is idempotency important in microservices?',
      options: [
        { text: 'It makes APIs faster', correct: false },
        { text: 'It prevents duplicate side effects when requests are retried', correct: true },
        { text: 'It reduces code complexity', correct: false }
      ]
    },
    resources: [
      { title: 'Idempotency Keys', url: 'https://stripe.com/blog/idempotency', type: 'article' },
      { title: 'Designing Data-Intensive Applications', url: 'https://dataintensive.net/', type: 'book' }
    ]
  },
  {
    id: 19,
    title: 'Backpressure',
    body: 'Backpressure is a flow control mechanism where a slow consumer signals a fast producer to slow down. Without it, queues grow unbounded and systems collapse under load.',
    principle: 'Slow consumers must be able to tell fast producers to wait.',
    phase: 'meta',
    diagram: `<div style="display:flex;align-items:center;justify-content:center;gap:0.75rem;padding:0.5rem;">
      <div style="padding:0.5rem 1rem;background:var(--success);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Producer</div>
      <div style="font-size:1.25rem;">→</div>
      <div style="padding:0.5rem 1rem;background:var(--warning);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Queue</div>
      <div style="font-size:1.25rem;">→</div>
      <div style="padding:0.5rem 1rem;background:var(--error);color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:700;">Slow</div>
      <div style="font-size:1.25rem;">←</div>
      <div style="font-size:0.8125rem;font-weight:700;color:var(--error);">Backpressure</div>
    </div>`,
    quiz: {
      question: 'What problem does backpressure solve?',
      options: [
        { text: 'Database schema migration', correct: false },
        { text: 'Unbounded queue growth when consumers are slower than producers', correct: true },
        { text: 'Service authentication', correct: false }
      ]
    },
    resources: [
      { title: 'Reactive Streams', url: 'https://www.reactive-streams.org/', type: 'docs' },
      { title: 'Backpressure in RxJS', url: 'https://rxjs.dev/guide/backpressure', type: 'docs' },
      { title: 'Project Reactor', url: 'https://projectreactor.io/', type: 'tool' }
    ]
  },
  {
    id: 20,
    title: 'Domain-Driven Design',
    body: 'DDD aligns software design with business domains. Bounded Contexts define clear boundaries where a domain model is consistent. Ubiquitous Language ensures developers and domain experts speak the same words.',
    principle: 'Code should reflect the business. Boundaries should reflect the language of the domain.',
    phase: 'meta',
    diagram: `<div style="display:flex;justify-content:center;gap:0.5rem;padding:0.5rem;">
      <div style="text-align:center;padding:0.75rem;background:var(--bg-deep);border:2px solid var(--accent);border-radius:10px;min-width:80px;">
        <div style="font-size:0.6875rem;font-weight:700;color:var(--accent);margin-bottom:0.25rem;">Orders BC</div>
        <div style="font-size:0.625rem;color:var(--text-dim);">Order, LineItem</div>
      </div>
      <div style="text-align:center;padding:0.75rem;background:var(--bg-deep);border:2px solid var(--info);border-radius:10px;min-width:80px;">
        <div style="font-size:0.6875rem;font-weight:700;color:var(--info);margin-bottom:0.25rem;">Shipping BC</div>
        <div style="font-size:0.625rem;color:var(--text-dim);">Shipment, Route</div>
      </div>
    </div>`,
    quiz: {
      question: 'What is a Bounded Context in DDD?',
      options: [
        { text: 'A security perimeter around a database', correct: false },
        { text: 'A boundary within which a domain model is consistent and unified', correct: true },
        { text: 'A Kubernetes namespace', correct: false }
      ]
    },
    resources: [
      { title: 'DDD Reference', url: 'https://www.domainlanguage.com/ddd/reference/', type: 'article' },
      { title: 'Implementing DDD', url: 'https://www.oreilly.com/library/view/implementing-domain-driven-design/9780133039900/', type: 'book' },
      { title: 'Bounded Context', url: 'https://martinfowler.com/bliki/BoundedContext.html', type: 'article' }
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
  },
  {
    id: 7,
    title: 'Container Bloat',
    difficulty: 'easy',
    story: 'This Dockerfile builds a 2GB image for a simple Node.js service. What is the anti-pattern?',
    code: `FROM ubuntu:latest
RUN apt-get update && apt-get install -y nodejs npm git curl python3
COPY . /app
WORKDIR /app
RUN npm install
CMD ["node", "server.js"]`,
    options: [
      { text: 'Using a full OS image instead of a slim or distroless base', correct: true },
      { text: 'The service should use Python instead of Node.js', correct: false },
      { text: 'Containers should never use npm', correct: false }
    ],
    feedback: {
      correct: 'Correct. Use slim base images (e.g., node:alpine) and multi-stage builds to keep containers small.',
      wrong: 'The issue is not the language. Think about what unnecessary things are in the image.'
    }
  },
  {
    id: 8,
    title: 'No Resource Limits',
    difficulty: 'medium',
    story: 'A container consumes all CPU and memory on the node, causing other pods to crash. What was missing?',
    code: `apiVersion: v1
kind: Pod
metadata:
  name: hungry-service
spec:
  containers:
  - name: app
    image: my-app:latest`,
    options: [
      { text: 'Resource requests and limits for CPU and memory', correct: true },
      { text: 'More nodes in the cluster', correct: false },
      { text: 'A larger container image', correct: false }
    ],
    feedback: {
      correct: 'Right. Always set resource requests and limits so Kubernetes can schedule and protect workloads.',
      wrong: 'Adding more nodes just delays the problem. What tells Kubernetes how much a pod needs?'
    }
  },
  {
    id: 9,
    title: 'Manual Deployments',
    difficulty: 'hard',
    story: 'A developer deploys to production by running scripts from their laptop. What risk does this create?',
    code: `// deploy.sh run by developer locally
ssh prod-server "docker pull my-app:latest && docker restart my-app"`,
    options: [
      { text: 'No audit trail, inconsistent environments, and bus factor risk', correct: true },
      { text: 'The app will run slower because of SSH overhead', correct: false },
      { text: 'Developers should not have production access', correct: false }
    ],
    feedback: {
      correct: 'Exactly. Use CI/CD pipelines for reproducible, audited, automated deployments.',
      wrong: 'SSH overhead is negligible. Think about what happens when that developer is on vacation and something breaks.'
    }
  },
  {
    id: 10,
    title: 'CRUD Event Storm',
    difficulty: 'medium',
    story: 'A team stores only the latest state in a table. They cannot answer "who changed what and when." What is missing?',
    code: `// Users table
| id | name  | email         |
| 1  | Alice | alice@old.com |  // lost history`,
    options: [
      { text: 'Event Sourcing — storing every change as an event', correct: true },
      { text: 'A bigger database server', correct: false },
      { text: 'More indexes on the table', correct: false }
    ],
    feedback: {
      correct: 'Right. Event Sourcing stores every change, giving you a full audit trail.',
      wrong: 'Infrastructure size does not solve the missing history problem.'
    }
  },
  {
    id: 11,
    title: 'Saga Compensation',
    difficulty: 'hard',
    story: 'An order is reserved, payment succeeds, but inventory is out of stock. What must happen?',
    code: `1. Reserve Order   ✓
2. Charge Payment  ✓
3. Check Inventory ✗`,
    options: [
      { text: 'Refund the payment and cancel the order', correct: true },
      { text: 'Retry inventory check forever', correct: false },
      { text: 'Ship the order anyway', correct: false }
    ],
    feedback: {
      correct: 'Correct. A Saga runs compensating transactions to undo previous steps on failure.',
      wrong: 'Think about what happens to the customer who paid but gets nothing.'
    }
  },
  {
    id: 12,
    title: 'Read Model Lag',
    difficulty: 'medium',
    story: 'A user updates their profile but the search page still shows old data for a few seconds. Why?',
    code: `// Write path: update profile
// Read path: query search index`,
    options: [
      { text: 'The read model is eventually consistent with the write model', correct: true },
      { text: 'The database is corrupted', correct: false },
      { text: 'Caching is disabled', correct: false }
    ],
    feedback: {
      correct: 'Right. CQRS separates read/write models; reads can lag slightly behind writes.',
      wrong: 'This is normal behavior in CQRS, not corruption.'
    }
  },
  {
    id: 13,
    title: 'Mobile Payload Bloat',
    difficulty: 'easy',
    story: 'A mobile app receives a 500KB JSON with fields it never uses. What pattern fixes this?',
    code: `// Generic API returns everything
{ "user": {...}, "orders": [...], "recommendations": [...] }`,
    options: [
      { text: 'BFF — a dedicated backend that returns only what mobile needs', correct: true },
      { text: 'Compress the JSON with gzip', correct: false },
      { text: 'Use GraphQL on the client', correct: false }
    ],
    feedback: {
      correct: 'Correct. A BFF tailors the API to each client type.',
      wrong: 'Compression helps but does not remove the root problem: wrong data shape.'
    }
  },
  {
    id: 14,
    title: 'Cross-Cutting Mess',
    difficulty: 'medium',
    story: 'Every service implements its own logging, TLS, and retry logic differently. What pattern centralizes this?',
    code: `// Service A: custom logger
// Service B: different logger
// Service C: no TLS`,
    options: [
      { text: 'Sidecar pattern — deploy proxy/logger alongside each app', correct: true },
      { text: 'Put all logic in a shared library', correct: false },
      { text: 'Hire a dedicated DevOps team', correct: false }
    ],
    feedback: {
      correct: 'Right. A Sidecar container handles cross-cutting concerns without changing app code.',
      wrong: 'Shared libraries create coupling. Sidecars keep apps pure.'
    }
  },
  {
    id: 15,
    title: 'Big Bang Rewrite',
    difficulty: 'hard',
    story: 'A company plans to shut down their monolith for 6 months to rewrite everything. What pattern prevents this risk?',
    code: `// Monolith off
// 6 months later...
// New system launches with bugs`,
    options: [
      { text: 'Strangler Fig — migrate feature by feature', correct: true },
      { text: 'Hire more developers', correct: false },
      { text: 'Add microservices around the monolith but keep using both forever', correct: false }
    ],
    feedback: {
      correct: 'Exactly. Incremental migration reduces risk and proves value early.',
      wrong: 'More developers on a big bang does not reduce risk.'
    }
  },
  {
    id: 16,
    title: 'Noisy Neighbor',
    difficulty: 'medium',
    story: 'One tenant hogs all database connections, slowing every other tenant. What pattern isolates this?',
    code: `// Connection pool: 100 max
// Tenant A uses 95
// Tenant B times out`,
    options: [
      { text: 'Bulkhead — partition resources per tenant', correct: true },
      { text: 'Increase the pool to 1000', correct: false },
      { text: 'Rate limit Tenant A at the gateway', correct: false }
    ],
    feedback: {
      correct: 'Right. Bulkheads ensure one tenant cannot consume all shared resources.',
      wrong: 'A bigger pool just delays the problem.'
    }
  },
  {
    id: 17,
    title: 'Retry Storm',
    difficulty: 'medium',
    story: 'A downstream service is flaky. Every client retries immediately on failure. The service never recovers. Why?',
    code: `// All clients retry at the same time
setTimeout(retry, 1000); // synchronized`,
    options: [
      { text: 'Retries need exponential backoff with jitter', correct: true },
      { text: 'Clients should never retry', correct: false },
      { text: 'The service needs more CPU', correct: false }
    ],
    feedback: {
      correct: 'Exactly. Exponential backoff with jitter spreads out retries so the service can recover.',
      wrong: 'Immediate synchronized retries create a thundering herd.'
    }
  },
  {
    id: 18,
    title: 'Double Charge',
    difficulty: 'hard',
    story: 'A payment API is called twice because the first request timed out. The customer is charged twice. What is missing?',
    code: `// Client retries POST /charge
// No unique key sent
// Two charges created`,
    options: [
      { text: 'Idempotency keys to deduplicate retries', correct: true },
      { text: 'Faster network connection', correct: false },
      { text: 'Disable retries entirely', correct: false }
    ],
    feedback: {
      correct: 'Correct. Idempotency keys let the server recognize and reject duplicate requests.',
      wrong: 'Faster networks still glitch. Retries are necessary.'
    }
  },
  {
    id: 19,
    title: 'Queue Explosion',
    difficulty: 'medium',
    story: 'A producer sends 10K messages/second. The consumer processes 100/second. The queue grows until memory runs out. What pattern helps?',
    code: `Producer → [Queue] → Slow Consumer`,
    options: [
      { text: 'Backpressure — tell the producer to slow down', correct: true },
      { text: 'Add 100 more consumers', correct: false },
      { text: 'Use a bigger server for the queue', correct: false }
    ],
    feedback: {
      correct: 'Right. Backpressure flow-control prevents unbounded queue growth.',
      wrong: 'More consumers help, but the fundamental fix is flow control.'
    }
  },
  {
    id: 20,
    title: 'Ubiquitous Confusion',
    difficulty: 'easy',
    story: 'Developers call a domain concept "Customer" in one service and "User" in another. Data mapping breaks. What principle prevents this?',
    code: `// Service A: Customer
// Service B: User
// They mean the same thing, but code diverges`,
    options: [
      { text: 'DDD Ubiquitous Language — agree on terms within a Bounded Context', correct: true },
      { text: 'Use a shared library with one name', correct: false },
      { text: 'Add a translation layer between services', correct: false }
    ],
    feedback: {
      correct: 'Correct. Ubiquitous Language aligns code with the domain within each Bounded Context.',
      wrong: 'Shared libraries couple services. Alignment of language is the real fix.'
    }
  }
];

const SKILL_NODES = [
  { id: 1, name: 'Microservices', icon: '🧩' },
  { id: 2, name: 'DB Per Service', icon: '🗄️' },
  { id: 3, name: 'API Gateway', icon: '🚪' },
  { id: 4, name: 'Circuit Breaker', icon: '🛡️' },
  { id: 5, name: 'Discovery', icon: '🔍' },
  { id: 6, name: 'Observability', icon: '📊' },
  { id: 7, name: 'Containers', icon: '📦' },
  { id: 8, name: 'K8s', icon: '☸️' },
  { id: 9, name: 'CI/CD', icon: '🚀' },
  { id: 10, name: 'Event Sourcing', icon: '📜' },
  { id: 11, name: 'Saga', icon: '🎭' },
  { id: 12, name: 'CQRS', icon: '⚡' },
  { id: 13, name: 'BFF', icon: '📱' },
  { id: 14, name: 'Sidecar', icon: '🛵' },
  { id: 15, name: 'Strangler', icon: '🌿' },
  { id: 16, name: 'Bulkhead', icon: '⛵' },
  { id: 17, name: 'Retry', icon: '🔁' },
  { id: 18, name: 'Idempotency', icon: '🔑' },
  { id: 19, name: 'Backpressure', icon: '🌊' },
  { id: 20, name: 'DDD', icon: '🏛️' }
];

const BADGES = [
  { id: 'first', name: 'First Step', icon: '🌱' },
  { id: 'streak3', name: '3-Day Streak', icon: '🍃' },
  { id: 'streak7', name: 'Week Warrior', icon: '🔥' },
  { id: 'quiz', name: 'Quiz Master', icon: '🎯' },
  { id: 'bug', name: 'Bug Hunter', icon: '🐛' },
  { id: 'architect', name: 'Architect', icon: '🏗️' },
  { id: 'speed', name: 'Speed Demon', icon: '⚡' },
  { id: 'scholar', name: 'Scholar', icon: '📚' },
  { id: 'deep', name: 'Deep Thinker', icon: '💭' },
  { id: 'collector', name: 'Resource Hunter', icon: '🔗' },
  { id: 'master', name: 'Grand Master', icon: '🏆' }
];

const REFLECTION_PROMPTS = [
  'I learned...',
  "I'm stuck on...",
  'I want to try...'
];

/* ============================================
   RL AGENT (Q-Table)
   ============================================ */
const RL_KEY = 'dojo_rl_v1';
const ACTIONS = ['learn', 'review', 'challenge'];
const EPSILON = 0.25;
const ALPHA = 0.15;
const GAMMA = 0.9;

function getRLState() {
  const data = getData();
  // State = which concept needs attention
  const total = CONCEPTS.length;
  const completed = data.conceptsCompleted.length;
  const challengesDone = data.challengesCompleted.length;
  if (completed === 0) return 'concept_1';
  if (completed < 3) return 'early';
  if (completed < total && challengesDone < 5) return 'building';
  if (completed < total) return 'deep_dive';
  if (challengesDone < CHALLENGES.length) return 'mastery';
  return 'mastered';
}

function getQTable() {
  const raw = localStorage.getItem(RL_KEY);
  if (!raw) return {};
  try { return JSON.parse(raw); } catch (e) { return {}; }
}

function saveQTable(q) {
  localStorage.setItem(RL_KEY, JSON.stringify(q));
}

function getQ(state, action) {
  const q = getQTable();
  return (q[state] && q[state][action]) || 0;
}

function setQ(state, action, value) {
  const q = getQTable();
  if (!q[state]) q[state] = {};
  q[state][action] = value;
  saveQTable(q);
}

function rlPickAction() {
  const state = getRLState();
  const rand = Math.random();
  if (rand < EPSILON) {
    // Explore
    return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  }
  // Exploit
  let bestAction = ACTIONS[0];
  let bestValue = getQ(state, bestAction);
  for (let i = 1; i < ACTIONS.length; i++) {
    const v = getQ(state, ACTIONS[i]);
    if (v > bestValue) {
      bestValue = v;
      bestAction = ACTIONS[i];
    }
  }
  return bestAction;
}

function rlUpdateReward(action, reward) {
  const state = getRLState();
  const oldQ = getQ(state, action);
  const nextState = getRLState();
  let maxNext = getQ(nextState, ACTIONS[0]);
  for (let i = 1; i < ACTIONS.length; i++) {
    const v = getQ(nextState, ACTIONS[i]);
    if (v > maxNext) maxNext = v;
  }
  const newQ = oldQ + ALPHA * (reward + GAMMA * maxNext - oldQ);
  setQ(state, action, newQ);
}

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
    notificationsEnabled: false,
    hasSeenOnboarding: false,
    installDismissed: false,
    xp: 0,
    level: 1,
    streak: 0,
    lastActive: null,
    lastConceptOpened: null,
    conceptsCompleted: [],
    challengesCompleted: [],
    quizWrong: [],
    bookmarks: [],
    lastReviewed: {},
    reflections: [],
    draftReflection: null,
    phasesCelebrated: [],
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

function toggleNotifications() {
  const data = getData();
  if (!data.notificationsEnabled) {
    if ('Notification' in window) {
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          data.notificationsEnabled = true;
          saveData(data);
          renderProfile();
          showToast('Daily reminders enabled.', 'success');
          scheduleReminder();
        } else {
          showToast('Permission denied.', 'error');
        }
      });
    } else {
      showToast('Notifications not supported.', 'error');
    }
  } else {
    data.notificationsEnabled = false;
    saveData(data);
    renderProfile();
    showToast('Reminders disabled.', 'info');
  }
}

function scheduleReminder() {
  if (!('Notification' in window)) return;
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  const delay = target - now;
  setTimeout(() => {
    const data = getData();
    if (data.notificationsEnabled) {
      new Notification('Microservices Dojo', {
        body: 'Time for your daily learning session. No rush.',
        icon: 'images/icon-192.png',
        badge: 'images/icon-72.png'
      });
      scheduleReminder();
    }
  }, delay);
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
  } else if (type === 'reflect') {
    renderProfile();
    openModal('profileModal');
    setTimeout(() => openReflection(), 280);
  } else if (type === 'concept' && id) {
    showSection('learn');
    setTimeout(() => openConcept(id), 220);
  }
}

function getSRSInterval(wrongCount) {
  // Spaced repetition: 1 day, 3 days, 7 days, 14 days
  const intervals = [1, 3, 7, 14];
  return intervals[Math.min(wrongCount, intervals.length - 1)] * 24 * 60 * 60 * 1000;
}

function getReviewConcept() {
  const data = getData();
  const completed = CONCEPTS.filter(c => data.conceptsCompleted.includes(c.id));
  if (completed.length < 2) return null;
  const now = Date.now();
  const todayStr = new Date().toDateString();
  // SRS: check if enough time has passed since last review
  const dueForReview = completed.filter(c => {
    const last = data.lastReviewed[c.id];
    if (!last) return true;
    if (new Date(last).toDateString() === todayStr) return false;
    const wrongCount = data.quizWrong.filter(id => id === c.id).length;
    const interval = getSRSInterval(wrongCount);
    return now - new Date(last).getTime() >= interval;
  });
  if (dueForReview.length > 0) {
    // prioritize wrong ones, then random
    const wrongOnes = dueForReview.filter(c => data.quizWrong.includes(c.id));
    if (wrongOnes.length > 0) {
      return wrongOnes[Math.floor(Math.random() * wrongOnes.length)];
    }
    return dueForReview[Math.floor(Math.random() * dueForReview.length)];
  }
  // nothing due, pick any not reviewed today
  const notToday = completed.filter(c => {
    const last = data.lastReviewed[c.id];
    return !last || new Date(last).toDateString() !== todayStr;
  });
  if (notToday.length > 0) {
    return notToday[Math.floor(Math.random() * notToday.length)];
  }
  // all reviewed today
  return completed[Math.floor(Math.random() * completed.length)];
}

function renderHome() {
  const data = getData();
  const needed = 300;
  const totalXp = (data.level - 1) * 300 + data.xp;
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

    // RL Agent suggestion
    const rlAction = rlPickAction();
    const rlMission = buildRLMission(rlAction);
    if (rlMission) {
      missionsEl.innerHTML += `
        <button class="mission-card" style="border-color:var(--accent);background:var(--accent-glow);" onclick="${rlMission.onclick}">
          <div class="mission-icon">🧠</div>
          <div class="mission-info">
            <div class="mission-title">Agent Says: ${rlMission.title}</div>
            <div class="mission-meta">${rlMission.meta}</div>
          </div>
        </button>`;
    }

    if (data.lastConceptOpened) {
      const lastConcept = CONCEPTS.find(c => c.id === data.lastConceptOpened);
      if (lastConcept) {
        missionsEl.innerHTML += `
          <button class="mission-card" onclick="pickMission('concept', ${lastConcept.id})">
            <div class="mission-icon">▶</div>
            <div class="mission-info">
              <div class="mission-title">Continue: ${lastConcept.title}</div>
              <div class="mission-meta">Pick up where you left off</div>
            </div>
          </button>`;
      }
    }
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
      <button class="mission-card" onclick="pickMission('reflect')">
        <div class="mission-icon">🌿</div>
        <div class="mission-info">
          <div class="mission-title">Reflect: Journal Entry</div>
          <div class="mission-meta">5 min · Mindful</div>
        </div>
      </button>`;
  }
}

function buildRLMission(action) {
  if (action === 'learn') {
    const next = CONCEPTS.find(c => !getData().conceptsCompleted.includes(c.id));
    if (!next) return null;
    return { title: `Learn ${next.title}`, meta: 'Agent thinks new concepts help most now', onclick: `pickMission('learn');rlUpdateReward('learn',5)` };
  }
  if (action === 'review') {
    const review = getReviewConcept();
    if (!review) return null;
    return { title: `Review ${review.title}`, meta: 'Agent thinks you should revisit this', onclick: `pickMission('concept', ${review.id});rlUpdateReward('review',8)` };
  }
  if (action === 'challenge') {
    const next = CHALLENGES.find(c => !getData().challengesCompleted.includes(c.id));
    if (!next) return null;
    return { title: `Challenge: ${next.title}`, meta: 'Agent thinks practice pays off now', onclick: `pickMission('play');rlUpdateReward('challenge',10)` };
  }
  return null;
}

function getNextConceptName() {
  const data = getData();
  const next = CONCEPTS.find(c => !data.conceptsCompleted.includes(c.id));
  return next ? next.title : 'All concepts done';
}

/* ============================================
   LEARN — SKILL PATH (PHASED)
   ============================================ */
let currentFilter = '';

const PHASES = [
  { key: 'foundations', label: 'Foundations', icon: '🌱', range: [1, 3] },
  { key: 'core', label: 'Core Patterns', icon: '🌿', range: [4, 9] },
  { key: 'orchestration', label: 'Orchestration', icon: '🔥', range: [10, 15] },
  { key: 'meta', label: 'Meta-Learning', icon: '🏆', range: [16, 20] }
];

function filterSkillPath(query) {
  currentFilter = query.toLowerCase().trim();
  renderSkillPath();
}

function renderSkillPath() {
  const data = getData();
  const phasesContainer = document.getElementById('skillPathPhases');
  phasesContainer.innerHTML = '';

  PHASES.forEach(phase => {
    const phaseEl = document.createElement('div');
    phaseEl.className = 'phase-block';

    const nodesInPhase = SKILL_NODES.filter(n => n.id >= phase.range[0] && n.id <= phase.range[1]);
    const doneInPhase = nodesInPhase.filter(n => data.conceptsCompleted.includes(n.id)).length;
    const phasePct = Math.round((doneInPhase / nodesInPhase.length) * 100);

    // Phase header
    const header = document.createElement('div');
    header.className = 'phase-header';
    header.innerHTML = `
      <div class="phase-title">
        <span class="phase-icon">${phase.icon}</span>
        <span>${phase.label}</span>
      </div>
      <div class="phase-progress">${doneInPhase}/${nodesInPhase.length}</div>
    `;
    phaseEl.appendChild(header);

    // Progress bar for phase
    const barWrap = document.createElement('div');
    barWrap.className = 'phase-bar-wrap';
    barWrap.innerHTML = `<div class="phase-bar-fill" style="width:${phasePct}%"></div>`;
    phaseEl.appendChild(barWrap);

    // Nodes row
    const row = document.createElement('div');
    row.className = 'phase-nodes';

    nodesInPhase.forEach((node, idx) => {
      const conceptId = node.id;
      const isDone = data.conceptsCompleted.includes(conceptId);
      const matches = !currentFilter || node.name.toLowerCase().includes(currentFilter) || (CONCEPTS[conceptId - 1] && CONCEPTS[conceptId - 1].title.toLowerCase().includes(currentFilter));

      const btn = document.createElement('button');
      btn.className = `skill-node ${isDone ? 'node-done' : ''} ${!isDone ? 'node-current' : ''}`;
      if (!matches) {
        btn.style.opacity = '0.2';
        btn.style.pointerEvents = 'none';
      }
      btn.innerHTML = `
        <div class="node-circle">${isDone ? '✓' : node.icon}</div>
        <div class="node-name">${node.name}</div>
      `;
      btn.addEventListener('click', () => openConcept(conceptId));
      row.appendChild(btn);

      // Connector
      if (idx < nodesInPhase.length - 1) {
        const nextDone = data.conceptsCompleted.includes(nodesInPhase[idx + 1].id);
        const connector = document.createElement('div');
        connector.className = `phase-connector ${isDone && nextDone ? 'done' : ''}`;
        row.appendChild(connector);
      }
    });

    phaseEl.appendChild(row);
    phasesContainer.appendChild(phaseEl);
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
  data.lastReviewed[id] = new Date().toISOString();
  data.lastConceptOpened = id;
  saveData(data);
  const isBookmarked = data.bookmarks.includes(id);

  document.getElementById('conceptBody').innerHTML = `
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;margin-bottom:0.75rem;">
      <h3 class="concept-title" style="margin-bottom:0;">${concept.title}</h3>
      <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark(${id})" aria-label="Bookmark">${isBookmarked ? '★' : '☆'}</button>
    </div>
    <p class="cozy-text">${concept.body}</p>
    <div class="diagram-box">${concept.diagram}</div>
  `;
  document.getElementById('conceptFooter').innerHTML = `
    <button class="btn btn-primary" onclick="openQuiz(${id})">Quiz Me</button>
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
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.5rem;">
      <h3 class="concept-title" style="margin-bottom:0;">${concept.title}</h3>
      <button class="btn btn-secondary btn-small" style="width:auto;padding:0.5rem 1rem;font-size:0.8125rem;" onclick="openResources(${id})">Resources</button>
    </div>
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
    addXP(30);
    hapticSuccess();
    rlUpdateReward('learn', 10);
    const data = getData();
    if (!data.conceptsCompleted.includes(conceptId)) {
      data.conceptsCompleted.push(conceptId);
      saveData(data);
      renderSkillPath();
      renderProfile();
      renderHome();
      checkPhaseCompletion();
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
    const data = getData();
    if (!data.quizWrong.includes(conceptId)) {
      data.quizWrong.push(conceptId);
      saveData(data);
    }
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
  const total = CHALLENGES.length;
  const done = data.challengesCompleted.length;
  const pct = Math.round((done / total) * 100);
  const progressEl = document.getElementById('challengeProgress');
  if (progressEl) {
    progressEl.innerHTML = `
      <div class="progress-header">
        <span class="progress-title">Your Progress</span>
        <span class="progress-count">${done} / ${total}</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${pct}%"></div>
      </div>
    `;
  }
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
    addXP(60);
    hapticSuccess();
    rlUpdateReward('challenge', 15);
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
   BUILD INFO (GitHub API)
   ============================================ */
const GITHUB_REPO = 'nd28/microservices-rl-pwa';
const BUILD_CACHE_KEY = 'dojo_build_info';
const BUILD_CACHE_TTL = 1000 * 60 * 30; // 30 minutes

async function fetchBuildInfo(force = false) {
  const cached = localStorage.getItem(BUILD_CACHE_KEY);
  if (!force && cached) {
    const { sha, date, fetchedAt } = JSON.parse(cached);
    if (Date.now() - fetchedAt < BUILD_CACHE_TTL) {
      renderBuildInfo(sha, date);
      return;
    }
  }
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/commits/main`);
    if (!res.ok) throw new Error('API failed');
    const commit = await res.json();
    const sha = commit.sha.slice(0, 7);
    const date = new Date(commit.commit.author.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    localStorage.setItem(BUILD_CACHE_KEY, JSON.stringify({ sha, date: dateStr, fetchedAt: Date.now() }));
    renderBuildInfo(sha, dateStr);
  } catch (e) {
    renderBuildInfo('—', 'Unavailable');
  }
}

function renderBuildInfo(sha, date) {
  const shaEl = document.getElementById('buildSha');
  const dateEl = document.getElementById('buildDate');
  if (shaEl) shaEl.textContent = sha;
  if (dateEl) dateEl.textContent = date;
}

function toggleBuildInfo() {
  const el = document.getElementById('buildInfo');
  if (el.classList.contains('hidden')) {
    el.classList.remove('hidden');
    fetchBuildInfo();
  } else {
    el.classList.add('hidden');
  }
}

/* ============================================
   PROFILE
   ============================================ */
function renderProfile() {
  const data = getData();
  const needed = 300;
  const pct = Math.min((data.xp / needed) * 100, 100);
  document.getElementById('profileLevel').textContent = data.level;
  document.getElementById('profileXpFill').style.width = pct + '%';
  document.getElementById('profileXpText').textContent = `${data.xp} / ${needed} XP`;

  const totalEarnedXP = (data.level - 1) * 300 + data.xp;
  const earned = [];
  if (totalEarnedXP > 0 || data.conceptsCompleted.length > 0 || data.challengesCompleted.length > 0) earned.push('first');
  if (data.streak >= 3) earned.push('streak3');
  if (data.streak >= 7) earned.push('streak7');
  if (data.conceptsCompleted.length >= 3) earned.push('quiz');
  if (data.challengesCompleted.length >= 3) earned.push('bug');
  if (data.level >= 3) earned.push('architect');
  if (totalEarnedXP >= 900) earned.push('speed');
  if (data.conceptsCompleted.length >= 6) earned.push('scholar');
  if (data.reflections.length >= 3) earned.push('deep');
  if (data.bookmarks.length >= 3) earned.push('collector');
  if (data.level >= 6) earned.push('master');

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

  // RL Brain heatmap
  const rlBrainEl = document.getElementById('rlBrain');
  if (rlBrainEl) {
    const states = ['early', 'building', 'deep_dive', 'mastery', 'mastered'];
    const actions = ['learn', 'review', 'challenge'];
    const q = getQTable();
    let maxVal = 1;
    states.forEach(s => {
      actions.forEach(a => {
        const v = (q[s] && q[s][a]) || 0;
        if (Math.abs(v) > maxVal) maxVal = Math.abs(v);
      });
    });
    let html = '<div class="rl-grid">';
    html += '<div class="rl-cell rl-header"></div>';
    actions.forEach(a => {
      html += `<div class="rl-cell rl-header">${a}</div>`;
    });
    states.forEach(s => {
      const isCurrent = getRLState() === s;
      html += `<div class="rl-cell rl-header ${isCurrent ? 'rl-current' : ''}">${s}</div>`;
      actions.forEach(a => {
        const v = (q[s] && q[s][a]) || 0;
        const intensity = Math.min(Math.abs(v) / maxVal, 1);
        const color = v >= 0
          ? `rgba(107,142,90,${0.08 + intensity * 0.85})`
          : `rgba(194,112,106,${0.08 + intensity * 0.85})`;
        html += `<div class="rl-cell" style="background:${color};color:${intensity > 0.4 ? '#fff' : 'inherit'};">${Math.round(v * 10) / 10}</div>`;
      });
    });
    html += '</div>';
    rlBrainEl.innerHTML = html;
  }

  const labels = { auto: 'Auto', light: 'Light', dark: 'Dark' };
  document.getElementById('themeLabel').textContent = labels[data.theme] || 'Auto';
  document.getElementById('soundLabel').textContent = data.soundEnabled ? 'On' : 'Off';
  document.getElementById('notifLabel').textContent = data.notificationsEnabled ? 'On' : 'Off';

  // Stats card
  const statsEl = document.getElementById('statsCard');
  if (statsEl) {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weekConcepts = data.conceptsCompleted.filter(id => {
      const d = data.lastReviewed[id];
      return d && new Date(d) > weekAgo;
    }).length;
    const weekReflections = data.reflections.filter(r => new Date(r.date) > weekAgo).length;
    statsEl.innerHTML = `
      <div class="stats-title">This Week</div>
      <div class="stats-grid">
        <div class="stat-cell">
          <div class="stat-value">${weekConcepts}</div>
          <div class="stat-label">Learned</div>
        </div>
        <div class="stat-cell">
          <div class="stat-value">${data.challengesCompleted.length}</div>
          <div class="stat-label">Challenges</div>
        </div>
        <div class="stat-cell">
          <div class="stat-value">${weekReflections}</div>
          <div class="stat-label">Reflections</div>
        </div>
      </div>
    `;
  }

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

  // Reflections section
  const reflectionsContainer = document.getElementById('profileReflections');
  if (reflectionsContainer) {
    if (data.reflections.length === 0) {
      reflectionsContainer.innerHTML = '<div style="color:var(--text-dim);font-size:0.875rem;text-align:center;padding:0.5rem 0;">No journal entries yet. Reflect to start your journey.</div>';
    } else {
      const sorted = [...data.reflections].reverse();
      reflectionsContainer.innerHTML = sorted.slice(0, 10).map(r => {
        const date = new Date(r.date);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `
          <div class="reflection-item">
            <div class="reflection-date">${dateStr}</div>
            <div class="reflection-prompt">${r.prompt}</div>
            <div class="reflection-text">${r.text}</div>
            ${r.mood ? `<div class="reflection-mood">${r.mood === 'calm' ? '😌' : r.mood === 'okay' ? '😐' : '😮‍💨'}</div>` : ''}
          </div>
        `;
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
  addXP(30, true);
  rlUpdateReward('review', 8);
  showToast('Reflection saved. +30 XP', 'success');
  closeModal();
}

/* ============================================
   XP & STREAK
   ============================================ */
function addXP(amount, silent) {
  const data = getData();
  data.xp += amount;
  const needed = 300;
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
   PHASE COMPLETION
   ============================================ */
function checkPhaseCompletion() {
  const data = getData();
  for (const phase of PHASES) {
    if (data.phasesCelebrated.includes(phase.key)) continue;
    const conceptsInPhase = CONCEPTS.filter(c => c.phase === phase.key);
    const allDone = conceptsInPhase.length > 0 && conceptsInPhase.every(c => data.conceptsCompleted.includes(c.id));
    if (allDone) {
      data.phasesCelebrated.push(phase.key);
      saveData(data);
      showPhaseCompleteModal(phase);
      break;
    }
  }
}

function showPhaseCompleteModal(phase) {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.classList.add('open');
  const modal = document.createElement('div');
  modal.className = 'modal phase-modal open';
  modal.id = 'phaseCompleteModal';
  modal.innerHTML = `
    <div class="modal-handle"></div>
    <div class="modal-body" style="text-align:center;padding:1.5rem;">
      <div style="font-size:3rem;margin-bottom:0.75rem;">${phase.icon}</div>
      <h3 class="modal-title" style="font-size:1.25rem;margin-bottom:0.5rem;">${phase.label} Complete</h3>
      <p class="cozy-text" style="margin-bottom:1.25rem;">You finished all concepts in this phase. The next one awaits.</p>
      <div style="padding:0.75rem 1rem;background:var(--accent-glow);border:1px solid var(--accent);border-radius:var(--radius-lg);color:var(--accent);font-weight:700;font-size:0.9375rem;">+100 XP Bonus</div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" onclick="dismissPhaseModal()">Continue</button>
    </div>
  `;
  document.body.appendChild(modal);
  triggerCelebration();
  addXP(100);
}

function dismissPhaseModal() {
  const modal = document.getElementById('phaseCompleteModal');
  const overlay = document.getElementById('modalOverlay');
  if (modal) {
    modal.classList.remove('open');
    setTimeout(() => modal.remove(), 300);
  }
  if (overlay) overlay.classList.remove('open');
}

/* ============================================
   INSTALL BANNER
   ============================================ */
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const data = getData();
  if (!data.installDismissed && !window.matchMedia('(display-mode: standalone)').matches) {
    const banner = document.getElementById('installBanner');
    if (banner) banner.classList.remove('hidden');
  }
});

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      dismissInstall();
    });
  }
}

function dismissInstall() {
  const banner = document.getElementById('installBanner');
  if (banner) banner.classList.add('hidden');
  const data = getData();
  data.installDismissed = true;
  saveData(data);
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

function exportReflections() {
  const data = getData();
  if (data.reflections.length === 0) {
    showToast('No journal entries yet.', 'info');
    return;
  }
  let md = '# My Learning Journal\n\n';
  md += `Generated: ${new Date().toLocaleDateString()}\n\n---\n\n`;
  [...data.reflections].reverse().forEach(r => {
    const date = new Date(r.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const mood = r.mood ? (r.mood === 'calm' ? '😌 Calm' : r.mood === 'okay' ? '😐 Okay' : '😮‍💨 Tired') : '';
    md += `## ${r.prompt}\n\n`;
    md += `**${date}**${mood ? ' · ' + mood : ''}\n\n`;
    md += `${r.text}\n\n---\n\n`;
  });
  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dojo-journal-${new Date().toISOString().split('T')[0]}.md`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Journal exported.', 'success');
}

function importData(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!imported || typeof imported !== 'object') throw new Error('Invalid file');
      const current = getData();
      const merged = { ...current, ...imported };
      // preserve certain fields
      merged.theme = current.theme;
      merged.soundEnabled = current.soundEnabled;
      merged.notificationsEnabled = current.notificationsEnabled;
      merged.hasSeenOnboarding = current.hasSeenOnboarding;
      merged.installDismissed = current.installDismissed;
      saveData(merged);
      showToast('Data imported. Reloading...', 'success');
      setTimeout(() => location.reload(), 800);
    } catch (err) {
      showToast('Import failed. Invalid file.', 'error');
    }
  };
  reader.readAsText(file);
  input.value = '';
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
   ONBOARDING
   ============================================ */
function showOnboarding() {
  const overlay = document.getElementById('onboardingOverlay');
  overlay.classList.remove('hidden');
}

function dismissOnboarding() {
  const overlay = document.getElementById('onboardingOverlay');
  overlay.classList.add('hidden');
  const data = getData();
  data.hasSeenOnboarding = true;
  saveData(data);
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
  if (!getData().hasSeenOnboarding) {
    showOnboarding();
  }
  if (getData().notificationsEnabled) {
    scheduleReminder();
  }
});

// Service Worker
let updateReady = false;

function updateApp() {
  if ('caches' in window) {
    caches.keys().then(names => {
      return Promise.all(names.map(name => caches.delete(name)));
    }).then(() => {
      showToast('Cache cleared. Reloading...', 'success');
      setTimeout(() => location.reload(true), 800);
    });
  } else {
    location.reload(true);
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
    .then(reg => {
      console.log('SW registered');
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            updateReady = true;
            showToast('Update available! Tap Update App in Profile.', 'info');
            const label = document.getElementById('updateLabel');
            if (label) label.textContent = '1';
          }
        });
      });
    })
    .catch(err => console.log('SW failed', err));
}
