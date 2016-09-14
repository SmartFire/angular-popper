import {PopperCtrl} from "./popperController";
import {PopperTrigger} from "./popperDirective";

export default(app) => {
    app.service('popperService', PopperCtrl);
    app.directive('popper', PopperTrigger)
}