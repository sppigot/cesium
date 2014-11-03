/*global define*/
define([
        '../../Core/defineProperties',
        '../../ThirdParty/knockout',
        '../createCommand'
    ], function(
        defineProperties,
        knockout,
        createCommand) {
    "use strict";

    /**
     * The view model for {@link ImageCarousel}.
     * @alias ImageCarouselViewModel
     * @constructor
     */
    var ImageCarouselViewModel = function() {
        /**
         * Gets or sets whether the carousel is currently shown.  This property is observable.
         * @type {Boolean}
         * @default false
        */
        this.showCarousel = false;

        var that = this;
        this._command = createCommand(function() {
            that.showCarousel = !that.showCarousel;
        });

        /**
         * Gets or sets the tooltip.  This property is observable.
         *
         * @type {String}
         */
        this.tooltip = 'Information';

				this.imageArray = [];

        knockout.track(this, ['tooltip', 'showCarousel', 'imageArray']);
    };

    defineProperties(ImageCarouselViewModel.prototype, {
        /**
         * Gets the Command that is executed when the button is clicked.
         * @memberof ImageCarouselViewModel.prototype
         *
         * @type {Command}
         */
        command : {
            get : function() {
                return this._command;
            }
        }

    });

    return ImageCarouselViewModel;
});
