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
    slug: 'dwp-claims-resilience',
    sector: 'Central government — Welfare',
    title: 'Cutting MTTR by 90% on a claims platform serving 4.2m citizens',
    excerpt:
      'A legacy benefits platform had no SLOs and a 47-minute mean time to resolve. We left the in-house team running it themselves, with MTTR under four minutes.',
    client: 'A central government department responsible for working-age benefits',
    duration: '6 months',
    teamSize: '3 — one principal engineer, one SRE, one delivery lead',
    technologies: ['AWS', 'Grafana', 'Loki', 'Tempo', 'Terraform', 'PagerDuty', '.NET'],
    challenge: [
      'The platform that processes benefit claims for 4.2 million working-age citizens ran on a legacy on-premises .NET monolith. It worked, mostly — but when it did not, nobody could say how badly or for how long.',
      'There were no service level objectives. Incidents were measured in anecdotes, not numbers, and mean time to resolve sat at 47 minutes. There was no shared on-call rota: the same two people were paged at all hours, and both were close to leaving.',
      'The post-incident culture was blameful. Reviews focused on who had pushed the change rather than why the system allowed a single change to take the service down. As a result, engineers had learned to deploy as little as possible — which made each deployment larger and riskier than the last.',
    ],
    approach: [
      'We started by making the problem measurable. Working with the department’s engineers, we defined a small set of service level objectives tied to things citizens actually experience: can a claim be submitted, and is it acknowledged within a few seconds. Everything else was noise until those were stable.',
      'We stood up an observability stack on AWS-hosted Grafana with Loki for logs and Tempo for traces, instrumented the monolith with OpenTelemetry, and replaced the folklore with dashboards the whole team could read. Error budgets gave the team an honest, shared language for when to ship features and when to stop and harden.',
      'We ran four game days against production-like environments — deliberately breaking things to rehearse the response — and wrote 23 runbooks covering the failure modes those exercises surfaced. We coached the in-house team into a sustainable on-call pattern with a fair rota and a clear escalation path, and stood up a no-blame post-incident review process modelled on Etsy’s debriefing facilitation guide.',
    ],
    delivered: [
      'A defined set of SLOs and error budgets, owned by the in-house team.',
      'An AWS-hosted Grafana, Loki and Tempo observability stack, provisioned with Terraform.',
      '23 runbooks covering the failure modes surfaced during four game days.',
      'A fair, documented on-call rota and a no-blame post-incident review process.',
    ],
    outcome: [
      'Mean time to resolve fell from 47 minutes to under 4. Major incidents dropped from eight per quarter to one.',
      'Because the team could now see the consequences of a change, deployment frequency rose and change sizes shrank — the opposite of the spiral they had been in.',
      'Most importantly, the in-house team runs the platform without us. We were engaged for six months; we were not needed for a seventh.',
    ],
    quote: {
      text: 'They didn’t sell us a transformation. They sold us the smallest set of changes that would actually move the numbers. That was refreshing.',
      attribution: 'Deputy Director, Digital Operations',
    },
    order: 1,
  },
  {
    slug: 'lloyds-market-data-replatform',
    sector: "Insurance — Lloyd's of London market",
    title: "Replatforming a real-time pricing feed for a Lloyd's syndicate",
    excerpt:
      'A monolithic pricing engine required market-hours downtime for every model deploy. We gave the actuarial team zero-downtime deploys and 3.2x throughput on the same hardware.',
    client: "A specialty insurance syndicate at Lloyd's",
    duration: '9 months',
    teamSize: '4 — two principal engineers, one SRE, one delivery lead',
    technologies: ['Kafka', 'Kubernetes', 'Argo Rollouts', 'Go', 'kdb+', 'Prometheus'],
    challenge: [
      'The syndicate priced specialty risk through a monolithic pricing engine. It had grown organically over a decade, and it showed: every model deployment required downtime during market hours, which meant changes were batched up and shipped rarely, under pressure.',
      'The kdb+ market-data feeds the engine relied on were going stale under load, and there was no way to scale horizontally — the only lever was a bigger box. Three senior engineers had left in the previous year, taking undocumented knowledge with them.',
      'The actuarial team did not trust a system they could not deploy to safely, and the engineers did not trust a system they could not reason about. Neither was wrong.',
    ],
    approach: [
      'We did not propose a rewrite. We extracted a Kafka-backed event spine so that market data, pricing requests and results flowed through durable, replayable topics rather than in-process calls. This gave us a seam to work along without stopping the business.',
      'We containerised the pricing models and moved them onto Kubernetes, introducing canary deployments via Argo Rollouts so a new model version could take a slice of real traffic and be compared against the incumbent before any cutover.',
      'The decisive piece was a parallel-run reconciliation harness. For six weeks the new platform priced every real risk alongside the legacy system, and we reconciled the outputs to nine decimal places. That evidence — not a slide deck — is what gave the actuarial team the confidence to sign off the cutover.',
    ],
    delivered: [
      'A Kafka event spine decoupling market data, pricing and results.',
      'Containerised pricing models on Kubernetes with canary deploys via Argo Rollouts.',
      'A parallel-run reconciliation harness proving equivalence to nine decimal places.',
      'Runbooks and a knowledge-transfer programme to replace what had walked out the door.',
    ],
    outcome: [
      'Model deployments are now zero-downtime — they happen during market hours without anyone holding their breath.',
      'The same hardware now sustains 3.2x the throughput, because work scales horizontally across the cluster rather than vertically on one machine.',
      'The six-week parallel run gave the actuarial team the evidence they needed to sign off the cutover with confidence.',
    ],
    quote: {
      text: 'They thought like traders. Which sounds odd for a consultancy. It wasn’t.',
      attribution: 'Chief Technology Officer',
    },
    order: 2,
  },
  {
    slug: 'local-authority-cyber-essentials',
    sector: 'Local government',
    title: 'Achieving Cyber Essentials Plus across a 2,000-seat council',
    excerpt:
      'A unitary authority had failed a previous Cyber Essentials audit. We got them through Cyber Essentials Plus first time and cut their cyber insurance premium by £180k a year.',
    client: 'A unitary local authority in the West of England',
    duration: '4 months',
    teamSize: "2 plus the council's own IT team",
    technologies: ['Snipe-IT', 'Microsoft Intune', 'Group Policy', 'YubiKey', 'Microsoft 365'],
    challenge: [
      'The council had failed a previous Cyber Essentials attempt at audit, which is both expensive and demoralising. With 2,000 seats across 14 legacy Active Directory domains, nobody had an authoritative picture of what hardware and software the organisation actually ran.',
      'The estate was a mix of Intune-managed and unmanaged devices. Macro execution was unrestricted. Privileged accounts used passwords alone. Each of these is a straightforward audit failure on its own; together they were the reason the first attempt did not pass.',
      'The council also had councillors and a public who needed to understand, in plain terms, why this mattered and what was being spent.',
    ],
    approach: [
      'We started where every assurance exercise should: with an honest inventory. We built an authoritative asset register in Snipe-IT, reconciled against network discovery and Intune, so that for the first time the council could say with confidence what it owned and how it was configured.',
      'We then closed the specific gaps that fail audits. We locked down Office macro execution via Group Policy, brought unmanaged devices into Intune, and rolled out hardware MFA tokens to the 180 privileged accounts that represented the highest risk.',
      'Crucially, we ran two mock audits against the real Cyber Essentials Plus criteria before the assessor arrived, so there were no surprises on the day. We also wrote a short briefing the Head of ICT could take to councillors, in plain English, explaining the work and the saving it unlocked.',
    ],
    delivered: [
      'An authoritative asset register in Snipe-IT, reconciled against discovery and Intune.',
      'Macro execution locked down via Group Policy across the estate.',
      'Hardware MFA tokens rolled out to 180 privileged accounts.',
      'Two full mock audits ahead of the real assessment.',
    ],
    outcome: [
      'Cyber Essentials Plus was achieved first time — no remediation round, no re-test fee.',
      'The hardened posture cut the council’s cyber insurance premium by £180,000 a year.',
      'The asset register and the controls outlast the engagement: the council can re-certify next year without starting from scratch.',
    ],
    quote: {
      text: 'They explained things to my councillors in plain English. That alone was worth the fee.',
      attribution: 'Head of ICT',
    },
    order: 3,
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export const sortedCaseStudies = [...caseStudies].sort((a, b) => a.order - b.order)
