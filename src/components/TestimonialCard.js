export default function TestimonialCard({ quote, name, role }) {
  return (
    <div className="card p-8">
      {/* Gold quote mark */}
      <span className="block font-accent text-5xl text-gold leading-none mb-4">
        &ldquo;
      </span>

      {/* Quote */}
      <p className="font-accent text-lg italic text-white-warm/90 leading-relaxed mb-6">
        {quote}
      </p>

      {/* Attribution */}
      <div>
        <p className="text-gold font-heading text-base tracking-wider">{name}</p>
        {role && <p className="text-sm text-gray-muted mt-0.5">{role}</p>}
      </div>
    </div>
  );
}
