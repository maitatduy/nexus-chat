import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => {
        set({ accessToken: null, user: null, loading: false });
    },

    signUp: async (username, password, email, firstName, lastName) => {
        try {
            set({ loading: true });
            await authService.signUp(username, password, email, firstName, lastName);
            toast.success("Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập!");
        } catch (error: any) {
            console.error(`[ERROR]: Đăng ký không thành công! Lỗi: ${error.message}`);
            toast.error("Đăng ký không thành công!");
        } finally {
            set({ loading: false });
        }
    },

    signIn: async (username, password) => {
        try {
            set({ loading: true });
            const { accessToken } = await authService.signIn(username, password);
            set({ accessToken });
            toast.success("Đăng nhập thành công! Chào mừng bạn đến với Nexus!");
        } catch (error: any) {
            console.error(`[ERROR]: Đăng nhập không thành công! Lỗi: ${error.message}`);
            toast.error("Đăng nhập không thành công!");
        } finally {
            set({ loading: false });
        }
    },

    signOut: async () => {
        try {
            get().clearState();
            authService.signOut();
            toast.success("Đăng xuất thành công! Hẹn gặp lại bạn!");
        } catch (error: any) {
            console.error(`[ERROR]: Đăng xuất không thành công! Lỗi: ${error.message}`);
            toast.error("Đăng xuất không thành công!");
        }
    },
}));
