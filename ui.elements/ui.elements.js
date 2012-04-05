/**
 * UI.Elements
 *
 * @version      1.0
 * @author       nori (norimania@gmail.com)
 * @copyright    5509 (http://5509.me/)
 * @license      The MIT License
 * @link         https://github.com/5509/ui.elements
 *
 * 2012-04-04 22:09
 */
(function($, window, document, undefined) {

  $.fn.UIElements = function(conf) {
    var $form = this,
      runConfs = {
        checkbox: {
          view          : true,
          uiClass       : 'checkbox',
          labelClass    : 'UIElm-check-label',
          checkedClass  : 'checked',
          disabledClass : 'disabled'
        },
        radio: {
          view          : true,
          uiClass       : 'radio',
          labelClass    : 'UIElm-radio-label',
          checkedClass  : 'checked',
          disabledClass : 'disabled'
        },
        select: {
          strLength          : 10,
          uiClass            : 'UIElm-select',
          uiShownClass       : 'UIElm-select-show',
          boxClass           : 'UIElm-select-box',
          boxListClass       : 'UIElm-select-option',
          optionCurrentClass : 'current'
        }
      };

    $.each(conf, function(key, val) {
      $.each(val, function(i, val) {
        switch ( key ) {
        case 'checkbox':
          $form
            .find('input[name="' + val.name + '"]')
            .checkbox($.extend(runConfs.checkbox, val.conf || {}));
          break;

        case 'radio':
          $form
            .find('input[name="' + val.name + '"]')
            .radio($.extend(runConfs.radio, val.conf || {}));
          break;

        case 'select':
        default:
          $form
            .find('select[name="' + val.name + '"]')
            .select($.extend(runConfs.select, val.conf || {}));
        }
      });
    });
  };

}(jQuery, this, this.document));

/*!
 * jq.ui.checks
 *
 * @version      0.43
 * @author       nori (norimania@gmail.com)
 * @copyright    5509 (http://5509.me/)
 * @license      The MIT License
 * @link         https://github.com/5509/jq.ui.checks
 *
 * 2012-04-04 02:43
 */
(function(a,b,c){function f(a,b){this.namespace="Checks";return this instanceof f?this.init(a,b):new f(a,b)}function h(a,b){this.namespace="Checkbox";return this instanceof h?this.init(a,b):new h(a,b)}function j(a,b){this.namespace="Radio";return this instanceof j?this.init(a,b):new j(a,b)}var d,e;d=Object.prototype.hasOwnProperty;e=function(a,b){function c(){this.constructor=a}for(var e in b)d.call(b,e)&&(a[e]=b[e]);c.prototype=b.prototype;a.prototype=new c;a.__super__=b.prototype;return a};f.prototype={baseConf:{view:!1,uiClass:"ui_check",labelClass:"ui_check_label",checkedClass:"ui_checked",disabledClass:"ui_check_disabled"},init:function(b,c){var d=this;d.$elems=b;d.conf=a.extend({},d.baseConf,c);d.elemMaps={};a.each(b,function(a,b){var c=d._matching(b),e=c.$check,f=c.$label,g=c.$view;f&&f.addClass(d.conf.labelClass);d.conf.view&&e.hide().after(g)});d._eventify()},_view:function(b){var c=this,d=a("<span></span>").addClass(this.conf.uiClass);b.disabled&&d.addClass(c.conf.disabledClass);b.checked&&d.addClass(c.conf.checkedClass);return d},_matching:function(b){var c=this,d=b.id;c.elemMaps[d]={id:d,$check:a(b),$view:c.conf.view?c._view(b):undefined,$label:a("label[for="+d+"]"),state:b.checked,disabled:b.disabled};return c.elemMaps[d]},_eventify:function(){var b=this;a.each(b.elemMaps,function(c,d){var e=d.id,f=d.$check,g=d.$label,h=d.$view,i=d.disabled;f.bind({"click.check":function(a){a.stopPropagation();f.trigger("_check:toggle")},"_check:toggle":function(a){b.elemMaps[e].state?b._checkOff(e):b._checkOn(e)},"_check:on":function(){b._checkOn(e)},"_check:off":function(){b._checkOff(e)},"_check:enable":function(){b._enable(e)},"_check:disable":function(){b._disable(e)}});!a.support.opacity&&g.length&&g.click(function(a){a.stopPropagation();f.trigger("click")})})},_checkOn:function(a){var b=this,c=b.elemMaps[a],d=c.$check;if(c.disabled)return;b.conf.view&&c.$view.addClass(b.conf.checkedClass);c.state=!0;d.prop("checked","checked");d.trigger("check:on",c)},_checkOff:function(a){var b=this,c=b.elemMaps[a],d=c.$check;if(c.disabled)return;b.conf.view&&c.$view.removeClass(b.conf.checkedClass);c.state=!1;d.prop("checked","");d.trigger("check:off",c)},_enable:function(a){var b=this,c=b.elemMaps[a],d=c.$view,e=c.$check;b.conf.view&&d.removeClass(b.conf.disabledClass);c.disabled=!1;e.prop("disabled","");e.trigger("check:enable",c)},_disable:function(a){var b=this,c=b.elemMaps[a],d=c.$view,e=c.$check;b.conf.view&&d.addClass(b.conf.disabledClass);c.disabled=!0;e.prop("disabled","disabled");e.trigger("check:disable",c)},_callAPI:function(a,b){var c=this;if(typeof c[a]!="function")throw new Error(a+" does not exist of "+c.namespace+" methods.");if(/^_/.test(a)&&typeof c[a]=="function")throw new Error("Method begins with an underscore are not exposed.");return c[a](b)},checkOn:function(a){var b=this;b._checkOn(a)},checkOff:function(a){var b=this;b._checkOff(a)},enable:function(a){var b=this;b._enable(a)},enableAll:function(){var b=this;a.each(b.elemMaps,function(a,c){b.enable(c.id)})},disable:function(a){var b=this;b._disable(a)},disableAll:function(){var b=this;a.each(b.elemMaps,function(a,c){b.disable(c.id)})},destroy:function(){var b=this,c=b.namespace.toLowerCase();b.$elems.removeData(c);b.$elems.trigger("check:destroy");a.each(b.elemMaps,function(a,c){b.conf.view&&c.$view.remove();c.$check.show().unbind(["click.check","_check:toggle","_check:on","_check:off","_check:enable","_check:disable"].join(" "))})}};var g;e(h,f);g=h.prototype;g.toggleCheckAll=function(){var a=this;a.$elems.trigger("_check:toggle")};g.checkOnAll=function(){var a=this;a.$elems.trigger("_check:on")};g.checkOffAll=function(){var a=this;a.$elems.trigger("_check:off")};var i;e(j,f);i=j.prototype;i.baseConf={view:!1,uiClass:"ui_radio",labelClass:"ui_radio_label",checkedClass:"ui_checked",disabledClass:"ui_radio_disabled"};i._checkOn=function(b){var c=this,d=c.elemMaps[b];a.each(c.elemMaps,function(a,b){c._checkOff(b.id)});c.conf.view&&d.$view.addClass(c.conf.checkedClass);d.$check.prop("checked","checked")};a.fn.checkbox=function(a,b){var c;c=this.data("checkbox");if(c)return c._callAPI(a,b);if(typeof a=="string")return;c=h(this,a);this.data("checkbox",c);return this};a.fn.radio=function(a,b){var c;c=this.data("radio");if(c)return c._callAPI(a,b);if(typeof a=="string")return;c=j(this,a);this.data("radio",c);return this}})(jQuery,this,this.document);

