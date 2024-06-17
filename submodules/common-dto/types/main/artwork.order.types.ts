// region StatusChangeEntry
import { ArtworkOrderStatus, DeliveryOperator, PackagingType } from '../../api-client/main';
import { IAddressPreview } from './address.types';
import { IArtworkPreviewWithAuthor, IUserPreview } from './user.types';

export interface IArtworkOrderStatusHistory {
    status: ArtworkOrderStatus;
    created_at: Date;
}

export interface IArtworkPreviewForOrder {
    certificate_file_path: string | null;
    packaging_types: PackagingType[];
    volumetric_weight: number;
    ///
    height: number;
    width: number;
    depth: number;
    weight: number;
}

export interface IArtworkOrderItem {
    id: number;

    artwork: IArtworkPreviewWithAuthor & IArtworkPreviewForOrder;

    buyer: IUserPreview;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;

    seller: IUserPreview;
    is_cuor_selling: boolean;
    expert: IUserPreview | null;

    total_amount: number;
    artwork_price: number;
    delivery_amount: number;

    billing_address: IAddressPreview | null;

    // Taxes for buyer, and vat for seller
    vat_amount: number | null;
    vat_rate: number | null;
    taxes_amount: number | null;
    taxes_rate: number | null;

    weight: number;

    address_from: IAddressPreview;
    address_to: IAddressPreview;
    is_packed_by_me: boolean | null;
    packaging_type: PackagingType | null;
    is_mounted: boolean;
    delivery_operator: DeliveryOperator;
    delivery_tracking_number: string | null;
    estimated_delivery_date: Date | null;

    status: ArtworkOrderStatus;
    status_history: IArtworkOrderStatusHistory[];

    created_at: Date;
}

export interface IArtworkOrder extends IArtworkOrderItem {
    // Visible for seller only
    owner_get_amount: number | null;

    expert_get_amount: number | null;
    expert_get_percent: number | null;
    author_get_amount: number | null;
    author_get_percent: number | null;
    system_get_amount: number | null;
    system_get_percent: number | null;

    payment_card: string | null;
}
