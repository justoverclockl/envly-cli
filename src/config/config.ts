export const config = {
    loginUrl:
        (
            process.env.ENVLY_LOGIN_URL ??
            'https://envly.dev/login'
        ).replace(/\/+$/, ''),
    apiUrl:
        (
            process.env.ENVLY_API_URL ??
            'https://api.envly.dev/api'
        ).replace(/\/+$/, ''),
}
