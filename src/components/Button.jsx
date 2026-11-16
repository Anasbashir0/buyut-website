import { Link } from "react-router-dom";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition duration-300 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  // The only gradient button on the site: the primary action.
  primary:
    "bg-gradient-to-r from-gold via-orange to-ember text-ink shadow-[0_10px_30px_-10px_rgba(237,129,38,0.7)] hover:-translate-y-0.5 hover:brightness-105",
  secondary: "border border-charcoal/25 bg-transparent text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-white",
  outline: "border border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink",
  dark: "bg-charcoal text-white hover:bg-rust",
  light: "bg-white text-ink hover:bg-gold",
};

export default function Button({
  to,
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to)
    return (
      <Link to={to} className={cls} {...props}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
