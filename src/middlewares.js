export const localsMiddleware = ( req, res, next ) => {
    res.locals.loggedIn = Bool( req.session.loggedIn );
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user;
    next();
};