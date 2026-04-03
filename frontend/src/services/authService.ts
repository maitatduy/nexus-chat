import api from "@/lib/axios";

export const authService = {
    signUp: async (username: string, password: string, email: string, firstName: string, lastName: string) => {
        const response = await api.post(
            "/auth/sign-up",
            {
                username,
                password,
                email,
                firstName,
                lastName,
            },
            {
                withCredentials: true,
            },
        );
        return response.data;
    },

    signIn: async (username: string, password: string) => {
        const response = await api.post(
            "/auth/sign-in",
            {
                username,
                password,
            },
            {
                withCredentials: true,
            },
        );
        return response.data;
    },

    signOut: async () => {
        return api.post(
            "/auth/sign-out",
            {},
            {
                withCredentials: true,
            },
        );
    },

    fetchMe: async () => {
        const response = await api.get("/users/me", {
            withCredentials: true,
        });

        return response.data.user;
    },

    refresh: async () => {
        const response = await api.post("/auth/refresh", {}, { withCredentials: true });
        return response.data.accessToken;
    },
};
