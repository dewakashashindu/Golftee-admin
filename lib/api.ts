import { BASE_URL } from './config';

/**
 * Fetch admin bookings from the configured backend.
 *
 * @param token optional Bearer token for authorization
 * @returns parsed JSON response
 */
export async function fetchAdminBookings(token?: string) {
  token = token || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1X2FkbWluIiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTc2NTAxMjk3NywiZXhwIjoxNzY1NjE3Nzc3fQ.R7SIPUth43p38pg-TlAB9X_HHMs9sjXrIknkRBFr3EY";

  const url = `${BASE_URL}/api/bookings/admin/all`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    // you can add credentials: 'include' if needed for cookies
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to fetch admin bookings: ${res.status} ${body}`);
  }

  return res.json();
}

export default fetchAdminBookings;
