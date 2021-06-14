/*
You DONT have to import the User with your username.
Because it's a default export we can nickname it whatever we want.
So import User from "./models"; will work!
You can do User.find() or whatever you need like normal!
*/
import User from "./models/User";
import bcrypt from "bcrypt";

const errMsg = {
  user: "username does not exists",
  password: "wrong password",
  passwordConfirm: "wrong password confirmation",
  username: "username already taken"
};

export const home = async (req, res) => {
  if( !req.session.loggedIn )
    return res.redirect("/login");
  return res.render("home", { pageTitle: "HOME" });
}
export const getJoin = (req, res) => res.render("join", { pageTitle: "JOIN" });
export const postJoin = async (req, res) => {
  const pageTitle = "JOIN";
  const { username, password, passwordConfirm, name } = req.body;
  if (password !== passwordConfirm)
    return res
      .status(400)
      .render("join", { pageTitle, errMsg: errMsg.passwordConfirm });
  if (await User.exists({ username }))
    return res
      .status(400)
      .render("join", { pageTitle, errMsg: errMsg.username });
  try {
    await User.create({
      username,
      password,
      name
    });
    return res.redirct("/");
  } catch (e) {
    return res.render("join", { pageTitle, errMsg: e._message });
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "LOGIN" });
export const postLogin = async (req, res) => {
  const pageTitle = "LOGIN";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user)
    return res.status(400).render("login", { pageTitle, errMsg: errMsg.user });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return res
      .status(400)
      .render("login", { pageTitle, errMsg: errMsg.password });

  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
