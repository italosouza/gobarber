import { format, parseISO, isDate, formatRelative } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export const formatDate = (date, mask = "d 'de' MMMM") => {
  const newDate = isDate(date) ? date : parseISO(date)
  return format(newDate, mask, { locale: ptBR })
}

export const formatDateRelative = date => {
  const newDate = isDate(date) ? date : parseISO(date)
  return formatRelative(newDate, new Date(), {
    locale: ptBR,
    addSuffix: true,
  })
}
