import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/user";

export default function ChatAppPage() {
    const { signOut } = useAuthStore();
    const navigate = useNavigate();

    const user: User | null = useAuthStore((state) => state.user);
    const handleLogout = async () => {
        try {
            await signOut();
            navigate("/sign-in");
        } catch (error) {
            console.error(`[ERROR]: Đăng xuất thất bại! Lỗi: ${error}`);
        }
    };

    return (
        <>
            {user?.username}
            <Button size={"lg"} onClick={handleLogout}>
                Đăng xuất
            </Button>
        </>
    );
}
