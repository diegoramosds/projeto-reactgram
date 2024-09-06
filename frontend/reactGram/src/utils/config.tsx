export const api = "http://localhost:5000/api"
export const uploads = "http://localhost:5000/uploads"

export const requestConfig = (method: string, data: unknown, token = null, image = null) => {

    
    let config

    if (image) {
        config = {
            method,
            body: data,
            headers: {}
        }
        
    } else if (method === "DELETE" || data === null) {
        config = {
            method,
            headers: {}
        }
    } else {
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }
    }
    if(token) {
        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        };
        
         headers["Authorization"] = `Bearer ${token}`;
        //  config.headers.Authorization = `Bearer ${token}`
    }
    
    return config;
}