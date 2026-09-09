import Container from '../components/ui/Container'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-[84px]">
      <Container size="narrow" className="text-center">
        <p className="font-display text-display-xl font-semibold text-brand-500">404</p>
        <h1 className="mt-4 font-display text-display-md font-semibold">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] text-muted">
          The link may be outdated, or the page may have moved. Head back to the
          homepage or talk to our team.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button to="/">Back to Home</Button>
          <Button to="/contact" variant="secondary">
            Get In Touch
          </Button>
        </div>
      </Container>
    </section>
  )
}
