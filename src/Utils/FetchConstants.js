const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_FRONT_PAGE = "tags=front_page";

const searchUrl = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;
const frontPageUrl = `${PATH_BASE}${PATH_SEARCH}?${PARAM_FRONT_PAGE}`;

export { searchUrl, frontPageUrl };
