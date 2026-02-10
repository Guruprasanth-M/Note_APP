// API Service — handles all communication with https://api.selfmade.express
// Refer: https://github.com/Guruprasanth-M/API-dev/wiki

const API_BASE = 'https://api.selfmade.express';

/**
 * Send a POST request to the API
 * All endpoints use POST with form-urlencoded body
 */
async function post(endpoint, body = {}, token = null) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Convert object to URL-encoded form data
  const formBody = Object.keys(body)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
    .join('&');

  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers,
      body: formBody || undefined,
    });

    const data = await response.json();
    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    return { ok: false, status: 0, data: { status: 'FAILED', msg: 'Network error — check your connection' } };
  }
}

// ==================== AUTH ====================

/** POST /signup — Register a new user */
export async function signup(username, password, email, phone) {
  return post('signup', { username, password, email, phone });
}

/** POST /login — Login with username/email + password */
export async function login(username, password) {
  return post('login', { username, password });
}

/** POST /logout — Terminate current session */
export async function logout(token) {
  return post('logout', {}, token);
}

/** POST /refresh — Get new access token using refresh token */
export async function refresh(refreshToken) {
  return post('refresh', { refresh_token: refreshToken });
}

// ==================== FOLDERS ====================

/** POST /foldercreate — Create a new folder */
export async function createFolder(name, token) {
  return post('foldercreate', { name }, token);
}

/** POST /folderlist — List all user's folders */
export async function listFolders(token) {
  return post('folderlist', {}, token);
}

/** POST /folderrename — Rename a folder */
export async function renameFolder(id, name, token) {
  return post('folderrename', { id, name }, token);
}

/** POST /folderdelete — Delete a folder and all its notes */
export async function deleteFolder(id, token) {
  return post('folderdelete', { id }, token);
}

/** POST /foldernotes — Get all notes in a folder */
export async function folderNotes(id, token) {
  return post('foldernotes', { id }, token);
}

// ==================== NOTES ====================

/** POST /notecreate — Create a note in a folder */
export async function createNote(title, body, folderId, token) {
  return post('notecreate', { title, body, folder_id: folderId }, token);
}

/** POST /noteget — Get a single note */
export async function getNote(id, token) {
  return post('noteget', { id }, token);
}

/** POST /noteedit — Edit a note's title and/or body */
export async function editNote(id, fields, token) {
  return post('noteedit', { id, ...fields }, token);
}

/** POST /notedelete — Delete a note */
export async function deleteNote(id, token) {
  return post('notedelete', { id }, token);
}
