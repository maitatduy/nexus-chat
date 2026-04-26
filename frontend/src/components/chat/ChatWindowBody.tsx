import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomeScreen from "./ChatWelcomeScreen";

export default function ChatWindowBody() {
    const { activeConversationId, conversations, messages: allMessages } = useChatStore();

    const messages = allMessages[activeConversationId!]?.items ?? [];

    const selectedConversation = conversations.find((c) => c._id === activeConversationId);

    if (!selectedConversation) {
        return <ChatWelcomeScreen />;
    }

    if (!messages?.length) {
        return (
            <div className='flex h-full items-center justify-center text-muted-foreground'>
                Chưa có tin nhắn nào trong cuộc trò chuyện này
            </div>
        );
    }
    return (
        <>
            <div className='p-4 bg-primary-foreground h-full flex flex-col overflow-hidden'>
                <div className='flex flex-col overflow-y-auto overflow-x-hidden'>
                    {messages.map((message) => (
                        <>{message.content}</>
                    ))}
                </div>
            </div>
        </>
    );
}
