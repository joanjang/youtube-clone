export const localsMiddleware = (req, res, next) => {
  res.locals.siteTitle = "Nomad Users";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.user = req.session.user;
  next();
};
