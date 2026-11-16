import SEO from "../components/SEO.jsx";
import Button from "../components/Button.jsx";

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center bg-cream px-5 py-24 text-center">
      <SEO title="Page not found" description="The page you are looking for does not exist." path="/404" />
      <div>
        <p className="font-display text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-charcoal/70">
          The page you are looking for does not exist or has moved.
        </p>
        <Button to="/" className="mt-8">
          Back to home
        </Button>
      </div>
    </section>
  );
}
