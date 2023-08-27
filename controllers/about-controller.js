export const aboutController = {
  async index(request, response) {
    const viewData = {
      title: "About Playlist",
    };
    console.log("Rendering 'About' page.");
    response.render("about-view", viewData);
  },
};
