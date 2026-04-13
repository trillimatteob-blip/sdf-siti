import Link from "next/link";

export default function PricingCard({
  title,
  subtitle,
  price,
  duration,
  features = [],
  featured = false,
  ctaText = "INIZIA ORA",
  ctaLink = "/contatti",
}) {
  return (
    <div
      className={`card p-8 flex flex-col relative ${
        featured ? "card-featured" : ""
      }`}
    >
      {/* Featured badge */}
      {featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-black-deep font-heading text-xs tracking-widest px-4 py-1">
          PIU SCELTO
        </span>
      )}

      {/* Title */}
      <h3 className="font-heading text-2xl tracking-wider text-white-warm mb-1">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm text-gray-muted mb-6">{subtitle}</p>
      )}

      {/* Price */}
      <div className="mb-6">
        <span className="font-heading text-5xl text-gold-gradient">{price}</span>
        {duration && (
          <span className="text-sm text-gray-muted ml-2">/ {duration}</span>
        )}
      </div>

      {/* Features */}
      <ul className="flex-1 space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-muted">
            <span className="text-gold text-xs mt-1">&#9670;</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={ctaLink}
        className={`${featured ? "btn-gold" : "btn-ghost"} w-full text-center`}
      >
        {ctaText}
      </Link>
    </div>
  );
}
