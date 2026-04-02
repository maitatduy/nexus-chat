import { SignupForm } from "../components/signup-form";

export default function SignUpPage() {
    return (
        <div className='bg-muted flex min-h-full flex-col items-center justify-center p-6 md:p-10 absolute inset-0 z-0 bg-blue-gradient bottom-[-30%]'>
            <div className='w-full max-w-sm md:max-w-4xl'>
                <SignupForm />
            </div>
        </div>
    );
}
