'use client'

import { useForm, ValidationError } from '@formspree/react'
import { Button } from '@/components/Button'
import { site } from '@/lib/site'

const fieldClass =
  'mt-2 w-full border border-hairline bg-card px-4 py-3 text-body placeholder:text-muted/60 focus:border-oxblood'
const labelClass = 'block text-sm font-medium text-ink'
const errorClass = 'text-oxblood mt-2 block text-sm'

/**
 * Contact form, submitted to Formspree via @formspree/react's useForm hook so we
 * can show an in-page success state instead of redirecting away. The hook
 * handles submission, field-level validation errors and the submitting flag.
 */
export function ContactForm() {
  const [state, handleSubmit] = useForm(site.formspreeId)

  if (state.succeeded) {
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
          <ValidationError
            prefix="Name"
            field="name"
            errors={state.errors}
            className={errorClass}
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
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className={errorClass}
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
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className={errorClass}
          />
        </div>
      </div>

      {/* Honeypot — hidden from people, tempting to bots. Formspree drops submissions
          where _gotcha is filled, so this needs no server code of our own. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-website">Leave this field empty</label>
        <input id="company-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" variant="primary" className="mt-8" disabled={state.submitting}>
        {state.submitting ? 'Sending…' : 'Send message'}
      </Button>

      <ValidationError errors={state.errors} className="text-oxblood mt-4 block text-sm" />
    </form>
  )
}
