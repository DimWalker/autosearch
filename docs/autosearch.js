!function(t,e){"object"==typeof exports?module.exports=e($):t.AutoSearch=e(window.Zepto||window.jQuery||$)}(this,function(c){function t(){}return t.prototype={init:function(t){var e=Math.random().toString().replace(".","");this.id="autosearch_"+e,this.settings=c.extend({mutil:!1,autoHide:!0,isdel:!1,allDelText:"清除全部记录"},t),this.input=c(this.settings.input),this.min=this.settings.min||1,this.data=this.settings.data,this.valueObj=c(this.settings.valueObj||this.settings.input),this.valueName=this.settings.valueName||"name",this.target=c(this.settings.target||this.settings.input),this.filterColumn=this.settings.filterColumn||["name"],this.column=this.settings.column||["name"],this.timer=null,this.content=null,this.mutilValueArr=[],this.mutilTextArr=[],this.createContent(),this.bindEvent()},bindEvent:function(){var o=this;this.target.click(function(){return o.settings.autoShow&&o.search(),!1}),this.input.on("focus",function(){c(this);o.settings.focusCallback&&o.settings.focusCallback.call(o,o.input)}).on("keyup",function(t){var e=c(this);e.data("old")!=e.val()&&13!=t.keyCode&&(o.search(),e.data("old",e.val()))}).on("blur",function(){if(o.settings.autoHide){o.timer&&clearInterval(o.timer);var t=c(this);setTimeout(function(){o.hide(),t.attr("data-text")==t.val()||o.settings.mutil||(o.input.val(""),o.input.data("old",""),o.valueObj.val(""),o.input.attr("data-text",""),o.input.attr("data-value",""),o.settings.resetCallback&&o.settings.resetCallback.call(o,o.input))},500)}o.settings.blurCallback&&o.settings.blurCallback.call(o,o.input)}).on("keyup",function(t){switch(t.preventDefault(),t.stopPropagation(),t.keyCode){case 40:var e=c(".item.current",o.content).index();e++,e=Math.min(c(".item",o.content).size()-1,e);var i=c(".item.current",o.content);if(c(".item",o.content).removeClass("current").eq(e).addClass("current"),i.size()){var n=c(".item.current",o.content).position(),s=i.outerHeight();if(n.top+s>c(o.content).height()){var a=c(o.content).scrollTop();a+=s,c(o.content).scrollTop(a)}}break;case 38:e=c(".item.current",o.content).index();if(e--,e=Math.max(0,e),c(".item",o.content).removeClass("current").eq(e).addClass("current"),(i=c(".item.current",o.content)).size()){n=c(".item.current",o.content).position(),s=i.outerHeight(),a=c(o.content).scrollTop();n.top<=0&&(a-=s,c(o.content).scrollTop(Math.max(a,0)))}break;case 13:c(".item.current",o.content).trigger("click"),setTimeout(function(){o.hide()},50),o.settings.enterCallback&&o.settings.enterCallback.call(o,this)}}).on("keydown",function(t){13==t.keyCode&&t.preventDefault()}),this.content.on("click",".item",function(){var t=c(this).data("data"),e=c("span",this).text();1==o.settings.mutil?(o.mutilTextArr.push(e),o.mutilValueArr.push(t[o.valueName]),o.input.val(o.mutilTextArr.join(",")+","),o.valueObj.val(o.mutilValueArr.join(",")+","),o.input.attr("data-value",o.input.attr("data-value")),o.input.attr("data-text",o.mutilTextArr.join(",")+",")):(o.input.val(e),o.valueObj.val(t[o.valueName]),o.input.attr("data-value",t[o.valueName]),o.settings.valueObj?o.input.attr("data-text",e):o.input.attr("data-text",t[o.valueName])),o.settings.callback&&o.settings.callback.call(o,t),o.hide()}).on("mouseover",".item",function(){c(this).addClass("current").siblings().removeClass("current")}),c(document).click(function(){o.hide()}),this.content.on("click",".ats_del",function(){var t=c(this).closest(".item");return o.settings.delCallback&&o.settings.delCallback.call(o,t),t.remove(),!1})},createContent:function(){0==c("#"+this.id).size()&&(this.content=c('<div id="'+this.id+'" class="ui-autosearch-content"/>'),this.content.hide(),c("body").append(this.content))},show:function(){var t=this;t.content.show(),t.content.css({position:"absolute",zIndex:t.settings.zIndex||999,width:t.input.outerWidth()}),t.setPostion(),t.postimer=setInterval(function(){t.setPostion()},20),t.settings.showCallback&&t.settings.showCallback.call(t,t.input,t.content)},hide:function(){this.postimer&&clearInterval(this.postimer),this.content.hide()},search:function(){var t=this,e=t.input.val().split(",").pop();if(t.getByteLen(e)>=t.min||t.settings.autoShow)if("function"==typeof t.data)t.getData();else{var i=t.filter(t.data);t.format(i),i.length?t.show():t.hide()}else t.hide()},getData:function(){var e=this;this.settings.data(function(t){e.format(t),e.show()})},format:function(t){if(this.content.html(""),t){for(var e=0,i=t.length;e<i;e++){var n=t[e],s=c();if(this.settings.format)s=c(this.settings.format.call(this,n));else{for(var a="",o=0,l=this.column.length;o<l;o++)a+='<span class="'+this.column[o]+'">'+n[this.column[o]]+"</span>";s=this.settings.isdel?c('<div class="item">'+a+'<i class="ats_del">✖</i></div>'):c('<div class="item">'+a+"</div>")}s.data("data",n),this.content.append(s)}if(this.settings.isdel){var r=c('<div class="item">'+this.settings.allDelText+"</div>");r.click(function(){return c(this).siblings(".item").find(".ats_del").trigger("click"),!1}),this.content.append(r)}}},filter:function(t){for(var e=this.input.val().split(",").pop(),i=[],n=0,s=t.length;n<s;n++)for(var a=t[n],o=0,l=this.filterColumn.length;o<l;o++){-1!=a[this.filterColumn[o]].toString().indexOf(e)&&i.push(a)}return i},setPostion:function(){var t=this,e=t.input.offset();t.content.css({top:e.top+t.input.outerHeight(),left:e.left})},getByteLen:function(t){for(var e=0,i=0;i<t.length;i++){var n=new RegExp(/[^\x00-\xff]/gi),s=t[i];n.test(s)?e+=2:e+=1}return e}},t});