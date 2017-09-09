<%_ if (framework == 'bootstrap-4' || framework == 'foundation') { _%>
import $ from 'jquery'
<%_ if (framework == 'bootstrap-4') { _%>
import Popper from 'popper.js'
import Bootstrap from 'bootstrap'
<%_ } _%>
<%_ if (framework == 'foundation') { _%>
import Foundation from 'foundation-sites'

$(document).foundation();
<%_ } _%>
<%_ } _%>
