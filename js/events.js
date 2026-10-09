document.addEventListener('DOMContentLoaded', function () {
      fetch('events.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
          }
          return response.json();
        })
        .then(events => {
          const today = new Date();
          today.setHours(0, 0, 0, 0); // normalize to midnight
          const upcomingEvents = events.filter(e => new Date(e.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
          const pastEvents = events.filter(e => new Date(e.date) < today)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          const upcomingContainer = document.getElementById('upcomingEvents');
          const pastContainer = document.getElementById('pastEvents');

          function createTicketLinks(tickets) {
            const container = document.createElement('td');
            const items = Array.isArray(tickets) ? tickets : [tickets];

            items
              .filter(Boolean)
              .forEach((ticket) => {
                let href = '';
                let label = 'Tickets';

                if (typeof ticket === 'string') {
                  href = ticket;
                } else if (ticket && typeof ticket === 'object') {
                  href = ticket.url || ticket.href || ticket.link || ticket.ticketUrl || '';
                  label = ticket.label || ticket.text || 'Tickets';
                }

                if (!href) return;

                const link = document.createElement('a');
                link.href = href;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = label;

                if (container.firstChild) {
                  container.appendChild(document.createTextNode(' | '));
                }
                container.appendChild(link);
              });

            return container;
          }

          function formatEventDate(dateValue, timeValue) {
            const eventDate = new Date(dateValue);
            if (Number.isNaN(eventDate.getTime())) {
              return '';
            }

            const formattedDate = eventDate.toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });

            let formattedTime = '';

            if (timeValue) {
              formattedTime = timeValue;
            } else if (typeof dateValue === 'string') {
              const match = dateValue.match(/T(\d{1,2}:\d{2}(?::\d{2})?)/i);
              if (match) {
                formattedTime = match[1];
              }
            }

            return formattedTime ? `${formattedDate}, ${formattedTime}` : formattedDate;
          }

          function createRow(event) {
            const tr = document.createElement('tr');
            const tdDate = document.createElement('td');
            tdDate.textContent = formatEventDate(event.date, event.time);
            const tdBand = document.createElement('td');
            tdBand.textContent = event.band;
            const tdVenue = document.createElement('td');
            tdVenue.textContent = event.venue;
            const tdCity = document.createElement('td');
            tdCity.textContent = event.city;
            const tdTickets = createTicketLinks(event.tickets);
            tr.append(tdDate, tdBand, tdVenue, tdCity, tdTickets);
            return tr;
          }
          upcomingEvents.forEach(event => {
            upcomingContainer.appendChild(createRow(event));
          });
          pastEvents.forEach(event => {
            pastContainer.appendChild(createRow(event));
          });
        })
        .catch(error => console.error('Fehler beim Laden der Events:', error));
    });

    