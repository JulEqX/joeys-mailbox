export type MailTheme =
  | "default"
  | "love"
  | "christmas"
  | "newyear"
  | "birthday";

export interface Mail {
  id: string;
  date: Date;
  title: string;
  content: string;
  theme: MailTheme;
}

export const hidden = {
  opacity: 0,
};

export const shown = {
  opacity: 1,
};
