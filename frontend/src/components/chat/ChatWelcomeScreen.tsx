import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";

export default function ChatWelcomeScreen() {
    return (
        <SidebarInset className='flex w-full h-full bg-transparent p-4'>
            <ChatWindowHeader />

            <div className='flex bg-primary-foreground/50 backdrop-blur-sm border border-border/50 rounded-3xl flex-1 items-center justify-center transition-all duration-500 ease-in-out'>
                <div className='text-center space-y-6'>
                    <div className='relative group'>
                        <div className='absolute inset-0 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/40 transition-colors duration-500'></div>

                        <div className='relative size-28 mx-auto bg-linear-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-bounce animation-duration-[3s] hover:scale-110 transition-transform cursor-default'>
                            <span className='text-4xl filter drop-shadow-md'>💬</span>
                            <div className='absolute inset-0 rounded-full border-4 border-blue-400/30 animate-ping animation-duration-[2s]'></div>
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <h2 className='text-2xl font-bold mb-2 bg-blue-600 bg-clip-text text-transparent'>
                            Chào mừng bạn đến với Nexus!
                        </h2>

                        <p className='text-muted-foreground text-lg leading-relaxed opacity-80 mt-5'>
                            Chọn một cuộc hội thoại để bắt đầu chat ngay!
                        </p>
                    </div>

                    <div className='flex justify-center gap-1.5 opacity-30'>
                        <span className='size-1.5 rounded-full bg-blue-500 animate-pulse'></span>
                        <span className='size-1.5 rounded-full bg-blue-500 animate-pulse [animation-delay:200ms]'></span>
                        <span className='size-1.5 rounded-full bg-blue-500 animate-pulse [animation-delay:400ms]'></span>
                    </div>
                </div>
            </div>
        </SidebarInset>
    );
}
