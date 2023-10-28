document.addEventListener('DOMContentLoaded',function(){function isJson(str){try{JSON.parse(str)}catch(e){return!1}
return!0}
function removeTags(txt){var rex=/(<([^>]+)>)/ig;return txt.replace(rex,"")}
$('.registration__form [type="submit"], .contacts__form [type="submit"]').click(function(){let url=$(this).parents('form').attr('data-url');let form=$(this).parents('form').serialize();let captcha=$('.authorization__recaptcha').length;if(captcha){grecaptcha.ready(function(){let captcha_key=$('.authorization__recaptcha').attr('data-key');grecaptcha.execute(captcha_key,{action:'submit'}).then(function(token){form=form+'&g-recaptcha-response='+token;$.post(url,form,function(data){if(data.success){if($('div').is('.note_success')&&data.modal?.length<3){$('.note_success .note__content').html(` ${data.message}`);$('.note_success').fadeIn('slow');$('.note_success').delay(3000).fadeOut('slow')}}
if(data.error){$('.note_error .note__content').html(` ${data.error}`);$('.note_error').fadeIn('slow');$('.note_error').delay(3000).fadeOut('slow');if(typeof hcaptcha!='undefined'){hcaptcha.reset()}
if(window.captchaObj){window.captchaObj.reset()}}
if(data.action=='redirect'){window.location.href=data.url}
if(data.ga){$('#login_ga').fadeIn('slow');if(typeof hcaptcha!='undefined'){hcaptcha.reset()}
if(window.captchaObj){window.captchaObj.reset()}}
if(data.action=='feedback'){if(data.success){if($('div').is('.note_success')){$('.note_success .note__content').html(` ${data.success}`);$('.note_success').fadeIn('slow');$('.note_success').delay(3000).fadeOut('slow')}}}
if(data.action=='password_remind'){if(!data.error){$('#forgot-form').css('display','none');$('#sent-code-block').fadeIn('slow')}}},'json')})})}else{$.post(url,form,function(data){if(data.success){if($('div').is('.note_success')&&data.modal?.length<3){$('.note_success .note__content').html(` ${data.message}`);$('.note_success').fadeIn('slow');$('.note_success').delay(3000).fadeOut('slow')}}
if(data.error){$('.note_error .note__content').html(` ${data.error}`);$('.note_error').fadeIn('slow');$('.note_error').delay(3000).fadeOut('slow');if(typeof hcaptcha!='undefined'){hcaptcha.reset()}
if(window.captchaObj){window.captchaObj.reset()}}
if(data.action=='redirect'){window.location.href=data.url}
if(data.ga){$('#login_ga').fadeIn('slow');if(typeof hcaptcha!='undefined'){hcaptcha.reset()}
if(window.captchaObj){window.captchaObj.reset()}}
if(data.action=='feedback'){if(data.success){if($('div').is('.note_success')){$('.note_success .note__content').html(` ${data.success}`);$('.note_success').fadeIn('slow');$('.note_success').delay(3000).fadeOut('slow')}}}},'json')}
return!1});$('form.validator [type="submit"]').on('click',function(){$('form.validator [type="submit"]').attr('disabled','disabled');var form_data=$(this).closest('form.validator').serialize();$this=$(this).closest('form.validator');form_data=form_data+'&ajaxLoad=1';if($this.hasClass("compounding-form")){$('.compounding-form button[type="submit"]').attr('disabled','disabled')}
$.ajax({url:$this.attr("action"),type:'POST',data:form_data,dataType:'JSON',success:function(data){$('form.validator [type="submit"]').removeAttr('disabled');if(data.success&&data.message){if($('div').is('.note_success')){$('.note_success .note__content').html(` ${data.message}`);$('.note_success').fadeIn('slow');$('.note_success').delay(3000).fadeOut('slow')}}
if(data.error&&data.error!='deposit_limit_exceed'){$('.note_error .note__content').html(` ${data.error}`);$('.note_error').fadeIn('slow');$('.note_error').delay(3000).fadeOut('slow');if(typeof hcaptcha!='undefined'){hcaptcha.reset()}
if(window.captchaObj){window.captchaObj.reset()}}
if(data.action=='deposit'&&data.error=='deposit_limit_exceed'){var limitsModal=new bootstrap.Modal(document.getElementById('limitsModal'));limitsModal.show()}
if(data.action=='redirect'){window.location.href=data.url}
if(data.action=='password_remind'){if(!data.error){$('#forgot-form').css('display','none');$('#sent-code-block').fadeIn('slow')}}
if(data.ga){$('#login_ga').fadeIn('slow');if(typeof hcaptcha!='undefined'){hcaptcha.reset()}
if(window.captchaObj){window.captchaObj.reset()}}
if(data.pin){$('#login_pin .pin-number').each(function(index){$(this).val('');$(this).removeClass('active-field')});$('#login_pin #first-pin').val('');$('.auth_page #login_pin').fadeIn('slow');if(typeof hcaptcha!='undefined'){hcaptcha.reset()}
if(window.captchaObj){window.captchaObj.reset()}}
if(data.action=='deposit'){if(data.success){$("#deposit-form").fadeOut('slow',function(){$("#balance-success").addClass("with-animation");$("#balance-success").fadeIn('slow',function(){setTimeout(function(){$("#balance-success").addClass("active")},500)})})}}
if(data.action=='withdrawal'){function showAwardsBlock(){let awardsBlock=document.querySelector(".award");if(awardsBlock){let checkAwardsMark=localStorage.getItem("awardsread");if(!checkAwardsMark){awardsBlock.classList.add("award_show")}}}
if(data.success){document.getElementById("withdrawal-form").style.display="none";document.getElementById("withdrawal-success").style.display="block";showAwardsBlock();document.querySelector("#withdrawal-success .video-block").removeAttribute("preload");document.querySelector("#withdrawal-success .video-block").setAttribute("autoplay","autoplay")}
if(data.manual){document.getElementById("withdrawal-form").style.display="none";document.getElementById("withdrawal-manual").style.display="block";showAwardsBlock();document.querySelector("#withdrawal-manual .video-block").removeAttribute("preload");document.querySelector("#withdrawal-manual .video-block").setAttribute("autoplay","autoplay")}}
if(data.action=='deposit-sell'){if(data.success=="1"){$('.return-form').fadeOut('slow',function(){$('.return-success').fadeIn('slow')})}}
if(data.action=='saveCompound'){if(data.success==1){}}
if(data.action=='tickets'){$('#chat-container').append(data.message);$('.help__chat textarea[name="message"]').val('')}
if(data.action=='add-ticket'){if(data.success){let theme=$('input[name="subject"]').val();let time=$('#new-ticket-form').attr('data-time');let container=document.querySelector('#tickets-list');let containerM=document.querySelector('.help__info-table2');let template=document.querySelector('#ticket-template');let clone=template.content.cloneNode(!0);let p=clone.querySelectorAll(".help__info-row_par");p[0].textContent=time;p[1].textContent=data.id;p[2].textContent=theme;let radio=clone.querySelector('input[type="radio"]');let radioLabel=clone.querySelector('label.help__info-row');radio.setAttribute('data-id',data.id)
radio.setAttribute('id',`flex${data.id}`);radio.checked=!0;radioLabel.setAttribute('for',`flex${data.id}`);container.prepend(clone);let templateM=document.querySelector('#ticket-template-m');let cloneM=templateM.content.cloneNode(!0);let timeDiv=cloneM.querySelector(".new-ticket-date-m");let idDiv=cloneM.querySelector(".new-ticket-id-m");let themeDiv=cloneM.querySelector(".new-ticket-subject-m");timeDiv.textContent=time;idDiv.textContent=data.id;themeDiv.textContent=theme;let radioM=cloneM.querySelector('input[type="radio"]');let radioLabelM=cloneM.querySelector('label.help__info-row');radioM.setAttribute('data-id',data.id)
radioM.setAttribute('id',`fl${data.id}`);radioM.checked=!0;radioLabelM.setAttribute('for',`fl${data.id}`);containerM.prepend(cloneM);$('#ticket-number').text(`#${data.id}.`);$('#add-message-form input[name="id"]').val(data.id);$('#help-success').removeClass('help__left-success-hidden');$("#help-success").addClass("animation-ticket");setTimeout(function(){$("#help-success").addClass("active")},300);$('input[name="subject"]').val('');$('textarea[name="message"]').val('');$('#user-tickets').removeClass('dash__finance-block_hidden');$('#user-no-tickets').css('display','none');$('.help__chat').removeClass('closed')}}
if(data.action=='dashboard'){if(data.error){$(".alert-message-wrap .error--ajax .alert-message__text").html(data.error);$(".alert-message-wrap .error--ajax").show()}
if(data.success){$(".alert-message-wrap .success--ajax .alert-message__text").html(data.success);$(".alert-message-wrap .success--ajax").show()}}
if(data.action=='settings'){if(data.success&&data.message&&data.message.includes("2FA")){$(".sett__ga").toggleClass("sett__hidden");$(".ga-depend").toggleClass("ga-depend_hidden");$("input[name='ga_code']").val("")}}},error:function(){$('form.validator [type="submit"]').removeAttr('disabled')}});return!1})})