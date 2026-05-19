/** Tiny class-name joiner. Keeps a tailwind-friendly API without pulling in a dep. */
export default function clsx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
