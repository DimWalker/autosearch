!function(t,e){"object"==typeof exports?module.exports=e($):t.AutoSearch=e(window.Zepto||window.jQuery||$)}(this,function(c){function t(){}return t.prototype={init:function(t){var e=Math.random().toString().replace(".","");this.id="autosearch_"+e,this.settings=c.extend({mutil:!1,autoHide:!0,isdel:!1,allDelText:"清除全部记录"},t),this.input=c(this.settings.input),this.min=this.settings.min||1,this.data=this.settings.data,this.valueObj=c(this.settings.valueObj||this.settings.input),this.valueName=this.settings.valueName||"name",this.target=c(this.settings.target||this.settings.input),this.filterColumn=this.settings.filterColumn||["name"],this.column=this.settings.column||["name"],this.timer=null,this.content=null,this.mutilValueArr=[],this.mutilTextArr=[],this.createContent(),this.bindEvent()},bindEvent:function(){var l=this;this.target.click(function(){return l.settings.autoShow&&l.search(),!1}),this.input.on("focus",function(){var t=c(this);l.timer&&clearInterval(l.timer),l.timer=setInterval(function(){t.data("old")!=t.val()&&(l.search(),t.data("old",t.val()))},25),l.settings.focusCallback&&l.settings.focusCallback.call(l,l.input)}).on("keyup",function(t){var e=c(this);e.data("old")!=e.val()&&13!=t.keyCode&&(l.search(),e.data("old",e.val()))}).on("blur",function(){if(l.settings.autoHide){l.timer&&clearInterval(l.timer);var t=c(this);setTimeout(function(){l.hide(),t.attr("data-text")==t.val()||l.settings.mutil||(l.input.val(""),l.input.data("old",""),l.valueObj.val(""),l.settings.resetCallback&&l.settings.resetCallback.call(l,l.input))},500)}l.settings.blurCallback&&l.settings.blurCallback.call(l,l.input)}).on("keyup",function(t){switch(t.preventDefault(),t.stopPropagation(),t.keyCode){case 40:var e=c(".item.current",l.content).index();e++,e=Math.min(c(".item",l.content).size()-1,e);var i=c(".item.current",l.content);if(c(".item",l.content).removeClass("current").eq(e).addClass("current"),i.size()){var n=c(".item.current",l.content).position(),s=i.outerHeight();if(n.top+s>c(l.content).height()){var a=c(l.content).scrollTop();a+=s,c(l.content).scrollTop(a)}}break;case 38:e=c(".item.current",l.content).index();if(e--,e=Math.max(0,e),c(".item",l.content).removeClass("current").eq(e).addClass("current"),(i=c(".item.current",l.content)).size()){n=c(".item.current",l.content).position(),s=i.outerHeight(),a=c(l.content).scrollTop();n.top<=0&&(a-=s,c(l.content).scrollTop(Math.max(a,0)))}break;case 13:c(".item.current",l.content).trigger("click"),setTimeout(function(){l.hide()},50),l.settings.enterCallback&&l.settings.enterCallback.call(l,this)}}).on("keydown",function(t){13==t.keyCode&&t.preventDefault()}),this.content.on("click",".item",function(){var t=c(this).data("data"),e=c("span",this).text();1==l.settings.mutil?(l.mutilTextArr.push(e),l.mutilValueArr.push(t[l.valueName]),l.input.val(l.mutilTextArr.join(",")+","),l.valueObj.val(l.mutilValueArr.join(",")+","),l.input.attr("data-value",l.input.attr("data-value")),l.input.attr("data-text",l.mutilTextArr.join(",")+",")):(l.input.val(e),l.valueObj.val(t[l.valueName]),l.input.attr("data-value",t[l.valueName]),l.settings.valueObj?l.input.attr("data-text",e):l.input.attr("data-text",t[l.valueName])),l.settings.callback&&l.settings.callback.call(l,t),l.hide()}).on("mouseover",".item",function(){c(this).addClass("current").siblings().removeClass("current")}),c(document).click(function(){l.hide()}),this.content.on("click",".ats_del",function(){var t=c(this).closest(".item");return l.settings.delCallback&&l.settings.delCallback.call(l,t),t.remove(),!1})},createContent:function(){0==c("#"+this.id).size()&&(this.content=c('<div id="'+this.id+'" class="ui-autosearch-content"/>'),this.content.hide(),c("body").append(this.content))},show:function(){var t=this;t.content.show(),t.content.css({position:"absolute",zIndex:t.settings.zIndex||999,width:t.input.outerWidth()}),t.setPostion(),t.postimer=setInterval(function(){t.setPostion()},20),t.settings.showCallback&&t.settings.showCallback.call(t,t.input,t.content)},hide:function(){this.postimer&&clearInterval(this.postimer),this.content.hide()},search:function(){var t=this;if(t.input.val().split(",").pop().length>=t.min||t.settings.autoShow)if("function"==typeof t.data)t.getData();else{var e=t.filter(t.data);t.format(e),e.length?t.show():t.hide()}else t.hide()},getData:function(){var e=this;this.settings.data(function(t){e.format(t),e.show()})},format:function(t){if(this.content.html(""),t){for(var e=0,i=t.length;e<i;e++){var n=t[e],s=c();if(this.settings.format)s=c(this.settings.format.call(this,n));else{for(var a="",l=0,o=this.column.length;l<o;l++)a+='<span class="'+this.column[l]+'">'+n[this.column[l]]+"</span>";s=this.settings.isdel?c('<div class="item">'+a+'<i class="ats_del">✖</i></div>'):c('<div class="item">'+a+"</div>")}s.data("data",n),this.content.append(s)}if(this.settings.isdel){var r=c('<div class="item">'+this.settings.allDelText+"</div>");r.click(function(){return c(this).siblings(".item").find(".ats_del").trigger("click"),!1}),this.content.append(r)}}},filter:function(t){for(var e=this.input.val().split(",").pop(),i=[],n=0,s=t.length;n<s;n++)for(var a=t[n],l=0,o=this.filterColumn.length;l<o;l++){-1!=a[this.filterColumn[l]].toString().indexOf(e)&&i.push(a)}return i},setPostion:function(){var t=this,e=t.input.offset();t.content.css({top:e.top+t.input.outerHeight(),left:e.left})}},t});