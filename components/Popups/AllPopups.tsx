"use client";
import React from "react";
import { EditGeneralPopup } from "./GeneralEdit";
import { AddGeneralPopup } from "./AddGeneralNew";
import { ConfirmGeneralDeletePopup } from "./ConfirmGeneralDelete";
import { AddEditShippingAddressPopup } from "./AddEditShippingAddressPopup";
import { CreateArtworkPopup } from "./NewArtwork";
import { AdjustImagePopup } from "./AdjustImage";
import { EditArtworkPopup } from "./EditArtwork";
import { EditMediaPopup } from "./EditMedia";
import { IRootState } from "@/store";
import { connect } from "react-redux";
import { ConfirmAddressDeletePopup } from "./ConfirmAddressDelete";
import { EditOrderInfoPopup } from "./EditOrderInfo";
import { AddTrackingNumberPopup } from "./AddTrackingNumber";
import { EditOrderStatusPopup } from "./EditOrderStatus";
import { EditOrderSummaryPopup } from "./EditOrderSummary";
import { EditOrderShippingDetailPopup } from "./EditOrderShippingDetail";
import { EditExpertReviewPopup } from "./EditExpertReview";
import { ArtworkPostsPopup } from "./EditPost";
import { EditEventPopup } from "./EditEvent";
import { CreateEventPopup } from "./CreateEvent";
import { EditCountryPopup } from "./EditCountry";
import { NewCountryPopup } from "./NewCountry";
import { EditPayoutInfoPopup } from "./EditPayoutInfo";
import { ImagePopup } from "./ImagePopup";
import { NewReflectionQuestionPopup } from "./NewReflectionQuestion";
import { EditReflectionQuestionPopup } from "./EditReflectionQuestion";
import { SubmitDeletePopup } from "./SubmitDeleteArtworkPopup";
import { EditArtworkAddressPopup } from "./EditArtworkAddress";
import { EditTariffPopup } from "./EditTariff";
import { NewDeliveryTariff } from "./NewTariff";

interface IPopups {
    openPopup: string;
}

const AllPopupsComponent = ({ openPopup }: IPopups) => {
    return (
        <>
            {openPopup === "imagePopup" && <ImagePopup />}
            {openPopup === "editPayoutInfo" && <EditPayoutInfoPopup />}
            {openPopup === "editGeneral" && <EditGeneralPopup />}
            {openPopup === "addGeneral" && <AddGeneralPopup />}
            {openPopup === "confirm-general-delete" && (
                <ConfirmGeneralDeletePopup />
            )}
            {openPopup === "confirm-address-delete" && (
                <ConfirmAddressDeletePopup />
            )}
            {(openPopup === "addShippingAddress" ||
                openPopup === "editShippingAddress") && (
                <AddEditShippingAddressPopup />
            )}
            {openPopup === "edit-order-shipping-detail" && (
                <EditOrderShippingDetailPopup />
            )}
            {openPopup === "edit-order-info" && <EditOrderInfoPopup />}
            {openPopup === "edit-order-status" && <EditOrderStatusPopup />}
            {openPopup === "edit-order-summary" && <EditOrderSummaryPopup />}
            {openPopup === "add-tracking-number" && <AddTrackingNumberPopup />}
            {openPopup === "newArtwork" && <CreateArtworkPopup />}
            {openPopup === "adjustImage" && <AdjustImagePopup />}
            {openPopup === "editArtwork" && <EditArtworkPopup />}
            {openPopup === "editMedia" && <EditMediaPopup />}
            {openPopup === "editExpertReview" && <EditExpertReviewPopup />}
            {openPopup === "artworkPosts" && <ArtworkPostsPopup />}
            {openPopup === "editEvent" && <EditEventPopup />}
            {openPopup === "createEvent" && <CreateEventPopup />}
            {openPopup === "editCountry" && <EditCountryPopup />}
            {openPopup === "newCountry" && <NewCountryPopup />}
            {openPopup === "reflectionQuestion" && (
                <NewReflectionQuestionPopup />
            )}
            {openPopup === "edit-reflection-question" && (
                <EditReflectionQuestionPopup />
            )}
            {openPopup === "submitDeletePopup" && <SubmitDeletePopup />}
            {openPopup === "editArtworkAddress" && <EditArtworkAddressPopup />}
            {openPopup === "editDeliveryTariff" && <EditTariffPopup />}
            {openPopup === "createDeliveryTariff" && <NewDeliveryTariff />}
        </>
    );
};

const mapState = (state: IRootState) => ({
    openPopup: state.openPopup.openPopup,
});

const connector = connect(mapState);

export const AllPopups = connector(AllPopupsComponent);
