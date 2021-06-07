import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find( {} );
    console.log( videos );
    return res.render( "home", { pageTitle: "Home", videos } );
  } catch ( e ) {
    return res.render( "error-search", { pageTitle: "Error", e } );
  }
};

export const watch = ( req, res ) => {
    const { id } = req.params;
    return res.render( "watch", { pageTitle: `Watching: ${video.title}` } );
}
export const getEdit = ( req, res ) => {
    const { id } = req.params;
    return res.render( "edit", { pageTitle: `Editing: ${video.title}` } );
}
export const postEdit = ( req, res ) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect( `/videos/${id}`);
}
export const getUpload = ( req, res ) => {
  return res.render( "upload", { pageTitle: `Uploading Video` } );
}
export const postUpload = async ( req, res ) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split( "," ).map( (word) => `#${word}` )
    });
    return res.redirect("/");
  } catch (e) {
    console.log(e);
    return res.render( "upload", { pageTitle: "Upload Video", errorMessage: e._message } );
  };

}