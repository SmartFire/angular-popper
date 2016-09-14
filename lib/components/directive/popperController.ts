angular.module('app')
    .controller('popperCtrl', ['$scope', '$element', 'popperService',
        function ($scope, $element, popperService) {
            var popup;
            var popperTrigger = $element[0];
            var popper = this.popperTrigger;
            var popperOptions = this.popperOptions;
            var popperBeforeOpen = this.popperBeforeOpen;
            var popperAfterClose = this.popperAfterClose;

            function open(e) {
                if (popperBeforeOpen && typeof popperBeforeOpen === 'function') {
                    popperBeforeOpen(e);
                }
                if (!popup) {

                    popup = popperService.create(popperTrigger, popper, popperOptions);
                } else {
                    popup = popperService.create(popperTrigger, popup._popper, popperOptions);
                }
                /*$element.off('click', open);
                 $element.on('click', close);*/
                e.stopPropagation();
            }


            function close(e) {
                popperService.close(e, popperAfterClose);
                $element.on('click', open);
            }

            function initialize() {
                $element.on('click', open);
            }


            initialize();
        }
    ]);

export class PopperCtrl {

}