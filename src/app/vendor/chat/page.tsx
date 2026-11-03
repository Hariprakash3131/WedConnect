"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { ChatInterface } from "@/features/chat/components/chat-interface";

function VendorChatContent() {
  const searchParams = useSearchParams();
  const clientParam = searchParams.get("client");

  return <ChatInterface currentRole="vendor" initialPartnerId={clientParam} />;
}

export default function VendorChatPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <div className="w-8 h-8 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
            <p className="text-sm font-medium">Loading studio messages...</p>
          </div>
        </div>
      }
    >
      <VendorChatContent />
    </React.Suspense>
  );
}
