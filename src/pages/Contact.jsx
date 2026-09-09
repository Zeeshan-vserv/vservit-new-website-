import { useState } from 'react'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Reveal from '../components/motion/Reveal'
import PageHero from '../components/layout/PageHero'
import { services } from '../data/services'

const initialForm = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
}

/**
 * Contact page. The form is currently client-side only — wire `onSubmit` to
 * the CRM/mail endpoint when it is available.
 */
export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }))

  const onSubmit = (event) => {
    event.preventDefault()
    // TODO: POST to the contact endpoint.
    setSubmitted(true)
  }

  const fieldClass =
    'w-full rounded-xl border border-line bg-ink-850 px-4 py-3 text-sm text-white outline-none ' +
    'transition-colors placeholder:text-muted-soft focus:border-brand-500'

  return (
    <>
      <PageHero
        badge="Get In Touch"
        badgeIcon="Mail"
        title="Let's Build a Better IT Environment"
        titleMuted="Secure. Scalable. Ready to Perform"
        description="Tell us what you're looking to improve. Our experts will help you identify the right infrastructure, security, cloud, AI, software, or managed IT solution."
      />

      <section className="py-20 md:py-28">
        <Container size="narrow">
          <Reveal>
            <Card className="p-8 md:p-12">
              {submitted ? (
                <div className="py-12 text-center">
                  <h2 className="font-display text-display-sm font-semibold">
                    Thanks — we have your message.
                  </h2>
                  <p className="mt-4 text-[15px] text-muted">
                    A Vserv specialist will get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm text-muted-strong">
                        Full name
                      </label>
                      <input
                        id="name"
                        required
                        value={form.name}
                        onChange={update('name')}
                        placeholder="Your name"
                        className={fieldClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm text-muted-strong">
                        Work email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={update('email')}
                        placeholder="you@company.com"
                        className={fieldClass}
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="company" className="text-sm text-muted-strong">
                        Company
                      </label>
                      <input
                        id="company"
                        value={form.company}
                        onChange={update('company')}
                        placeholder="Company name"
                        className={fieldClass}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="service" className="text-sm text-muted-strong">
                        What do you need help with?
                      </label>
                      <select
                        id="service"
                        value={form.service}
                        onChange={update('service')}
                        className={fieldClass}
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service.slug} value={service.slug}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm text-muted-strong">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Tell us about your environment and what you're trying to improve."
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  <Button type="submit" size="lg" className="mt-2 self-start">
                    Start Your IT Journey
                  </Button>
                </form>
              )}
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
