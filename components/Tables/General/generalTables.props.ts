import { MainCategoriesGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainCategoriesGetResponseDto";
import { MainKeywordsGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainKeywordsGetResponseDto";
import { MainMaterialGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainMaterialGetResponseDto";
import { MainStyleGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainStyleGetResponseDto";
import { MainSubjectGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainSubjectGetResponseDto";

export type MainDataGetResponse =
    | MainSubjectGetResponseDto
    | MainKeywordsGetResponseDto
    | MainCategoriesGetResponseDto
    | MainMaterialGetResponseDto
    | MainStyleGetResponseDto;
