export const api = import.meta.env.VITE_API_URL;
export const uploads = import.meta.env.VITE_UPLOAD_URL;

export const requestConfig = (
  method: string,
  data: unknown = null,
  token: string | null = null,
  image: File | null | boolean = null
): RequestInit => {
  // Inicializa o objeto de configuração
  const config: RequestInit = {
    method,
    headers: {},
  };


  if (image && data instanceof FormData) {
    config.body = data as FormData;
  } else if (data !== null && method !== "DELETE") {
    // Para requisições com JSON, exceto DELETE
    config.body = JSON.stringify(data);
    (config.headers as Record<string, string>)["Content-Type"] =
      "application/json";
  }


  if (token) {
    (config.headers as Record<string, string>)["Authorization"] =
      `Bearer ${token}`;
  }

  return config;
};
