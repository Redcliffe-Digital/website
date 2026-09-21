/**
 * Credential badges: the accreditations Redcliffe Digital holds.
 *
 * NOTE: the emblems in public/badges are tasteful REPRESENTATIONS in each
 * body's brand colours, not the official issued artwork. Before launch, swap
 * each file for the real asset and link it to its verification page, used
 * within the awarding body's brand guidelines:
 *   - AWS Certified Developer – Associate: the holder's Credly badge image +
 *     verification URL (https://www.credly.com/badges/<id>).
 *   - Microsoft Certified: Azure Fundamentals: the holder's Credly /
 *     Microsoft Learn badge image + verification URL.
 *   - Cyber Essentials: the IASME-issued badge (carries the certificate
 *     number) + the entry on the NCSC/IASME certificate register.
 *   - ISO 27001: the UKAS-accredited certification body's mark + certificate
 *     reference.
 *   - Disability Confident: the DWP-issued badge at the correct level
 *     (Committed / Employer / Leader).
 */
export interface Accreditation {
  /** Badge artwork under public/badges. */
  badge: string
  /** The credential as it is awarded, spelled the way the issuer spells it. */
  name: string
  /** Who awards or backs it. */
  issuer: string
}

export const accreditations: Accreditation[] = [
  {
    badge: '/badges/aws-developer-associate.svg',
    name: 'AWS Certified Developer, Associate',
    issuer: 'Amazon Web Services',
  },
  {
    badge: '/badges/azure-fundamentals.svg',
    name: 'Azure Fundamentals',
    issuer: 'Microsoft Certified',
  },
  {
    badge: '/badges/cyber-essentials.svg',
    name: 'Cyber Essentials',
    issuer: 'NCSC backed scheme',
  },
  {
    badge: '/badges/iso-27001.svg',
    name: 'ISO/IEC 27001',
    issuer: 'Information security management',
  },
  {
    badge: '/badges/disability-confident.svg',
    name: 'Disability Confident Committed',
    issuer: 'UK Government scheme',
  },
]
