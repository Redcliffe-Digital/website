/**
 * Case study content, in two variants for the site A/B toggle:
 *   - `caseStudiesBefore`, the default site.
 *   - `caseStudiesDb`    , the data-warehouse-led variant shown under ?v=db.
 * See src/components/DataMotif.tsx and the variant script in layout.tsx.
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
  /** Banner image shown at the top of the detail page (in public/images). */
  image?: string
  order: number
}

export const caseStudiesBefore: CaseStudy[] = [
  {
    slug: 'threat-intel-rag-pipeline',
    image: '/images/case-rag-pipeline.jpg',
    sector: 'Cyber security and AI',
    title: 'A self-hosted RAG pipeline that took threat attribution from hours to seconds',
    excerpt:
      'A threat intelligence firm could not put sensitive feeds through commercial LLM APIs. We built a self-hosted retrieval-augmented pipeline that answers attribution queries in seconds, with provenance the analysts trust.',
    client: 'A multinational cyber threat intelligence firm',
    duration: '7 months',
    teamSize: '3, one ML engineer, one platform engineer, one delivery lead',
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
      'The firm sells threat intelligence to enterprise and government clients, and its whole value rests on getting to the right answer faster than the adversary moves. It wanted to dramatically improve the speed, accuracy and scale at which emerging threats were identified, triaged and reported, and it had landed on large language models as the obvious lever.',
      'The obvious lever was also the one it could not pull. The data is sensitive, the clients are regulated, and the analysts are sceptical by trade, sending feeds out to a commercial cloud LLM API was a non-starter on every count. Whatever we built had to run on customer-controlled infrastructure, with provenance you could audit line by line, or it would not be used.',
      'Underneath that sat a more ordinary problem: analysts were drowning. Raw feeds arrived faster than anyone could read them, historic context lived in people’s heads, and a meaningful share of every shift went on chasing false positives rather than the incidents that mattered.',
    ],
    approach: [
      'We designed and built a retrieval-augmented generation pipeline in Python and LangChain, with vector databases ingesting, embedding and querying vast volumes of threat intelligence. The point of it was plain-language interrogation: an analyst could ask a question of both historic and live data and get a grounded answer back, with the underlying sources attached rather than asserted.',
      'To enrich the raw feeds before they ever reached an analyst, we developed automated classification and entity-extraction models, deployed behind scalable FastAPI microservices on Docker and Kubernetes. That gave the firm a horizontally scalable enrichment layer that ran entirely inside its own boundary.',
      'On top of the pipeline we built automated reporting: LLM-driven summarisation that generates the customer-facing PDF intelligence reports the firm sells, with structured formatting and visualisations rather than a wall of generated text.',
      'Because this was AI in a regulated setting, the engineering discipline mattered as much as the models. We wired up end-to-end CI/CD with pytest and Cypress and built an evaluation harness around data provenance, model quality and responsible deployment, so a change to a prompt or a model was tested like any other change, not trusted on faith.',
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
      'The firm now has a proven, end-to-end capability for self-hosted, domain-tuned LLMs in a regulated, customer-controlled environment, the thing the market said could not be done safely.',
    ],
    quote: {
      text: 'We were told self-hosted LLMs were a research project, not a product. They shipped us one that our analysts actually trust.',
      attribution: 'Head of Threat Intelligence',
    },
    order: 1,
  },
  {
    slug: 'quant-market-data-platform',
    image: '/images/case-quant.jpg',
    sector: 'Financial services, Quantitative trading',
    title: 'Replacing a C# monolith with a low-millisecond market-data platform',
    excerpt:
      'A quant firm’s market-making stack was a monolith that throttled every new idea. We migrated it to Python microservices and built a Rust market-data layer running at low-millisecond latency across multiple exchanges.',
    client: 'A quantitative trading firm',
    duration: '10 months',
    teamSize: '4, two senior engineers, one SRE, one delivery lead',
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
      'To move forward the firm needed three things at once, real-time market data from multiple exchanges, a robust historical data foundation to research and back-test against, and the observability that live trading at low-millisecond latencies demands. The existing architecture offered none of them, and at trading latencies the usual “just add a queue” answers do not survive contact with reality.',
    ],
    approach: [
      'We led the migration of the market-making system from a monolithic C# architecture to a Python-based microservices design, deployed via Docker with RabbitMQ carrying asynchronous communication between services. Decoupling the monolith into services was what made every later improvement, and every new product, possible.',
      'For the hot path we did not compromise: we designed and built a high-throughput real-time market data ingestion system in Rust and Redis, processing live order-book and trade data from multiple exchanges at low-millisecond end-to-end latencies. Rust gave us the predictable performance the trading desk needed without the operational footguns of hand-tuned C++.',
      'Alongside the live feed we built a historical data pipeline that combined real-time streaming, polling and archival, TimescaleDB for efficient querying of terabytes of historical data, and S3 with Parquet for scalable, cheap cold storage. One pipeline now feeds both live trading and offline research from a single, consistent record.',
      'Finally we made the whole thing legible. Monitoring and alerting on Prometheus and Grafana track market anomalies, system health and trading-strategy performance in real time, so the desk and the engineers are looking at the same picture rather than arguing about whose number is right.',
    ],
    delivered: [
      'A migration from a C# monolith to Python microservices on Docker, with RabbitMQ for asynchronous inter-service messaging.',
      'A Rust and Redis market-data ingestion layer handling multi-exchange order-book and trade data at low-millisecond latency.',
      'A unified historical pipeline, TimescaleDB for hot queries, S3 and Parquet for terabyte-scale cold storage.',
      'Real-time monitoring and alerting on Prometheus and Grafana for market anomalies, system health and strategy performance.',
    ],
    outcome: [
      'The fragmented C# monolith was replaced by a unified Python microservice platform, new product development became feasible on the same foundation, where before it had stalled.',
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

export const caseStudiesDb: CaseStudy[] = [
  {
    slug: 'threat-intel-detection-warehouse',
    image: '/images/case-detection-warehouse.jpg',
    sector: 'Cyber security, Data & analytics',
    title: 'Consolidating fragmented detection telemetry into one governed threat-intelligence warehouse',
    excerpt:
      'A managed threat-intelligence provider ran its detections and customer reporting off a dozen disconnected telemetry stores. We built a single governed warehouse, modelled, lineage-tracked and tenant-isolated, that answers cross-source threat questions in seconds.',
    client: 'A managed detection and threat-intelligence provider',
    duration: '9 months',
    teamSize: '4, two data engineers, one platform engineer, one delivery lead',
    technologies: [
      'Snowflake',
      'dbt',
      'Apache Kafka (Debezium CDC)',
      'Airflow',
      'Parquet / Avro',
      'Python',
      'Terraform',
      'Great Expectations',
    ],
    challenge: [
      'The provider monitors its customers’ estates and sells the intelligence that comes out of it, so its whole value rests on answering questions that cross every sensor it runs, how an indicator seen on one customer’s network relates to activity across the rest of the fleet, over time. But that telemetry lived in a dozen disconnected stores: endpoint logs in one system, network and DNS data in another, enrichment feeds in a third, each with its own schema, retention and definition of seemingly shared terms. Every cross-source report was stitched together by hand, took analysts days, and was quietly contradicted by the next one.',
      'Because the data was customer telemetry, often regulated, sometimes OFFICIAL-SENSITIVE, the ad-hoc extracts were also a governance liability: nobody could say with confidence which analyst could see which tenant’s data, where a given detection figure had come from, or whether a customer offboarding had actually purged their records everywhere they had been copied. A reporting problem was, underneath, an accountability problem.',
      'The brief was not "build a dashboard". It was to stand up a single source of truth the SOC and the customers could trust, defensible to an analyst, to an auditor, and to a client’s own security team, and to hand it over as something the in-house team could run and extend without us.',
    ],
    approach: [
      'We started with the modelling, because that is where these programmes succeed or fail. We mapped the genuinely shared entities across the telemetry sources, assets, identities, indicators, detections, and built conformed dimensions and fact tables in the Kimball tradition, with slowly-changing dimensions wherever an indicator’s history had to be preserved rather than overwritten. The warehouse was layered explicitly, a raw landing zone that is never edited, a cleaned and conformed core, and analyst- and customer-facing marts, so that every published figure traces back, through version-controlled dbt models, to the exact source event that produced it.',
      'For ingestion we treated the source systems’ change logs as the system of record. Rather than hammering live detection platforms with nightly extract queries, we used log-based change-data-capture (Debezium onto Kafka) to stream inserts, updates and deletes as they happened, and made every load idempotent so a pipeline could be safely re-run without double-counting. Each downstream table is a derived, rebuildable view of that change stream, which means a bad transformation is a redeploy, not a data-loss incident.',
      'We designed for the schemas changing underneath us, because across a dozen sensors and third-party feeds they always do. Producer teams and vendors were held to explicit data contracts, pipelines used backward- and forward-compatible encodings (Avro and Parquet), and every schema migration was tested against real historic data before it ran. Data-quality assertions (Great Expectations) run on every load, so a feed silently changing a field’s meaning trips an alert instead of corrupting a quarter of detections.',
      'Governance was engineered in, not bolted on. Records are classified and tagged by tenant at the point of ingestion, access is least-privilege and fully auditable through role-based controls with hard tenant isolation, lineage is captured automatically from source to dashboard, and retention and erasure are enforced by the pipeline, so a customer offboarding provably purges every derived table rather than relying on someone remembering the copies. The whole estate is defined in Terraform so it can be rebuilt from a known state.',
    ],
    delivered: [
      'A single governed Snowflake warehouse consolidating a dozen telemetry sources, layered into raw, conformed-core and analyst- and customer-facing marts.',
      'Log-based change-data-capture ingestion (Debezium / Kafka) with idempotent, replayable loads and orchestrated dependencies in Airflow.',
      'Version-controlled, tested dbt models giving end-to-end lineage from any published detection figure back to its source event.',
      'Automated data-quality gates, classification and tenant-tagging at ingestion, least-privilege auditable access with hard tenant isolation, and pipeline-enforced retention and erasure.',
      'Full infrastructure as code in Terraform, plus runbooks and a handover that left the in-house team owning the platform.',
    ],
    outcome: [
      'Cross-source threat questions that previously took analysts days of manual stitching are now answered against the warehouse in seconds, from numbers the SOC can defend.',
      'Every published detection figure is traceable to source, and tenant access and customer erasure are provable, turning a standing audit risk into an answerable question.',
      'The in-house team now operates and extends the warehouse independently, onboarding new telemetry sources against the same conformed model rather than starting another silo.',
    ],
    quote: {
      text: 'For the first time we can give the same answer twice and show exactly which sensor it came from. That is worth more than any dashboard.',
      attribution: 'VP of Threat Intelligence',
    },
    order: 1,
  },
  {
    slug: 'threat-intel-rag-pipeline',
    image: '/images/case-rag-pipeline.jpg',
    sector: 'Cyber security and AI',
    title: 'A self-hosted RAG pipeline that took threat attribution from hours to seconds',
    excerpt:
      'A threat intelligence firm was drowning in terabytes of heterogeneous feeds it could not put through commercial LLM APIs. We built the governed data platform underneath, high-volume ingestion, normalised storage, full provenance, and a self-hosted RAG layer that answers attribution queries in seconds.',
    client: 'A multinational cyber threat intelligence firm',
    duration: '7 months',
    teamSize: '3, one data/ML engineer, one platform engineer, one delivery lead',
    technologies: [
      'Python',
      'Apache Kafka',
      'Airflow',
      'PostgreSQL',
      'Parquet / S3',
      'LangChain',
      'Self-hosted LLM (RAG)',
      'Pinecone',
      'Weaviate',
      'FastAPI',
      'Docker & Kubernetes',
      'pytest / Cypress',
    ],
    challenge: [
      'The firm sells threat intelligence to enterprise and government clients, and its whole value rests on getting to the right answer faster than the adversary moves. It wanted to dramatically improve the speed, accuracy and scale at which emerging threats were identified, triaged and reported, and it had landed on large language models as the obvious lever.',
      'The obvious lever was also the one it could not pull. The data is sensitive, the clients are regulated, and the analysts are sceptical by trade, sending feeds out to a commercial cloud LLM API was a non-starter on every count. Whatever we built had to run on customer-controlled infrastructure, with provenance you could audit line by line, or it would not be used.',
      'Underneath that sat a more ordinary, and more fundamental, problem: there was no trustworthy data foundation. Raw feeds arrived faster than anyone could read them, in dozens of incompatible formats, from sources whose schemas changed without warning; historic context lived in people’s heads; and a meaningful share of every shift went on chasing false positives rather than the incidents that mattered. No retrieval layer would be worth anything sitting on top of data nobody could trust or trace.',
    ],
    approach: [
      'Before any model, we built the data platform underneath. We stood up high-volume ingestion on Apache Kafka to absorb terabytes of heterogeneous live and historic feeds, normalised them into a consistent schema with explicit data contracts so a source changing its format tripped an alert rather than poisoning the store, and orchestrated the batch enrichment in Airflow. Structured records landed in PostgreSQL and the raw, immutable corpus in Parquet on S3, a layered, rebuildable store where every record carries the provenance of where it came from and when.',
      'On that foundation we designed and built a retrieval-augmented generation pipeline in Python and LangChain, with vector databases embedding and querying vast volumes of threat intelligence. The point of it was plain-language interrogation: an analyst could ask a question of both historic and live data and get a grounded answer back, with the underlying sources, and their full lineage, attached rather than asserted.',
      'To enrich the raw feeds before they ever reached an analyst, we developed automated classification and entity-extraction models, deployed behind scalable FastAPI microservices on Docker and Kubernetes. That gave the firm a horizontally scalable enrichment layer that ran entirely inside its own boundary.',
      'On top of the pipeline we built automated reporting: LLM-driven summarisation that generates the customer-facing PDF intelligence reports the firm sells, with structured formatting and visualisations rather than a wall of generated text.',
      'Because this was AI in a regulated setting, the engineering discipline mattered as much as the models. We wired up end-to-end CI/CD with pytest and Cypress and built an evaluation harness around data provenance, model quality and responsible deployment, so a change to a prompt or a model was tested like any other change, not trusted on faith.',
    ],
    delivered: [
      'A high-volume ingestion and storage platform, Kafka, Airflow, PostgreSQL and Parquet on S3, normalising terabytes of heterogeneous feeds behind explicit, alerting data contracts.',
      'A retrieval-augmented generation pipeline (Python, LangChain) over Pinecone and Weaviate, queryable in natural language with full source lineage.',
      'Classification and entity-extraction models enriching raw feeds, served by FastAPI microservices on Kubernetes.',
      'An automated reporting pipeline producing structured, customer-facing PDF intelligence reports.',
      'End-to-end CI/CD with pytest and Cypress, plus an evaluation harness tracking data provenance and model quality.',
    ],
    outcome: [
      'A trustworthy, fully traceable data foundation now underpins every query, terabytes of once-siloed feeds normalised into a single governed store.',
      'Analyst time-to-insight on attribution and historic-data queries fell from hours to seconds.',
      'False-positive rates dropped significantly, freeing analysts to concentrate on the highest-priority incidents.',
      'The firm now has a proven, end-to-end capability for self-hosted, domain-tuned LLMs over a governed data platform in a regulated, customer-controlled environment, the thing the market said could not be done safely.',
    ],
    quote: {
      text: 'We were told self-hosted LLMs were a research project, not a product. They shipped us one that our analysts actually trust.',
      attribution: 'Head of Threat Intelligence',
    },
    order: 3,
  },
  {
    slug: 'quant-market-data-platform',
    image: '/images/case-quant.jpg',
    sector: 'Financial services, Quantitative trading',
    title: 'Replacing a C# monolith with a low-millisecond market-data platform',
    excerpt:
      'A quant firm’s market-making stack was a monolith that throttled every new idea. We migrated it to Python microservices and built a Rust market-data layer running at low-millisecond latency across multiple exchanges.',
    client: 'A quantitative trading firm',
    duration: '10 months',
    teamSize: '4, two senior engineers, one SRE, one delivery lead',
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
      'To move forward the firm needed three things at once, real-time market data from multiple exchanges, a robust historical data foundation to research and back-test against, and the observability that live trading at low-millisecond latencies demands. The existing architecture offered none of them, and at trading latencies the usual “just add a queue” answers do not survive contact with reality.',
    ],
    approach: [
      'We led the migration of the market-making system from a monolithic C# architecture to a Python-based microservices design, deployed via Docker with RabbitMQ carrying asynchronous communication between services. Decoupling the monolith into services was what made every later improvement, and every new product, possible.',
      'For the hot path we did not compromise: we designed and built a high-throughput real-time market data ingestion system in Rust and Redis, processing live order-book and trade data from multiple exchanges at low-millisecond end-to-end latencies. Rust gave us the predictable performance the trading desk needed without the operational footguns of hand-tuned C++.',
      'Alongside the live feed we built a historical data pipeline that combined real-time streaming, polling and archival, TimescaleDB for efficient querying of terabytes of historical data, and S3 with Parquet for scalable, cheap cold storage. One pipeline now feeds both live trading and offline research from a single, consistent record.',
      'Finally we made the whole thing legible. Monitoring and alerting on Prometheus and Grafana track market anomalies, system health and trading-strategy performance in real time, so the desk and the engineers are looking at the same picture rather than arguing about whose number is right.',
    ],
    delivered: [
      'A migration from a C# monolith to Python microservices on Docker, with RabbitMQ for asynchronous inter-service messaging.',
      'A Rust and Redis market-data ingestion layer handling multi-exchange order-book and trade data at low-millisecond latency.',
      'A unified historical pipeline, TimescaleDB for hot queries, S3 and Parquet for terabyte-scale cold storage.',
      'Real-time monitoring and alerting on Prometheus and Grafana for market anomalies, system health and strategy performance.',
    ],
    outcome: [
      'The fragmented C# monolith was replaced by a unified Python microservice platform, new product development became feasible on the same foundation, where before it had stalled.',
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

export type Variant = 'before' | 'db'

const byOrder = (a: CaseStudy, b: CaseStudy) => a.order - b.order

export const sortedCaseStudiesBefore = [...caseStudiesBefore].sort(byOrder)
export const sortedCaseStudiesDb = [...caseStudiesDb].sort(byOrder)

export function getCaseStudy(slug: string, variant: Variant): CaseStudy | undefined {
  const list = variant === 'db' ? caseStudiesDb : caseStudiesBefore
  return list.find((c) => c.slug === slug)
}

/** Union of slugs across both variants, for generateStaticParams. */
export const allCaseStudySlugs = Array.from(
  new Set([...caseStudiesBefore, ...caseStudiesDb].map((c) => c.slug)),
)
