/** @desc Cache object for mobile detection results. **/
const detectionCache = {};

/** @desc Utility class that determines the end user's browser user agent. **/
export class MobileDetection {
  /**
  * @desc Clears the detection cache. Useful for testing purposes.
  **/
  static clearCache() {
    Object.keys(detectionCache).forEach((key) => {
      delete detectionCache[key];
    });
  }

  /**
  * @desc Determines if the user is using an Android device.
  **/
  static Android() {
    if (detectionCache.android === undefined) {
      detectionCache.android = !!navigator.userAgent.match(/Android/i);
    }
    return detectionCache.android;
  }

  /**
  * @desc Determines if the user is using an old Android device.
  **/
  static AndroidOld() {
    if (detectionCache.androidOld === undefined) {
      detectionCache.androidOld = !!navigator.userAgent.match(/Android 2.3.3/i);
    }
    return detectionCache.androidOld;
  }

  /**
  * @desc Determines if the user is using an Android tablet device.
  **/
  static AndroidTablet() {
    if (detectionCache.androidTablet === undefined) {
      detectionCache.androidTablet = !!(navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i));
    }
    return detectionCache.androidTablet;
  }

  /**
  * @desc Determines if the user is using a Kindle.
  **/
  static Kindle() {
    if (detectionCache.kindle === undefined) {
      detectionCache.kindle = !!navigator.userAgent.match(/Kindle/i);
    }
    return detectionCache.kindle;
  }

  /**
  * @desc Determines if the user is using a Kindle Fire.
  **/
  static KindleFire() {
    if (detectionCache.kindleFire === undefined) {
      detectionCache.kindleFire = !!navigator.userAgent.match(/KFOT/i);
    }
    return detectionCache.kindleFire;
  }

  /**
  * @desc Determines if the user is using Silk.
  **/
  static Silk() {
    if (detectionCache.silk === undefined) {
      detectionCache.silk = !!navigator.userAgent.match(/Silk/i);
    }
    return detectionCache.silk;
  }

  /**
  * @desc Determines if the user is using a BlackBerry device
  **/
  static BlackBerry() {
    if (detectionCache.blackBerry === undefined) {
      detectionCache.blackBerry = !!navigator.userAgent.match(/BlackBerry/i);
    }
    return detectionCache.blackBerry;
  }

  /**
  * @desc Determines if the user is using an iOS device.
  **/
  static iOS() {
    if (detectionCache.iOS === undefined) {
      detectionCache.iOS = !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }
    return detectionCache.iOS;
  }

  /**
  * @desc Determines if the user is using an iPhone or iPod.
  **/
  static iPhone() {
    if (detectionCache.iPhone === undefined) {
      detectionCache.iPhone = !!navigator.userAgent.match(/iPhone|iPod/i);
    }
    return detectionCache.iPhone;
  }

  /**
  * @desc Determines if the user is using an iPad.
  **/
  static iPad() {
    if (detectionCache.iPad === undefined) {
      detectionCache.iPad = !!navigator.userAgent.match(/iPad/i);
    }
    return detectionCache.iPad;
  }

  /**
  * @desc Determines if the user is using a Windows Mobile device.
  **/
  static Windows() {
    if (detectionCache.windows === undefined) {
      detectionCache.windows = !!navigator.userAgent.match(/IEMobile/i);
    }
    return detectionCache.windows;
  }

  /**
  * @desc Determines if the user is using FireFoxOS.
  **/
  static FirefoxOS() {
    if (detectionCache.firefoxOS === undefined) {
      detectionCache.firefoxOS = !!navigator.userAgent.match(/Mozilla/i) && !!navigator.userAgent.match(/Mobile/i);
    }
    return detectionCache.firefoxOS;
  }

  /**
  * @desc Determines if the user is using a Retina display.
  **/
  static Retina() {
    return (window.retina || window.devicePixelRatio > 1);
  }

  /**
  * @desc Determines if the user is using any type of mobile device.
  **/
  static any() {
    if (detectionCache.any === undefined) {
      detectionCache.any = (this.Android() || this.Kindle() || this.KindleFire() || this.Silk() || this.BlackBerry() || this.iOS() || this.Windows() || this.FirefoxOS());
    }
    return detectionCache.any;
  }
}

export default MobileDetection;
