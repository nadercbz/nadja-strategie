/* Nadja · Glow & Strong
   Einzige Datenquelle für das Dashboard und für STRATEGIE.md (export_md.mjs).
   Neue Ideen: unten in IDEEN anhängen, id fortlaufend. Keine Gedankenstriche im Text.
   Skripte: Feld skript an der Idee (woche, hook, hookText, text [], aufruf, einblendungen [], beschreibung, hashtags [], dreh, check []).
   LIVE-Skript mit live: true, dauer, thema, ankuendigung, teile [{ zeit, titel, sagen [], saetze [{ wenn, sag }], punkte [] }].
   export_md.mjs schreibt daraus skripte/woche<N>.md. */

window.NADJA = {
  stand: "15.10.2026",
  kanal: {
    handle: "Aktueller Kanal",
    follower: 1110,
    likes: 260,
    viewsSchnitt: 456,
    viewsTop: 1231,
    gezaehlt: 15
  },

  positionierung: {
    claim: "Pro-Aging statt Anti-Aging.",
    satz: "Nadja ist die ehrliche Selbsttesterin für Frauen ab 35: Sie zeigt, was bei Haut, Kraft und Energie im echten Alltag funktioniert. Ohne Filter, ohne Wundermittel, mit Disziplin.",
    usp: "Ärztinnen erklären die Theorie. Nadja ist die Freundin, die es ausprobiert, dranbleibt und ehrlich erzählt, wie es wirklich läuft.",
    werte: ["Ehrlich statt Hype", "Dranbleiben statt Abkürzung", "Pflege statt Wunderversprechen", "Quellen statt Behauptungen"]
  },

  persona: {
    name: "Sandra, 42",
    text: "Berufstätig, wenig Zeit, merkt seit ein paar Jahren, dass Haut, Gewicht und Energie sich verändern. Ist von Wundercremes und Diäten enttäuscht und scrollt abends 20 Minuten auf TikTok. Sucht jemanden in ihrem Alter, der ehrlich ist und nichts verkaufen will, was nicht hält.",
    schmerzen: ["Haut wirkt müder, schlaffer, besonders nach dem Abnehmen", "Abnehmen klappt nicht mehr wie mit 25", "Zu viele widersprüchliche Tipps, zu viele teure Produkte", "Wechseljahre kündigen sich an, keiner erklärt es"],
    wuensche: ["Einfache Routinen, die in 10 Minuten passen", "Ehrliche Produktchecks, bevor sie Geld ausgibt", "Gefühl: Ich bin nicht allein damit"]
  },

  analyse: {
    staerken: [
      "Nadja zeigt ihr Gesicht und ist vor der Kamera natürlich",
      "Echter Alltag ist da: Tennis, Auto, Reisen, Spiegel-Selfies",
      "Die Bio-Zeile 'Stay focused, stay consistent' ist ein starkes Motto",
      "Thema Glow-up und Veränderung zieht in der Zielgruppe ab 35"
    ],
    schwaechen: [
      "Wirkstoffe, Spritzen und Codewörter: TikTok blendet bereits Posts aus und drosselt die Reichweite",
      "Viele fremde Meme-Clips und Filmszenen statt eigener Aussagen",
      "In den ersten 2 Sekunden fehlt meist ein klarer Hook",
      "Keine Serien, keine wiederkehrenden Formate, kein Such-Keyword",
      "Einziger Call to Action ist 'DM', das wirkt wie Verkauf und nicht wie Mehrwert",
      "Profilbild mit Sonnenbrille im Auto, Gesicht kaum erkennbar"
    ],
    chancen: [
      "Pro-Aging ab 35 und Wechseljahre wachsen als Themen auf TikTok",
      "Kupferpeptide in Seren sind 2026 ein großer, legaler Kosmetik-Trend",
      "TikTok wird als Suchmaschine genutzt: wer Keywords sagt und einblendet, wird gefunden",
      "LIVEs ab 1.000 Followern möglich, Nadja hat die Schwelle erreicht"
    ]
  },

  saeulen: [
    { key: "glow", name: "Glow", anteil: 35, farbe: "#E8B3B8", text: "Hautpflege ab 35, Peptid-Pflege zum Auftragen, Sonnenschutz, INCI lesen, ehrliche Tests." },
    { key: "strong", name: "Strong", anteil: 25, farbe: "#F0B297", text: "Krafttraining, Tennis, Eiweiß im Alltag, nachhaltig abnehmen ohne Crash." },
    { key: "longevity", name: "Longevity", anteil: 20, farbe: "#C6DEDA", text: "Schlaf, Morgenroutine, Stress, Vorsorge, Wechseljahre mit Quellen." },
    { key: "mindset", name: "Mindset", anteil: 10, farbe: "#D1BCA1", text: "Stay focused, stay consistent: Disziplin, Rückschläge, Selbstwert." },
    { key: "real", name: "Real Life", anteil: 10, farbe: "#E3CFC6", text: "LIVEs, Fragen, Kommentar-Antworten, ein Tag mit Nadja." }
  ],

  formate: [
    { key: "talking", name: "Talking Head", zeit: "15 Min", text: "Handy aufs Stativ, Fensterlicht von vorn, Mikro an. 20 bis 40 Sekunden, ein Take, automatische Untertitel in TikTok." },
    { key: "voiceover", name: "Voiceover + Alltagsclips", zeit: "15 Min", text: "Unterwegs 3-Sekunden-Clips sammeln (Tennis, Kaffee, Pflege, Spaziergang), in TikTok aneinanderreihen, Stimme drüber sprechen." },
    { key: "karussell", name: "Foto-Karussell", zeit: "20 Min", text: "5 bis 7 Folien mit großem Text auf ruhigem Hintergrund. Wird oft gespeichert, ideal für Wissen und Listen." },
    { key: "greenscreen", name: "Green Screen", zeit: "10 Min", text: "Screenshot von Artikel, Studie oder Trend-Video im Hintergrund, Nadja kommentiert davor." },
    { key: "reply", name: "Kommentar-Antwort", zeit: "10 Min", text: "Auf einen Kommentar mit Video antworten. Die Frage wird automatisch eingeblendet. Bringt Nähe und Ideen ohne Ende." },
    { key: "grwm", name: "Get Ready With Me", zeit: "15 Min", text: "Pflege oder Make-up filmen und dabei eine Geschichte oder Meinung erzählen." },
    { key: "serie", name: "Serie", zeit: "10 Min", text: "Wiederkehrendes Format wie 'Tag X von 90' oder 'Woche X von 8'. Leute folgen, um die nächste Folge zu sehen." },
    { key: "live", name: "LIVE", zeit: "30 bis 45 Min", text: "1 bis 2 Mal pro Woche. Thema plus Fragen. Beste Momente danach als kurze Clips posten." }
  ],

  rhythmus: [
    { tag: "Mo", saeule: "glow", was: "Glow: Test-Serie oder Pflege-Wissen" },
    { tag: "Di", saeule: "strong", was: "Strong: Training, Tennis, Essen" },
    { tag: "Mi", saeule: "longevity", was: "Wissen als Karussell" },
    { tag: "Do", saeule: "real", was: "Kommentar-Antwort" },
    { tag: "Fr", saeule: "mindset", was: "GRWM oder Mindset" },
    { tag: "Sa", saeule: "mindset", was: "Optional: Tag X von 90 (10 Sekunden)" },
    { tag: "So", saeule: "real", was: "LIVE 19 Uhr + Batch-Dreh für die Woche" }
  ],

  produktion: [
    { titel: "Ein Drehtag pro Woche", text: "Sonntag 60 bis 90 Minuten: 5 Talking Heads am Stück, 2 Outfits wechseln, damit es nicht nach einem Tag aussieht." },
    { titel: "B-Roll-Album im Handy", text: "Album 'Nadja B-Roll' anlegen. Jeden Tag 2 bis 3 kurze Clips: Training, Kaffee, Pflege, Weg zur Arbeit. Das ist der Stoff für Voiceover-Videos." },
    { titel: "Licht und Ton", text: "Gesicht zum Fenster, Kamera auf Augenhöhe, Mikro an. Kein Ringlicht nötig. Lieber echtes Tageslicht als Filter." },
    { titel: "Schnitt nur am Handy", text: "TikTok-Editor oder CapCut: automatische Untertitel, immer dieselbe Schrift, Hook-Text oben im sicheren Bereich." },
    { titel: "Fragen-Notiz", text: "Jede Frage aus Kommentaren und LIVEs in eine Notiz. Jede Frage ist ein fertiges Video." },
    { titel: "Bauplan für jedes Video", text: "1. Hook in 2 Sekunden (gesagt und eingeblendet). 2. Drei kurze Punkte. 3. Ein klarer Aufruf: speichern, folgen oder Frage in die Kommentare." }
  ],

  hookRegeln: [
    "Hook in den ersten 1 bis 2 Sekunden sagen UND als Text einblenden",
    "Kein 'Hallo ihr Lieben' am Anfang, direkt rein",
    "Ein Versprechen geben, das das Video einlöst",
    "Bewegung oder Nähe im ersten Bild: Gesicht nah, Produkt in die Kamera, Schritt auf die Kamera zu",
    "Das Such-Keyword in den Hook packen, zum Beispiel 'Hautpflege ab 35'",
    "Gewinner-Video recyceln: gleiches Thema, neuer Hook, eine Woche später"
  ],

  hooks: [
    { typ: "Neugier", t: "Das hat mir niemand über [Thema] gesagt." },
    { typ: "Neugier", t: "Ich habe [Zeitraum] lang [Thema] getestet. Das ist passiert." },
    { typ: "Neugier", t: "Der unterschätzteste Tipp für [Thema] kostet 0 Euro." },
    { typ: "Neugier", t: "Dreh deine Creme um. Diese 3 Wörter entscheiden, ob du zu viel bezahlst." },
    { typ: "Fehler", t: "3 Fehler bei [Thema], die ich jahrelang gemacht habe." },
    { typ: "Fehler", t: "Wenn du das bei [Thema] machst, verschenkst du Geld.", nur: ["glow", "strong"] },
    { typ: "Fehler", t: "Bevor du noch ein Produkt für [Thema] kaufst, schau dir das an.", nur: ["glow"] },
    { typ: "Kontra", t: "Unpopular Opinion: Die beste Anti-Aging-Routine findet nicht im Badezimmer statt." },
    { typ: "Kontra", t: "Alle sagen: [Mythos]. Ich sehe das nach [Zeitraum] anders." },
    { typ: "Kontra", t: "Das ist für mich der überbewertetste Trend bei [Thema].", nur: ["glow", "strong", "longevity"] },
    { typ: "Story", t: "Vor einem Jahr hätte ich nie gedacht, dass ich [Thema] so ernst nehme." },
    { typ: "Story", t: "Ich war nie diszipliniert. Bis ich diese eine Sache geändert habe." },
    { typ: "Story", t: "Der Satz in meiner Bio ist kein Spruch. Hier ist die Geschichte dahinter." },
    { typ: "Liste", t: "3 Dinge, die ich jeden Morgen für [Thema] mache." },
    { typ: "Liste", t: "5 Dinge, für die ich mit über 35 kein Geld mehr ausgebe." },
    { typ: "Liste", t: "Die einzigen 3 Dinge, die du für [Thema] wirklich brauchst." },
    { typ: "POV", t: "POV: Du bist über 35 und deine Haut reagiert plötzlich anders." },
    { typ: "POV", t: "POV: Deine Freundin fragt, was du an deiner Routine geändert hast." },
    { typ: "POV", t: "POV: Tag 30 von 90 und du willst aufhören." },
    { typ: "Frage", t: "Würdest du mit über 35 noch mit [Thema] anfangen?" },
    { typ: "Frage", t: "Woran merkst du eigentlich, dass [Thema] bei dir funktioniert?" },
    { typ: "Serie", t: "Tag [X] von 90. Heute: [Thema]." },
    { typ: "Serie", t: "Woche [X] von 8 meines [Thema]-Tests. Gleiches Licht, kein Filter.", nur: ["glow"] },
    { typ: "Serie", t: "Teil [X]: Was dir keiner über [Thema] erklärt." },
    { typ: "Kommentar", t: "Die häufigste Frage in meinen Kommentaren, ehrlich beantwortet." },
    { typ: "Kommentar", t: "Jemand hat geschrieben, ich sei zu alt für TikTok. Hier ist meine Antwort." },
    { typ: "Ergebnis", t: "Mein ehrliches Fazit nach [Zeitraum] [Thema]. Ohne Filter, ohne Versprechen." },
    { typ: "Ergebnis", t: "Was sich nach [Zeitraum] verändert hat, und was nicht." }
  ],

  generator: {
    themen: {
      glow: ["Hautpflege ab 35", "Peptid-Pflege", "Sonnenschutz", "Augenpflege", "Halspflege", "Abendpflege", "Drogerie-Pflege", "Kupferpeptid-Seren"],
      strong: ["Krafttraining", "Tennis", "Eiweiß im Alltag", "10-Minuten-Workouts", "10.000 Schritte", "nachhaltiges Abnehmen"],
      longevity: ["Schlaf", "Morgenroutinen", "Stress", "Wechseljahre", "Vorsorge", "Spaziergänge nach dem Essen"],
      mindset: ["Disziplin", "Rückschläge", "Selbstwert ab 35", "Routinen durchziehen"],
      real: ["Alltag mit Job", "Wochenplanung", "Community-Fragen"]
    },
    zeitraeume: ["2 Wochen", "4 Wochen", "6 Wochen", "8 Wochen", "12 Wochen"],
    mythen: ["Falten kommen nur von den Genen", "Frauen werden vom Krafttraining zu muskulös", "teuer ist besser", "Sonnencreme braucht man nur im Sommer", "ab 40 kann man nicht mehr abnehmen"],
    ablauf: {
      talking: ["Hook direkt in die Kamera", "3 kurze Punkte, je ein Satz", "Aufruf: speichern oder Frage in die Kommentare"],
      voiceover: ["Hook als Text über dem ersten Clip", "4 bis 6 Alltagsclips, Stimme erzählt", "Letzter Clip: Gesicht und Aufruf"],
      karussell: ["Folie 1: Hook groß", "Folien 2 bis 6: ein Punkt pro Folie", "Letzte Folie: Speichern und Folgen"],
      greenscreen: ["Quelle oder Trend als Hintergrund", "Nadja ordnet in 3 Sätzen ein", "Eigene Meinung plus Quelle in der Beschreibung"],
      reply: ["Kommentar einblenden", "Ehrliche Antwort in 3 Punkten", "Frage an die Zuschauer zurück"],
      grwm: ["Hook beim ersten Pflegeschritt", "Geschichte erzählen, Pflege läuft nebenher", "Fazit plus Aufruf"],
      serie: ["Folge-Nummer groß einblenden", "Eine Sache von heute zeigen", "Vorschau: Morgen kommt..."],
      live: ["Thema der Woche 10 Minuten", "Fragen 20 Minuten", "Wochen-Challenge und Ausblick"]
    }
  },

  hashtags: [
    { name: "Glow", saeule: "glow", tags: ["#hautpflege", "#hautpflegeroutine", "#skincareover40", "#proaging", "#kupferpeptide", "#peptidserum", "#matureskin", "#skincaretipps"] },
    { name: "Strong", saeule: "strong", tags: ["#krafttraining", "#krafttrainingfrauen", "#fitab40", "#frauenab40", "#tennis", "#proteinreich", "#gesundabnehmen", "#muskelaufbau"] },
    { name: "Longevity", saeule: "longevity", tags: ["#longevity", "#healthyaging", "#gesundaltern", "#wechseljahre", "#perimenopause", "#schlaf", "#morgenroutine"] },
    { name: "Mindset", saeule: "mindset", tags: ["#stayconsistent", "#disziplin", "#mindset", "#selbstliebe", "#frauenpower"] },
    { name: "Community", saeule: "real", tags: ["#ü40", "#über40", "#frauenüber40", "#nadjatestet", "#90tagekonsequent"] }
  ],
  hashtagRegeln: [
    "3 bis 5 Hashtags pro Video, nicht mehr",
    "Mischung: 1 großer, 2 mittlere, 1 bis 2 kleine oder eigene",
    "Vor dem Benutzen in der TikTok-Suche die Videozahl prüfen, Ziel für mittlere Tags: 50.000 bis 500.000 Videos",
    "Deutsche Tags bevorzugen, damit TikTok an deutschsprachige Nutzerinnen ausspielt",
    "#fyp und #foryou bringen nichts, TikTok sagt das selbst",
    "Eigene Serien-Tags (#nadjatestet, #90tagekonsequent) bei jeder Folge nutzen"
  ],
  hashtagTabu: ["#peptides", "#glp1", "#abnehmspritze", "#ozempic", "#semaglutid", "Codewörter oder verfremdete Schreibweisen jeder Art"],

  keywords: ["Hautpflege ab 35", "Hautpflege ab 40", "Kupferpeptide Erfahrung", "Peptid Serum Drogerie", "Haut straffen nach Abnehmen", "Krafttraining Frauen ab 40", "Longevity Routine Frauen", "Wechseljahre Haut", "Morgenroutine ab 40", "Sonnenschutz Gesicht"],

  bio: [
    "Pro-Aging statt Anti-Aging ✨ Haut, Kraft & Energie ab 35. Ehrlich, ohne Filter.",
    "Stay focused, stay consistent ✨ Hautpflege & Longevity ab 35. LIVE jeden Sonntag",
    "Ich teste Pflege & Routinen ab 35, du sparst dir Fehlkäufe ✨ Keine med. Beratung"
  ],
  namen: ["Nadja | Glow & Strong", "@nadja.glowstrong", "@nadja.proaging", "@nadja.testet"],
  profilTipps: [
    "Profilbild: Gesicht nah, Tageslicht, ohne Sonnenbrille, heller Hintergrund",
    "Anzeigename mit Thema, damit die Suche ihn findet: 'Nadja | Glow & Strong'",
    "Link in Bio auf eine Linkseite mit Impressum, Datenschutz und Lieblingsprodukten",
    "3 Videos anpinnen: Wer bin ich, Was dich hier erwartet, Meine 3 Regeln",
    "Benutzernamen nur einmal ändern und dann behalten (TikTok erlaubt das nur alle 30 Tage)"
  ],

  lives: [
    { name: "Sonntags-Glow-Talk", wann: "Sonntag 19:00, 30 bis 45 Min", ablauf: ["0 bis 5 Min: Begrüßung, Hinweis 'meine Erfahrung, keine medizinische Beratung'", "5 bis 15 Min: Thema der Woche, zum Beispiel 'So liest du eine Pflege-Verpackung'", "15 bis 35 Min: Fragen aus dem Chat", "35 bis 45 Min: Wochen-Challenge und was nächste Woche kommt"] },
    { name: "Strong-Talk nach dem Training", wann: "Mittwoch, 20 Min, optional", ablauf: ["Direkt nach Tennis oder Gym live gehen", "Was heute gut lief, was nicht", "Fragen zu Training und Alltag"] }
  ],
  liveRegeln: [
    "Eine Freundin als Moderatorin einsetzen, die Kommentare im Blick hat",
    "In den LIVE-Einstellungen den Schlüsselwort-Filter aktivieren und Wirkstoff- und Medikamentennamen eintragen",
    "Keine Diagnosen, keine Dosierungen, keine 'Was soll ich nehmen?'-Antworten. Satz dafür: 'Das klärst du bitte mit deiner Ärztin.'",
    "Nichts per DM verkaufen, was nicht frei verkäufliche Kosmetik ist",
    "Die 3 besten Antworten als kurze Clips am Montag posten"
  ],

  kpis: [
    { name: "Ø Views pro Video", jetzt: "ca. 456", m1: "1.000", m2: "2.500", m3: "5.000" },
    { name: "Follower", jetzt: "1.110", m1: "1.500", m2: "2.200", m3: "3.000" },
    { name: "Vollständig angesehen", jetzt: "messen", m1: "15 %", m2: "20 %", m3: "25 %" },
    { name: "Saves pro 1.000 Views", jetzt: "messen", m1: "5", m2: "8", m3: "10" },
    { name: "Ausreißer über 10.000 Views", jetzt: "0", m1: "0", m2: "1", m3: "1 pro Monat" },
    { name: "LIVE Zuschauer gleichzeitig", jetzt: "neu", m1: "5", m2: "10", m3: "15+" }
  ],
  analyseRoutine: [
    "Jeden Sonntag 10 Minuten in TikTok Analytics",
    "Top 3 und Flop 3 Videos der Woche notieren",
    "Auf 'durchschnittliche Wiedergabezeit' und 'vollständig angesehen' schauen, nicht nur auf Views",
    "Bestes Thema der Woche mit neuem Hook nochmal machen",
    "Werte unten im Wochen-Tracker eintragen"
  ],

  roadmap: [
    { phase: "Neustart", wochen: "Woche 1 bis 2", punkte: ["Bio, Name, Profilbild neu", "Altlasten auf 'Nur ich' stellen", "Impressum in die Linkseite", "3 Pin-Videos drehen", "Erstes LIVE ankündigen und machen"] },
    { phase: "Aufbau", wochen: "Woche 3 bis 8", punkte: ["5 Posts pro Woche plus 1 LIVE", "Serien starten: 'Woche X von 8' und 'Tag X von 90'", "Hooks testen: gleiches Video, anderer Hook", "Die 3 stärksten Formate finden und verdoppeln"] },
    { phase: "Monetarisierung", wochen: "Woche 9 bis 13", punkte: ["TikTok Shop Affiliate für seriöse Kosmetik", "Mediakit bauen und Pflegemarken anfragen", "Prüfen: eigene Pflegelinie mit allen Pflichten", "Später ab 10.000 Followern: Creator Rewards"] }
  ],
  monetarisierung: [
    { name: "TikTok Shop Affiliate", wann: "sofort", text: "Provision für Kosmetik von seriösen Marken. Immer als Werbung kennzeichnen." },
    { name: "Partnerprogramme von Pflegemarken", wann: "ab Monat 2", text: "Rabattcode oder Link, Provision pro Verkauf. Kennzeichnung 'Werbung' plus Hinweis auf Provision." },
    { name: "Marken-Kooperationen", wann: "ab ca. 3.000 bis 5.000 Followern", text: "Mit Mediakit: Zielgruppe, Ø Views, Beispiele. Nur Produkte, die Nadja wirklich nutzt." },
    { name: "LIVE-Geschenke", wann: "sofort", text: "Kleiner Bonus, kein Geschäftsmodell. Wichtiger ist die Bindung." },
    { name: "Eigene Pflegelinie", wann: "frühestens nach 6 Monaten", text: "White Label mit Sicherheitsbewertung und CPNP. Siehe Bereich Recht." },
    { name: "Creator Rewards", wann: "ab 10.000 Followern", text: "TikTok zahlt für Videos über 1 Minute." }
  ],

  neustart: [
    "Bio neu: einen Vorschlag wählen, 'Nur zu Forschungszwecken' und 'DM für mehr Infos' löschen",
    "Profilbild neu: Gesicht nah, Tageslicht, ohne Sonnenbrille",
    "Anzeigename mit Thema setzen, Benutzernamen eventuell wechseln",
    "Alte Videos mit Wirkstoffen, Spritzen, Fläschchen oder Codewörtern auf 'Nur ich' stellen",
    "Business-Konto aktivieren (Analytics und Commercial Music Library)",
    "Linkseite mit Impressum und Datenschutz in die Bio",
    "3 Pin-Videos drehen und anpinnen",
    "Album 'Nadja B-Roll' im Handy anlegen",
    "Erster Drehtag: 5 Videos am Stück",
    "Erstes LIVE in einer Story und einem Video ankündigen"
  ],

  vorbilder: [
    { name: "Dr. Emi Arpa", land: "DE", plattform: "Instagram, TikTok", fokus: "Hautärztin, Hautpflege, eigene Pflegelinie", groesse: "ca. 630 Tsd. auf Instagram (Modash, März 2026)", gut: "Erklärt Fachwissen in 30 Sekunden, klare Mythen-Checks, starke Wiedererkennung", nadja: "Format 'Mythos oder Fakt?'. Nadja zitiert Fachleute, statt selbst Ärztin zu spielen." },
    { name: "Dr. Sheila de Liz", land: "DE", plattform: "Instagram, YouTube", fokus: "Gynäkologin, Wechseljahre, Bestseller 'Woman on Fire'", groesse: "Bekannteste Gynäkologin im deutschsprachigen Raum", gut: "Humor, tabulos, spricht Frauen ab 40 direkt an", nadja: "Tonalität: ehrlich und mit Humor. Wechseljahre als Thema, immer mit Quelle." },
    { name: "Anke Sinnigen", land: "DE", plattform: "Instagram", fokus: "Menopause-Expertin, Women's Health, eigene Wissensplattform", groesse: "Women's-Health-Creatorin mit Buch", gut: "Baut Community statt nur Reichweite", nadja: "LIVEs und wiederkehrende Fragen-Formate für Bindung." },
    { name: "Nina Ruge", land: "DE", plattform: "Instagram, Podcast staYoung", fokus: "Longevity-Journalistin, Bestseller seit 2018", groesse: "Bekanntes TV-Gesicht, Podcast mit Expertinnen", gut: "Seriöse Longevity, Expertinnen-Interviews, verständlich", nadja: "Green-Screen-Reaktionen auf Interviews, Longevity ohne Hype." },
    { name: "Lisa Scharff", land: "DE", plattform: "Instagram", fokus: "Mindful Beauty Coach, 'Beauty has no Age'", groesse: "Nische, sehr nahbar", gut: "Reels mit Frauen über 50, 60, 70. Wärme statt Perfektion", nadja: "Pflege- und Make-up-Looks für reife Haut, auch mit Freundinnen oder Mutter." },
    { name: "Stella x Science", land: "DE", plattform: "Instagram", fokus: "Evidenzbasierte Hautpflege", groesse: "Nische", gut: "'Wissenschaft statt Werbelügen', INCI- und Studien-Checks", nadja: "Produkt-Checks und 'Lohnt sich das?'-Videos." },
    { name: "SUE | Skincare Science", land: "DE", plattform: "Instagram", fokus: "Hautpflege-Wissen", groesse: "Nische", gut: "Durchblick im Beauty-Dschungel, klare Karussells", nadja: "Wissens-Karussells am Mittwoch." },
    { name: "Dr. Mary Claire Haver", land: "US", plattform: "TikTok @drmaryclaire, Instagram", fokus: "Gynäkologin, Menopause", groesse: "über 7 Mio. Follower gesamt (2026)", gut: "Serien, Bücher, riesige Community für Frauen 40+", nadja: "Serienformate und Wissenskarussells, die gespeichert werden." },
    { name: "Dr. Shereene Idriss", land: "US", plattform: "Instagram, TikTok", fokus: "Dermatologin, 'Pillowtalk Derm'", groesse: "Millionen-Reichweite", gut: "Lockere Talking Heads aus dem Alltag, Mythen zerlegen", nadja: "Format 'Abendroutine Pillow Talk'." },
    { name: "Caroline Hirons", land: "UK", plattform: "Instagram, TikTok, YouTube", fokus: "Hautpflege-Expertin, 50+", groesse: "Große internationale Community", gut: "Direkte Meinung, 'Spar dir das Geld'", nadja: "Format 'Lohnt sich das? Teuer gegen günstig'." },
    { name: "Dr. Stacy Sims", land: "US", plattform: "Instagram, Podcast", fokus: "Sportphysiologin, 'Women are not small men'", groesse: "Große Fach-Reichweite", gut: "Training speziell für Frauen ab 40", nadja: "Quelle für die Strong-Säule, Green Screen auf ihre Aussagen." },
    { name: "Erica Taylor", land: "US", plattform: "TikTok", fokus: "Midlife Makeup, 49", groesse: "Laut New York Times eine überraschende Größe auf TikTok", gut: "Spricht direkt zu Frauen über 40, sehr nahbar", nadja: "Direkte Ansprache 'Wenn du über 35 bist...'." }
  ],

  recht: {
    hinweis: "Diese Übersicht hilft im Alltag, sie ersetzt keine Rechtsberatung. Vor dem ersten bezahlten Deal oder einem eigenen Produkt einmal von einer Fachanwältin oder einem Fachanwalt für Wettbewerbsrecht prüfen lassen.",
    grundregeln: [
      { titel: "Kosmetik pflegt, Arzneimittel heilen", text: "Für Cremes und Seren nur kosmetische Aussagen: pflegt, spendet Feuchtigkeit, Hautgefühl. Nie: heilt, behandelt, beugt Krankheiten vor.", quelle: "Kosmetik-VO (EG) 1223/2009, Claims-VO (EU) 655/2013" },
      { titel: "Keine Kilo-Versprechen mit Produkten", text: "Bei Lebensmitteln und Nahrungsergänzung sind Angaben zu Ausmaß und Tempo der Gewichtsabnahme verboten. Auch als persönlicher Erfahrungsbericht riskant.", quelle: "Health-Claims-VO (EG) 1924/2006, Art. 12" },
      { titel: "Werbung sofort erkennbar", text: "Bekommst du Geld, Provision oder Produkte: 'Werbung' oder 'Anzeige' am Anfang, gut sichtbar, plus TikTok-Schalter 'Inhalte offenlegen'.", quelle: "§ 22 MStV, § 5a UWG, Leitfaden der Medienanstalten" },
      { titel: "Keine Medikamente, keine Spritzen", text: "Verschreibungspflichtige Mittel und Wirkstoffe zum Spritzen dürfen nicht öffentlich beworben, gezeigt oder per Codewort angedeutet werden. Verkauf an Endkunden ist strafbar.", quelle: "§ 10 HWG, Arzneimittelgesetz" },
      { titel: "Erfahrung ja, Behandlung nein", text: "Nadja teilt, was sie selbst macht. Sie gibt niemandem persönliche Behandlungs- oder Dosierungstipps.", quelle: "Heilpraktikergesetz" },
      { titel: "Impressum ist Pflicht", text: "Geschäftsmäßiger Account braucht ein Impressum, mit höchstens 2 Klicks erreichbar, zum Beispiel über die Linkseite in der Bio.", quelle: "§ 5 DDG" }
    ],
    themen: ["Haut", "Abnehmen", "Gesundheit", "Nahrungsergänzung", "Peptide", "Werbung"],
    sagen: [
      { thema: "Haut", nein: "Diese Creme baut Kollagen auf und heilt Falten.", ja: "Meine Haut fühlt sich damit praller und glatter an. Das ist meine Erfahrung, kein Versprechen." },
      { thema: "Haut", nein: "Wirkt wie Botox.", ja: "Für ein glatteres Hautgefühl." },
      { thema: "Haut", nein: "Heilt Akne, Rosacea oder Narben.", ja: "Bei Hautproblemen geh bitte zur Hautärztin. Ich zeige dir nur meine Pflege." },
      { thema: "Haut", nein: "Dermatologisch bewiesen! (ohne Beleg)", ja: "Nur Aussagen übernehmen, die der Hersteller belegt und selbst auf der Verpackung führt." },
      { thema: "Haut", nein: "Vorher-Nachher mit Filter, anderem Licht oder Make-up.", ja: "Gleicher Ort, gleiches Licht, kein Filter, Zeitraum nennen, Hinweis 'individuelles Ergebnis'." },
      { thema: "Abnehmen", nein: "Mit diesem Produkt 10 Kilo in 6 Wochen.", ja: "Ich habe meine Ernährung umgestellt und trainiere 3 Mal die Woche. So sieht mein Alltag aus." },
      { thema: "Abnehmen", nein: "Abnehmspritzen, Fläschchen, Pens oder Codewörter zeigen oder andeuten.", ja: "Medikamente zum Abnehmen gehören in ärztliche Hände. Sprich mit deiner Ärztin." },
      { thema: "Abnehmen", nein: "Iss nur 800 Kalorien, dann klappt es.", ja: "Ich achte auf genug Eiweiß und Gemüse und esse mich satt." },
      { thema: "Abnehmen", nein: "Waage-Videos mit Kilo-Zahl neben einem Produkt.", ja: "Gewohnheiten zeigen: Schritte, Training, Teller, Schlaf." },
      { thema: "Gesundheit", nein: "Das verlängert dein Leben um 10 Jahre.", ja: "Studien zeigen einen Zusammenhang zwischen Krafttraining und gesundem Altern. Quelle in der Beschreibung." },
      { thema: "Gesundheit", nein: "Setz deine Medikamente ab und nimm lieber XY.", ja: "Lass deine Werte bei der Ärztin checken und entscheide mit ihr." },
      { thema: "Gesundheit", nein: "Nimm davon 2 Mal täglich 500 mg.", ja: "Ich mache das so. Was für dich passt, klärst du mit Ärztin oder Apotheke." },
      { thema: "Gesundheit", nein: "Bei Wechseljahresbeschwerden hilft nur XY.", ja: "Diese Gynäkologin erklärt es gut, hier ist ihr Buch. Lass dich beraten." },
      { thema: "Nahrungsergänzung", nein: "Kollagenpulver strafft deine Haut.", ja: "Für Kollagen allein gibt es keinen zugelassenen EU-Claim. Erlaubt: 'Vitamin C trägt zu einer normalen Kollagenbildung für eine normale Funktion der Haut bei.'" },
      { thema: "Nahrungsergänzung", nein: "Biotin lässt deine Haare wachsen.", ja: "Biotin trägt zur Erhaltung normaler Haare bei. (zugelassener Wortlaut)" },
      { thema: "Nahrungsergänzung", nein: "Das Pulver kurbelt den Stoffwechsel an und lässt Fett schmelzen.", ja: "Nur Aussagen aus dem EU-Register der zugelassenen Health Claims, wortgetreu." },
      { thema: "Peptide", nein: "Peptide zum Spritzen, 'nur zu Forschungszwecken', 'DM für Infos'.", ja: "Peptide nur als Inhaltsstoff in fertiger Kosmetik, zum Beispiel Copper Tripeptide-1 in einem Serum." },
      { thema: "Peptide", nein: "Peptide sind nur verboten, weil die Pharmaindustrie Angst hat.", ja: "Sachlich bleiben: Was ist ein Kosmetik-Inhaltsstoff, was ein Arzneimittel. Keine Verschwörung." },
      { thema: "Peptide", nein: "Ab 30 baut dein Körper Peptide ab, deshalb brauchst du meine Produkte.", ja: "Mit den Jahren bildet die Haut weniger Kollagen. Deshalb pflege ich so. Ohne Kaufdruck." },
      { thema: "Werbung", nein: "#ad versteckt am Ende zwischen 20 Hashtags.", ja: "'Werbung' am Anfang der Beschreibung und im Video, plus Schalter 'Inhalte offenlegen'." },
      { thema: "Werbung", nein: "Danke an @marke für dieses tolle Geschenk!", ja: "Werbung, PR-Sample: Ich habe das Produkt kostenlos bekommen." },
      { thema: "Werbung", nein: "Link in Bio! (Affiliate, ohne Hinweis)", ja: "Werbung. Affiliate-Link: Ich bekomme eine kleine Provision, für dich ändert sich der Preis nicht." },
      { thema: "Werbung", nein: "Trend-Song aus den Charts im bezahlten Video.", ja: "Musik aus der Commercial Music Library des Business-Kontos." }
    ],
    pflichten: [
      { titel: "Impressum", text: "Name, ladungsfähige Anschrift (kein Postfach), E-Mail. Über die Linkseite in der Bio, höchstens 2 Klicks.", quelle: "§ 5 DDG" },
      { titel: "Datenschutzerklärung", text: "Auf der Linkseite oder Website, sobald Daten erhoben werden (Newsletter, Kontaktformular, Tracking).", quelle: "DSGVO" },
      { titel: "Gewerbe anmelden", text: "Sobald Einnahmen geplant sind (Affiliate, Kooperationen). Danach Fragebogen zur steuerlichen Erfassung beim Finanzamt.", quelle: "Gewerbeordnung, AO" },
      { titel: "Kleinunternehmerregelung prüfen", text: "Möglich bei höchstens 25.000 Euro Umsatz im Vorjahr und 100.000 Euro im laufenden Jahr.", quelle: "§ 19 UStG" },
      { titel: "PR-Pakete versteuern", text: "Geschenkte Produkte von Marken können steuerpflichtige Einnahmen sein. Mit Steuerberatung klären.", quelle: "EStG" },
      { titel: "Werbekennzeichnung", text: "Jede bezahlte oder gesponserte Erwähnung, Affiliate-Links und PR-Samples kennzeichnen. Bei eigenen Produkten, wenn es nicht sofort klar ist, auch.", quelle: "§ 22 MStV, § 5a UWG" },
      { titel: "Musikrechte", text: "Im Business-Konto nur Musik aus der Commercial Music Library. Keine Filmszenen oder fremde Clips in Werbevideos.", quelle: "Urheberrecht, TikTok-Nutzungsbedingungen" },
      { titel: "Andere Personen im Video", text: "Wer erkennbar ist, muss einverstanden sein. Bei Kindern die Eltern.", quelle: "§ 22 KUG" },
      { titel: "Gewinnspiele", text: "Teilnahmebedingungen, Mindestalter, Datenschutz, TikTok-Regeln für Aktionen beachten.", quelle: "UWG, DSGVO" },
      { titel: "TikTok-Regeln", text: "Keine riskanten Abnehm-Methoden, keine Körpervergleiche, die abwerten, keine regulierten Waren. Abnehm-Werbung nur ab 18 und als gesunder Lebensstil.", quelle: "TikTok Community Guidelines und Werberichtlinie Gewichtsmanagement" }
    ],
    verkauf: [
      { stufe: "1", name: "Affiliate und TikTok Shop", text: "Einfachster Weg. Nur EU-konforme Kosmetik seriöser Marken. Werbung kennzeichnen, Provision offenlegen.", ampel: "gruen" },
      { stufe: "2", name: "Fremde Kosmetik im eigenen Shop", text: "Händlerpflichten: Kennzeichnung prüfen, richtig lagern. Dazu Widerrufsbelehrung, AGB, Preise inklusive MwSt., Verpackungsregister LUCID, Datenschutz.", ampel: "gelb" },
      { stufe: "3", name: "Eigene Kosmetikmarke (White Label)", text: "Verantwortliche Person in der EU, Sicherheitsbewertung durch Sicherheitsbewerter, Produktinformationsdatei, CPNP-Meldung vor dem Verkauf, Herstellung nach GMP, belegbare Claims.", ampel: "gelb" },
      { stufe: "4", name: "Eigene Nahrungsergänzung", text: "Anzeige beim BVL vor dem ersten Verkauf, Pflichtangaben auf dem Etikett, nur zugelassene Health Claims.", ampel: "gelb" },
      { stufe: "X", name: "Arzneimittel, Wirkstoffe zum Spritzen", text: "Für Privatpersonen und Creator nicht möglich, auch nicht als 'Forschungsprodukt'. Tabu.", ampel: "rot" }
    ],
    check: [
      "Sage ich, dass etwas heilt, behandelt oder gegen eine Krankheit hilft? Dann umformulieren.",
      "Nenne ich Kilos oder Zeiträume beim Abnehmen zusammen mit einem Produkt? Dann raus.",
      "Ist ein Medikament, eine Spritze, ein Fläschchen oder ein Codewort zu sehen oder zu hören? Dann raus.",
      "Bekomme ich Geld, Provision oder das Produkt geschenkt? Dann 'Werbung' sichtbar am Anfang plus Schalter.",
      "Ist das Vorher-Nachher echt: gleiches Licht, kein Filter, Zeitraum genannt?",
      "Sind fremde Personen, fremde Musik oder Filmszenen drin? Dann Erlaubnis oder raus.",
      "Gebe ich jemandem einen persönlichen Behandlungs- oder Dosierungstipp? Dann auf eigene Erfahrung plus Ärztin umformulieren.",
      "Würde ich das Video ohne Bauchweh einer Hautärztin zeigen?"
    ],
    disclaimer: "Ich teile meine persönlichen Erfahrungen. Das ist keine medizinische Beratung. Bei Beschwerden geh bitte zu deiner Ärztin oder deinem Arzt.",
    quellen: [
      { name: "Leitfaden Werbekennzeichnung der Medienanstalten", url: "https://www.lfk.de/socialmedia" },
      { name: "Heilmittelwerbegesetz (HWG)", url: "https://www.gesetze-im-internet.de/heilmwerbg/" },
      { name: "§ 5 Digitale-Dienste-Gesetz (Impressum)", url: "https://www.gesetze-im-internet.de/ddg/__5.html" },
      { name: "§ 5a UWG (kommerzieller Zweck)", url: "https://www.gesetze-im-internet.de/uwg_2004/__5a.html" },
      { name: "EU: Nährwert- und Gesundheitsangaben", url: "https://food.ec.europa.eu/food-safety/labelling-and-nutrition/nutrition-and-health-claims_en" },
      { name: "EU: Kosmetik und CPNP", url: "https://single-market-economy.ec.europa.eu/sectors/cosmetics_en" },
      { name: "TikTok Community Guidelines", url: "https://www.tiktok.com/community-guidelines/de" },
      { name: "TikTok Werberichtlinie Gewichtsmanagement", url: "https://ads.tiktok.com/help/article/tiktok-ads-policy-weight-management" },
      { name: "Verpackungsregister LUCID", url: "https://lucid.verpackungsregister.org" }
    ]
  },

  /* aufwand: 1 = leicht, 2 = mittel, 3 = aufwendig */
  ideen: [
    { id: 1, s: "real", f: "talking", a: 1, titel: "Wer bin ich (Pin 1)", hook: "Ich bin Nadja, und hier zeige ich dir ehrlich, was bei Haut, Kraft und Energie ab 35 wirklich funktioniert.", ablauf: ["Name, Alter oder 'über 35', was du machst", "Warum dieser Kanal: ehrlich testen statt Wunder versprechen", "Was jede Woche kommt"], cta: "Folg mir, wenn du das ohne Filter sehen willst.",
      skript: {
        woche: 1,
        hook: "Ich bin Nadja, und hier zeige ich dir ehrlich, was bei Haut, Kraft und Energie ab 35 wirklich funktioniert.",
        hookText: "Ich bin Nadja. Hautpflege ab 35, ehrlich getestet",
        text: [
          "Ich bin über 35, hab wenig Zeit und bin keine Ärztin. Ich bin die Freundin, die es ausprobiert und dir ehrlich sagt, wie es läuft.",
          "Mein Motto: Pro-Aging statt Anti-Aging. Ich will nicht aussehen wie 25. Ich will mich mit jedem Jahr stärker fühlen.",
          "Jede Woche gibt's hier Hautpflege, Training und Wissen. Ohne Wundermittel. Und sonntags um 19 Uhr bin ich LIVE."
        ],
        aufruf: "Folg mir, wenn du das ohne Filter sehen willst.",
        einblendungen: [
          "0 bis 3 Sek. oben: 'Ich bin Nadja. Hautpflege ab 35, ehrlich getestet'",
          "Bei 'Pro-Aging': 'Pro-Aging statt Anti-Aging'",
          "Bei 'Jede Woche': 'Glow · Strong · Wissen · So 19 Uhr LIVE'",
          "Letzte 3 Sek.: 'Folgen für mehr ohne Filter'"
        ],
        beschreibung: "Neu hier? Ich bin Nadja und teste Hautpflege ab 35, Krafttraining und Routinen im echten Alltag. Ehrlich, ohne Filter, ohne Wundermittel. Meine Erfahrung, keine medizinische Beratung.",
        hashtags: ["#proaging", "#frauenab40", "#longevity", "#nadjatestet"],
        dreh: "Pin-Video 1, nach dem Posten anpinnen. Handy auf Augenhöhe, Gesicht zum Fenster, Beauty-Filter aus. Beim ersten Satz leicht auf die Kamera zu lehnen.",
        check: ["Keine Produkte, keine Wirkstoffe, keine Werbung", "'Keine Ärztin' macht klar: Erfahrung, keine Beratung", "Kein Wort zum alten Kanal-Thema"]
      } },
    { id: 2, s: "real", f: "talking", a: 1, titel: "Was dich hier erwartet (Pin 3)", hook: "Wenn du neu hier bist: Das bekommst du jede Woche auf diesem Kanal.", ablauf: ["Montag Glow, Dienstag Strong, Mittwoch Wissen", "Sonntag LIVE um 19 Uhr", "Deine Fragen werden zu Videos"], cta: "Schreib mir deine erste Frage in die Kommentare.",
      skript: {
        woche: 1,
        hook: "Wenn du neu hier bist: Das bekommst du jede Woche auf diesem Kanal.",
        hookText: "Neu hier? Das bekommst du jede Woche",
        text: [
          "Montag ist Glow: Hautpflege ab 35 und ehrliche Tests.",
          "Dienstag ist Strong: Krafttraining, Tennis und Essen, das satt macht.",
          "Mittwoch gibt's Wissen zum Speichern: Schlaf, Wechseljahre, Longevity. Immer mit Quelle.",
          "Donnerstag beantworte ich eure Fragen, Freitag wird's persönlich.",
          "Und sonntags um 19 Uhr bin ich LIVE. Da kannst du mich alles zu Pflege und Routinen fragen."
        ],
        aufruf: "Schreib mir deine erste Frage in die Kommentare. Vielleicht wird sie mein nächstes Video.",
        einblendungen: [
          "0 bis 3 Sek. oben: 'Neu hier? Das bekommst du jede Woche'",
          "Nacheinander zu jedem Satz: 'Mo · Glow', 'Di · Strong', 'Mi · Wissen', 'Do · Eure Fragen', 'Fr · Persönlich', 'So · 19 Uhr LIVE'",
          "Letzte 3 Sek.: 'Deine erste Frage? Ab in die Kommentare'"
        ],
        beschreibung: "Dein Wochenplan hier: Glow, Strong, Wissen, eure Fragen und sonntags um 19 Uhr LIVE. Welche Frage soll ich zuerst beantworten?",
        hashtags: ["#hautpflege", "#krafttrainingfrauen", "#longevity", "#frauenab40", "#nadjatestet"],
        dreh: "Pin-Video 3, nach dem Posten anpinnen. Die Wochentage als Text-Sticker nacheinander einblenden: Text antippen, Dauer auf den passenden Satz ziehen.",
        check: ["Wechseljahre nur 'mit Quelle' angekündigt, keine Diagnose", "LIVE-Fragen auf Pflege und Routinen begrenzt, keine Behandlung", "Keine Produkte, keine Werbung"]
      } },
    { id: 3, s: "mindset", f: "talking", a: 1, titel: "Meine 3 Regeln (Pin 2)", hook: "Meine 3 Regeln für diesen Kanal: kein Filter, keine Wundermittel, keine Lügen.", ablauf: ["Kein Filter: du siehst meine echte Haut", "Keine Wundermittel: Pflege braucht Zeit", "Keine Lügen: wenn etwas nicht wirkt, sag ich es"], cta: "Welche Regel ist dir am wichtigsten?",
      skript: {
        woche: 1,
        hook: "Meine 3 Regeln für diesen Kanal: kein Filter, keine Wundermittel, keine Lügen.",
        hookText: "Meine 3 Regeln: kein Filter, keine Wundermittel, keine Lügen",
        text: [
          "Regel 1: kein Filter. Du siehst meine echte Haut bei Tageslicht. Vorher-Nachher gibt's nur am gleichen Ort, im gleichen Licht und mit Datum.",
          "Regel 2: keine Wundermittel. Gute Pflege braucht Wochen, nicht Tage. Wenn dir jemand Ergebnisse in 7 Tagen verspricht, sei skeptisch.",
          "Regel 3: keine Lügen. Wirkt etwas bei mir nicht, sag ich es. Und bekomme ich Geld dafür, steht vorne 'Werbung' dran."
        ],
        aufruf: "Welche Regel ist dir am wichtigsten? Schreib 1, 2 oder 3 in die Kommentare.",
        einblendungen: [
          "0 bis 3 Sek. oben: 'Meine 3 Regeln: kein Filter, keine Wundermittel, keine Lügen'",
          "Bei Regel 1: '1 · Kein Filter'",
          "Bei Regel 2: '2 · Keine Wundermittel'",
          "Bei Regel 3: '3 · Keine Lügen'",
          "Letzte 3 Sek.: '1, 2 oder 3? Ab in die Kommentare'"
        ],
        beschreibung: "Meine 3 Regeln für diesen Kanal. Daran kannst du mich messen. Hautpflege und Routinen ab 35, ehrlich getestet.",
        hashtags: ["#hautpflege", "#proaging", "#selbstliebe", "#nadjatestet"],
        dreh: "Pin-Video 2, nach dem Posten anpinnen. Bei jeder Regel die Zahl mit den Fingern zeigen. Beauty-Filter und Weichzeichner in der Kamera aus, sonst bricht das Video Regel 1.",
        check: ["Vorher-Nachher-Regel wie im Recht-Check: gleicher Ort, gleiches Licht, kein Filter, Zeitraum", "Werbung vorne kennzeichnen, wie § 22 MStV und § 5a UWG es verlangen", "Keine Produkte, keine Heilversprechen"]
      } },
    { id: 4, s: "glow", f: "talking", a: 1, titel: "Peptide in Hautpflege, ehrlich erklärt", hook: "Peptide sind gerade überall auf TikTok. Hier ist, was sie in einer Creme wirklich machen, und was nicht.", ablauf: ["Peptide in Kosmetik: Inhaltsstoffe wie Copper Tripeptide-1 im Serum", "Realistisch: Pflege und Hautgefühl, Geduld von Wochen", "Klare Grenze: nichts zum Spritzen, nichts aus dubiosen Shops"], cta: "Speicher dir das für deinen nächsten Drogerie-Einkauf.", recht: "Nur kosmetische Aussagen, keine Heilversprechen.",
      skript: {
        woche: 1,
        hook: "Peptide sind gerade überall auf TikTok. Hier ist, was sie in einer Creme wirklich machen, und was nicht.",
        hookText: "Peptide in Hautpflege: was sie können und was nicht",
        text: [
          "Peptide sind kleine Eiweißbausteine. In Kosmetik sind sie ein Pflege-Inhaltsstoff, wie Hyaluron.",
          "Ob ein Peptid drin ist, steht hinten auf der Packung. Such nach dem Wort 'peptide'.",
          "Realistisch: Pflege und ein glatteres Hautgefühl. Nach Wochen, nicht über Nacht. Und keine Creme ersetzt Sonnenschutz.",
          "Ganz klar: Ich rede nur von fertiger Pflege zum Auftragen. Alles andere gehört in ärztliche Hände.",
          "Ab Montag teste ich 8 Wochen ein Kupferpeptid-Serum, ohne Filter."
        ],
        aufruf: "Speicher dir das für deinen nächsten Drogerie-Einkauf.",
        einblendungen: [
          "0 bis 3 Sek. oben: 'Peptide in Hautpflege: was sie können und was nicht'",
          "Bei 'Eiweißbausteine': 'Peptid = kleiner Eiweißbaustein, Pflege-Inhaltsstoff'",
          "Packung umdrehen, Inhaltsliste nah: 'Such nach ...peptide, z. B. Copper Tripeptide-1'",
          "Bei 'Realistisch': 'Pflege und Hautgefühl: ja. Wunder über Nacht: nein'",
          "Bei 'Ganz klar': 'Nur fertige Pflege zum Auftragen'",
          "Letzte 3 Sek.: 'Ab Montag: 8-Wochen-Test ohne Filter'"
        ],
        beschreibung: "Peptide in Hautpflege, ehrlich erklärt: ein Pflege-Inhaltsstoff, kein Wundermittel. Ab Montag teste ich 8 Wochen lang ein Kupferpeptid-Serum, jede Woche gleiches Licht, kein Filter. Meine Erfahrung, keine medizinische Beratung.",
        hashtags: ["#hautpflege", "#kupferpeptide", "#peptidserum", "#skincareover40", "#nadjatestet"],
        dreh: "Eine selbst gekaufte Pflege mit Peptid in Originalverpackung zeigen, Rückseite mit Inhaltsliste nah an die Kamera. Logo nicht groß ins Bild. Keine kleinen Glasfläschchen ohne Etikett zeigen.",
        check: [
          "Nur kosmetische Aussagen: 'Pflege' und 'glatteres Hautgefühl', Wortlaut aus Recht › Sag das",
          "Kein 'baut Kollagen auf', kein 'wie Botox', kein Heilversprechen",
          "Kein Medikament, nichts zum Spritzen, kein Codewort. Abgrenzung nur über 'fertige Pflege zum Auftragen'",
          "Nur der INCI-Name Copper Tripeptide-1, keine Szene-Kürzel",
          "Keine Marke genannt, also keine Werbung. Bei Kooperation: 'Werbung' vorne plus Schalter"
        ]
      } },
    { id: 5, s: "glow", f: "karussell", a: 2, titel: "INCI lesen in 30 Sekunden", hook: "Dreh deine Creme um. Diese 3 Dinge entscheiden, ob du zu viel bezahlst.", ablauf: ["Reihenfolge: was vorne steht, ist am meisten drin", "Steht der Wirkstoff ganz hinten, ist wenig davon drin", "Parfum bei empfindlicher Haut eher meiden"], cta: "Speichern und beim nächsten Einkauf rausholen." },
    { id: 6, s: "glow", f: "serie", a: 1, titel: "Kupferpeptid-Serum Test, Woche X von 8", hook: "Woche 1 von 8: Ich teste ein Kupferpeptid-Serum. Ohne Filter, gleiches Licht, jede Woche.", ablauf: ["Gleicher Ort, gleiche Uhrzeit, Fensterlicht", "Was ich benutze und wie oft", "Ehrliches Hautgefühl, keine Versprechen"], cta: "Folg mir für Woche 2.", recht: "Vorher-Nachher ohne Filter, 'individuelles Ergebnis'. Marke nur mit Kennzeichnung, wenn Werbung." },
    { id: 7, s: "glow", f: "grwm", a: 1, titel: "Morgenroutine unter 5 Minuten", hook: "Meine komplette Morgenroutine dauert 4 Minuten. Und Sonnencreme ist nicht verhandelbar.", ablauf: ["Reinigen nur mit Wasser oder mild", "Serum und Feuchtigkeit", "Sonnenschutz, jeden Tag"], cta: "Wie lang ist deine Routine? Schreib die Minuten." },
    { id: 8, s: "glow", f: "talking", a: 1, titel: "Haut nach dem Abnehmen", hook: "Das hat mir niemand gesagt: Wenn du abnimmst, braucht deine Haut einen eigenen Plan.", ablauf: ["Langsam abnehmen, Krafttraining, genug Eiweiß", "Meine Pflege: Feuchtigkeit, Peptid-Pflege, Massage", "Was keine Creme kann, ehrlich gesagt"], cta: "Willst du meine Abendroutine dazu sehen?", recht: "Keine Kilo-Angaben neben Produkten, keine Medikamente nennen." },
    { id: 9, s: "glow", f: "reply", a: 1, titel: "Bringen Kollagen-Drinks was?", hook: "Bringt Kollagen zum Trinken was für die Haut? Ich hab nachgelesen.", ablauf: ["Für Kollagen allein gibt es keinen zugelassenen EU-Claim", "Vitamin C trägt zu einer normalen Kollagenbildung bei", "Meine Entscheidung und warum"], cta: "Nimmst du Kollagen? Ja oder nein in die Kommentare.", recht: "Nur zugelassene Health Claims wortgetreu." },
    { id: 10, s: "glow", f: "greenscreen", a: 1, titel: "Trend-Check des Monats", hook: "Dieser Hautpflege-Trend hat gerade Millionen Views. Ich sag dir, ob ich ihn mit über 35 mache.", ablauf: ["Trend-Video oder Artikel im Hintergrund", "Was dran ist, was nicht", "Mein Urteil: mach ich, mach ich nicht"], cta: "Welchen Trend soll ich als nächstes checken?" },
    { id: 11, s: "glow", f: "talking", a: 1, titel: "Sonnencreme im Herbst", hook: "Sonnencreme im Oktober? Ja. Und das ist der Grund, warum ich nie mehr ohne rausgehe.", ablauf: ["UV-Strahlung gibt es das ganze Jahr", "Sie ist ein Hauptgrund für Hautalterung", "Mein Trick, damit es nicht klebt"], cta: "Speichern für den nächsten grauen Tag." },
    { id: 12, s: "glow", f: "karussell", a: 2, titel: "5 Pflege-Fehler mit 25", hook: "5 Pflege-Fehler, die ich mit 25 gemacht habe. Nummer 3 sehe ich heute noch.", ablauf: ["Ohne Sonnenschutz in die Sonne", "Zu viel peelen", "Mit Make-up schlafen, weitere 2 Fehler"], cta: "Welchen Fehler hast du auch gemacht?" },
    { id: 13, s: "glow", f: "voiceover", a: 1, titel: "Abendroutine Pillow Talk", hook: "Abendroutine und ehrliche Gedanken. Heute: Warum ich aufgehört habe, Falten zu hassen.", ablauf: ["Pflegeschritte als Clips", "Stimme erzählt die Geschichte", "Gesicht am Ende, ungeschminkt"], cta: "Erzähl mir: Was magst du an deinem Gesicht?" },
    { id: 14, s: "glow", f: "talking", a: 2, titel: "Lohnt sich das? Teuer gegen günstig", hook: "80 Euro gegen 12 Euro. Ich vergleiche die Inhaltsstoffe, nicht das Marketing.", ablauf: ["Beide Verpackungen zeigen", "INCI nebeneinander, was ist gleich", "Fazit ohne Markenbashing"], cta: "Welche zwei Produkte soll ich als nächstes vergleichen?", recht: "Sachlich vergleichen, keine Herabsetzung von Marken." },
    { id: 15, s: "glow", f: "voiceover", a: 2, titel: "Drogerie-Runde nur nach Peptiden", hook: "Ich habe in der Drogerie nur nach Peptiden gesucht. Das hier hab ich gefunden.", ablauf: ["Regal-Clips", "Auf die Rückseite zoomen: wo steht das Peptid", "Was ich mitnehme und warum"], cta: "Speichern als Einkaufsliste.", recht: "Bei Kooperation 'Werbung'. Ohne Kooperation trotzdem keine Heilversprechen." },
    { id: 16, s: "glow", f: "talking", a: 1, titel: "Hals und Dekolleté vergessen?", hook: "Dein Gesicht pflegst du. Aber was ist mit Hals und Dekolleté?", ablauf: ["Warum die Haut dort schneller verrät", "Pflege einfach mitnehmen, nach oben streichen", "Sonnenschutz bis zum Ausschnitt"], cta: "Ehrlich: Pflegst du deinen Hals?" },
    { id: 17, s: "strong", f: "voiceover", a: 1, titel: "Tennis ist mein Anti-Aging", hook: "Tennis ist mein Anti-Aging. Hier ist warum.", ablauf: ["Clips vom Platz", "Kraft, Koordination, Freundinnen", "Was es mit meinem Kopf macht"], cta: "Welcher Sport ist dein Anti-Aging?" },
    { id: 18, s: "strong", f: "talking", a: 1, titel: "Beste Anti-Aging-Routine ist nicht im Bad", hook: "Unpopular Opinion: Die beste Anti-Aging-Routine findet nicht im Badezimmer statt.", ablauf: ["Muskeln schützen im Alter", "3 Mal Kraft pro Woche reicht", "So fange ich an, wenn ich keine Lust habe"], cta: "Stimmst du zu? Ja oder nein." },
    { id: 19, s: "strong", f: "karussell", a: 2, titel: "Eiweiß ganz einfach", hook: "So komme ich auf genug Eiweiß, ohne Shakes zu hassen.", ablauf: ["Frühstück: Skyr oder Eier", "Mittag und Abend: Hülsenfrüchte, Fisch, Fleisch", "Snack-Ideen"], cta: "Speichern für den Einkauf.", recht: "Keine extremen Diäten, keine Kalorienvorgaben für andere." },
    { id: 20, s: "strong", f: "serie", a: 1, titel: "Tag X von 90", hook: "Tag 1 von 90. Ich zeig dir jeden Tag eine kleine Sache, die ich durchziehe.", ablauf: ["Tagesnummer groß einblenden", "Eine Sache: Training, Schritte, Schlaf, Pflege", "Morgen kommt: ..."], cta: "Mach mit und schreib 'Tag 1' in die Kommentare.",
      skript: {
        woche: 1,
        hook: "Tag 1 von 90. Ab heute ziehe ich jeden Tag eine kleine Sache durch, und du kannst mitmachen.",
        hookText: "Tag 1 von 90",
        text: [
          "Keine Diät, keine Waage. Ich zähle Tage, nicht Kilos.",
          "Meine 4 Mini-Regeln: Jeden Tag 20 Minuten Bewegung, ein Spaziergang zählt. Jeden Morgen Sonnenschutz. Zu jeder Mahlzeit Eiweiß. Und ab 22 Uhr ist das Handy weg.",
          "Warum 90 Tage? Weil Motivation 3 Tage hält. Eine Gewohnheit braucht länger.",
          "Heute heißt das: 20 Minuten raus, egal bei welchem Wetter."
        ],
        aufruf: "Mach mit und schreib 'Tag 1' in die Kommentare. Ich zeig dir, wie es weitergeht.",
        einblendungen: [
          "0 bis 3 Sek. groß in der Mitte: 'TAG 1 / 90', darunter klein: 'Eine kleine Sache. Jeden Tag.'",
          "Bei 'Mini-Regeln' als Liste: '20 Min. Bewegung · Sonnenschutz · Eiweiß · Handy weg ab 22 Uhr'",
          "Bei 'Warum 90 Tage': 'Motivation hält 3 Tage. Gewohnheit länger.'",
          "Letzte 3 Sek.: 'Mach mit: Schreib Tag 1'"
        ],
        beschreibung: "Tag 1 von 90: jeden Tag eine kleine Sache. Keine Diät, keine Waage. Wer macht mit? Stay focused, stay consistent.",
        hashtags: ["#90tagekonsequent", "#disziplin", "#stayconsistent", "#frauenab40"],
        dreh: "Hook und Regeln direkt in die Kamera, danach 2 bis 3 kurze Clips vom Spaziergang drunter (B-Roll-Album). Die Tagesnummer bei jeder Folge an dieselbe Stelle, gleiche Schrift. Weitere Folgen optional samstags, 10 Sekunden reichen.",
        check: ["Keine Kilo-Zahlen, keine Waage, kein Produkt", "Eiweiß und Bewegung als eigene Regeln, keine Kalorien- oder Diätvorgaben für andere", "Keine riskante Abnehm-Methode, passt zu den TikTok-Regeln"]
      } },
    { id: 21, s: "strong", f: "voiceover", a: 1, titel: "Was ich an einem Trainingstag esse", hook: "Was ich an einem Trainingstag esse, ehrlich und ohne Waage.", ablauf: ["Jede Mahlzeit als Clip", "Warum so viel Eiweiß", "Ein Genuss-Moment, ohne schlechtes Gewissen"], cta: "Willst du die Rezepte?", recht: "Keine Kalorienzahlen als Vorgabe, keine Produkte mit Kilo-Versprechen." },
    { id: 22, s: "strong", f: "talking", a: 1, titel: "Abnehmen ohne Crash", hook: "Ich hab aufgehört, schnell abnehmen zu wollen. Das ist seitdem passiert.", ablauf: ["Gewohnheiten statt Kilos", "Schritte, Kraft, Schlaf", "Was mir beim Dranbleiben hilft"], cta: "Was ist deine schwerste Gewohnheit?", recht: "Keine Medikamente nennen oder zeigen, keine Kilo-Zahlen mit Produkt." },
    { id: 23, s: "strong", f: "grwm", a: 1, titel: "Was in meiner Sporttasche ist", hook: "Was immer in meiner Sporttasche ist. Nummer 4 unterschätzt jeder.", ablauf: ["Teil für Teil auspacken", "Sonnenschutz und Pflege nach dem Sport", "Snack und Wasserflasche"], cta: "Was darf in deiner Tasche nie fehlen?" },
    { id: 24, s: "strong", f: "voiceover", a: 1, titel: "10 Minuten Kraft zuhause", hook: "Keine Zeit fürs Gym? Diese 10 Minuten mache ich zuhause.", ablauf: ["4 Übungen, je 40 Sekunden", "Clip pro Übung mit Name eingeblendet", "3 Runden"], cta: "Speichern und heute Abend machen." },
    { id: 25, s: "strong", f: "reply", a: 1, titel: "Werde ich zu muskulös?", hook: "Nein, du wirst vom Krafttraining nicht 'zu muskulös'. Hier ist, was wirklich passiert.", ablauf: ["Frauen bauen langsam Muskeln auf", "Was sich verändert: Haltung, Form, Energie", "Quelle: Sportwissenschaft, zum Beispiel Dr. Stacy Sims"], cta: "Welchen Mythos soll ich als nächstes klären?" },
    { id: 26, s: "longevity", f: "karussell", a: 2, titel: "Longevity für 0 Euro", hook: "Longevity muss nicht teuer sein. 5 Gewohnheiten, die 0 Euro kosten.", ablauf: ["Schlaf", "Krafttraining", "Spazieren, Licht am Morgen, Freundschaften"], cta: "Welche machst du schon? Zahl in die Kommentare." },
    { id: 27, s: "longevity", f: "talking", a: 1, titel: "Schlaf als Beauty-Booster", hook: "Mein bestes Beauty-Produkt kostet nichts und ich mache es 7 Stunden am Stück.", ablauf: ["Was Schlafmangel mit der Haut macht", "Meine Abendregeln", "Handy raus aus dem Schlafzimmer"], cta: "Wie viele Stunden schläfst du?" },
    { id: 28, s: "longevity", f: "greenscreen", a: 1, titel: "Was die Studie wirklich sagt", hook: "TikTok sagt das eine. Die Studie sagt etwas anderes. Ich zeig's dir.", ablauf: ["Behauptung aus einem Trend-Video", "Was die Quelle wirklich sagt", "Link zur Quelle in der Beschreibung"], cta: "Welche Behauptung soll ich prüfen?", recht: "Quelle immer nennen, nicht übertreiben." },
    { id: 29, s: "longevity", f: "voiceover", a: 1, titel: "3 Dinge vor 8 Uhr", hook: "3 Dinge, die ich jeden Morgen vor 8 Uhr mache. Keins davon kostet Geld.", ablauf: ["Wasser und Tageslicht", "10 Minuten Bewegung", "Kein Handy in der ersten halben Stunde"], cta: "Mach morgen mit und erzähl mir, wie es war." },
    { id: 30, s: "longevity", f: "talking", a: 1, titel: "Erst Werte checken, dann Supplements", hook: "Bevor du irgendein Supplement kaufst: Mach das hier zuerst.", ablauf: ["Check-up bei Hausärztin oder Frauenärztin", "Werte besprechen, Mängel klären", "Dann gezielt entscheiden statt raten"], cta: "Wann warst du zuletzt beim Check-up?" },
    { id: 31, s: "longevity", f: "karussell", a: 2, titel: "Perimenopause: 5 Zeichen", hook: "Die Wechseljahre können sich schon in den 40ern ankündigen. Diese 5 Zeichen erklärt dir keiner.", ablauf: ["Schlaf, Zyklus, Stimmung, Haut, Gewicht", "Je Zeichen ein Satz", "Letzte Folie: Buchtipp einer Gynäkologin und 'lass dich beraten'"], cta: "Speichern und deiner Freundin schicken.", recht: "Keine Diagnose, Quelle nennen, an Ärztin verweisen." },
    { id: 32, s: "longevity", f: "voiceover", a: 1, titel: "10 Minuten nach dem Essen", hook: "10 Minuten nach dem Essen. Die Gewohnheit, die ich am längsten durchhalte.", ablauf: ["Spaziergang-Clips", "Warum es mir guttut", "Wie ich es in den Alltag packe"], cta: "Machst du mit? Schreib 'dabei'." },
    { id: 33, s: "longevity", f: "talking", a: 1, titel: "Stress zeigt sich zuerst auf der Haut", hook: "Stressige Woche? Deine Haut zeigt es zuerst. Das mache ich dann.", ablauf: ["Woran ich es merke", "Pflege runterfahren statt mehr", "Mein Stress-Ausgleich"], cta: "Woran merkst du Stress zuerst?" },
    { id: 34, s: "mindset", f: "talking", a: 1, titel: "Stay focused, stay consistent", hook: "Der Satz in meiner Bio ist kein Spruch. Hier ist die Geschichte dahinter.", ablauf: ["Der Moment, in dem sich etwas ändern musste", "Was Dranbleiben für mich heißt", "Was ich heute anders mache"], cta: "Was ist dein Satz?" },
    { id: 35, s: "mindset", f: "voiceover", a: 1, titel: "Ein Tag, an dem nichts lief", hook: "Heute lief nichts nach Plan. Ich zeig's dir trotzdem.", ablauf: ["Ehrliche Clips vom Tag", "Was ich trotzdem gemacht habe, auch wenn es klein war", "Morgen ist ein neuer Tag"], cta: "Erzähl mir von deinem Tag." },
    { id: 36, s: "mindset", f: "karussell", a: 2, titel: "Disziplin statt Motivation", hook: "Motivation hält 3 Tage. Das hier hält 3 Jahre.", ablauf: ["Kleine Schritte", "Feste Uhrzeiten", "Nie zweimal hintereinander ausfallen lassen"], cta: "Speichern für den nächsten Montag." },
    { id: 37, s: "mindset", f: "voiceover", a: 1, titel: "Brief an mein 25-jähriges Ich", hook: "Wenn ich meinem 25-jährigen Ich eine Sache sagen könnte...", ablauf: ["Alte Fotos, wenn vorhanden", "Drei Sätze an dich selbst", "Heute: was ich stolz macht"], cta: "Was würdest du deinem jüngeren Ich sagen?" },
    { id: 38, s: "mindset", f: "reply", a: 1, titel: "Zu alt für TikTok?", hook: "Jemand hat geschrieben, ich sei zu alt für TikTok. Hier ist meine Antwort.", ablauf: ["Kommentar einblenden", "Ruhig und mit Humor antworten", "Warum Frauen ab 35 hier hingehören"], cta: "Teil das mit einer Frau, die das hören muss." },
    { id: 39, s: "real", f: "live", a: 2, titel: "LIVE: Sonntags-Glow-Talk", hook: "Glow-Talk: Deine Fragen zu Hautpflege ab 35", ablauf: ["Thema der Woche 10 Minuten", "Fragen 20 Minuten", "Wochen-Challenge"], cta: "Am Montag die beste Antwort als Clip posten.", recht: "Am Anfang den Hinweis sagen, keine Dosierungen, keine Diagnosen.",
      skript: {
        woche: 1,
        live: true,
        dauer: "30 bis 45 Min.",
        hookText: "Glow-Talk: Deine Fragen zu Hautpflege ab 35",
        thema: "So liest du eine Pflege-Verpackung",
        ankuendigung: "Heute um 19 Uhr mein erstes LIVE: So liest du eine Pflege-Verpackung. Leg dir eine Creme bereit und bring deine Fragen mit.",
        hashtags: ["#hautpflege", "#skincareover40", "#proaging", "#nadjatestet"],
        teile: [
          { zeit: "18:45 Uhr", titel: "Vorbereitung", punkte: [
            "Handy aufs Stativ, Gesicht zum Fenster oder Lampe von vorn, Mikro an, Akku voll",
            "LIVE-Einstellungen: Schlüsselwort-Filter an, Wirkstoff- und Medikamentennamen eintragen",
            "Freundin als Moderatorin eintragen, sie hat den Chat im Blick",
            "2 selbst gekaufte Pflegeprodukte in Originalverpackung bereitlegen, Rückseite gut lesbar",
            "Notiz für die Fragen offen, Wasser daneben"
          ] },
          { zeit: "0 bis 5 Min.", titel: "Begrüßung", sagen: [
            "Hallo und herzlich willkommen zu meinem ersten Sonntags-Glow-Talk! Schön, dass du da bist. Schreib mir gern in den Chat, von wo du zuschaust.",
            "Bevor wir loslegen, ein Satz, den du ab jetzt in jedem LIVE von mir hörst: Ich teile meine persönlichen Erfahrungen. Das ist keine medizinische Beratung. Bei Beschwerden geh bitte zu deiner Ärztin oder deinem Arzt.",
            "Heute zeige ich dir, wie du eine Pflege-Verpackung liest. Danach hast du 20 Minuten für deine Fragen. Schreib sie gern jetzt schon in den Chat, ich sammle mit."
          ], punkte: [
            "Ruhig starten, in den ersten 2 Minuten kommen noch Leute dazu",
            "Neue Namen begrüßen: 'Hallo [Name], schön, dass du da bist'"
          ] },
          { zeit: "5 bis 15 Min.", titel: "Thema: So liest du eine Pflege-Verpackung", sagen: [
            "Nimm dir mal eine Creme, die du zu Hause hast, und dreh sie um. Wir machen das jetzt zusammen."
          ], punkte: [
            "Die Inhaltsliste heißt INCI. Was vorne steht, ist am meisten drin, meistens Aqua, also Wasser",
            "Steht der Wirkstoff aus der Werbung ganz hinten, ist nur wenig davon drin",
            "Peptide erkennst du am Wort 'peptide' im Namen, zum Beispiel Copper Tripeptide-1",
            "Parfum oder Fragrance: bei empfindlicher Haut eher meiden",
            "'Dermatologisch getestet' heißt: auf Verträglichkeit getestet. Nicht: wirkt besser",
            "Alles an deinen 2 Produkten live zeigen, Logo nicht groß ins Bild"
          ] },
          { zeit: "15 bis 35 Min.", titel: "Deine Fragen", punkte: [
            "Frage laut vorlesen, dann antworten. Jede Frage in die Notiz, das sind die nächsten Videos",
            "Immer aus eigener Erfahrung antworten: 'Ich mache das so'",
            "Kommentare mit Wirkstoff- oder Medikamentennamen nicht vorlesen, die Moderatorin löscht sie"
          ], saetze: [
            { wenn: "Medikamente, Dosierungen, 'Was soll ich nehmen?'", sag: "Das klärst du bitte mit deiner Ärztin." },
            { wenn: "Akne, Rosacea, Hautprobleme", sag: "Bei Hautproblemen geh bitte zur Hautärztin. Ich zeige dir nur meine Pflege." },
            { wenn: "Fragen zu alten Videos oder alten Produkten", sag: "Darüber spreche ich hier nicht mehr. Hier geht es um Pflege und Alltag ab 35." },
            { wenn: "der Chat still ist", sag: "Dann frag ich dich: Welchen Pflegeschritt lässt du nie aus? Und Sonnencreme im Herbst, ja oder nein?" }
          ] },
          { zeit: "35 bis 45 Min.", titel: "Wochen-Challenge und Ausblick", sagen: [
            "Deine Challenge für diese Woche: Dreh heute Abend eine Creme um und schau, was ganz vorne und was ganz hinten steht. Schreib's mir unter mein nächstes Video.",
            "Ab Montag startet meine 8-Wochen-Serie mit einem Kupferpeptid-Serum, jede Woche gleiches Licht, kein Filter. Und nächsten Sonntag um 19 Uhr bin ich wieder hier.",
            "Danke, dass du da warst. Stay focused, stay consistent."
          ] },
          { zeit: "Danach", titel: "Nachbereitung", punkte: [
            "Die 3 besten Antworten am Montag als kurze Clips posten",
            "Fragen aus der Notiz sortieren, jede Frage ist ein Video",
            "Begrüßung, Hinweis und Fragen-Sätze bleiben in jedem LIVE gleich, nur das Thema wechselt"
          ] }
        ],
        check: [
          "Hinweis-Text aus Recht wörtlich in der Begrüßung",
          "Keine Dosierungen, keine Diagnosen: feste Sätze für Medikamenten- und Hautfragen",
          "Schlüsselwort-Filter und Moderatorin gegen Wirkstoff-Kommentare",
          "Nur selbst gekaufte Kosmetik in Originalverpackung, keine Werbung, keine Fläschchen ohne Etikett"
        ]
      } },
    { id: 40, s: "real", f: "voiceover", a: 1, titel: "Ein ganz normaler Dienstag", hook: "Ein ganz normaler Dienstag: Arbeit, Tennis, Hautpflege. So passt das alles rein.", ablauf: ["Morgen, Mittag, Abend als Clips", "Uhrzeit einblenden", "Ehrlich: was heute ausgefallen ist"], cta: "Wie sieht dein Dienstag aus?" },
    { id: 41, s: "real", f: "reply", a: 1, titel: "Die 3 häufigsten Fragen der Woche", hook: "Ihr habt gefragt, ich antworte: die 3 häufigsten Fragen dieser Woche.", ablauf: ["Frage 1 einblenden, kurze Antwort", "Frage 2", "Frage 3"], cta: "Stell deine Frage für nächste Woche." },
    { id: 42, s: "real", f: "grwm", a: 1, titel: "Warum ich neu angefangen habe", hook: "Get ready with me, und ich erzähl dir, warum ich meinen Kanal neu gestartet habe.", ablauf: ["Pflege nebenher", "Mehr Ehrlichkeit, weniger Hype", "Was du hier ab jetzt bekommst"], cta: "Bist du neu hier? Sag Hallo.", recht: "Altes Thema nicht wiederholen, keine Wirkstoffnamen." }
  ],

  /* Blueprint-Videos (HyperFrames, 1080x1920, Stimme Petra via Higgsfield). Quelle: videos/spec.json, Bau: videos/build_videos.py */
  blueprints: [
    {
      "idee": 5,
      "slug": "inci-lesen",
      "titel": "INCI lesen in 30 Sekunden",
      "dauer": 36,
      "datei": "videos/inci-lesen.mp4",
      "poster": "videos/inci-lesen.jpg",
      "sprechertext": "Dreh deine Creme um. Diese 3 Dinge entscheiden, ob du zu viel bezahlst. Erstens: die Reihenfolge. Was ganz vorne auf der Liste steht, ist am meisten drin. Meistens ist das Wasser. Zweitens: Wo steht der Wirkstoff? Steht das Peptid ganz hinten, ist davon nur sehr wenig drin. Drittens: Parfum. Ist deine Haut empfindlich, greif lieber zu Produkten ohne Duft. Speicher dir das für deinen nächsten Drogerie-Einkauf. Und folg mir für ehrliche Pflege ab 35."
    },
    {
      "idee": 18,
      "slug": "anti-aging-kraft",
      "titel": "Beste Anti-Aging-Routine ist nicht im Bad",
      "dauer": 38,
      "datei": "videos/anti-aging-kraft.mp4",
      "poster": "videos/anti-aging-kraft.jpg",
      "sprechertext": "Unpopular Opinion: Die beste Anti-Aging-Routine findet nicht im Badezimmer statt. Sondern beim Krafttraining. Ab 30 baut der Körper nach und nach Muskeln ab, wenn wir nichts dagegen tun. Muskeln geben dir Haltung, Kraft im Alltag und Energie. Und genau das sieht man. Mein Einstieg: 3 Mal pro Woche, je 30 Minuten. Mehr braucht es am Anfang nicht. Und an Tagen ohne Lust mache ich nur 10 Minuten. Hauptsache dranbleiben. Stimmst du zu? Schreib ja oder nein."
    },
    {
      "idee": 26,
      "slug": "longevity-0-euro",
      "titel": "Longevity für 0 Euro",
      "dauer": 44,
      "datei": "videos/longevity-0-euro.mp4",
      "poster": "videos/longevity-0-euro.jpg",
      "sprechertext": "Longevity muss nicht teuer sein. Hier sind 5 Gewohnheiten, die 0 Euro kosten. Nummer 1: Schlaf. 7 bis 8 Stunden, möglichst immer zur gleichen Zeit. Nummer 2: Krafttraining. Auch mit dem eigenen Körpergewicht. Nummer 3: Morgens raus ins Tageslicht. 10 Minuten reichen für den Anfang. Nummer 4: Nach dem Essen eine kleine Runde spazieren. Nummer 5: Freundschaften pflegen. Echte Treffen, nicht nur Nachrichten. Welche machst du schon? Schreib mir die Zahl in die Kommentare."
    },
    {
      "idee": 9,
      "slug": "kollagen-drinks",
      "titel": "Bringen Kollagen-Drinks was?",
      "dauer": 34,
      "datei": "videos/kollagen-drinks.mp4",
      "poster": "videos/kollagen-drinks.jpg",
      "sprechertext": "Bringt Kollagen zum Trinken eigentlich was für die Haut? Ich hab nachgelesen. Wichtig zu wissen: Für Kollagen allein gibt es in der EU keine zugelassene Gesundheitsaussage für die Haut. Erlaubt ist zum Beispiel dieser Satz: Vitamin C trägt zu einer normalen Kollagenbildung für eine normale Funktion der Haut bei. Mein Fazit: Ich gebe mein Geld lieber für Sonnenschutz und genug Eiweiß aus. Das ist meine Entscheidung, keine Beratung. Und du? Nimmst du Kollagen? Ja oder nein in die Kommentare."
    },
    {
      "idee": 34,
      "slug": "stay-consistent",
      "titel": "Stay focused, stay consistent",
      "dauer": 24,
      "datei": "videos/stay-consistent.mp4",
      "poster": "videos/stay-consistent.jpg",
      "sprechertext": "Der Satz in meiner Bio ist kein Spruch. Hier ist die Geschichte dahinter. Lange habe ich immer auf den perfekten Montag gewartet. Der kam nie. Also habe ich angefangen, jeden Tag eine kleine Sache durchzuziehen. Egal wie klein. Heute weiß ich: Motivation kommt und geht. Dranbleiben bleibt. Was ist dein Satz? Schreib ihn mir in die Kommentare."
    }
  ],

  /* 4-Wochen-Plan: Wochentag 0 = Montag, idee = id oben */
  plan: [
    [{ t: 0, idee: 1 }, { t: 1, idee: 3 }, { t: 2, idee: 2 }, { t: 3, idee: 4 }, { t: 4, idee: 20 }, { t: 6, idee: 39 }],
    [{ t: 0, idee: 6 }, { t: 1, idee: 18 }, { t: 2, idee: 26 }, { t: 3, idee: 9 }, { t: 4, idee: 7 }, { t: 6, idee: 39 }],
    [{ t: 0, idee: 6 }, { t: 1, idee: 22 }, { t: 2, idee: 5 }, { t: 3, idee: 27 }, { t: 4, idee: 34 }, { t: 6, idee: 39 }],
    [{ t: 0, idee: 6 }, { t: 1, idee: 19 }, { t: 2, idee: 31 }, { t: 3, idee: 8 }, { t: 4, idee: 38 }, { t: 6, idee: 39 }]
  ],
  planStart: "2026-10-19"
};
