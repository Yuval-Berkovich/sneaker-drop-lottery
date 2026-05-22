import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional class names, de-duplicating Tailwind utilities. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Zero-pad a number to two digits for clock displays. */
export function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** US shoe sizes offered in the entry form (7.0–13.0 in 0.5 steps, skipping 12.5). */
export const SHOE_SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13] as const;
