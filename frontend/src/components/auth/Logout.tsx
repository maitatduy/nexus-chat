import { useAuthStore } from "@/stores/useAuthStore";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

export default function Logout() {
    const { signOut } = useAuthStore();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut();
            navigate("/sign-in");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button variant='outline' onClick={handleLogout}>
            <LogOut className='text-destructive' />
            Log out
        </Button>
    );
}
