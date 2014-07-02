/*global define*/
define(function() {
    "use strict";

    /**
     * A structure containing the orientation data computed at a particular time. The data
     * represents the direction of the pole of rotation and the rotation about that pole.
     * <p>
     * These parameters correspond to the parameters in the Report from the IAU/IAG Working Group
     * except that they are expressed in radians.
     * </p>
     *
     * @namespace
     * @alias IauOrientationParameters
     *
     * @private
     */
    var IauOrientationParameters = function(rightAscension, declination, rotation, rotationRate) {
        /**
         * The right ascension of the north pole of the body with respect to
         * the International Celestial Reference Frame, in radians.
         * @type {Number}
         */
        this.rightAscension = rightAscension;

        /**
         * The declination of the north pole of the body with respect to
         * the International Celestial Reference Frame, in radians.
         * @type {Number}
         */
        this.declination = declination;

        /**
         * The rotation about the north pole used to align a set of axes with
         * the meridian defined by the IAU report, in radians.
         * @type {Number}
         */
        this.rotation = rotation;

        /**
         * The instantaneous rotation rate about the north pole, in radians per second.
         * @type {Number}
         */
        this.rotationRate = rotationRate;
    };

    return IauOrientationParameters;
});