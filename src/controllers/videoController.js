export const trending = ( req, res ) => res.render( "home", { pageTitle: "Home"} );
export const see = ( req, res ) => res.render( "watch", { pageTitle: "Watch"} );
export const edit = ( req, res ) => res.render( "edit", { pageTitle: "Edit"} );
export const search = ( req, res ) => res.send( "Search Video" );
export const upload = ( req, res ) => res.send( "Upload Video" );
export const deleteVideo = ( req, res ) => {
    return res.send( `Delete Video #${req.params.id}` ); 
}

