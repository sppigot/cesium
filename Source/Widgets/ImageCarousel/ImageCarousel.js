/*global define*/
define([
        '../../Core/buildModuleUrl',
        '../../Core/defaultValue',
        '../../Core/defined',
        '../../Core/defineProperties',
        '../../Core/destroyObject',
        '../../Core/DeveloperError',
        '../../ThirdParty/knockout',
        '../getElement',
        './ImageCarouselViewModel'
    ], function(
        buildModuleUrl,
        defaultValue,
        defined,
        defineProperties,
        destroyObject,
        DeveloperError,
        knockout,
        getElement,
        ImageCarouselViewModel) {
    "use strict";

    /**
     * <p>The ImageCarousel is a single button widget for displaying a carousel
		 * of images (bootstrap via knockstrap data bindings).
     *
     * @alias ImageCarousel
     * @constructor
     *
     * @param {Object} options Object with the following properties:
     * @param {Element|String} options.container The DOM element or ID that 
		 * will contain the widget.
		 * @param {Object} options.images Array of images to be displayed in 
		 * carousel.
		 *
     * [
     *  {
     *      src: 'images/dialog1.png',
     *      alt: 'First image',
     *      content: 'First caption'
     *  }, {
     *      src: 'images/dialog2.png',
     *      alt: 'Second image',
     *      content: 'Second caption'
     *  }, {
     *      src: 'images/dialog3.png',
     *      alt: 'Third image',
     *      content: 'Third caption'
     *  }
     * ]
     *
     * @exception {DeveloperError} Element with id "container" does not exist in the document.
     * @exception {DeveloperError} images do not exist in options.
     *
     */
    var ImageCarousel = function(options) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(options) || !defined(options.container)) {
            throw new DeveloperError('options.container is required.');
        }
        //>>includeEnd('debug');

        var container = getElement(options.container);

        var viewModel = new ImageCarouselViewModel();

				var showCarouselDefault = defaultValue(options.carouselInitiallyVisible, false);
				viewModel.showCarousel = showCarouselDefault;

				if (!defined(options) || !defined(options.images)) {
            throw new DeveloperError('options.images is required.');
				}
				for (var i = 0; i < options.images.length; i++) {
					viewModel.imageArray.push(options.images[i]);
				}

        var wrapper = document.createElement('span');
        wrapper.className = 'cesium-imageCarousel-wrapper';
        container.appendChild(wrapper);

        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'cesium-button cesium-toolbar-button';
        button.style.width = '32px';
        button.style.height = '32px';

        var glyph = document.createElement('span');
        glyph.className = 'glyphicon glyphicon-info-sign';
        glyph.style.fontSize = '1.5em'; 
				glyph.style.verticalAlign = 'bottom';
				glyph.setAttribute('data-bind', '\
attr: { title: tooltip },\
click: command');
        button.appendChild(glyph);

        wrapper.appendChild(button);

        var carouselContainer = document.createElement('div');
				carouselContainer.className = 'cesium-image-carousel';
				carouselContainer.setAttribute('data-bind', 'css: { "cesium-image-carousel-visible" : showCarousel }');
        var carouselDiv = document.createElement('div');
				//carouselDiv.setAttribute('data-bind', 'carousel: { content: { data: imageArray } }');
				carouselDiv.setAttribute('data-bind', 'carousel: { content: { data: imageArray } }');
				carouselContainer.appendChild(carouselDiv);
				wrapper.appendChild(carouselContainer);

        knockout.applyBindings(viewModel, wrapper);

        this._container = container;
        this._viewModel = viewModel;
        this._wrapper = wrapper;

        this._closeCarousel = function(e) {
            if (!wrapper.contains(e.target)) {
                viewModel.showCarousel = false;
            }
        };

        document.addEventListener('mousedown', this._closeCarousel, true);
    };

    defineProperties(ImageCarousel.prototype, {
        /**
         * Gets the parent container.
         * @memberof ImageCarousel.prototype
         *
         * @type {Element}
         */
        container : {
            get : function() {
                return this._container;
            }
        },

        /**
         * Gets the view model.
         * @memberof ImageCarousel.prototype
         *
         * @type {ImageCarouselViewModel}
         */
        viewModel : {
            get : function() {
                return this._viewModel;
            }
        }
    });

    /**
     * @returns {Boolean} true if the object has been destroyed, false otherwise.
     */
    ImageCarousel.prototype.isDestroyed = function() {
        return false;
    };

    /**
     * Destroys the widget.  Should be called if permanently
     * removing the widget from layout.
     */
    ImageCarousel.prototype.destroy = function() {
        document.removeEventListener('mousedown', this._closeCarousel, true);

        knockout.cleanNode(this._wrapper);
        this._container.removeChild(this._wrapper);

        return destroyObject(this);
    };

    return ImageCarousel;
});
