interface IPopperService {
    create(trigger, popper, options): void;
    escapeKey(e: Event): void;
    close(e: Event, popperAfterClose?): void;
    getPopupBubble(): void;
    popup;
}
export class PopperService implements IPopperService {
    static $inject = ['$log', '$document', '$timeout'];
    popup;

    constructor($log, $document, $timeout) {
    }

    getPopupBubble() {
        return popup._popper;
    }

    private closeAllOpen() {
        if (popup) {
            popup.destroy();
        }

    }

    close(e, popperAfterClose?) {
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

    escapeKey(e) {
        if (e.which === 27) {
            $timeout(function () {
                close(e)
            });
        }
    }

    create(trigger, popper, options) {
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
}