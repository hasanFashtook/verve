
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_STRAPI_APT;
const backendUrl = process.env.NEXT_PUBLIC_BACK_END_URL;

export const instanceAxios = axios.create({
  baseURL: `https://verve-admin-panel.onrender.com/api/`,
  headers: {
    Authorization: `Bearer 07088566659ee2983cdb0ad8eafc64f478c5616772cd1e0019c1b6a4185e434aaa4587099b0cf630951a4ba427878ee6e174f47e151509afe535ce62c15d428bdba3a48481ad030f7cdc207f00c3940c4df8b642a41e4949d9c950a3ddd3c0bfeae959c32b8bcfdab21d300197f4b2d63225e0a4fe3932e476a89504445f8b1e`
  }
});