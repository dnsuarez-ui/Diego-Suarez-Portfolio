const STORAGE_KEY = 'protectedWorkAccess'
const TTL_MS = 2 * 60 * 60 * 1000 // 2 hours

interface AccessRecord {
  token: string
  timestamp: number
}

export function hasValidAccess(): boolean {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const record = JSON.parse(raw) as AccessRecord
    if (!record.token || !record.timestamp) return false
    if (Date.now() - record.timestamp > TTL_MS) {
      sessionStorage.removeItem(STORAGE_KEY)
      return false
    }
    return true
  } catch {
    return false
  }
}

export function grantAccess(token: string) {
  const record: AccessRecord = { token, timestamp: Date.now() }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record))
}

export function clearAccess() {
  sessionStorage.removeItem(STORAGE_KEY)
}
