const ProfileService = require("../services/profileService");
const { HTTP_CODE } = require("../services/errorCodes");

const getProfile = async (req, res, next) => {
  debugger;
  const { profile_id } = req.query;
  if (!profile_id) {
    return res.status(HTTP_CODE.UNAUTHORIZED).end();
  }

  const profile = await ProfileService.getProfileById(profile_id);
  if (!profile) {
    return res.status(HTTP_CODE.UNAUTHORIZED).end();
  }
  req.profile = profile;

  next();
};
module.exports = { getProfile };

// const getProfile = async (req, res, next) => {
//     const {Profile} = req.app.get('models')
//     const profile = await Profile.findOne({where: {id: req.get('profile_id') || 0}})
//     if(!profile) return res.status(401).end()
//     req.profile = profile
//     next()
// }
// module.exports = {getProfile}
