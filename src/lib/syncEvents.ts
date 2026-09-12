export type SyncDataType = "episodes" | "profile" | "settings" | "all";

export const notifyDataChanged = (type: SyncDataType = "all") => {
  if (typeof window === "undefined") return;
  try {
    const payload = { type, timestamp: Date.now() };

    // 1. Cross-tab sync via BroadcastChannel
    if ("BroadcastChannel" in window) {
      const channel = new BroadcastChannel("podcast_data_sync");
      channel.postMessage(payload);
      channel.close();
    }

    // 2. Cross-tab sync fallback via localStorage storage event
    try {
      localStorage.setItem("podcast_sync_ping", JSON.stringify(payload));
    } catch {}

    // 3. Same-tab in-memory event dispatch
    window.dispatchEvent(new CustomEvent("podcast-local-sync", { detail: payload }));
  } catch {}
};

export const subscribeToDataChanges = (onUpdate: (type: SyncDataType) => void) => {
  if (typeof window === "undefined") return () => {};

  let channel: BroadcastChannel | null = null;
  try {
    if ("BroadcastChannel" in window) {
      channel = new BroadcastChannel("podcast_data_sync");
      channel.onmessage = (event) => {
        if (event.data?.type) {
          onUpdate(event.data.type as SyncDataType);
        }
      };
    }
  } catch {}

  const handleStorage = (e: StorageEvent) => {
    if (e.key === "podcast_sync_ping" && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (parsed?.type) {
          onUpdate(parsed.type as SyncDataType);
        }
      } catch {}
    }
  };

  const handleLocal = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    onUpdate((detail?.type || "all") as SyncDataType);
  };

  // Re-sync whenever the user switches back to this tab/window
  const handleVisibility = () => {
    if (document.visibilityState === "visible") {
      onUpdate("all");
    }
  };

  const handleFocus = () => {
    onUpdate("all");
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener("podcast-local-sync", handleLocal);
  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("focus", handleFocus);

  return () => {
    if (channel) {
      channel.close();
    }
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("podcast-local-sync", handleLocal);
    document.removeEventListener("visibilitychange", handleVisibility);
    window.removeEventListener("focus", handleFocus);
  };
};
