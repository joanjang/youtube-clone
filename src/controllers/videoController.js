import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort( { createdAt: "desc" })
      .populate( "owner" );
    return res.render( "home", { pageTitle: "Home", videos } );
  } catch ( e ) {
    return res.status(404).render( "error-search", { pageTitle: "Error", e } );
  }
}
export const watch = async ( req, res ) => {
    const { id } = req.params;
    const video = await Video.findById( id ).populate( "owner" );
    if( !video )
      return res.render( "404", {pageTitle: "Video not found." } );
    return res.render( "watch", { pageTitle: `Watching: ${video.title}`, video } );
}
export const getEdit = async ( req, res ) => {
    const {
      params: { id },
      session: { user: { _id } }
    } = req;
    const video = await Video.findById( id );
    if( !video )
      return res.satus( 404 ).render( "404", { pageTitle: "Video not found." } );
    if( String( video.owner ) !== String( _id ) )
      return res.satus( 403 ).redirect( "/" );
    return res.render( "edit", { pageTitle: `Editing: ${video.title}`, video } );
}
export const postEdit = async ( req, res ) => {
    const {
      params: { id },
      session: { user: { _id } },
      body: { title, description, hashtags }
    } = req;
    const video = await Video.exists( { _id: id } );
    if( !video )
      return res.status(404).render( "404", { pageTitle: "Video not found" } );
    if( String( video.owner ) !== String( _id ) )
      return res.satus( 403 ).redirect( "/" );
    await Video.findByIdAndUpdate( id, {
      title, 
      description,       
      hashtags: Video.formatHashtags( hashtags )
    } );
    return res.redirect( `/videos/${id}`);
}
export const getUpload = ( req, res ) => {
  return res.render( "upload", { pageTitle: `Uploading Video` } );
}
export const postUpload = async ( req, res ) => {
  const { 
      session: { user: { _id } },
      files: { video, thumb },
      body: { title, description, hashtags }
    } = req;
    console.log(video, thumb);
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      owner: _id,
      hashtags: Video.formatHashtags( hashtags )
    });
    const user = await User.findById( _id );
    user.videos.push( newVideo );
    user.save(); 
    return res.redirect("/");
  } catch (e) {
    return res.status(400).render( "upload", { pageTitle: "Upload Video", errorMessage: e._message } );
  };
}
export const deleteVideo = async ( req, res ) => {
  const { 
      params: { id },
      session: { user: { _id } }
    } = req;
  const video = await Video.findById( id );
  if( !video )
    return res.satus( 404 ).render( "404", { pageTitle: "Video not found." } );
  if( String( video.owner ) !== String( _id ) )
    return res.satus( 403 ).redirect( "/" );
  await Video.findByIdAndDelete( id );
  return res.redirect( "/" );
}
export const search = async ( req, res ) => {
  const { keyword } = req.query;
  let videos = [];
  if( keyword ) {
    videos = await Video.find({
      title: {
        $regex: new RegExp( keyword, "i" ) 
      }
    }).populate("owner");
  }
  return res.render( "search", { pageTitle: "Search", videos } );
}
export const registerView = async ( req, res ) => {
  const { id } = req.params;
  const video = await Video.findById( id );
  if( !video )
    return res.sendStatus( 404 );
  video.meta.views += 1;
  await video.save();
  return res.sendSatus( 200 );
}