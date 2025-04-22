/**
 * Formats a given Date object into a string in the format 'YYYY-MM-DD'.
 *
 * @param date - The Date object to format.
 * @returns A string representing the formatted date.
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}