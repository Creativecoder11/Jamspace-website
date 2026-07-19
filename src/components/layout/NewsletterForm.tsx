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
    <form onSubmit={handleSubmit} className="flex items-end gap-4">
      <label className="peer-container flex-1">
        <span className="mb-2 block text-xs uppercase tracking-wide text-muted">
          Email
        </span>
        <span className="relative block">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="peer w-full border-b border-border bg-transparent py-2 text-sm text-foreground outline-none"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 peer-focus:scale-x-100" />
        </span>
      </label>
      <button
        type="submit"
        className="whitespace-nowrap border-b border-foreground pb-2 text-sm font-normal hover:border-accent hover:text-accent"
      >
        Subscribe
      </button>
    </form>
  );
}
