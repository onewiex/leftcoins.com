document.addEventListener('DOMContentLoaded', function () {
    let convertedData;
    let amountInput = document.querySelector('input[name="amount"]');
    let preloaders = document.querySelectorAll('.dash__preload');
    let submitBtn = document.querySelector('#deposit-form input[type="submit"]');

    // Predepo
    function getConvertedAmount (psId) {
        submitBtn.setAttribute("disabled", "disabled");
        preloaders.forEach((el) => {
            el.classList.add("active");
        }); 

        let planId = document.getElementById("plan").value;
        let itemId = document.getElementById("item_id").value;
        // let psId = document.querySelector('input[name="ps"]:checked').value;
        let session = document.querySelector('input[name="session_id"]').value;
        
        let form_data = `predeposit=1&ps=${psId}&plan_id=${planId}&item_id=${itemId}&session_id=${session}`;

        $.ajax({
            url: "/deposit-approval",
            type: "POST",
            data: form_data,
            dataType: 'JSON',
            success: function(data) {
                convertedData = data;
                amountInput.value = data[psId];
                
                if(amountInput.value == data[psId]){
                    submitBtn.removeAttribute('disabled');
                    preloaders.forEach((el) => {
                        el.classList.remove("active");
                    }); 
                }
            }
        });
    }

    let firstPsId = document.querySelector('input[name="ps"]:checked').value;
    getConvertedAmount(firstPsId);
    // END

    // function chaeckBalances

    // Switching payment method
    let paymentMethodBtns = document.querySelectorAll("input[name='pay-from']");

    function changePaymentMethod () {
        let paymentMethod = document.querySelector('input[name="pay-from"]:checked').value;
        let paymentField = document.querySelector('input[name="from"]');
        let availableSums = document.querySelectorAll('.dep__block-summ');
        let zeroBalance = document.getElementById("zero-balance");
        let payments = document.getElementById("payments");
        let hiddenOption = document.querySelector('.dep__block-left_hidden-opt');
        let fromPsTitleBlock = document.getElementById('dep-form-title');

        if (paymentMethod == "from-ps") {
            paymentField.checked = false;
            hiddenOption.classList.add("hidden-opt");
            if (zeroBalance) {
                zeroBalance.style.display = "none";
                document.querySelector("#zero-balance .dep__money-block")?.classList.remove("with-animation__up");
                document.querySelector("#zero-balance .dep__succes-parag")?.classList.remove("with-animation__up", "with-animation__up_0");
                payments.style.display = "block";
            } else {
                availableSums.forEach((el) => {
                    el.parentNode.parentNode.classList.remove("disabled");
                    el.parentNode.parentNode.previousElementSibling.removeAttribute('disabled');
                    el.classList.add("dep__block-summ_hidden");
                });
            }
            let fromPsTitleText = fromPsTitleBlock.getAttribute('data-pstitle');
            fromPsTitleBlock.textContent = fromPsTitleText;

            
        } else {
            // if user has money on balance
            paymentField.checked = true;
            hiddenOption.classList.remove("hidden-opt");
            if (zeroBalance) {
                payments.style.display = "none";
                zeroBalance.style.display = "block";
                document.querySelector("#zero-balance .dep__money-block")?.classList.add("with-animation__up");
                document.querySelector("#zero-balance .dep__succes-parag")?.classList.add("with-animation__up", "with-animation__up_0");
            } else {
                availableSums.forEach((el) => {
                    if (Number(el.getAttribute('data-available')) == 0) {
                        el.parentNode.parentNode.classList.add("disabled");
                        el.parentNode.parentNode.previousElementSibling.setAttribute('disabled', 'disabled');
                    }
                    el.classList.remove("dep__block-summ_hidden");
                });
            }

            if (document.querySelector('input[name="ps"]:checked')?.getAttribute("disabled") == 'disabled') {
                let activeBalances = document.querySelectorAll(".dep__block-row_with:not(.disabled)");
                activeBalances[0].previousElementSibling.checked = true;
            }

            let fromPsTitleText = fromPsTitleBlock.getAttribute('data-balancetitle');
            fromPsTitleBlock.textContent = fromPsTitleText;
            
        }
    }

    if (paymentMethodBtns?.length > 0) {
        paymentMethodBtns.forEach((btn) => {
			btn.addEventListener('change', changePaymentMethod);
		});
    }
    // END

    // Selecting items
    function calculateServerProfit (price, percent, price) {
        let daily = (Number(price) * Number(percent) / 100).toFixed(2);
        let monthly = (daily * 30).toFixed(2);
        // let payback = (Number(price) / Number(daily)).toFixed(0);

        let dailyResult = document.getElementById("calc-roi");
        let monthlyResult = document.getElementById("calc-roi-month");
        // let paybackResult = document.getElementById("calc-payback");

        dailyResult.textContent = daily;
        monthlyResult.textContent = monthly;
        // paybackResult.textContent = payback;
    }

    const handleSelect = (name, id, planId, planPercent, price) => {
        // form
        let formPlan = document.getElementById("plan");
        let formItem = document.getElementById("item_id");
        formPlan.value = planId;
        formItem.value = id;

        let selectedPsId = document.querySelector('input[name="ps"]:checked').value;
        getConvertedAmount(selectedPsId);

        // Calc UI
        let calcTitle = document.getElementById("selected-server-title");
        let calcName = document.getElementById("calc-server");
        let calcAmount = document.getElementById("calc-amount");
        let calcPercent = document.getElementById("calc-percent");
        calcTitle.textContent = `${name} ${planPercent}`;
        calcName.textContent = name;
        calcAmount.textContent = `${price}$`;
        calcPercent.textContent = planPercent;

        calculateServerProfit(price, planPercent, price);
    }

    let selectOptions = document.querySelectorAll("#deposit-form .dep__li a");
    if (selectOptions?.length > 0) {
        selectOptions.forEach((opt) => {
			opt.addEventListener('click', (e) => {
                e.preventDefault(); 
                let name = opt.getAttribute("data-name");
                let id = opt.getAttribute("data-id"); 
                let planId = opt.getAttribute("data-plan"); 
                let planPercent = opt.getAttribute("data-percent"); 
                let price = opt.getAttribute("data-price");
                handleSelect(name, id, planId, planPercent, price);
            });
		});
    }
    // END

    // Payment sysytem change
    let paymentSystemsBtns = document.querySelectorAll("input[name='ps']");
    paymentSystemsBtns.forEach((btn) => {
        let psId = btn.value;
        btn.addEventListener('change', () => {
            amountInput.value = convertedData[psId]
        });
        // btn.addEventListener('change', () => getConvertedAmount(psId));
    });
    // END

    // Submit btn
    submitBtn.addEventListener('click', () => {
        let psId = document.querySelector('input[name="ps"]:checked').value;
        amountInput.value = convertedData[psId];
    });
    // END
});