import process from "node:process";

class UserAuth {
  constructor() {}

  #PERMISSION_ERROR_MESSAGE =
    "You need admin previleges to perform this operation";
  permissionErrorMessage = () => this.#PERMISSION_ERROR_MESSAGE;
  isAdmin(req) {
    console.log(req.query + "doing");
    if (req.query.admin === process.env.ADMIN_CODE) {
      return true;
    } else {
      return false;
    }
  }
}

const userAuth = new UserAuth();
export default userAuth;
