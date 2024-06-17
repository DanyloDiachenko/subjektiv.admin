/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
import type { OpenAPIConfig } from '../core/OpenAPI';
import { FetchHttpRequest } from '../core/FetchHttpRequest';
import { AddressService } from './services/AddressService';
import { AdminArtworkService } from './services/AdminArtworkService';
import { AdminCommentService } from './services/AdminCommentService';
import { AdminDeliveryTariffService } from './services/AdminDeliveryTariffService';
import { AdminNotificationService } from './services/AdminNotificationService';
import { AdminUserService } from './services/AdminUserService';
import { ArtworkService } from './services/ArtworkService';
import { ArtworkBidService } from './services/ArtworkBidService';
import { ArtworkImagesService } from './services/ArtworkImagesService';
import { ArtworkOfferService } from './services/ArtworkOfferService';
import { ArtworkOrderService } from './services/ArtworkOrderService';
import { ArtworkPassportService } from './services/ArtworkPassportService';
import { ArtworkPostService } from './services/ArtworkPostService';
import { ArtworkPostCommentService } from './services/ArtworkPostCommentService';
import { ArtworkPostCommentReactionService } from './services/ArtworkPostCommentReactionService';
import { ArtworkReviewService } from './services/ArtworkReviewService';
import { ArtworkReviewRequestService } from './services/ArtworkReviewRequestService';
import { CategoriesService } from './services/CategoriesService';
import { CitiesService } from './services/CitiesService';
import { CommentQuestionService } from './services/CommentQuestionService';
import { CountriesService } from './services/CountriesService';
import { DeliveryService } from './services/DeliveryService';
import { EventService } from './services/EventService';
import { KeywordsService } from './services/KeywordsService';
import { MaterialsService } from './services/MaterialsService';
import { SavedCollectionsService } from './services/SavedCollectionsService';
import { SearchService } from './services/SearchService';
import { StylesService } from './services/StylesService';
import { SubjectsService } from './services/SubjectsService';
import { TechnicalService } from './services/TechnicalService';
import { UserService } from './services/UserService';
import { UserExpertService } from './services/UserExpertService';
import { UserFollowsService } from './services/UserFollowsService';
import { UserPaymentService } from './services/UserPaymentService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class MainApi {
    public readonly address: AddressService;
    public readonly adminArtwork: AdminArtworkService;
    public readonly adminComment: AdminCommentService;
    public readonly adminDeliveryTariff: AdminDeliveryTariffService;
    public readonly adminNotification: AdminNotificationService;
    public readonly adminUser: AdminUserService;
    public readonly artwork: ArtworkService;
    public readonly artworkBid: ArtworkBidService;
    public readonly artworkImages: ArtworkImagesService;
    public readonly artworkOffer: ArtworkOfferService;
    public readonly artworkOrder: ArtworkOrderService;
    public readonly artworkPassport: ArtworkPassportService;
    public readonly artworkPost: ArtworkPostService;
    public readonly artworkPostComment: ArtworkPostCommentService;
    public readonly artworkPostCommentReaction: ArtworkPostCommentReactionService;
    public readonly artworkReview: ArtworkReviewService;
    public readonly artworkReviewRequest: ArtworkReviewRequestService;
    public readonly categories: CategoriesService;
    public readonly cities: CitiesService;
    public readonly commentQuestion: CommentQuestionService;
    public readonly countries: CountriesService;
    public readonly delivery: DeliveryService;
    public readonly event: EventService;
    public readonly keywords: KeywordsService;
    public readonly materials: MaterialsService;
    public readonly savedCollections: SavedCollectionsService;
    public readonly search: SearchService;
    public readonly styles: StylesService;
    public readonly subjects: SubjectsService;
    public readonly technical: TechnicalService;
    public readonly user: UserService;
    public readonly userExpert: UserExpertService;
    public readonly userFollows: UserFollowsService;
    public readonly userPayment: UserPaymentService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.address = new AddressService(this.request);
        this.adminArtwork = new AdminArtworkService(this.request);
        this.adminComment = new AdminCommentService(this.request);
        this.adminDeliveryTariff = new AdminDeliveryTariffService(this.request);
        this.adminNotification = new AdminNotificationService(this.request);
        this.adminUser = new AdminUserService(this.request);
        this.artwork = new ArtworkService(this.request);
        this.artworkBid = new ArtworkBidService(this.request);
        this.artworkImages = new ArtworkImagesService(this.request);
        this.artworkOffer = new ArtworkOfferService(this.request);
        this.artworkOrder = new ArtworkOrderService(this.request);
        this.artworkPassport = new ArtworkPassportService(this.request);
        this.artworkPost = new ArtworkPostService(this.request);
        this.artworkPostComment = new ArtworkPostCommentService(this.request);
        this.artworkPostCommentReaction = new ArtworkPostCommentReactionService(this.request);
        this.artworkReview = new ArtworkReviewService(this.request);
        this.artworkReviewRequest = new ArtworkReviewRequestService(this.request);
        this.categories = new CategoriesService(this.request);
        this.cities = new CitiesService(this.request);
        this.commentQuestion = new CommentQuestionService(this.request);
        this.countries = new CountriesService(this.request);
        this.delivery = new DeliveryService(this.request);
        this.event = new EventService(this.request);
        this.keywords = new KeywordsService(this.request);
        this.materials = new MaterialsService(this.request);
        this.savedCollections = new SavedCollectionsService(this.request);
        this.search = new SearchService(this.request);
        this.styles = new StylesService(this.request);
        this.subjects = new SubjectsService(this.request);
        this.technical = new TechnicalService(this.request);
        this.user = new UserService(this.request);
        this.userExpert = new UserExpertService(this.request);
        this.userFollows = new UserFollowsService(this.request);
        this.userPayment = new UserPaymentService(this.request);
    }
}

