import requests from "./httpServices";

const BrandServices = {
  getShowingBrands: async () => {
    return requests.get("/brand/show");
  },
};

export default BrandServices;

