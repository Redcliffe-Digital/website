import { Activity, Cloud, Database, ShieldCheck, type LucideIcon } from 'lucide-react'

/**
 * The four practice areas shown on /what-we-do, in two variants for the site
 * A/B toggle:
 *   - `practicesBefore` — the default site (cloud-led).
 *   - `practicesDb`     — the data-warehouse-led variant shown under ?v=db.
 * Anchors (`id`) must match the service links in src/lib/site.ts.
 */
export interface Practice {
  id: string
  icon: LucideIcon
  title: string
  lead: string
  paragraphs: string[]
}

const cloudPlatform: Practice = {
  id: 'cloud-platform-engineering',
  icon: Cloud,
  title: 'Cloud platform engineering',
  lead: 'AWS, Azure and hybrid platforms that teams can actually operate — built as code, observable from day one, and handed over clean.',
  paragraphs: [
    'Most of the platforms we are asked to fix were not badly built. They were built quickly, by people who have since moved on, and then left to drift. Permissions accreted, environments diverged, and the knowledge of how it all fits together left with the contractor who set it up. We start by making the estate legible again, then by making it reproducible.',
    'We work primarily on AWS and Azure, and we are comfortable with the hybrid reality of public sector estates where some workloads cannot yet leave the data centre. Everything we build is defined as code, in Terraform or AWS CDK, so that an environment can be torn down and recreated from a known state rather than nursed by hand. That discipline is what turns a one-off migration into a platform a team can keep.',
    'For organisations standing up a cloud presence at scale, we set up landing zones with a clear account structure, guardrails expressed as policy, and account vending so that a new service team can be given a safe, well-configured account in hours rather than weeks. We pair this with FinOps practices — tagging, budgets, and cost attribution that makes spend visible to the people who can act on it — because in the public sector an unexplained cloud bill is a political problem, not just a financial one.',
    'We do not consider a platform finished until it can be observed. We instrument services with OpenTelemetry, ship metrics to Prometheus, build dashboards in Grafana, and insist on structured logging that a responder can actually query at three in the morning. The goal is not a wall of graphs; it is the ability to answer, quickly and honestly, the question every incident begins with — what changed, and who is affected.',
    'A good deal of our work is migration: moving estates off DigitalOcean, Rackspace and on-premises VMware onto cloud platforms without a big-bang cutover. We favour the unglamorous, low-drama path — strangle the legacy system one capability at a time, prove each step in production behind a flag, and keep a working rollback until the new path has earned trust. It is slower to describe and faster to deliver, because nothing has to be undone.',
    'Throughout, we write things down where you keep your documentation, not ours. The point of the engagement is that when we leave, your team can extend the platform, reason about its costs, and respond to its incidents without phoning us. If we have done the job well, you will not need to.',
  ],
}

const resilience: Practice = {
  id: 'resilience-and-sre',
  icon: Activity,
  title: 'Resilience and SRE',
  lead: 'Error budgets, SLOs, game days and disaster recovery — the discipline of a trading floor applied to services citizens depend on.',
  paragraphs: [
    'On a trading floor, a five-second outage during market hours is a regulatory event. You learn very quickly to treat reliability as a measured, budgeted property of a system rather than a vague aspiration. We brought that mindset to a HMRC-adjacent claims platform and cut mean time to resolve from 47 minutes to under four. The techniques are not exotic; the rigour is.',
    'We begin with service level objectives that are tied to what users actually experience — can a form be submitted, is a payment acknowledged — not to internal proxies like CPU that tell you nothing about whether the service is doing its job. An SLO is only useful if breaching it changes a decision, so we pair it with an error budget: an agreed, finite amount of unreliability that the team is free to spend on shipping features, and that, once spent, triggers a shift to hardening. This replaces the usual argument between delivery and operations with a number everyone has agreed in advance.',
    'Resilience is not proven by hoping. We run game days — controlled exercises where we deliberately break a dependency and rehearse the response — and lightweight chaos engineering to surface the failure modes that only appear under stress. These sessions are as much about the humans as the software: they reveal the runbook that was out of date, the alert that pages the wrong person, and the single point of knowledge sitting in one engineer’s head.',
    'We design disaster recovery against honest recovery-time and recovery-point objectives, and then we test the restore, because a backup that has never been restored is a hope, not a control. We help teams plan capacity for the predictable surges — a benefits deadline, a tax year end — so that the busiest day of the year is not the day the service falls over.',
    'When incidents do happen, the response matters more than the prevention narrative. We set up blameless post-incident reviews that ask how the system allowed the failure rather than who pushed the change. That cultural shift is often the highest-leverage thing we do: in a no-blame environment, engineers report near-misses, deploy more often in smaller increments, and the organisation actually learns. In a blameful one, they hide problems until those problems become headlines.',
    'The outcome we aim for is a team that owns its own reliability — with the objectives, the tooling and the habits to keep a service dependable long after our engagement has ended.',
  ],
}

