export const home = (req, res) => res.render( "home", {pageTitle:"Home"} );
export const trending = (req, res) => res.render( "trending", {pageTitle:"Trending"} );
export const newStories = (req, res) => res.render( "newStories", {pageTitle:"NewStories"} );
export const seeStory = (req, res) => res.render( "seeStory", {pageTitle:"SeeStory", id:`${req.params.id}`} );
export const editStory = (req, res) => res.render( "EditStory", {pageTitle:"editStory", id:`${req.params.id}`} );
export const deleteStory = (req, res) => res.render( "DeleteStory", {pageTitle:"deleteStory", id:`${req.params.id}`} );