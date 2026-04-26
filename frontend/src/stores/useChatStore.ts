import { chatService } from "@/services/chatService";
import type { ChatState } from "@/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            conversations: [],
            messages: {},
            activeConversationId: null,
            conversationLoading: false, // Conversation loading
            messageLoading: false, // Message loading

            setActiveConversation: (id) => set({ activeConversationId: id }),
            reset: () => {
                set({
                    conversations: [],
                    messages: {},
                    activeConversationId: null,
                    conversationLoading: false,
                    messageLoading: false,
                });
            },
            fetchConversations: async () => {
                try {
                    set({ conversationLoading: true });
                    const { conversations } = await chatService.fetchConversations();
                    set({ conversationLoading: false, conversations });
                } catch (error) {
                    console.error("[ERROR]: Lỗi khi lấy dữ liệu conversations", error);
                    set({ conversationLoading: false });
                }
            },
            fetchMessages: async (conversationId) => {
                const { activeConversationId, messages } = get();
                const { user } = useAuthStore.getState();

                const conversationIdToFetch = conversationId ?? activeConversationId;

                if (!conversationIdToFetch) {
                    return;
                }

                const current = messages?.[conversationIdToFetch];
                const nextCursor = current?.nextCursor === undefined ? "" : current?.nextCursor;

                if (nextCursor === null) {
                    return;
                }
                set({ messageLoading: true });

                try {
                    const { messages: newMessages, cursor } = await chatService.fetchMessages(
                        conversationIdToFetch,
                        nextCursor,
                    );

                    const processedMessages = newMessages.map((msg) => ({
                        ...msg,
                        isMine: msg.senderId === user?._id,
                    }));

                    set((state) => {
                        const prev = state.messages[conversationIdToFetch]?.items ?? [];
                        const merged = prev.length > 0 ? [...processedMessages, ...prev] : processedMessages;

                        return {
                            messages: {
                                ...state.messages,
                                [conversationIdToFetch]: {
                                    items: merged,
                                    hasMore: !!cursor,
                                    nextCursor: cursor ?? null,
                                },
                            },
                        };
                    });
                } catch (error) {
                    console.error("[ERROR]: Lỗi khi lấy dữ liệu messages", error);
                } finally {
                    set({ messageLoading: false });
                }
            },
        }),
        {
            name: "chat-storage",
            partialize: (state) => ({ conversations: state.conversations }),
        },
    ),
);
