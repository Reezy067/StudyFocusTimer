const PERMISSION_STATES = new Set(['default', 'granted', 'denied'])

function resolveEnvironment(environment, key, fallback) {
  return Object.prototype.hasOwnProperty.call(environment, key)
    ? environment[key]
    : fallback
}

export function getNotificationPermission(notificationApi = globalThis.Notification) {
  if (!notificationApi) {
    return 'unsupported'
  }

  return PERMISSION_STATES.has(notificationApi.permission)
    ? notificationApi.permission
    : 'unsupported'
}

export async function requestNotificationPermission(
  notificationApi = globalThis.Notification,
) {
  const currentPermission = getNotificationPermission(notificationApi)

  if (currentPermission !== 'default') {
    return currentPermission
  }

  try {
    const permission = await notificationApi.requestPermission()
    return PERMISSION_STATES.has(permission) ? permission : 'default'
  } catch {
    return getNotificationPermission(notificationApi)
  }
}

export async function showSystemNotification(
  { title, body },
  environment = {},
) {
  const notificationApi = resolveEnvironment(
    environment,
    'notificationApi',
    globalThis.Notification,
  )
  const documentApi = resolveEnvironment(
    environment,
    'documentApi',
    globalThis.document,
  )
  const serviceWorkerApi = resolveEnvironment(
    environment,
    'serviceWorkerApi',
    globalThis.navigator?.serviceWorker,
  )

  const canNotify = () =>
    getNotificationPermission(notificationApi) === 'granted' &&
    documentApi?.visibilityState !== 'visible'

  if (!canNotify()) {
    return false
  }

  try {
    const registration = await serviceWorkerApi?.getRegistration?.()

    if (
      canNotify() &&
      registration?.active &&
      typeof registration.showNotification === 'function'
    ) {
      await registration.showNotification(title, {
        body,
        tag: 'study-focus-timer-completion',
      })
      return true
    }
  } catch {
    // The constructor fallback below may still be available.
  }

  if (!canNotify()) {
    return false
  }

  try {
    new notificationApi(title, {
      body,
      tag: 'study-focus-timer-completion',
    })
    return true
  } catch {
    return false
  }
}
