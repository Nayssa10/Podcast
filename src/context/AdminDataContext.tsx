"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Episode, ContactMessage, HostProfile, SiteSettings } from "@/lib/store";

interface AdminDataContextType {
  episodes: Episode[];
  messages: ContactMessage[];
  profile: HostProfile | null;
  settings: SiteSettings | null;
  isReady: boolean;
  refreshData: () => Promise<void>;
  updateEpisodeLocally: (episode: Episode) => void;
  deleteEpisodeLocally: (id: string) => void;
  updateMessageStatusLocally: (id: string, status: "unread" | "read" | "replied") => void;
  deleteMessageLocally: (id: string) => void;
  updateSettingsLocally: (settings: SiteSettings) => void;
  updateProfileLocally: (profile: HostProfile) => void;
}

const AdminDataContext = createContext<AdminDataContextType>({
  episodes: [],
  messages: [],
  profile: null,
  settings: null,
  isReady: false,
  refreshData: async () => {},
  updateEpisodeLocally: () => {},
  deleteEpisodeLocally: () => {},
  updateMessageStatusLocally: () => {},
  deleteMessageLocally: () => {},
  updateSettingsLocally: () => {},
  updateProfileLocally: () => {},
});

import { subscribeToDataChanges, notifyDataChanged } from "@/lib/syncEvents";

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [profile, setProfile] = useState<HostProfile | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isReady, setIsReady] = useState(false);

  const refreshData = useCallback(async () => {
    try {
      const t = Date.now();
      const [epsRes, msgsRes, profRes, setRes] = await Promise.all([
        fetch(`/api/episodes?t=${t}`, { cache: "no-store" }),
        fetch(`/api/messages?t=${t}`, { cache: "no-store" }),
        fetch(`/api/profile?t=${t}`, { cache: "no-store" }),
        fetch(`/api/settings?t=${t}`, { cache: "no-store" }),
      ]);

      const [eps, msgs, prof, sett] = await Promise.all([
        epsRes.json().catch(() => []),
        msgsRes.json().catch(() => []),
        profRes.json().catch(() => null),
        setRes.json().catch(() => null),
      ]);

      if (Array.isArray(eps) && eps.length > 0) setEpisodes(eps);
      if (Array.isArray(msgs)) setMessages(msgs);
      if (prof && !prof.error) setProfile(prof);
      if (sett && !sett.error) setSettings(sett);
    } catch (e) {
      console.error("Error refreshing admin data:", e);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    refreshData();
    const unsubscribe = subscribeToDataChanges(() => {
      refreshData();
    });
    return unsubscribe;
  }, [refreshData]);

  const updateEpisodeLocally = (episode: Episode) => {
    setEpisodes(prev => {
      const idx = prev.findIndex(e => e.id === episode.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = episode;
        return next;
      }
      return [episode, ...prev];
    });
    notifyDataChanged("episodes");
  };

  const deleteEpisodeLocally = (id: string) => {
    setEpisodes(prev => prev.filter(e => e.id !== id));
    notifyDataChanged("episodes");
  };

  const updateMessageStatusLocally = (id: string, status: "unread" | "read" | "replied") => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const deleteMessageLocally = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const updateSettingsLocally = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    notifyDataChanged("settings");
  };

  const updateProfileLocally = (newProfile: HostProfile) => {
    setProfile(newProfile);
    notifyDataChanged("profile");
  };

  return (
    <AdminDataContext.Provider
      value={{
        episodes,
        messages,
        profile,
        settings,
        isReady,
        refreshData,
        updateEpisodeLocally,
        deleteEpisodeLocally,
        updateMessageStatusLocally,
        deleteMessageLocally,
        updateSettingsLocally,
        updateProfileLocally,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  return useContext(AdminDataContext);
}
