document.addEventListener('DOMContentLoaded', function () {
  const textFiles = [
    { url: 'assets/text/aboutLTT.txt', elementId: 'aboutLTTText' },
    { url: 'assets/text/about.txt', elementId: 'aboutText' },
    { url: 'assets/text/aboutBME.txt', elementId: 'aboutBMEText' },
    { url: 'assets/text/aboutLessons.txt', elementId: 'aboutLessonsText' },

    { url: 'assets/text/contact.txt', elementId: 'contactText' }

  ];

  textFiles.forEach(({ url, elementId }) => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Netzwerkfehler beim Laden von ${url}`);
        }
        return response.text();
      })
      .then(text => {
         let formattedText = text
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // **Wort**

        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = formattedText;
        } else {
          console.warn(`Element mit ID '${elementId}' nicht gefunden.`);
        }
      })
      .catch(error => console.error('Fehler beim Laden des Textes:', error));
  });
});
