import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import '@types/jest';
import ServiceArtistApi from "../../services/server/ServiceArtGallery";


describe('fetchData', () => {
    let mockAxios: MockAdapter;
    let serviceArtistApi = new ServiceArtistApi()

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(() => {
        mockAxios.restore();
    });

    it('return data success', async () => {
        const responseData = {
            "pagination": {
                "total": 122928,
                "limit": 1,
                "offset": 0,
                "total_pages": 122928,
                "current_page": 1,
                "next_url": "https://api.artic.edu/api/v1/artworks?page=2&fields=id%2Ctitle%2Cartist_display%2Cimage_id%2Cmain_reference_number%2Cdescription%2Cterm_titles%2Cthumbnail%2Cprovenance_text&limit=1"
            },
            "data": [
                {
                    "id": 262764,
                    "title": "Kanga",
                    "thumbnail": {
                        "lqip": "data:image/gif;base64,R0lGODlhBwAFAPUAAHpwbHtwbnt0cH10cn53c311dH92dHx6eH56eH17en58eYB1cIF2coF8eol9eYKAfYyAf4yDfo2BgI+FhI6Mh5KJh5SIhJaLiZiMi5iPjJGRj56Qip2Ti5mVj5yUjaOclaagl62mnbGmngAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAHAAUAAAYhQEghgTgEMJPIxwPiVDQdkWMTomQYBIBgYZEMFI2H4RIEADs=",
                        "width": 10223,
                        "height": 7268,
                        "alt_text": "A work made of cotton, plain weave; printed; both selvages present."
                    },
                    "main_reference_number": "2022.1488",
                    "artist_display": "Kenya",
                    "description": "<p>This kanga is a commemoration of the British Empire’s campaign in East Africa during World War II, some of which took part in Kenya. It celebrates the first Allied strategic victory in the battle against Italy and its colony of Italian East Africa. The Italian defeat eased the flow of supplies through the Red Sea to Egypt. The intentionally curved sides of the cloth emulate a sail taken up by the wind.</p>\n",
                    "provenance_text": "Farouque Abdela, Zanzibar, Tanzania, by 1990 [correspondence from F. Abdela, Sept. 2022; copy in curatorial object file]; sold to the Art Institute of Chicago, 2022.",
                    "term_titles": [
                        "textile",
                        "ships",
                        "cotton (textile)",
                        "printing",
                        "20th Century",
                        "weaving",
                        "WWII",
                        "war",
                        "sailing",
                        "flags",
                        "stripes",
                        "dots",
                        "ocean",
                        "waves",
                        "plain weaving",
                        "weaving"
                    ],
                    "image_id": "58aa348a-be14-be66-310b-9dbcf9226803"
                }
            ],
            "info": {
                "license_text": "The `description` field in this response is licensed under a Creative Commons Attribution 4.0 Generic License (CC-By) and the Terms and Conditions of artic.edu. All other data in this response is licensed under a Creative Commons Zero (CC0) 1.0 designation and the Terms and Conditions of artic.edu.",
                "license_links": [
                    "https://creativecommons.org/publicdomain/zero/1.0/",
                    "https://www.artic.edu/terms"
                ],
                "version": "1.9"
            },
            "config": {
                "iiif_url": "https://www.artic.edu/iiif/2",
                "website_url": "http://www.artic.edu"
            }
        };
        mockAxios.onGet('https://api.artic.edu/api/v1/artworks').reply(200, responseData);
        const data = await serviceArtistApi.getListArts("1");
        expect(data).toEqual(responseData);
    });


});