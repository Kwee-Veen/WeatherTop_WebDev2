export const indexController = {
  index(request, response) {
    const viewData = {
      title: "Welcome to WeatherTop",
    };
    console.log("Rendering initial welcome view");
    response.render("index", viewData);
  },
};
