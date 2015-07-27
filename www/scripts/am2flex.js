(function( $ ){

    var methods = {
        init : function(options) {
            var self = this;
            //getting initial tab (can assign in html)
            var initTab = this.find('.am2-title ul li.current');
            var initTabID = 1;
            if(initTab.length){
                initTabID = initTab.find('a').attr('data-tab');
            }  
            var targetTab = '[data-tab="'+initTabID+'"]';           
            $(this).find(".am2-title ul li a"+targetTab).parent().addClass('current');
            $(this).find(".am2-pane"+targetTab).addClass('current');
            /* getting tabs height array */
            tabPanesH = methods.refresTabHeights({
                element : self
            });
            $(window).resize(function(){
                tabPanesH = methods.refresTabHeights({
                        element : self
                    });
                methods.tabSwitch({
                    element     : self,
                    tabHeights  : tabPanesH
                });   
            });
            methods.tabSwitch({
                element     : self,
                to          : parseInt(initTabID),
                tabHeights  : tabPanesH
            });
            //on click chane tab classes
            $(this).find('.am2-title ul li a').click(function(){
                //console.log(tabPanesH);
                if(!($(this).parent().hasClass('current'))){    
                    methods.tabSwitch({
                        element     : self,
                        to          : $(this).attr('data-tab'),
                        from        : $(self).find('.am2-title .current a').attr('data-tab'),
                        tabHeights  : tabPanesH
                    });
                }
            });
        },
        tabSwitch : function(options) {
            var self = options.element;
            if(options.to){
                var tabAttr = "[data-tab='"+options.to+"']";
                $(self).find('.am2-title a'+tabAttr).parent().addClass('current');
                $(self).find('.am2-panes .am2-pane'+tabAttr).addClass('current');
            }
            if(options.from){
                var removeTabAttr = "[data-tab='"+options.from+"']";
                $(self).find('.am2-title a'+removeTabAttr).parent().removeClass('current');
                $(self).find('.am2-panes .am2-pane'+removeTabAttr).removeClass('current');                
            }
            if(options.tabHeights && options.to){
                $(self).find('.am2-panes').css('height', options.tabHeights[parseInt(options.to)-1]+'px');
            }else if(options.tabHeights && !options.to){
                $(self).find('.am2-panes').css('height', options.tabHeights[parseInt($(self).find('.am2-title .current a').attr('data-tab'))-1]+'px');
            }
        },
        refresTabHeights : function(options) {
            var tabPanesH = [];
            $(options.element).find('.am2-pane').each(function(){
                tabPanesH.push($(this).innerHeight());
            });
            return tabPanesH;
        },
        show : function() { 
            console.log('show');
        },
        hide : function() {
            console.log('hide');
        },
        update : function(options) {
            console.log('update');
        }
    };

    $.fn.am2flex = function(methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[ methodOrOptions ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  methodOrOptions + ' does not exist on jQuery.am2flex');
        }    
    };
})(jQuery);