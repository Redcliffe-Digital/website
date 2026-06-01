import { Image as ImageIcon } from 'lucide-react'

/**
 * Neutral image placeholder sized to a given aspect ratio. Marks where a real
 * photo should go without shipping stock imagery.
 *
 * TODO: replace each use with a real <img> (drop the file in public/images/ and
 * render it with object-cover at the same aspect), once licensed photography is
 * available.
 */
export function ImagePlaceholder({
  /** Tailwind aspect-ratio class, e.g. 'aspect-[4/3]'. */
  ratio = 'aspect-[4/3]',
  label = 'Photo to come',
  className = '',
}: {
  ratio?: string
  label?: string
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={`border-hairline bg-stripe text-muted/45 flex items-center justify-center rounded-sm border ${ratio} ${className}`}
    >
      <span className="flex flex-col items-center gap-2">
        <ImageIcon className="h-8 w-8" strokeWidth={1.25} />
        <span className="text-[11px] font-medium tracking-wide uppercase">{label}</span>
      </span>
    </div>
  )
}
