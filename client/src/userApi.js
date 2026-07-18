
const BASE = '/api/users';

async function handler (res, fallbackMessage) {
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || fallbackMessage);
        }
        return res.json();
    }

export async function fetchUsers() {
    const res = await fetch(BASE);
    return handler(res, 'Failed to fetch users');
}

export async function createUser(name, username, password) {
    const res = await fetch(BASE, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, password })
    });
    return handler(res, 'Failed to create user');
}   

export async function fetchActiveUser() {
    const res = await fetch(`${BASE}/active`);
    return handler(res, 'Failed to fetch active user');
}

export async function setActiveUser(userId) {
    const res = await fetch(`${BASE}/active`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });
    return handler(res, 'Failed to set active user');
}