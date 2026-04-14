// Check if we're running on the server
const isServer = typeof window === "undefined"

// Fallback storage for server environments
const storage = isServer
  ? new Map()
  : window.localStorage

// Helper to safely get/set storage values
function setStorage(key, value) {
  if (isServer) {
    storage.set(key, value)
  } else {
    window.localStorage.setItem(key, value)
  }
}

function getStorage(key) {
  if (isServer) {
    return storage.get(key)
  } else {
    return window.localStorage.getItem(key)
  }
}

function removeStorage(key) {
  if (isServer) {
    storage.delete(key)
  } else {
    window.localStorage.removeItem(key)
  }
}

// Get a value from URL or storage
function getParam(name, options = {}) {
  const { defaultValue, removeFromUrl = false } = options

  if (isServer) return defaultValue ?? null

  const params = new URLSearchParams(window.location.search)
  const valueFromUrl = params.get(name)

  // Optionally remove param from URL
  if (removeFromUrl && valueFromUrl) {
    params.delete(name)

    const newUrl =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "") +
      window.location.hash

    window.history.replaceState({}, document.title, newUrl)
  }

  // Priority: URL → default → storage
  if (valueFromUrl) {
    setStorage(name, valueFromUrl)
    return valueFromUrl
  }

  if (defaultValue !== undefined) {
    setStorage(name, defaultValue)
    return defaultValue
  }

  const stored = getStorage(name)
  return stored ?? null
}

// Collect all app parameters
function getAppParams() {
  // Optional: clear token if flag is set
  if (getParam("clear_token") === "true") {
    removeStorage("access_token")
  }

  return {
    appId: getParam("app_id", {
      defaultValue: import.meta.env.VITE_APP_ID,
    }),

    token: getParam("access_token", {
      removeFromUrl: true,
    }),

    fromUrl: getParam("from_url", {
      defaultValue: typeof window !== "undefined"
        ? window.location.href
        : "",
    }),

    apiVersion: getParam("api_version", {
      defaultValue: import.meta.env.VITE_API_VERSION,
    }),

    apiBaseUrl: getParam("api_base_url", {
      defaultValue: import.meta.env.VITE_API_BASE_URL,
    }),
  }
}

// Export final params
export const appParams = {
  ...getAppParams(),
}
