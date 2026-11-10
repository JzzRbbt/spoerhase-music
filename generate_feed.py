import json
from datetime import datetime
from xml.sax.saxutils import escape

# 1. events.json einlesen
with open('events.json', 'r', encoding='utf-8') as f:
    events = json.load(f)

# Falls deine events.json ein Objekt mit einer Liste ist (z.B. {"events": [...]}), passe das hier an:
# events = data.get('events', data)

items_xml = ""
today = datetime.now().date()

for index, event in enumerate(events):
    # Passe die Feldnamen hier an deine events.json an (z. B. 'title', 'date', 'location')
    title = event.get('band', 'Konzert')
    date_str = event.get('date', '')
    location = event.get('venue', '')
    ticket_reference = next(
        (event.get(key) for key in ('ticket_url', 'ticket_link', 'tickets', 'ticket') if event.get(key)),
        '',
    )
    if isinstance(ticket_reference, dict):
        ticket_reference = ticket_reference.get('url') or ticket_reference.get('href') or ''
    elif isinstance(ticket_reference, list):
        ticket_reference = ', '.join(str(ticket) for ticket in ticket_reference if ticket)

    # Nur Konzerte ab dem heutigen Datum in den Feed aufnehmen.
    try:
        dt = datetime.fromisoformat(date_str)
    except (TypeError, ValueError):
        continue
    if dt.date() < today:
        continue

    description = f"{date_str} - {location} ({title})"
    if ticket_reference:
        description += f" - Tickets: {ticket_reference}"
    
    # Datum für den RSS-Feed formatieren.
    pub_date_tag = f"<pubDate>{dt.strftime('%a, %d %b %Y %H:%M:%S GMT')}</pubDate>"

    items_xml += f"""
    <item>
        <title>{escape(title)}</title>
        <description>{escape(description)}</description>
        {pub_date_tag}
        <guid isPermaLink="false">event-{index}-{escape(date_str)}</guid>
        <link>https://jzzrbbt.github.io/spoerhase-music/#events</link>
    </item>
    """

# RSS-Struktur zusammenbauen
rss_feed = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>Black Mirror Ensemble – Konzerte</title>
        <link>https://jzzrbbt.github.io/spoerhase-music/#events</link>
        <description>Kommende Konzerte des Black Mirror Ensemble</description>
        <language>de-de</language>
        {items_xml}
    </channel>
</rss>
"""

# In feed.xml speichern
with open('feed.xml', 'w', encoding='utf-8') as f:
    f.write(rss_feed)

print("feed.xml erfolgreich generiert!")