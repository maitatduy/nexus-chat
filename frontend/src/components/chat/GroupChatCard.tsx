import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat";
import ChatCard from "./ChatCard";

export default function GroupChatCard({ conversation }: { conversation: Conversation }) {
    const { user } = useAuthStore();
    const { activeConversationId, setActiveConversation, messages } = useChatStore();

    if (!user) {
        return null;
    }

    const unreadCount = conversation.unreadCounts[user._id];

    const name = conversation.group?.name ?? "";

    const handleSelectConversation = async (id: string) => {
        setActiveConversation(id);
        if (!messages[id]) {
            // todo: fetch messages
        }
    };

    return (
        <ChatCard
            conversationId={conversation._id}
            name={name}
            timestamp={conversation.lastMessage?.createdAt ? new Date(conversation.lastMessage.createdAt) : undefined}
            isActive={activeConversationId === conversation._id}
            onSelect={handleSelectConversation}
            unreadCount={unreadCount}
            leftSection={
                <>
                    {/* todo: user avatar */}
                    {/* todo: status badge */}
                    {/* todo: unread count */}
                </>
            }
            subtitle={
                <p className='text-sm truncate text-muted-foreground'>{conversation.participants.length} thành viên</p>
            }
        />
    );
}
