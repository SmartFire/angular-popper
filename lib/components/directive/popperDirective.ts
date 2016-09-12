angular.module('app')
    .directive('popperTrigger', [
        function () {
            return {
                restrict: 'A',
                replace: false,
                bindToController: {
                    popperTrigger: '=',
                    popperOptions: '=',
                    popperBeforeOpen: '&',
                    popperAfterClose: '&'

                },
                scope: true,
                controller: 'popperCtrl',
                controllerAs: 'Popper'
            }
        }
    ]);
