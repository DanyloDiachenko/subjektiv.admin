export interface ICountry {
    id: number;
    title: string;
    flag_image_id: string | null;
    vat_rate: number | null;
    tax_rate: number | null;
    operational_fee: number | null;
    short_code: string | null;
}
