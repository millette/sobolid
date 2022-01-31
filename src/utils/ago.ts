// npm
import { formatDistance } from "date-fns"

// , subDays

function ago(date, options = { addSuffix: true }) {
  if (typeof date === "string") date = new Date(date)
  return formatDistance(date, new Date(), options)
}

export default ago
