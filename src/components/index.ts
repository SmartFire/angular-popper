import Directive from "./directive";
import Service from "./service";
export default(app) => {
    Directive(app);
    Service(app);
}