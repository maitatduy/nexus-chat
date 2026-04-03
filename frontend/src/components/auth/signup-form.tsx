import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/stores/useAuthStore";

const signUpSchema = z.object({
    username: z
        .string()
        .trim()
        .toLowerCase()
        .min(3, "Tên người dùng phải có ít nhất 3 ký tự!")
        .max(20, "Tên người dùng không được vượt quá 20 ký tự!")
        .regex(/^[a-z0-9_]+$/, "Tên người dùng chỉ được chứa chữ thường, số và dấu gạch dưới!"),

    email: z.string().trim().toLowerCase().email("Email không hợp lệ!").max(255, "Email không được quá dài!"),

    password: z
        .string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự!")
        .max(100, "Mật khẩu không được quá dài!")
        .regex(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ hoa!")
        .regex(/[a-z]/, "Mật khẩu phải chứa ít nhất 1 chữ thường!")
        .regex(/[0-9]/, "Mật khẩu phải chứa ít nhất 1 số!")
        .regex(/[^A-Za-z0-9]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt!"),

    firstName: z.string().trim().min(1, "Họ không được để trống!").max(50, "Họ không được quá dài!"),

    lastName: z.string().trim().min(1, "Tên không được để trống!").max(50, "Tên không được quá dài!"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
    });

    const { signUp } = useAuthStore();

    const navigate = useNavigate();

    const onSubmit = async (data: SignUpFormValues) => {
        const { username, password, email, firstName, lastName } = data;

        await signUp(username, password, email, firstName, lastName);

        navigate("/sign-in");
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className='overflow-hidden p-0'>
                <CardContent className='grid p-0 md:grid-cols-2'>
                    <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col gap-6'>
                            {/* Header - Logo */}
                            <div className='flex flex-col items-center text-center gap-2'>
                                <Link to='/' className='mx-auto block w-fit text-center'>
                                    <img src='/logo.svg' alt='Nexus' />
                                </Link>
                                <h1 className='text-2xl font-bold'>Tạo tài khoản Nexus</h1>
                                <p className='text-muted-foreground text-balance'>
                                    Chào mừng bạn! Hãy đăng ký để bắt đầu!
                                </p>
                            </div>
                            {/* Họ và Tên */}
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='space-y-2'>
                                    <Label htmlFor='lastName' className='block text-sm'>
                                        Họ
                                    </Label>
                                    <Input
                                        type='text'
                                        id='lastName'
                                        placeholder='Nguyễn Văn'
                                        {...register("lastName")}
                                    />
                                    {errors.lastName && (
                                        <p className='text-destructive text-sm'>{errors.lastName.message}</p>
                                    )}
                                </div>
                                <div className='space-y-2'>
                                    <Label htmlFor='firstName' className='block text-sm'>
                                        Tên
                                    </Label>
                                    <Input type='text' id='firstName' placeholder='An' {...register("firstName")} />
                                    {errors.firstName && (
                                        <p className='text-destructive text-sm'>{errors.firstName.message}</p>
                                    )}
                                </div>
                            </div>
                            {/* Username */}
                            <div className='flex flex-col gap-3'>
                                <Label htmlFor='username' className='block text-sm'>
                                    Tên đăng nhập
                                </Label>
                                <Input type='text' id='username' placeholder='nguyenvanan' {...register("username")} />
                                {errors.username && (
                                    <p className='text-destructive text-sm'>{errors.username.message}</p>
                                )}
                            </div>
                            {/* Email */}
                            <div className='flex flex-col gap-3'>
                                <Label htmlFor='email' className='block text-sm'>
                                    Email
                                </Label>
                                <Input
                                    type='email'
                                    id='email'
                                    placeholder='nguyenvanan@gmail.com'
                                    {...register("email")}
                                />
                                {errors.email && <p className='text-destructive text-sm'>{errors.email.message}</p>}
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

                            {/* Nút đăng ký */}
                            <Button size={"xl"} type='submit' className='w-full' disabled={isSubmitting}>
                                Tạo tài khoản
                            </Button>

                            <div className='text-center text-sm'>
                                Đã có tài khoản?{" "}
                                <Link to='/sign-in' className='underline underline-offset-4'>
                                    Đăng nhập
                                </Link>
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
            <div className='text-sm text-balance px-6 text-center *:[a]:hover:text-muted-foreground text-primary *:[a]:underline *:[a]:underline-offetset-4'>
                Bằng cách tiếp tục, bạn đồng ý với <a href='#'>Điều khoản dịch vụ</a> và{" "}
                <Link to='#'>Chính sách bảo mật</Link> của chúng tôi.
            </div>
        </div>
    );
}
