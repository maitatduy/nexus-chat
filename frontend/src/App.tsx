import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ChatAppPage from "./pages/ChatAppPage";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";

export default function App() {
    return (
        <>
            <Toaster richColors position='top-right' />
            <BrowserRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route path='/sign-in' element={<SignInPage />} />
                    <Route path='/sign-up' element={<SignUpPage />} />

                    {/* Private Routes */}
                    <Route element={<ProtectedRoutes />}>
                        <Route path='/' element={<ChatAppPage />} />
                    </Route>

                    {/* Not Found Route */}
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}
