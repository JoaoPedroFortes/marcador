export interface Translations {
    navigation: Record<View, string> & {
        today: string;
        agenda: string;
    };
    form: {
        addTitle: string;
        editTitle: string;
        confirm: string;
        delete: string;
        cancel: string;
    };
    event: Record<string, string> & {
        title: string;
        start: string;
        end: string;
        allDay: string;
    };
    validation?: {
        required?: string;
        invalidEmail?: string;
        onlyNumbers?: string;
        min?: string | ((min: number) => string);
        max?: string | ((max: number) => string);
    };
    moreEvents: string;
    noDataToDisplay: string;
    loading: string;
}