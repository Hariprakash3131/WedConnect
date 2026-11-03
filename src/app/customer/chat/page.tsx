"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ChatInterface } from "@/features/chat/components/chat-interface";

function CustomerChatContent() {
  const searchParams = useSearchParams();
  const vendorIdParam = searchParams.get("vendorId");

  return <ChatInterface currentRole="customer" initialPartnerId={vendorIdParam} />;
}

export default function CustomerChatPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm font-medium">Loading real-time chat...</p>
          </div>
        </div>
      }
    >
      <CustomerChatContent />
    </React.Suspense>
  );
}
