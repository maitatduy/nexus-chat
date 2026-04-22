import { useChatStore } from "@/stores/useChatStore";
import GroupChatCard from "./GroupChatCard";

export default function GroupChatList() {
    const { conversations } = useChatStore();

    if (!conversations) {
        return;
    }

    const groupConversations = conversations.filter((conversation) => conversation.type === "group");

    return (
        <div className='flex-1 overflow-y-auto p-2 space-y-2'>
            {groupConversations.map((conversation) => (
                <GroupChatCard key={conversation._id} conversation={conversation} />
            ))}
        </div>
    );
}
