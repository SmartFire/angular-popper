angular.module('app')
    .service('popperService', ['$log', '$document', '$timeout',
        function ($log, $document, $timeout) {
            var popup;

            function getPopupBubble() {
                return popup._popper;
            }

            function closeAllOpen() {
                if (popup) {
                    popup.destroy();
                }

            }

            function close(e, popperAfterClose?) {
                popup._popper.setAttribute('aria-hidden', 'true');
                var toggleElement = getPopupBubble();
                if (e && toggleElement && toggleElement.contains(e.target)) {
                    return;
                }
                $log.debug('close');
                $document.off('click', close);
                $document.off('keydown', escapeKey);

                if (popup) {
                    popup.destroy()
                }
                if (popperAfterClose && typeof popperAfterClose === 'function') {
                    popperAfterClose(e);
                }
                e.stopPropagation();
            }

            function escapeKey(e) {
                if (e.which === 27) {
                    $timeout(function () {
                        close(e)
                    });
                }
            }

            function create(trigger, popper, options) {
                closeAllOpen();
                popup = new Popper(trigger, popper, options);
                popup._popper.setAttribute('aria-role', 'tooltip');
                popup._popper.setAttribute('aria-hidden', 'false');
                $document.on('click', close);
                $document.on('keydown', escapeKey);


                popup.onUpdate(function () {
                    console.log('a');
                });
                popup.onCreate(function () {
                    console.log('a');
                });
                return popup;
            }

            return {
                create: create,
                escapeKey: escapeKey,
                close: close,
                getPopupBubble: getPopupBubble
            };

        }
    ]);