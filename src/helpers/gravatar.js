import crypto from 'crypto'
import { format } from 'date-fns'

export const getUserAvatarUrl = (email, size = 80) => {
  const trimmedEmail = email.trim().toLowerCase()
  const hashedEmail = crypto
    .createHash('sha256')
    .update(trimmedEmail)
    .digest('hex')

  return `https://www.gravatar.com/avatar/${hashedEmail}?s=${size}&d=404`
}

export const formatDateToQueryParams = (date) => format(date, 'yyyy-MM-dd')
