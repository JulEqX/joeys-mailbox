export interface Mail {
    id: string;
    date: Date;
    title: string;
    content: string;
}

export const createMail = (id: string, date: Date, title: string, content: string): Mail => {
    return { id, date, title, content };
}