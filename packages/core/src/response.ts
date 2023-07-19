

export function responseToJson(body: any, statusCode: number) {
    return {
        headers: {
            "Content-Type": "application/json"
        },
        statusCode,
        body: JSON.stringify(body)
    }
}