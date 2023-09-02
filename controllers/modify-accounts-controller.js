import { userStore } from "../models/user-store.js";
import { accountsController } from "./accounts-controller.js";

export const modifyAccountsController = {
  async index (request, response) {
    const user = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "Modify Account Details",
      user: user,
    };
    console.log('Access account details of user', user.email);
    response.render("account-details", viewData);
  },
  
  async modifyAccount(request, response) {
    const oldUserData = await accountsController.getLoggedInUser(request);
    const updatedUserData = {
      firstname: request.body.firstname,
      surname: request.body.surname,
      email: request.body.email,
      password: request.body.password,
    };
    await userStore.updateUser(oldUserData, updatedUserData);
    response.cookie("station", updatedUserData.email);
    response.redirect("accountdetails");
  },
}