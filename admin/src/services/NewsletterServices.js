import requests from "./httpService";

const NewsletterServices = {
  getAllNewsletter: async () => {
    return requests.get("/newsletter");
  },

  addNewsletter: async (body) => {
    return requests.post("/newsletter/add", body);
  },

  deleteNewsletter: async (id) => {
    return requests.delete(`/newsletter/${id}`);
  },

  deleteManyNewsletter: async (body) => {
    return requests.patch("/newsletter/delete/many", body);
  },
};

export default NewsletterServices;
