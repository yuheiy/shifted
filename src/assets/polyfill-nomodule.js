import objectFitImages from "object-fit-images"; // should be imported before picturefill, see https://github.com/fregante/object-fit-images/issues/104#issuecomment-547507026
import "picturefill";
import "picturefill/dist/plugins/mutation/pf.mutation";

import "core-js/stable";
import "dom4";
import "mutation-observer-inner-html-shim"; // https://github.com/stimulusjs/stimulus/tree/master/packages/%40stimulus/polyfills

objectFitImages();
