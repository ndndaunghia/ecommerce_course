export const TYPE_FILE = [
  'image/jpg',
  'image/JPG',
  'image/jpeg',
  'image/JPEG',
  'image/png',
  'image/PNG',
  'image/svg+xml',
  'image/webp',
]

export const MAX_STRING_SIZE = 255
export const MAX_SIZE_NAME = 50

export const ACTIVE_STATUS = {
  LOCK: 0,
  UNLOCK: 1,
}

export const TYPE_SUBMIT = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
}

export const PERMISSIONS = {
  LIST: {
    // List permission
    USERS: 'list-users',
  },
  ADD: {
    // Add permission
    USERS: 'create-user',
  },
  EDIT: {
    // Edit permission
    USERS: 'edit-user',
  },
  DELETE: {
    // Delete permission
    USERS: 'delete-user',
  },
  DETAIL: {
    // Detail permission
  }
}
