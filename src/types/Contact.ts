export interface ContactColor {
    firstname: string;
    lastname: string;
    color: string | '#FF0000';
}

export interface SingleContact {
    id: string;
    user_id: string;
    created_at: Date;
    lastname: string;
    firstname: string;
    mail: string;
    phone: string;
    color: string | '#FF0000';
}

export interface ContactProp {
    contacts: SingleContact[];
    sortedContacts: SingleContact[];
    ondelete: (cId: string) => Promise<void>;
}