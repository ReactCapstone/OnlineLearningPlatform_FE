import { config } from '../config/env';

const BASE_URL = config.apiBaseUrl;

interface RequestOptions extends RequestInit {
    skipAuth?: boolean;
}

async function apiClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { skipAuth, headers, ...rest } = options;

    const token = localStorage.getItem('token');

    const config: RequestInit = {
        ...rest,
        headers: {
            'Content-Type': 'application/json',
            ...(token && !skipAuth ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
    };
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // Only clear the session if this request WAS using our stored token
    // and the server rejected it. A 401 from login/register (skipAuth: true)
    // means "wrong credentials," not "your session is invalid" — don't touch storage then.
    if (response.status === 401 && !skipAuth) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.message || `Request failed with status ${response.status}.`);
    }

    if (!data?.success) {
        throw new Error(data.message || 'Something went wrong.');
    }

    return data;
}

export default apiClient;