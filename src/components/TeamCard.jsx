// Portrait card: photo desaturated until hovered, name over a dark gradient.
export default function TeamCard({ person, showBio = false }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-charcoal">
        <img
          src={person.photo}
          alt={`Portrait of ${person.name}`}
          loading="lazy"
          className="h-full w-full object-cover object-top grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-xl font-semibold text-white">{person.name}</h3>
          <p className="mt-1 text-sm font-medium text-gold">{person.role}</p>
        </div>
        <span className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-gold to-ember transition-all duration-500 group-hover:w-full" />
      </div>
      {showBio && (
        <p className="mt-5 text-sm leading-relaxed text-charcoal/70">{person.bio}</p>
      )}
    </article>
  );
}
