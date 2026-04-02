import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signInSchema = z.object({
    username: z
        .string()
        .trim()
        .toLowerCase()
        .min(3, "Tên người dùng phải có ít nhất 3 ký tự!")
        .max(20, "Tên người dùng không được vượt quá 20 ký tự!")
        .regex(/^[a-z0-9_]+$/, "Tên người dùng chỉ được chứa chữ thường, số và dấu gạch dưới!"),

    password: z
        .string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự!")
        .max(100, "Mật khẩu không được quá dài!")
        .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa!")
        .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường!")
        .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 số!")
        .regex(/[^A-Za-z0-9]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SigninForm({ className, ...props }: React.ComponentProps<"div">) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = (data: SignInFormValues) => {};

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className='overflow-hidden p-0'>
                <CardContent className='grid p-0 md:grid-cols-2'>
                    <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-6'>
                            {/* Header - Logo */}
                            <div className='flex flex-col items-center text-center gap-2'>
                                <a href='/' className='mx-auto block w-fit text-center'>
                                    <img src='/logo.svg' alt='Nexus' />
                                </a>
                                <h1 className='text-2xl font-bold'>Chào mừng quay trở lại Nexus</h1>
                                <p className='text-muted-foreground text-balance'>
                                    Đăng nhập vào tài khoản Nexus của bạn
                                </p>
                            </div>
                            {/* Username */}
                            <div className='flex flex-col gap-3'>
                                <Label htmlFor='username' className='block text-sm'>
                                    Tên đăng nhập
                                </Label>
                                <Input type='text' id='username' {...register("username")} />
                                {errors.username && (
                                    <p className='text-destructive text-sm'>{errors.username.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className='flex flex-col gap-3'>
                                <Label htmlFor='password' className='block text-sm'>
                                    Mật khẩu
                                </Label>
                                <Input type='password' id='password' {...register("password")} />
                                {errors.password && (
                                    <p className='text-destructive text-sm'>{errors.password.message}</p>
                                )}
                            </div>

                            {/* Nút đăng nhập */}
                            <Button size={"xl"} type='submit' className='w-full' disabled={isSubmitting}>
                                Đăng nhập
                            </Button>

                            <div className='text-center text-sm'>
                                Chưa có tài khoản?{" "}
                                <a href='/sign-up' className='underline underline-offset-4'>
                                    Đăng ký
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className='relative hidden bg-muted md:block'>
                        <img
                            src='/placeholder.png'
                            alt='Image'
                            className='absolute top-1/2 -translate-y-1/2 object-cover'
                        />
                    </div>
                </CardContent>
            </Card>
            <div className='text-sm text-balance px-6 text-center *:[a]:hover:text-muted-foreground text-primary *:[a]:underline *:[a]:underline-offetset-4'>
                Bằng cách tiếp tục, bạn đồng ý với <a href='#'>Điều khoản dịch vụ</a> và{" "}
                <a href='#'>Chính sách bảo mật</a> của chúng tôi.
            </div>
        </div>
    );
}
