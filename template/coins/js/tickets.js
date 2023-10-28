document.addEventListener('DOMContentLoaded', function () {
    // Close ticket success message
    let closeTicketSucces = document.getElementById("close-success");
    if (closeTicketSucces) {
        function hideMessage() {
            document.querySelector('[name="subject"]').value = '';
            document.querySelector('[name="text"]').value = '';
            let successMessage = document.getElementById("help-success");
            successMessage.classList.add("help__left-success-hidden");
        }
        
        closeTicketSucces.addEventListener("click", hideMessage);
    }
    // END


    // Open create ticket tab
    let openCreateTicketTabBtn = document.getElementById('open-create');
    if (openCreateTicketTabBtn) {
        function openTab() {
            let createTicketTabEl = document.getElementById('create-ticket');
            let createTicketTab = new bootstrap.Tab(createTicketTabEl);
            createTicketTab.show();
        }
        
        openCreateTicketTabBtn.addEventListener("click", openTab);
    }
    // END

    // Get first ticket messages on MY TICKETS tab click
    let myTicketsTabBtn = document.getElementById("my-tickets");

    function isJson(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }  
        return true;
    }

    function getFirstTicketData(tid) {
        let firstTicketForm = document.getElementById("first-ticket-form");
        let form_data;
        let ticketId;
        if (tid != undefined) {
            ticketId = tid;
        } else {
            // ticketId = document.querySelector('#first-ticket-form input[name="id"]').value;
            let ticketList = document.querySelectorAll('.help__info-table1 .ticket-radio');
            if (ticketList.length > 0) {
                ticketId = ticketList[0].getAttribute("data-id");
            }
        }
    
        let session = document.querySelector('input[name="session_id"]').value;
        form_data = form_data + '&id=' + ticketId + '&session_id=' + session + '&ajaxLoad=1';
        let url = firstTicketForm.getAttribute('action');
        $.ajax({ 
            data: form_data, 
            type: 'POST',
            url: url,
            success: function(data) {
                // let checkResp = JSON.parse(data);
                // сonsole.log("checkResp", checkResp)
                if(!isJson(data)) {
                    let chatContainer = document.getElementById('chat-container');
                    chatContainer.innerHTML = data;

                    $('.simple-bar').each(function(index, element) {
                        new SimpleBar(element);
                    });
                }
            }
        });
    }

    myTicketsTabBtn.addEventListener("click", () => getFirstTicketData(undefined));
    // END

    // Switching tickets
    let ticketsFromList = document.querySelectorAll(".ticket-radio");
    function switchTicket(e) {
        // let selected = document.querySelector(".ticket-radio:checked");
        let selected = e.target;
        let id = selected.getAttribute("data-id");
        let status = selected.getAttribute("data-status");
        let chat = document.querySelector(".help__chat");
        if (status == 0) {
            chat.classList.add("closed");
        } else {
            chat.classList.remove("closed");
        }

        document.querySelector('#chat-ticket-id').textContent = id;

        document.querySelector('#add-message-form input[name="id"]').value = id;
        getFirstTicketData(id);
    }
    // ticketsFromList.forEach((ticket) => {
    //     ticket.addEventListener('change', switchTicket);
    // });
    $('body').on('change', '.ticket-radio', switchTicket); 
    // END


    // Back to first ticket
    let tabEl = document.querySelector('button[data-bs-target="#pills-ticket"]');
    tabEl.addEventListener('shown.bs.tab', function (event) {
        let chatContainer = document.getElementById('chat-container');
        chatContainer.innerHTML = '';

        let ticketList = document.querySelectorAll('.help__info-table1 .ticket-radio');
        let ticketListMob = document.querySelectorAll('.help__info-table2 .ticket-radio');
        if (ticketList.length > 0 && ticketListMob.length > 0) {
            ticketList[0].checked = true;
            ticketListMob[0].checked = true;
        }
    });
    // END
});