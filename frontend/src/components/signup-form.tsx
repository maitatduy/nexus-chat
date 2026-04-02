import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className='overflow-hidden p-0'>
                <CardContent className='grid p-0 md:grid-cols-2'>
                    <form className='p-6 md:p-8'>
                        <div className='flex flex-col gap-6'>
                            {/* Header - Logo */}
                            <div className='flex flex-col items-center text-center gap-2'>
                                <a href='/' className='mx-auto block w-fit text-center'>
                                    <img src='/logo.svg' alt='Nexus' />
                                </a>
                                <h1 className='text-2xl font-bold'>Tạo tài khoản Nexus</h1>
                                <p className='text-muted-foreground text-balance'>
                                    Chào mừng bạn! Hãy đăng ký để bắt đầu!
                                </p>
                            </div>
                            {/* Họ và Tên */}
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='space-y-2'>
                                    <Label htmlFor='lastname' className='block text-sm'>
                                        Họ
                                    </Label>
                                    <Input type='text' id='lastname' placeholder='Nguyễn Văn' />
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='firstname' className='block text-sm'>
                                        Tên
                                    </Label>
                                    <Input type='text' id='firstname' placeholder='An' />
                                </div>
                            </div>
                            {/* Username */}
                            <div className='flex flex-col gap-3'>
                                <Label htmlFor='username' className='block text-sm'>
                                    Tên đăng nhập
                                </Label>
                                <Input type='text' id='username' placeholder='nguyenvanan' />
                            </div>
                            {/* Email */}
                            <div className='flex flex-col gap-3'>
                                <Label htmlFor='email' className='block text-sm'>
                                    Email
                                </Label>
                                <Input type='email' id='email' placeholder='nguyenvanan@gmail.com' />
                            </div>

                            {/* Password */}
                            <div className='flex flex-col gap-3'>
                                <Label htmlFor='password' className='block text-sm'>
                                    Mật khẩu
                                </Label>
                                <Input type='password' id='password' />
                            </div>

                            {/* Nút đăng ký */}
                            <Button size={"xl"} type='submit' className='w-full'>
                                Tạo tài khoản
                            </Button>

                            <div className='text-center text-sm'>
                                Đã có tài khoản?{" "}
                                <a href='/sign-in' className='underline underline-offset-4'>
                                    Đăng nhập
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className='relative hidden bg-muted md:block'>
                        <img
                            src='/placeholderSignUp.png'
                            alt='Image'
                            className='absolute top-1/2 -translate-y-1/2 object-cover'
                        />
                    </div>
                </CardContent>
            </Card>
            <div className='text-sm text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offetset-4'>
                Bằng cách tiếp tục, bạn đồng ý với <a href='#'>Điều khoản dịch vụ</a> và{" "}
                <a href='#'>Chính sách bảo mật</a> của chúng tôi.
            </div>
        </div>
    );
}
