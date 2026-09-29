export const config = {
    apiUrl:
        (
            process.env.ENVLY_API_URL ??
            'https://api.envly.dev/api'
        ).replace(/\/+$/, ''),
}
