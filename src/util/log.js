/**
* @desc Determines whether or not to log based on a url param. Takes description as a parameter and returns log.
* @param {string} description - The description that should go in the log.
**/
export function sendLog(parentFunc, description, slotName) {
  try {
    if ((new URLSearchParams(window.location.search)).get('debug') === 'true') {
      console.log('[ArcAds]', {
        service: 'ArcAds',
        timestamp: `${new Date()}`,
        'logging from': parentFunc,
        description,
        slotName
      });
    }
  } catch (error) {
    console.error(error);
  }
}
