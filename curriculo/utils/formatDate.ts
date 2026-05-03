// utils/formatDate.ts

export function formatDate(date?: string | null): string {
  if (!date) return '';

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return date;
  }

  return value.toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateRange(
  start?: string | null,
  end?: string | null,
  current?: boolean
): string {
  const formattedStart = formatDate(start);

  if (!formattedStart && current) {
    return 'Atualmente';
  }

  if (!formattedStart && !end) {
    return 'Período não informado';
  }

  if (current) {
    return `${formattedStart} - Atualmente`;
  }

  const formattedEnd = formatDate(end);

  if (!formattedEnd) {
    return formattedStart;
  }

  return `${formattedStart} - ${formattedEnd}`;
}