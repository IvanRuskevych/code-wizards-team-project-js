!function(){var e=document.querySelector(".js-modal-open"),t=document.querySelector(".js-modal-close"),n=document.querySelector(".js-modal-team");function o(){n.classList.toggle("is-hidden")}function c(){o(),t.removeEventListener("click",c),document.body.removeAttribute("style")}function d(e){e.currentTarget===e.target&&(document.body.removeAttribute("style"),o(),document.removeEventListener("keydown",i),n.removeEventListener("click",d))}function i(e){"Escape"==e.code&&(o(),document.removeEventListener("keydown",i),t.removeEventListener("click",c),n.removeEventListener("click",d))}e.addEventListener("click",(function(e){e.preventDefault(),o(),document.addEventListener("keydown",i),document.body.style.overflow="hidden",t.addEventListener("click",c),n.addEventListener("click",d)}));var r=document.querySelector(".mask");window.addEventListener("load",(function(){r.classList.add("hide"),setTimeout((function(){r.remove()}),600)})),{el:document.querySelector(".btn-up"),show:function(){this.el.classList.remove("btn-up_hide")},hide:function(){this.el.classList.add("btn-up_hide")},addEventListener:function(){var e=this;window.addEventListener("scroll",(function(){(window.scrollY||document.documentElement.scrollTop)>400?e.show():e.hide()})),document.querySelector(".btn-up").onclick=function(){window.scrollTo({top:0,left:0,behavior:"smooth"})}}}.addEventListener()}();
//# sourceMappingURL=index.d5c59417.js.map