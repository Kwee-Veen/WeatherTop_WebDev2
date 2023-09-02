import { userStore } from "../models/user-store.js";

export const accountsController = {
  
  login (request, response) {
    const viewData = {
      title: "Login to WeatherTop",
    };
    console.log("Rendering login view");
    response.render("login-view", viewData);
  },
  
  logout(request, response) {
    response.cookie("station", "");
    console.log("Logging user out");
    response.redirect("/");
  },
  
  signup(request, response) {
    const viewData = {
      title: "Register New Account: WeatherTop",
    };
    console.log("Rendering sign-up view");
    response.render("signup-view", viewData);
  },
  
  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/login");
  },
  
  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if ((user) && (request.body.password === user.password)) {
      response.cookie("station", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },
  
  async getLoggedInUser(request) {
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  },
};