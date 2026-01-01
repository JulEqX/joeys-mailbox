import { create } from "zustand";
import { mails } from "../data";
import type { Mail } from "../models/Mail";

interface GroupedMails {
  [key: string]: Mail[];
}

interface MailStore {
  mails: Mail[];
  activeMail: Mail | null;
  setActiveMail: (mail: Mail | null) => void;
  getMailById: (id: string) => Mail | undefined;
  getMailsByMonthYear: () => GroupedMails;
}

export const useMailStore = create<MailStore>((set, get) => ({
  mails: mails,
  activeMail: null,

  setActiveMail: (mail: Mail | null) => {
    set({ activeMail: mail });
  },

  getMailById: (id: string) => {
    return get().mails.find((mail) => mail.id === id);
  },

  getMailsByMonthYear: () => {
    const mails = get().mails;
    const groups: GroupedMails = {};

    mails.forEach((mail) => {
      const monthYear = mail.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(mail);
    });

    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => b.date.getTime() - a.date.getTime());
    });

    return groups;
  },
}));
