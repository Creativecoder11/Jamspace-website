"use client";

import { useState } from "react";

/** No submit handler wired to a backend yet — see TODO below. */
export function NewsletterForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire up to newsletter provider once available.
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
      />
      <button
        type="submit"
        className="shrink-0 whitespace-nowrap rounded-xl bg-accent px-6 py-3 text-sm font-normal text-white transition-colors hover:bg-foreground"
      >
        Subscribe
      </button>
    </form>
  );
}
