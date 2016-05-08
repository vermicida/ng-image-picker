
# ng-image-picker

This piece of code is an image files selector for AngularJS. It is an example of how to stylize a HTML5 file input in a simple way. It is not perfect, it is not generic, it will not work _out-of-the-box_ for you. As I already said, it's only an example, so use it just for learning. I am not responsible of the bad things this directive will bring to your life ;-)

## How to

The first step is to download the **ng-image-picker** script. You can do it cloning this repo:
```bash
$ git clone https://github.com/vermicida/ng-image-picker.git
```

Or via NPM:
```bash
$ npm install ng-image-picker
```

Once the library is downloaded, make sure you are referencing it in your `index.html`, just after the AngularJS library reference.
```html
<script src="./node_modules/ng-image-picker/ng-image-picker.js"></script>
```

You must inject the **ng-image-picker** dependency within your module setter:
```javascript
angular.module("test", ["dahr.ng-image-picker"]);
```

Now you can use the directive just like any other:
```html
<image-picker></image-picker>
```

Make sure you are handling the image selection with `imageSelected`:
```html
<image-picker image-selected="$ctrl.onImageSelected(imageFile)"></image-picker>
```

Also, you can handle the image deselection. In this case, set a handler for `imageDeselected`:
```html
<image-picker image-deselected="$ctrl.onImageDeselected()"></image-picker>
```

Your handlers can be something like these:
```javascript
angular
    .module("app")
    .component("test", {
        controller: function(ImageService) {

            // A reference to this context.
            var self = this;

            // Initialize the component data.
            self.$onInit = function() {
                self.image = null;
            };

            // Select the image file.
            self.onImageSelected = function(file) {
                self.image = file;
            };

            // Deselect the image file.
            self.onImageDeselected = function() {
                self.image = null;
            };

            // Upload the image.
            self.upload = function() {
                if (self.image) {
                    ImageService.upload(self.image).then( /* ... */ );
                }
            };
        }
    });
```

## License

Code released under the [MIT license](./LICENSE).
