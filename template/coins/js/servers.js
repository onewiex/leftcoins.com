jQuery(document).ready(function($) {
	// Timers on cards
	function depoInfoTimer(id, time) {
		let time_left = time;

		if (time_left != '') {
			let hour_bl = $(`.serv__card_${id} .accruals-hours`);
			let minutes_bl = $(`.serv__card_${id} .accruals-minutes`);
			let seconds_bl = $(`.serv__card_${id} .accruals-seconds`);
			infoTimerInterval = setInterval(function() {
				let now = new Date().getTime();
				time_left--;
				// var days = Math.floor(time_left/60/60/24);
				let hours = Math.floor((time_left / 60 / 60) - (Math.floor(time_left / 60 / 60 / 24) * 24));
				let minutes = Math.floor((time_left / 60) - (Math.floor(time_left / 60 / 60) * 60));
				let seconds = Math.floor((time_left) - (Math.floor(time_left / 60) * 60));
				if (hours < 10)
					hours = '0' + hours;
				if (minutes < 10)
					minutes = '0' + minutes;
				if (seconds < 10)
					seconds = '0' + seconds;
				hours = hours.toString();
				minutes = minutes.toString();
				seconds = seconds.toString();

				// days_bl.html(days);
				hour_bl.text(hours[0] + hours[1]);
				minutes_bl.text(minutes[0] + minutes[1]);
				seconds_bl.text(seconds[0] + seconds[1]);
			}, 1000);
		}
	}

	let timers = $('.serv__card');
	if(timers) {
		$.each(timers, function (index, item) {
		    let next = $(item).attr('data-next');
			let id = $(item).attr('data-id');
			depoInfoTimer(id, next);
		});
	}
	// Timers on cards END


  // Servers sliders
  // change compounding value value
  function setCompounding (id, value) {

    $(`#serv-${id}-comp`).text(`${value}%`);
    $(`.serv__card_${id} input[name="compound"]`).val(value);
  }

  $(".serv__card .serv__slider").slider({
    range: "min",
    min: 0,
    max: 100,
    slide: function (event, ui) {
      let id = $(this).closest('.serv__card').attr('data-id');
      setCompounding(id, ui.value);
    },
    create: function(event, ui){
      $(this).slider('value', Number($(this).closest('.serv__card').attr('data-compound')));
    },
  });
  // END


  // Server merge functions
  function selectServersHandler (e) {
    let selectedServersArr = document.querySelectorAll('#pills-merge-servers input[name="id[]"]:checked');
    let submitMergeButton = document.querySelector('#pills-merge-servers input[type="submit"]');
    let selectedServerPS = e.target.getAttribute("data-ps");
    let allServersArr = document.querySelectorAll('#pills-merge-servers input[name="id[]"]');

    if (selectedServersArr?.length == 1 && e.target.checked) {
      allServersArr.forEach((server) => {
        if (server.getAttribute("data-ps") != selectedServerPS) {
          server.setAttribute("disabled", "disabled");
        } else {
          server.removeAttribute("disabled");
        }
      });
    }
    
    if (selectedServersArr?.length == 0 && !e.target.checked) {
      allServersArr.forEach((server) => {
        server.removeAttribute("disabled");
      });
    }

    if (selectedServersArr?.length > 2 && e.target.checked) {
      e.target.checked = false;
    }
    
    if (selectedServersArr?.length == 2) {
      submitMergeButton.removeAttribute("disabled");
    } else {
      submitMergeButton.setAttribute("disabled", "disabled");
    }
  }

  let serversCheckboxes = document.querySelectorAll('#pills-merge-servers input[name="id[]"]');
  if (serversCheckboxes?.length > 0) {
    serversCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', (e) => selectServersHandler(e));
    });
  }
  // END
    

});