document.addEventListener('DOMContentLoaded', function () {
  const textFiles = [
    { url: 'assets/text/aboutLTT.txt', elementId: 'aboutLTTText' },
    { url: 'assets/text/about.txt', elementId: 'aboutText' },
    { url: 'assets/text/aboutBME.txt', elementId: 'aboutBMEText' },
    { url: 'assets/text/aboutLessons.txt', elementId: 'aboutLessonsText' }
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
        const formattedText = text.replace(/\n/g, '<br>');
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
