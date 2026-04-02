import { SigninForm } from "../components/signin-form";

export default function SignInPage() {
    return (
        <div className='bg-muted flex min-h-full flex-col items-center justify-center p-6 md:p-10 absolute inset-0 z-0 bg-blue-gradient bottom-[-10%]'>
            <div className='w-full max-w-sm md:max-w-4xl'>
                <SigninForm />
            </div>
        </div>
    );
}
