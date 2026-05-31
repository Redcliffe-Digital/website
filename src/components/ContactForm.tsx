'use client'

import { useState } from 'react'
import { Button } from '@/components/Button'
import { site } from '@/lib/site'

const fieldClass =
  'mt-2 w-full border border-hairline bg-card px-4 py-3 text-body placeholder:text-muted/60 focus:border-oxblood'
const labelClass = 'block text-sm font-medium text-ink'

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Contact form, submitted to Formspree via fetch so we can show an in-page
 * success state instead of redirecting away. Falls back gracefully: if the
 * endpoint is unset or the request fails, we surface a clear error pointing the
 * visitor at the direct email address.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('submitting')
    try {
      const response = await fetch(site.formspreeEndpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border-hairline bg-stripe max-w-xl border p-8" role="status">
        <p className="text-ink text-lg font-medium">Thanks — your message is on its way.</p>
        <p className="text-body mt-2 leading-relaxed">
          We’ll come back to you within one working day. If it’s urgent, email us directly at{' '}
          <a href={`mailto:${site.email}`} className="link-accent">
            {site.email}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="organisation" className={labelClass}>
            Organisation
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            className={fieldClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            How can we help?
          </label>
          <textarea id="message" name="message" rows={6} required className={fieldClass} />
        </div>
      </div>

      {/* Honeypot — hidden from people, tempting to bots. Formspree drops submissions
          where _gotcha is filled, so this needs no server code of our own. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-website">Leave this field empty</label>
        <input id="company-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" variant="primary" className="mt-8" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>

      {status === 'error' ? (
        <p className="text-oxblood mt-4 text-sm" role="alert">
          Something went wrong sending your message. Please email us directly at{' '}
          <a href={`mailto:${site.email}`} className="link-accent">
            {site.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  )
}
