/*global define*/
define([
        './knockout-3.2.0',
        './knockout-es5',
        '../Widgets/SvgPathBindingHandler',
				'./knockstrap-1.1.0',
    ], function(
        knockout,
        knockout_es5,
        SvgPathBindingHandler,
				knockstrap
				) {
    "use strict";

    // install the Knockout-ES5 plugin
    knockout_es5.attachToKo(knockout);

    // install the Knockstrap plugin
    knockstrap.attachToKo(knockout);

    // Register all Cesium binding handlers
    SvgPathBindingHandler.register(knockout);

    return knockout;
});
