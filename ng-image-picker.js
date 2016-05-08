
/**
 * @name ng-image-picker
 * @version 0.0.1
 * @license MIT
 * @author Diego Herrera
 * @description This piece of code is an image files selector for AngularJS.
 */

(function(window) {

    "use strict";

    if (window && window.angular) {

        angular.module("dahr.ng-image-picker", []).directive("imagePicker", ["$document", function($document) {

            return {
                restrict: "AE",
                replace: true,
                scope: {
                    imageSelected: "&",
                    imageDeselected: "&"
                },
                template: [
                    "<div class=\"ng-image-picker\">",
                        "<div>",
                            "<img ng-src=\"{{ imageSrc }}\" ng-show=\"imageSrc\" width=\"240\" height=\"240\">",
                        "</div>",
                        "<input type=\"file\" class=\"ng-hide\" accept=\"image/*\">",
                    "</div>"
                ].join(""),
                link: function(scope, element) {

                    // The image 'src' attribute.
                    scope.imageSrc = null;

                    // If the directive styles aren't loaded yet.
                    if (!$document[0].getElementById("ng-image-picker-style")) {

                        // The CSS clases.
                        var css = [
                            ".ng-image-picker {",
                                "width: 240px;",
                            "}",
                            ".ng-image-picker > div {",
                                "width: 100%;",
                                "height: 240px;",
                                "border: 1px solid #33c3f0;",
                                "background: repeating-linear-gradient(",
                                    "45deg,",
                                    "#33c3f0,",
                                    "#33c3f0 1px,",
                                    "#fff 1px,",
                                    "#fff 10px",
                                ");",
                            "}",
                            ".ng-image-picker > div:hover {",
                                "cursor: pointer;",
                            "}",
                            ".ng-image-picker > div > img {",
                                "border: none;",
                            "}"
                        ].join("");

                        // Create a new style element.
                        var style = $document[0].createElement("style");
                        style.type = "text/css";
                        style.id = "ng-image-picker-style";

                        // Set the css to the style.
                        if (style.stylesheet) {
                            style.styleSheet.cssText = css;
                        }
                        else {
                            style.appendChild($document[0].createTextNode(css));
                        }

                        // Append the style to the head element.
                        var head = $document[0].getElementsByTagName("head")[0];
                        head.appendChild(style);
                    }

                    // A reference to the hidden input.
                    var input = element[0].children[1];

                    // Handle the clicks over this directive.
                    element[0].children[0].addEventListener("click", function() {

                        // Hack: raise the hidden input click event.
                        input.click();
                    });

                    // Handle the image file both selection and deselection actions.
                    input.addEventListener("change", function(e) {

                        // If there is an image selected.
                        if (e.target.files.length > 0) {

                            // Set a reference to the image file.
                            var imageFile = e.target.files[0];

                            // Create a new file reader.
                            var reader = new FileReader();

                            // When the image file is read.
                            reader.onload = function() {

                                apply(function() {

                                    // Set the Bas64 image as the 'img' element source.
                                    scope.imageSrc = reader.result;

                                    // Notify the image file.
                                    scope.imageSelected({ "imageFile": imageFile });
                                })
                            };

                            // Read the image as Bas64.
                            reader.readAsDataURL(imageFile);
                        }
                        // Otherwise.
                        else {

                            apply(function() {

                                // Reset the 'img' element source.
                                scope.imageSrc = null;

                                // Notify the image deselection.
                                scope.imageDeselected();
                            });
                        }
                    });

                    // Apply the given function in an AngularJS safe way.
                    function apply(fn) {
                        setTimeout(function() { scope.$apply(fn); }, 1);
                    }
                }
            };
        }]);
    }
    else {
        window.console.error("ng-image-picker: AngularJS must be loaded first. More info at https://angularjs.org/.");
    }

})(window);
