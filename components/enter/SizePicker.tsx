'use client';

import { SHOE_SIZES } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface SizePickerProps {
  value: number | null;
  onChange: (size: number) => void;
}

/** Wrap-grid of selectable shoe-size pills (single selection). */
export function SizePicker({ value, onChange }: SizePickerProps) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-2" role="radiogroup" aria-label="Shoe size">
      {SHOE_SIZES.map((size) => {
        const selected = value === size;
        return (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(size)}
            className={cn(
              'h-10 min-w-[56px] rounded border px-3.5 font-body text-[13px] transition-colors duration-200',
              selected
                ? 'border-accent bg-[rgba(167,139,250,0.15)] text-fg-primary'
                : 'border-border-subtle text-fg-secondary hover:border-accent hover:text-fg-primary'
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
