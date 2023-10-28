document.addEventListener('DOMContentLoaded', function () {
	// Balances swith handler
	let balances = document.querySelectorAll('.withdraw__block input[name="ps"]');

	function switchBalance() {
		let selectedCurr = document.querySelector('input[name="ps"]:checked').getAttribute("data-curr");
		let selectedMin = document.querySelector('input[name="ps"]:checked').getAttribute("data-min");
		let selectedWallet = document.querySelector('input[name="ps"]:checked').getAttribute("data-wallet");
		let code = document.querySelector('input[name="ps"]:checked').getAttribute("data-code");
		let addressContainer = document.getElementById('address');
		let addressLink = document.getElementById('address-link');

		let minAmountContainer = document.getElementById('min-amount');
		minAmountContainer.textContent = `${selectedMin} ${selectedCurr}`;

		let psIcon = document.getElementById("icon");
		psIcon.removeAttribute("class");
		psIcon.classList.add(`curr-icon`, `curr-icon_24`, `curr-icon_${code}`);

		if (selectedWallet?.length > 0) {
			addressContainer.textContent = selectedWallet;
			addressLink.textContent = addressLink.getAttribute('data-linkch');
		} else {
			let placeholder = addressContainer.getAttribute('data-empty');
			addressContainer.innerHTML = placeholder;
			addressLink.textContent = addressLink.getAttribute('data-linkemp');
		}

		let formInput = document.querySelector('input.withdraw__input');
		formInput.value = 0;
	}

	if (balances?.length > 0) {
		balances.forEach((balance) => {
			balance.addEventListener('change', switchBalance);
		});
	}
	// END

	if (document.querySelector('input[name="ps"]:checked')) {
		switchBalance();
	}
	

	// Hide success withdrawal message
	let hideSuccessButtons = document.querySelectorAll(".withdraw__succesbtn");

	if (hideSuccessButtons?.length > 0) {
		function hideMessage() {
			document.getElementById("withdrawal-success").style.display = "none";
			document.getElementById("withdrawal-manual").style.display = "none";
			document.getElementById("conversion-success").style.display = "none";
			document.getElementById("withdrawal-form").style.display = "block";

			let awardsBlock = document.querySelector(".award");
			if (awardsBlock) {
			    awardsBlock.classList.remove("award_show");
			}
		}

		hideSuccessButtons.forEach((balance) => {
			balance.addEventListener('click', hideMessage);
		});
	}
	// END

	// Paste max available amount
	let maxWithdrBtn = document.getElementById("max-withdr");
	if (maxWithdrBtn) {
		maxWithdrBtn.addEventListener("click", (e) => {
			e.preventDefault();
			let selectedWalletMax = document.querySelector('input[name="ps"]:checked').getAttribute("data-max");
			let formInput = document.querySelector('input.withdraw__input');
			formInput.value = selectedWalletMax;
		});
	}
	// END


	// Tabs switch
	let withdrTabBtns = document.querySelectorAll(".withdraw input[name='withdr-tabs']");
	function changeWithdrTab () {
        let withdrTab = document.querySelector('input[name="withdr-tabs"]:checked').value;

        let panels = document.querySelectorAll('.withdraw__panel');
        panels.forEach((panel) => {
			panel.classList.remove('active');
		});
        document.getElementById(`w-${withdrTab}`).classList.add('active');
    }

	if (withdrTabBtns.length > 0) {
		withdrTabBtns.forEach((btn) => {
			btn.addEventListener('change', changeWithdrTab);
		});
	}

	// Conversion block
	// Select ps
	let selectOptions = document.querySelectorAll(".withdraw__c-select .dropdown-item");
    if (selectOptions?.length > 0) {
        selectOptions.forEach((opt) => {
			opt.addEventListener('click', (e) => {
                e.preventDefault(); 
                let name = opt.getAttribute("data-name");
                let id = opt.getAttribute("data-id"); 
                let code = opt.getAttribute("data-code"); 
                let proto = opt.getAttribute("data-proto"); 
                let curr = opt.getAttribute("data-curr");
                let cAmount = opt.getAttribute("data-amount");
                let cFee = opt.getAttribute("data-fee");
                let count = opt.getAttribute("data-count");

                let protos = document.querySelectorAll(".dropdown-toggle .dep__ps-proto");
                protos.forEach((pr) => {
					pr.classList.remove("show");
				});

				if (proto.length > 0) {
					document.getElementById(`proto-${proto}`).classList.add("show");
				}
				

                document.getElementById("selected-ps-title").textContent = name;

                let icon = document.getElementById("select-icon");
                icon.removeAttribute("class");
                icon.classList.add("curr-icon", "curr-icon_24", `curr-icon_${code}`);

                let convertCurr = document.querySelectorAll(".convert-curr");
                convertCurr.forEach((c) => {
					c.textContent = curr;
				});

                document.querySelector('input[name="to"]').value = id;
                document.getElementById('c-amount').textContent = Number(cAmount).toFixed(count);
                document.getElementById('c-fee').textContent = Number(cFee).toFixed(count);
                document.getElementById('c-ready').textContent = (Number(cAmount) - Number(cFee)).toFixed(count);
            });
		});
    }

    $('body').on('click', '#convert-btn', function (e) { 
	  	e.target.setAttribute('disabled', 'disabled');
	  	$(".withdraw__c-button").addClass("loading");

  		let to = $('input[name="to"]').val();

		let path = $(this).attr("data-action");
		let data = 'to='+to+'&session_id='+$('input[name="session_id"]').val();

  		$.ajax({
			url: path,
			type: 'POST', 
			data: data,
			dataType: 'JSON',
			statusCode: {
			    503: function(data) {
			      	e.target.removeAttribute('disabled');
			      	$(".withdraw__c-button").removeClass("loading");
			      	if (data.error == 1) {
			      		$('.note_error .note__content').html(data.message ? data.message : "Error");
	                    $('.note_error').fadeIn('slow');
	                    $('.note_error').delay(3000).fadeOut('slow');
			      	}
			    },
			    202: function(data) {
			      	e.target.removeAttribute('disabled');
			      	$(".withdraw__c-button").removeClass("loading");
			      	// $("#convert-balances-success .info-txt").text(data.message);
			      	$("#withdrawal-form").css("display", "none");
			      	$("#conversion-success").css("display", "block");

			      	$(`.withdraw__c-balance .withdraw__c-ps-b:not([data-id=${to}])`).each(function() {
	  					$(this).text("0.00");
	  					$(this).parent().removeClass("available")
					});

			      	$(`.withdraw__c-ps-b[data-id=${to}]`).text(data.finalBalance);
			      	$(`.withdraw__c-ps-b[data-id=${to}]`).parent().addClass("available");

			      	document.querySelector("#conversion-success .video-block").removeAttribute("preload");
                    document.querySelector("#conversion-success .video-block").setAttribute("autoplay", "autoplay");
			    },
		  	},
		  	complete: function(data) {
	        	if (![202, 503].includes(data.status)) {
	          		e.target.removeAttribute('disabled');
	          		$(".withdraw__c-button").removeClass("loading");
			      	$('.note_error .note__content').html(data.message ? data.message : "Error");
                    $('.note_error').fadeIn('slow');
                    $('.note_error').delay(3000).fadeOut('slow');
	        	}
  			}
		});
  	}); 

    // Success handlers
  	let successTabs = document.querySelectorAll('#conversion-success .dep__btns input[name="withdr-tabs-s"]');
	if (successTabs.length > 0) {
		successTabs.forEach((btn) => {
			btn.addEventListener('click', function(){
				location.reload();
			});
		});
	}

	let convertionSuccessBtn = document.getElementById("hide-conversion-success");
	convertionSuccessBtn.addEventListener('click', function(e){
		e.preventDefault();
		location.reload();
	});
	// Success handlers END
});