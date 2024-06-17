import { MainCategoriesGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainCategoriesGetIdResponseDto";
import { MainKeywordsMainKeywordsGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainKeywordsMainKeywordsGetIdResponseDto";
import { MainMaterialGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainMaterialGetIdResponseDto";
import { MainStyleGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainStyleGetIdResponseDto";
import { MainSubjectGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainSubjectGetIdResponseDto";

export type MainDataIdResponse =
    | MainSubjectGetIdResponseDto
    | MainKeywordsMainKeywordsGetIdResponseDto
    | MainStyleGetIdResponseDto
    | MainCategoriesGetIdResponseDto
    | MainMaterialGetIdResponseDto;