const security: Practice = {
  id: 'security-and-assurance',
  icon: ShieldCheck,
  title: 'Security and assurance',
  lead: 'Threat modelling, secure delivery, OFFICIAL-SENSITIVE handling and supply-chain integrity — assurance treated as engineering, not paperwork.',
  paragraphs: [
    'Security in government technology too often arrives as a gate at the end: a long document, a tense review, and a rush to remediate before go-live. We treat it as a property to be engineered in from the first sprint, because the cheapest vulnerability to fix is the one that never gets written, and the most expensive is the one found in production by someone who did not mean you well.',
    'We run threat modelling sessions early and keep them lightweight — working with your team to map what an attacker would actually want, where the trust boundaries are, and which mitigations are worth the cost. This produces a short, prioritised list of real risks rather than a generic checklist, and it gives developers the context to make good security decisions on their own between our reviews.',
    'We embed security into the delivery pipeline itself: a secure software development lifecycle with dependency scanning, secret detection, infrastructure policy checks and reproducible builds, so that the guardrails run on every commit rather than on a reviewer’s good day. Where formal testing is required, we coordinate penetration testing with CHECK and CREST-accredited providers, scope it so the findings are useful, and help the team triage and fix what comes back rather than letting the report gather dust.',
    'We are experienced with handling information at OFFICIAL and OFFICIAL-SENSITIVE, and with the controls expected around IL3-era environments and their modern equivalents. We align delivery with Cyber Essentials Plus and ISO/IEC 27001 — not as a certificate to be framed, but as a set of controls that genuinely reduce risk when they are actually operated rather than merely documented.',
    'Supply-chain security has moved from a niche concern to a board-level one, and rightly so. We produce software bills of materials so you know what is actually in your software, work towards SLSA provenance so you can prove how an artefact was built, and lock down the build and deployment path that attackers increasingly target in preference to the application itself.',
    'The thread running through all of this is assurance you can evidence. When an auditor, a senior responsible owner or a journalist asks whether a system is secure, we want your team to be able to answer with specifics — controls, tests and provenance — rather than with confidence alone.',
  ],
}

const dataBefore: Practice = {
  id: 'data-and-analytics',
  icon: Database,
  title: 'Data and analytics engineering',
  lead: 'Streaming and batch pipelines, warehouse design and real-time dashboards — built by people who moved sub-millisecond market data for a living.',
  paragraphs: [
    'Data engineering in the public sector usually fails for unglamorous reasons: pipelines that break silently, a warehouse no-one trusts, and dashboards that are subtly wrong in ways that only surface in a select committee. We build data platforms the way we built market-data systems — with correctness, lineage and latency treated as first-class requirements rather than afterthoughts.',
    'For movement of data we work across both streaming and batch. We build event pipelines on Kafka and Kinesis where freshness matters, and batch transformations with dbt where a nightly, well-tested, version-controlled model is the right tool. The decision between the two is an engineering judgement about what the data is for, not a fashion; we are happy to tell you when streaming would be expensive complexity in search of a problem.',
    'On the warehouse side we have designed and operated Redshift, Snowflake and BigQuery estates. The hard part is rarely the technology — it is the modelling. We invest in a clear, documented model with tested transformations and explicit ownership, so that two analysts asking the same question get the same answer, and so that a number on a dashboard can be traced back to its source.',
    'Real-time dashboards are where our background is most directly transferable. Moving market-data feeds with sub-millisecond budgets teaches you exactly where latency hides — in serialisation, in network hops, in the chatty query you did not notice. That same instinct applies cleanly to fraud detection, where the value of a signal decays by the second, and to operational monitoring, where a dashboard that lags reality by ten minutes is worse than no dashboard because it invites confident, wrong decisions.',
    'We treat data governance as part of the engineering, not a separate compliance exercise bolted on at the end. Personal data is classified, access is least-privilege and auditable, and retention is enforced by the pipeline rather than by a policy document nobody reads. For public sector clients this is not optional, and building it in from the start is far cheaper than retrofitting it after an audit.',
    'As with everything we do, the deliverable is a platform your team can run: documented models, tested pipelines, dashboards whose numbers you can defend, and the handover needed to keep all of it true as the questions change.',
  ],
}

