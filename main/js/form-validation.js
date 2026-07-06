// js/form-validation.js
const API_BASE = 'http://localhost:5000/api';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, message) {
  clearError(input);
  input.style.borderColor = '#e50914';
  const err = document.createElement('span');
  err.className = 'field-error';
  err.textContent = message;
  input.parentNode.appendChild(err);
}

function clearError(input) {
  input.style.borderColor = '';
  const prev = input.parentNode.querySelector('.field-error');
  if (prev) prev.remove();
}

function showToast(message, type = 'success') {
  const existing = document.getElementById('sa-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'sa-toast';
  toast.textContent = message;
  toast.style.cssText = `background:${type === 'success' ? '#f5c518' : '#e50914'};color:${type === 'success' ? '#080c14' : '#fff'};`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function saveToken(token) { localStorage.setItem('sa_token', token); }
function getToken()       { return localStorage.getItem('sa_token'); }
function saveUser(user)   { localStorage.setItem('sa_user', JSON.stringify(user)); }
function getUser()        { try { return JSON.parse(localStorage.getItem('sa_user')); } catch { return null; } }
function logout()         { localStorage.removeItem('sa_token'); localStorage.removeItem('sa_user'); window.location.href = '/pages/login.html'; }

async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(`${API_BASE}${endpoint}`, options);
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

function requireAuth() {
  if (!getToken()) { window.location.href = '/pages/login.html'; return false; }
  return true;
}
