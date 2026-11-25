"use client"

// Opens the advisor chat (components/advisor-chat.tsx) that is on the same page.

import { Button } from "@/components/ui/button"
import { openAdvisorChat } from "@/components/advisor-chat"

export function TalkToAdvisorButton() {
  return (
    <Button variant="outline" onClick={openAdvisorChat} className="border-border text-foreground hover:bg-secondary rounded-[5px] px-6 py-2.5">
      Talk to a portfolio advisor
    </Button>
  )
}
