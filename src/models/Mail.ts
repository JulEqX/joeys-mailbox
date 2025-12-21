export type EnvelopeTheme =
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
  theme?: EnvelopeTheme;
}

export const createMail = (
  id: string,
  date: Date,
  title: string,
  content: string,
  theme?: EnvelopeTheme
): Mail => {
  return { id, date, title, content, theme };
};

export const hidden = {
  opacity: 0,
};

export const shown = {
  opacity: 1,
};
