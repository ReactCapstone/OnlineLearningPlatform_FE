interface AppConfig {
    apiBaseUrl: string;
}

function getEnvVar(key: string): string {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

export const config: AppConfig = {
    apiBaseUrl: getEnvVar('VITE_API_BASE_URL'),
};