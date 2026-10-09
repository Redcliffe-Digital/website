'use client'

import { useForm, ValidationError } from '@formspree/react'
import { site } from '@/lib/site'

// No focus:outline-none here. A 1px border changing colour is a weaker signal
// than the 2px offset ring the rest of the site uses, and swapping one for the
// other would make the form the only place where focus is harder to find. The
// global *:focus-visible rule in globals.css supplies the ring; the border
// colour stays as a second cue.
const FIELD =
  'rounded-brand border-control bg-bg text-body-sm text-fg placeholder:text-fg-muted hover:border-fg-muted focus:border-accent min-h-12 w-full border px-4 py-3 transition-colors duration-200'

const ERROR = 'text-accent text-label mt-2 block'

function Label({ htmlFor, children, hint }: { htmlFor: string; children: string; hint?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-label-sm text-fg-muted mb-2 block font-mono tracking-[0.08em] uppercase"
    >
      {children}
      {hint ? <span className="ml-2 tracking-normal normal-case">{hint}</span> : null}
    </label>
  )
}

/**
 * Contact form, submitted to Formspree via @formspree/react's useForm hook, so
 * the success state stays in page rather than redirecting away. The hook
 * handles submission, field-level validation errors and the submitting flag.
 *
 * Formspree also does the spam filtering, including the honeypot below, so the
 * site needs no server route and no secrets of its own. That matters here: the
 * site is a static export on GitHub Pages, where there is no server to run one.
 */
export function ContactForm() {
  const [state, handleSubmit] = useForm(site.formspreeId)

  if (state.succeeded) {
    return (
      <div role="status" className="rounded-brand border-accent-deep bg-surface border p-8">
        <h3 className="text-label text-accent font-mono tracking-[0.08em] uppercase">
          Message sent
        </h3>
        <p className="text-body-sm mt-3 max-w-[52ch]">
          Thank you. We read every enquiry ourselves and will come back to you within one working
          day, including when the honest answer is that we are not the right team. If it is urgent,
          email{' '}
          <a href={`mailto:${site.email}`} className="link-accent">
            {site.email}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <input id="name" name="name" type="text" required autoComplete="name" className={FIELD} />
        <ValidationError prefix="Name" field="name" errors={state.errors} className={ERROR} />
      </div>

      <div>
        <Label htmlFor="email">Work email</Label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={FIELD}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className={ERROR} />
      </div>

      <div>
        <Label htmlFor="organisation" hint="(optional)">
          Organisation
        </Label>
        <input
          id="organisation"
          name="organisation"
          type="text"
          autoComplete="organization"
          className={FIELD}
        />
      </div>

      <div>
        <Label htmlFor="message">How can we help?</Label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          aria-describedby="message-hint"
          className={`${FIELD} resize-y`}
        />
        <p id="message-hint" className="text-label text-fg-muted mt-2">
          What you are trying to deliver, and what is currently in the way. Detail helps us give you
          a straight answer.
        </p>
        <ValidationError prefix="Message" field="message" errors={state.errors} className={ERROR} />
      </div>

      {/* Honeypot. Formspree discards any submission where _gotcha is filled,
          so this needs no server code of our own. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-website">Leave this field empty</label>
        <input id="company-website" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <ValidationError errors={state.errors} className={ERROR} />

      <button
        type="submit"
        disabled={state.submitting}
        className="rounded-brand bg-accent text-label text-bg min-h-12 w-full px-6 font-mono tracking-[0.08em] uppercase transition-[background-color,transform] duration-200 ease-[var(--ease-spring-subtle)] hover:bg-[#f08965] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        {state.submitting ? 'Sending' : 'Send enquiry'}
      </button>
    </form>
  )
}
