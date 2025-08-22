export interface EnklaveApiOptions {
    params?: Record<string, any>;
    body?: any;
    headers?: Record<string, string>;
}

export default async function useEnklaveApi(
    path: string,
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH",
    options: EnklaveApiOptions = {},
): Promise<any> {
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;
    if (!path.startsWith("/")) path = `/${path}`;
    return $fetch(`${apiBase}${path}`, {
        method,
        params: options.params,
        body: options.body,
        headers: options.headers,
    });
}