const dataDb: Practice = {
  id: 'data-and-analytics',
  icon: Database,
  title: 'Data platform & warehouse engineering',
  lead: 'Warehouses, lakehouses and the pipelines that feed them — modelled for correctness, built for scale, and governed for regulated and sensitive data. The work we are known for.',
  paragraphs: [
    'A data warehouse is judged on three things, and we treat each as a first-class engineering requirement rather than a hope: is it reliable — does it keep producing correct answers when a source system misbehaves; is it scalable — does query latency and load time hold as volume grows from gigabytes to tens of terabytes; and is it maintainable — can the team that inherits it reason about, extend and trust it after we have gone. Most warehouses we are asked to rescue failed on the third long before the first.',
    'We model deliberately. Conformed dimensions and fact tables in the Kimball tradition, slowly-changing dimensions where history matters, and a clear separation between raw landing, a cleaned and conformed core, and the marts that analysts actually query. Every transformation is version-controlled and tested in dbt, so a number on a dashboard can be traced back through the model to the source row that produced it, and two analysts asking the same question get the same answer. A warehouse no-one trusts is just an expensive copy of the data.',
    'Getting data in is an exercise in correctness, not just plumbing. Where a nightly batch is the right tool we build idempotent, reproducible loads that can be re-run without double-counting; where freshness matters we use change-data-capture to stream inserts, updates and deletes off the source database’s log rather than hammering it with polling queries. We treat the log of changes as the system of record from which every downstream table is a derived, rebuildable view — so a bad transformation is a redeploy, not a data-loss incident.',
    'Schemas change, and a warehouse that cannot absorb that gracefully becomes a liability. We design for schema evolution from the start — explicit data contracts between producers and the warehouse, backward- and forward-compatible encodings (Avro, Protobuf, Parquet) on the pipelines, and migrations that are tested against real historic data before they run. When a source team adds a column or a department reorganises, the warehouse bends rather than breaks.',
    'On the technology we are deliberately plural: we have designed and operated Redshift, Snowflake, BigQuery and Databricks lakehouse estates, and we choose between them on the workload in front of us rather than on a partnership badge. The hard part is rarely the engine. It is the modelling, the partitioning and clustering that keep large-table queries fast, the cost attribution that keeps a per-query bill from becoming a political problem, and the discipline to keep all of it documented.',
    'We treat governance as part of the engineering, not a compliance exercise bolted on at the end. Personal, regulated and otherwise sensitive data is classified at ingestion, access is least-privilege and fully auditable, lineage is captured automatically rather than drawn in a diagram once and left to rot, and retention is enforced by the pipeline rather than by a policy document nobody reads. Building this in from the first sprint is far cheaper than retrofitting it after an audit — and whether the question comes from a regulator, an auditor or your own board, an unanswerable one about who can see what is not a technical problem, it is a reputational one.',
    'As with everything we do, the deliverable is a platform your team can run: documented models, tested pipelines, lineage you can show an auditor, dashboards whose numbers you can defend to a regulator or a board, and the handover needed to keep all of that true as the questions change.',
  ],
}

export const practicesBefore: Practice[] = [cloudPlatform, resilience, dataBefore, security]
export const practicesDb: Practice[] = [dataDb, cloudPlatform, resilience, security]
