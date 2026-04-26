import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomeScreen from "./ChatWelcomeScreen";
import ChatWindowSkeleton from "../skeleton/ChatWindowSkeleton";
import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatWindowBody from "./ChatWindowBody";
import MessageInput from "./MessageInput";

export default function ChatWindowLayout() {
    const { activeConversationId, conversations, messageLoading: loading, messages } = useChatStore();

    const selectedConversation = conversations.find((conv) => conv._id === activeConversationId);

    if (!selectedConversation) {
        return <ChatWelcomeScreen />;
    }

    if (loading) {
        return <ChatWindowSkeleton />;
    }
    return (
        <SidebarInset className='flex flex-col h-full flex-1 overflow-hidden rounded-sm shadow-md'>
            {/* Header */}
            <ChatWindowHeader />

            {/* Body */}
            <div className='flex-1 overflow-y-auto bg-primary-foreground'>
                <ChatWindowBody />
            </div>

            {/* Footer */}
            <MessageInput />
        </SidebarInset>
    );
}
