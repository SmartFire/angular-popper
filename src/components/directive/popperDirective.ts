export class PopperTrigger {
    /*if we need to inject dependencies into the directive class we do it the following way*/
    static instance(): ng.IDirectiveFactory {
        var directive = () => new PopperTrigger();
        directive.$inject = [];
        return directive;
    }

    restrict = 'A';
    replace = false;
    bindToController = {
        popperTrigger: '=',
        popperOptions: '=',
        popperBeforeOpen: '&',
        popperAfterClose: '&'
    };
    scope = true;
    controller = 'popperCtrl';
    controllerAs = 'Popper';

}