/*!
 * jq.ui.select
 *
 * @version      0.1
 * @author       nori (norimania@gmail.com)
 * @copyright    5509 (http://5509.me/)
 * @license      The MIT License
 *
 */
(function(a,b,c){function d(a,b){this.namespace="Select";return this instanceof d?this.init(a,b):new d(a,b)}d.prototype={confBase:{strLength:10,uiClass:"UIElm-select",uiShownClass:"UIElm-select-show",boxClass:"UIElm-select-box",boxListClass:"UIElm-select-option",optionCurrentClass:"current"},init:function(b,c){var d=this;d.conf=a.extend({},d.confBase,c);d.state=!1;d.name=b.prop("name");d.$select=b.hide();d.$options=b.find("option");d.defaultVal=d.$options.filter(function(){return this.selected}).text();d._view();d._eventify()},_eventify:function(){var b=this,d=b.conf,e=b.$select,f=b.$view,g=b.$viewBox,h=b.$box,i=b.$boxOptions;f.bind({"click.select":function(a){a.preventDefault();g.is(":visible")?b._hide():b._show()}});i.bind({"click.selectOption":function(a){a.preventDefault();b._hide();b._setVal(this.getAttribute("data-select-val"),this.textContent||this.innerText);b.$boxOptions.removeClass(d.optionCurrentClass);this.className=d.optionCurrentClass}});a(c).bind({"click.selectDoc":function(a){var c=a.target,d=c.getAttribute("data-select-name"),e=c.getAttribute("data-select-type");if(e==="selectView"&&d===b.name||e==="selectBoxOption")return;b._hide()}})},_htmlSpan:function(a){var b=this;return["<span ",'data-select-type="selectView" ','data-select-name="'+b.name+'"',">",b._getTrimVal(a),"</span>"].join("")},_view:function(){var b=this,c=b.conf,d=b.$options;b.$box=b.$select.wrap("<span></span>").parent().addClass(c.boxClass);b.$view=a("<a></a>",{href:"javascript:void(0)","data-select-type":"selectView","data-select-name":b.name,"class":c.uiClass,html:b._htmlSpan(b.defaultVal)});b.$viewBox=function(){var b=[],e=d.length,f=0;b.push('<ul class="'+c.boxListClass+'">');for(;f<e;f++)b.push("<li>",'<a href="#"','   data-select-val="'+d[f].value+'"','   data-select-type="selectBoxOption"','   class="'+(d[f].selected?"current":"")+'"',">",d.eq(f).text(),"</a>","</li>");b.push("</ul>");return a(b.join("")).hide()}();b.$box.append(b.$view,b.$viewBox);b.$boxOptions=b.$viewBox.find("a")},_show:function(){var a=this;a.$viewBox.stop(!0,!0).slideDown(100);a.$box.addClass(a.conf.uiShownClass)},_hide:function(){var a=this;a.$viewBox.stop(!0,!0).slideUp(100);a.$box.removeClass(a.conf.uiShownClass)},_getTrimVal:function(a){var b=this,c=b.conf,d=function(a,b){return a.substring(0,b)+"..."};return a.length>c.strLength?d(a,c.strLength):a},_setVal:function(a,b){var c=this;c.$select.val(a);c.$view.html(c._htmlSpan(c._getTrimVal(b)))}};a.fn.select=function(a){d(this,a);return this}})(jQuery,this,this.document);
