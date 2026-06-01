/**
 * Case study content. Edit copy here — the index grid, the home-page "Selected
 * work" cards and the detail pages all read from this single source.
 *
 * Client names are anonymised where confidentiality applies (see `client`).
 * The `order` field controls display order on the index and home pages.
 */
export interface CaseStudy {
  slug: string
  sector: string
  title: string
  /** One- or two-line teaser used on cards. */
  excerpt: string
  client: string
  duration: string
  teamSize: string
  technologies: string[]
  challenge: string[]
  approach: string[]
  delivered: string[]
  outcome: string[]
  quote: { text: string; attribution: string }
  order: number
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'threat-intel-rag-pipeline',
    sector: 'Cyber security and AI',
    title: 'A self-hosted RAG pipeline that took threat attribution from hours to seconds',
    excerpt:
      'A threat intelligence firm could not put sensitive feeds through commercial LLM APIs. We built a self-hosted retrieval-augmented pipeline that answers attribution queries in seconds, with provenance the analysts trust.',
    client: 'A multinational cyber threat intelligence firm',
    duration: '7 months',
    teamSize: '3 — one ML engineer, one platform engineer, one delivery lead',
    technologies: [
      'Python',
      'LangChain',
      'Self-hosted LLM (RAG)',
      'Pinecone',
      'Weaviate',
      'FastAPI',
      'Docker & Kubernetes',
      'pytest / Cypress',
    ],
    challenge: [
      'The firm sells threat intelligence to enterprise and government clients, and its whole value rests on getting to the right answer faster than the adversary moves. It wanted to dramatically improve the speed, accuracy and scale at which emerging threats were identified, triaged and reported — and it had landed on large language models as the obvious lever.',
      'The obvious lever was also the one it could not pull. The data is sensitive, the clients are regulated, and the analysts are sceptical by trade — sending feeds out to a commercial cloud LLM API was a non-starter on every count. Whatever we built had to run on customer-controlled infrastructure, with provenance you could audit line by line, or it would not be used.',
      'Underneath that sat a more ordinary problem: analysts were drowning. Raw feeds arrived faster than anyone could read them, historic context lived in people’s heads, and a meaningful share of every shift went on chasing false positives rather than the incidents that mattered.',
    ],
    approach: [
      'We designed and built a retrieval-augmented generation pipeline in Python and LangChain, with vector databases ingesting, embedding and querying vast volumes of threat intelligence. The point of it was plain-language interrogation: an analyst could ask a question of both historic and live data and get a grounded answer back, with the underlying sources attached rather than asserted.',
      'To enrich the raw feeds before they ever reached an analyst, we developed automated classification and entity-extraction models, deployed behind scalable FastAPI microservices on Docker and Kubernetes. That gave the firm a horizontally scalable enrichment layer that ran entirely inside its own boundary.',
      'On top of the pipeline we built automated reporting: LLM-driven summarisation that generates the customer-facing PDF intelligence reports the firm sells, with structured formatting and visualisations rather than a wall of generated text.',
      'Because this was AI in a regulated setting, the engineering discipline mattered as much as the models. We wired up end-to-end CI/CD with pytest and Cypress and built an evaluation harness around data provenance, model quality and responsible deployment — so a change to a prompt or a model was tested like any other change, not trusted on faith.',
    ],
    delivered: [
      'A retrieval-augmented generation pipeline (Python, LangChain) over Pinecone and Weaviate, queryable in natural language.',
      'Classification and entity-extraction models enriching raw feeds, served by FastAPI microservices on Kubernetes.',
      'An automated reporting pipeline producing structured, customer-facing PDF intelligence reports.',
      'End-to-end CI/CD with pytest and Cypress, plus an evaluation harness tracking provenance and model quality.',
    ],
    outcome: [
      'Analyst time-to-insight on attribution and historic-data queries fell from hours to seconds.',
      'False-positive rates dropped significantly, freeing analysts to concentrate on the highest-priority incidents.',
      'The firm now has a proven, end-to-end capability for self-hosted, domain-tuned LLMs in a regulated, customer-controlled environment — the thing the market said could not be done safely.',
    ],
    quote: {
      text: 'We were told self-hosted LLMs were a research project, not a product. They shipped us one that our analysts actually trust.',
      attribution: 'Head of Threat Intelligence',
    },
    order: 1,
  },
  {
    slug: 'quant-market-data-platform',
    sector: 'Financial services — Quantitative trading',
    title: 'Replacing a C# monolith with a low-millisecond market-data platform',
    excerpt:
      'A quant firm’s market-making stack was a monolith that throttled every new idea. We migrated it to Python microservices and built a Rust market-data layer running at low-millisecond latency across multiple exchanges.',
    client: 'A quantitative trading firm',
    duration: '10 months',
    teamSize: '4 — two senior engineers, one SRE, one delivery lead',
    technologies: [
      'Python',
      'Rust',
      'Redis',
      'RabbitMQ',
      'TimescaleDB',
      'S3 / Parquet',
      'Prometheus & Grafana',
    ],
    challenge: [
      'The firm made markets through a monolithic legacy system that had outgrown itself. It still worked, but it had become the ceiling on everything: a single codebase that was hard to change, harder to scale, and impossible to reason about under load. New strategy ideas died not because they were bad but because there was nowhere to put them.',
      'To move forward the firm needed three things at once — real-time market data from multiple exchanges, a robust historical data foundation to research and back-test against, and the observability that live trading at low-millisecond latencies demands. The existing architecture offered none of them, and at trading latencies the usual “just add a queue” answers do not survive contact with reality.',
    ],
    approach: [
      'We led the migration of the market-making system from a monolithic C# architecture to a Python-based microservices design, deployed via Docker with RabbitMQ carrying asynchronous communication between services. Decoupling the monolith into services was what made every later improvement — and every new product — possible.',
      'For the hot path we did not compromise: we designed and built a high-throughput real-time market data ingestion system in Rust and Redis, processing live order-book and trade data from multiple exchanges at low-millisecond end-to-end latencies. Rust gave us the predictable performance the trading desk needed without the operational footguns of hand-tuned C++.',
      'Alongside the live feed we built a historical data pipeline that combined real-time streaming, polling and archival — TimescaleDB for efficient querying of terabytes of historical data, and S3 with Parquet for scalable, cheap cold storage. One pipeline now feeds both live trading and offline research from a single, consistent record.',
      'Finally we made the whole thing legible. Monitoring and alerting on Prometheus and Grafana track market anomalies, system health and trading-strategy performance in real time, so the desk and the engineers are looking at the same picture rather than arguing about whose number is right.',
    ],
    delivered: [
      'A migration from a C# monolith to Python microservices on Docker, with RabbitMQ for asynchronous inter-service messaging.',
      'A Rust and Redis market-data ingestion layer handling multi-exchange order-book and trade data at low-millisecond latency.',
      'A unified historical pipeline — TimescaleDB for hot queries, S3 and Parquet for terabyte-scale cold storage.',
      'Real-time monitoring and alerting on Prometheus and Grafana for market anomalies, system health and strategy performance.',
    ],
    outcome: [
      'The fragmented C# monolith was replaced by a unified Python microservice platform — new product development became feasible on the same foundation, where before it had stalled.',
      'Multi-exchange market-data ingest now runs at low-millisecond end-to-end latency, fast enough to trade on.',
      'A terabyte-scale historical store stands ready for back-testing, strategy research and compliance retrieval, all from one source of truth.',
    ],
    quote: {
      text: 'They thought like traders, not contractors. The new platform paid for itself the first time we shipped a strategy the old one could never have held.',
      attribution: 'Head of Trading Technology',
    },
    order: 2,
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export const sortedCaseStudies = [...caseStudies].sort((a, b) => a.order - b.order)
