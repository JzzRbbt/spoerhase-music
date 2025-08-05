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
          const upcomingEvents = events.filter(e => new Date(e.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date));
          const pastEvents = events.filter(e => new Date(e.date) < today)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          const upcomingContainer = document.getElementById('upcomingEvents');
          const pastContainer = document.getElementById('pastEvents');
          function createRow(event) {
            const eventDate = new Date(event.date);
            const tr = document.createElement('tr');
            const tdDate = document.createElement('td');
            tdDate.textContent = eventDate.toLocaleDateString();
            const tdBand = document.createElement('td');
            tdBand.textContent = event.band;
            const tdVenue = document.createElement('td');
            tdVenue.textContent = event.venue;
            const tdCity = document.createElement('td');
            tdCity.textContent = event.city;
            tr.append(tdDate, tdBand, tdVenue, tdCity);
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