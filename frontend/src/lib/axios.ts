import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:4000/api" : "/api",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            originalRequest.url.includes("/auth/refresh") ||
            originalRequest.url.includes("/auth/sign-in") ||
            originalRequest.url.includes("/auth/sign-up")
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = originalRequest._retry || 0;

        if (error.response?.status === 403 && originalRequest._retry < 3) {
            originalRequest._retry++;
            try {
                const res = await api.post("/auth/refresh", {}, { withCredentials: true });
                const newAccessToken = res.data.accessToken;
                useAuthStore.getState().setAccessToken(newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (error: any) {
                useAuthStore.getState().clearState();
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);

export default api;
