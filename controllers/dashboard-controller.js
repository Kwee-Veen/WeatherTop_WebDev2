// import { playlistStore } from "../models/playlist-store.js";
// import { accountsController } from "./accounts-controller.js";

// export const dashboardController = {
//   async index(request, response) {
//     const loggedInUser = await accountsController.getLoggedInUser(request);
//     const viewData = {
//       title: "Playlist Dashboard",
//       playlists: await playlistStore.getPlaylistsByUserId(loggedInUser._id),
//     };
//     console.log("dashboard rendering");
//     response.render("dashboard-view", viewData);
//   },

//   async addPlaylist(request, response) {
//     const loggedInUser = await accountsController.getLoggedInUser(request);
//     const newPlaylist = {
//       title: request.body.title,
//       userid: loggedInUser._id,
//     };
//     console.log(`adding playlist ${newPlaylist.title}`);
//     await playlistStore.addPlaylist(newPlaylist);
//     response.redirect("/dashboard");
//   },
//   async deletePlaylist(request, response) {
//     const playlistId = request.params.id;
//     console.log("Deleting playlist ${playlistId}");
//     await playlistStore.deletePlaylistById(playlistId);
//     response.redirect("/dashboard");
//   },
// };
