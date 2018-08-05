export function urlBuilder(base_url, query_obj) {
    const params = [];
    for (let param in query_obj) {
        params.push(`${encodeURIComponent(param)}=${encodeURIComponent(query_obj[param])}`);
    }
    return `${base_url}?${params.join('&')}`;
}