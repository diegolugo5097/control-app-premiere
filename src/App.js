import React, { useState, useEffect, useMemo } from "react";
import { io } from "socket.io-client";

const socket = io("https://panel-server-premire.onrender.com", {
  transports: ["websocket"],
});

function cleanPublic(p) {
  return (p || "").replace(/^\/?public\//i, "");
}

function App() {
  const slides = useMemo(
    () => [
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/ALIEN.mp4",
        name: "XENOMORFO",
        debutYear: 1979,
        currentAge: 46,
        story:
          "Organismo biomecánico hostil con ciclo de vida parasitario. Extremadamente adaptable. Sangre corrosiva; contacto directo no recomendado.",
        powers:
          "Estructura ósea/biometálica ultra resistente, fuerza y velocidad superiores a la humana, sigilo en entornos oscuros y cerrados, escalada vertical, cola perforante, sangre ácida capaz de derretir metal.",
        mediaHistory:
          "Forma de vida central de la saga cinematográfica 'Alien' desde 1979. Ha aparecido como antagonista en múltiples secuelas, precuelas y crossovers, siendo catalogado como una de las amenazas biológicas más letales del género sci-fi.",
        medical: {
          status: "HOSTIL ACTIVO",
          heartRate: "NO APLICA",
          radiationLevel: "ORGÁNICA / ÁCIDA",
          threatLevel: "EXTREMO",
          notes:
            "Cráneo blindado. Mandíbulas dobles. Inteligencia táctica. Prioridad máxima de contención.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/TMNT-MIGUEL-ANGEL.mp4",
        name: "MIGUEL ÁNGEL (TMNT)",
        debutYear: 1984,
        currentAge: 41,
        story:
          "Tortuga mutante adolescente entrenada en ninjutsu por el maestro Splinter. Espíritu alegre, impulsivo y extremadamente ágil.",
        powers:
          "Dominio avanzado de nunchakus, reflejos sobrehumanos, velocidad acrobática, resistencia mutante elevada, olfato y visión nocturna mejorada.",
        mediaHistory:
          "Miembro icónico de las 'Teenage Mutant Ninja Turtles', presente en cómics, series animadas, películas de acción real y videojuegos desde 1984. Reconocido por su personalidad relajada y su rol como combatiente veloz del equipo.",
        medical: {
          status: "ACTIVO",
          heartRate: "62 BPM",
          radiationLevel: "MUTAGÉNICA ESTABLE",
          threatLevel: "MEDIO",
          notes:
            "Elevada movilidad y ataques impredecibles. No es hostil por defecto, pero responde con contundencia si se amenaza a su equipo.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/FLASH-GORDON.mp4",
        name: "FLASH GORDON",
        debutYear: 1934,
        currentAge: 92,
        story:
          "Héroe intergaláctico proveniente de la Tierra, conocido por enfrentar amenazas cósmicas con valentía, ingenio y habilidades atléticas excepcionales. Protector recurrente del planeta Mongo.",
        powers:
          "Condición física de atleta de élite, reflejos sobresalientes, combate cuerpo a cuerpo, manejo avanzado de armas futuristas, pilotaje de naves espaciales, liderazgo estratégico y resistencia extrema.",
        mediaHistory:
          "Creado en 1934 como tira cómica de ciencia ficción. Se convirtió en un ícono pulp con seriales cinematográficos en los años 30, series animadas, adaptaciones televisivas y la famosa película de culto de 1980, consolidándose como uno de los pioneros de la aventura espacial.",
        medical: {
          status: "OPERATIVO",
          heartRate: "72 BPM",
          radiationLevel: "ESTABLE",
          threatLevel: "ALTO POTENCIAL HEROICO",
          notes:
            "Humano en condición física máxima. Alta resistencia al combate prolongado. Capacidad táctica sobresaliente en entornos hostiles extraterrestres.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/FRANKY.mp4",
        name: "FRANKENSTEIN",
        debutYear: 1818,
        currentAge: 207,
        story:
          "Entidad reanimada a partir de tejido múltiple. Fuerza bruta superior a la humana. Conducta emocionalmente confusa, no inherentemente maligna.",
        powers:
          "Fuerza física muy por encima de la humana promedio, tolerancia extrema al daño físico, capacidad de seguir operando bajo trauma severo, alta resiliencia al frío y condiciones hostiles.",
        mediaHistory:
          "Su origen literario viene de la novela de 1818. La criatura ha sido llevada al cine desde la era clásica en blanco y negro y se volvió un ícono cultural del cine de horror, reapareciendo constantemente en cine y TV como símbolo del experimento prohibido.",
        medical: {
          status: "INESTABLE",
          heartRate: "47 BPM IRREGULAR",
          radiationLevel: "CARGA ELÉCTRICA RESIDUAL",
          threatLevel: "ALTO",
          notes:
            "Dolor constante. Puede entrar en estado de furia defensiva. Evitar provocaciones directas.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/SPOCK.mp4",
        name: "SPOCK",
        debutYear: 1966,
        currentAge: 193,
        story:
          "Comandante científico híbrido humano–vulcano. Lógica extrema combinada con alta disciplina mental y emocional. Capacidad para análisis táctico avanzado.",
        powers:
          "Fuerza vulcana superior a la humana, control emocional extremo, técnica de 'pellizco vulcano', capacidad de meditación profunda, intelecto científico de nivel excepcional.",
        mediaHistory:
          "Figura central de 'Star Trek' desde 1966. Uno de los personajes más influyentes de la ciencia ficción, apareciendo en múltiples series, películas y universos alternos. Símbolo cultural de racionalidad y diplomacia interestelar.",
        medical: {
          status: "ESTABLE",
          heartRate: "55 BPM VULCANO",
          radiationLevel: "NULA",
          threatLevel: "BAJO",
          notes:
            "Altamente racional. Evita la violencia salvo que las circunstancias lo exijan. Capaz de tácticas no letales extremadamente efectivas.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/KALIMAN.mp4",
        name: "KALIMÁN",
        debutYear: 1963,
        currentAge: 63,
        story:
          "Misterioso héroe oriental conocido como 'el hombre increíble'. Maestro del autocontrol mental, la sabiduría ancestral y la justicia. Recorre el mundo enfrentando amenazas sobrenaturales, criminales y conspiraciones junto a su inseparable compañero Solín.",
        powers:
          "Control mental avanzado, hipnosis, telepatía limitada, resistencia física superior, artes marciales, percepción extrasensorial, memoria fotográfica, meditación profunda y capacidad estratégica excepcional.",
        mediaHistory:
          "Creado en 1963 para la radionovela mexicana, posteriormente adaptado a historietas que alcanzaron enorme popularidad en Latinoamérica. Se convirtió en un ícono cultural gracias a sus frases filosóficas, aventuras exóticas y su influencia en generaciones de lectores.",
        medical: {
          status: "ACTIVO",
          heartRate: "CONTROLADO - 48 BPM",
          radiationLevel: "ENERGÍA MENTAL ELEVADA",
          threatLevel: "MÁXIMO CONTROL",
          notes:
            "Actividad cerebral extraordinaria. Dominio absoluto de impulsos físicos y mentales. Capacidad de reacción superior mediante concentración avanzada.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/DARTH-VADER.mp4",
        name: "DARTH VADER",
        debutYear: 1977,
        currentAge: 45,
        story:
          "Guerrero cibernético del Imperio Galáctico. Dominio avanzado del Lado Oscuro de la Fuerza. Amplio historial de combate, destrucción y control militar.",
        powers:
          "Telequinesis (La Fuerza), estrangulamiento a distancia, resistencia extrema gracias a prótesis cibernéticas, combate con sable láser de nivel maestro, percepción extrasensorial.",
        mediaHistory:
          "Antagonista icónico de la saga 'Star Wars'. Su imagen es una de las más reconocibles de la historia del cine. Presente en películas, series, cómics y videojuegos durante décadas.",
        medical: {
          status: "CIBERNÉTICO / DEPENDENCIA VITAL",
          heartRate: "VARIANTE / ASISTIDO",
          radiationLevel: "ALTA INTERFERENCIA CIBERNÉTICA",
          threatLevel: "EXTREMO",
          notes:
            "Capacidad letal masiva. Mantenido vivo por sistemas respiratorios y prótesis avanzadas. Prioridad máxima de contención a larga distancia.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/V-INVASION-EXTRATERRESTRE.mp4",
        name: "VISITANTE (V)",
        debutYear: 1983,
        currentAge: 42,
        story:
          "Ser reptiliano encubierto bajo piel humana sintética. Operación de infiltración a nivel social y político.",
        powers:
          "Camuflaje humano creíble mediante cobertura sintética, inteligencia estratégica, manipulación social y política, posible acceso a tecnología avanzada de control e intimidación.",
        mediaHistory:
          "Los 'Visitantes' son la especie invasora de la serie de TV de culto 'V' (1983) y su reboot moderno. Se presentan públicamente como aliados tecnológicos mientras ocultan una agenda de dominación.",
        medical: {
          status: "ENCUBIERTO",
          heartRate: "82 BPM HUMANO SIMULADO",
          radiationLevel: "BIO-EMISIÓN CONTROLADA",
          threatLevel: "ALTO",
          notes:
            "Habilidad de manipulación social extrema. Agenda invasiva a largo plazo. No confiar en su apariencia humana.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/DEMON.mp4",
        name: "BLUE DEMON",
        debutYear: 1948,
        currentAge: 50,
        story:
          "Luchador mexicano legendario. Fuerza física descomunal, técnica profesional y resistencia extraordinaria. Icono cultural del deporte y el cine.",
        powers:
          "Fuerza humana al límite superior, dominio de llaves, proyecciones y contraataques, reflejos de atleta élite, gran resistencia al dolor.",
        mediaHistory:
          "Figura histórica de la lucha libre mexicana. Protagonista de múltiples películas, historietas y eventos deportivos desde mediados del siglo XX. Parte del panteón de luchadores icónicos junto a El Santo.",
        medical: {
          status: "ÓPTIMO",
          heartRate: "74 BPM",
          radiationLevel: "NULA",
          threatLevel: "MEDIO",
          notes:
            "Guerrero disciplinado y honorable. Prefiere el combate regulado; amenaza solo si es provocado.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/GRAN-HEROE.mp4",
        name: "HÉROE AMERICANO",
        debutYear: 1981,
        currentAge: 35,
        story:
          "Portador de un traje de origen extraterrestre con habilidades sobrehumanas, pero sin manual de uso oficial. Resultados impredecibles.",
        powers:
          "Vuelo, fuerza aumentada, durabilidad física muy superior a la humana, cierta invulnerabilidad balística, habilidades que a veces se activan de manera torpe e incontrolada.",
        mediaHistory:
          "Inspirado en la serie de TV de los 80 sobre un civil que recibe un traje alienígena sin instrucciones y termina actuando como héroe a regañadientes. Rasgo clave: poder enorme con curva de aprendizaje cero.",
        medical: {
          status: "ESTABLE",
          heartRate: "88 BPM",
          radiationLevel: "ANOMALÍA EXTRATERRESTRE BAJA",
          threatLevel: "BAJO",
          notes:
            "Aliado potencial. Capacidad de vuelo, fuerza aumentada y cierta invulnerabilidad, aunque con control limitado.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/HOMBRE-NUCLEAR.mp4",
        name: "HOMBRE NUCLEAR",
        debutYear: 1974,
        currentAge: 42,
        story:
          "Sujeto con reconstrucción cibernética de alto costo experimental. Fuerza aumentada, visión mejorada, extremidades biónicas.",
        powers:
          "Fuerza física mejorada mecánicamente, visión mejorada/tecnológica, miembros biónicos con potencia aumentada, salto y resistencia superiores a lo humano estándar.",
        mediaHistory:
          "Basado en la fantasía tecnológica del hombre reconstruido como arma viva ('The Six Million Dollar Man'). Figura súper-agente del gobierno con mejoras cibernéticas presentadas como proyecto secreto.",
        medical: {
          status: "OPERATIVO",
          heartRate: "72 BPM",
          radiationLevel: "BAJA (CÉLULAS ENERGÉTICAS)",
          threatLevel: "BAJO",
          notes:
            "Reemplazos biomecánicos tolerados. Requiere mantenimiento técnico especializado, no médico convencional.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/HULK.mp4",
        name: "HULK",
        debutYear: 1962,
        currentAge: 64,
        story:
          "Entidad gamma surgida tras exposición extrema a radiación experimental. Transformación impulsada por estrés y furia, convirtiendo al sujeto en una fuerza destructiva imparable.",
        powers:
          "Fuerza física ilimitada vinculada al nivel de ira, regeneración acelerada, resistencia extrema, saltos de larga distancia, resistencia a impactos balísticos y energía gamma masiva.",
        mediaHistory:
          "Considerado uno de los seres más peligrosos del universo Marvel. Su presencia ha provocado destrucción masiva en múltiples ciudades y enfrentamientos contra equipos completos de superhéroes, incluyendo amenazas mutantes y organizaciones militares.",
        medical: {
          status: "FUERA DE CONTROL",
          heartRate: "210 BPM",
          radiationLevel: "CRÍTICA (ENERGÍA GAMMA)",
          threatLevel: "EXTREMO",
          notes:
            "La actividad gamma aumenta exponencialmente con estados emocionales agresivos. Capacidad regenerativa impide neutralización convencional. Riesgo de devastación urbana total.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/DESTRUCTOR.mp4",
        name: "DESTRUCTOR",
        debutYear: 1984,
        currentAge: 42,
        story:
          "Maestro supremo del Clan del Pie y estratega criminal entrenado en artes marciales extremas. Su obsesión por el poder y la venganza lo convirtió en uno de los enemigos más letales de las Tortugas Ninja.",
        powers:
          "Combate cuerpo a cuerpo de nivel maestro, dominio de armas ninjas, armadura reforzada con cuchillas de acero, inteligencia táctica avanzada, liderazgo militar y resistencia física superior.",
        mediaHistory:
          "Principal antagonista de las Tortugas Ninja desde su debut en los cómics Mirage Studios. Ha liderado organizaciones criminales, ejércitos ninjas y versiones mutadas de sí mismo en múltiples adaptaciones animadas y cinematográficas.",
        medical: {
          status: "HOSTIL",
          heartRate: "88 BPM",
          radiationLevel: "MODERADA (TECNOLOGÍA Y MUTÁGENO)",
          threatLevel: "ALTO",
          notes:
            "Entrenamiento físico extremo y disciplina mental elevada. Uso frecuente de tecnología experimental y mutágenos incrementa agresividad y resistencia en combate.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/MUJER-BIONICA.mp4",
        name: "MUJER BIÓNICA",
        debutYear: 1976,
        currentAge: 38,
        story:
          "Reconstrucción biónica con fuerza incrementada, audición mejorada y reflejos sobrehumanos. Alta estabilidad emocional.",
        powers:
          "Fuerza aumentada, reflejos superiores, audición hipersensorial, recuperación funcional acelerada gracias a implantes biónicos.",
        mediaHistory:
          "'The Bionic Woman' fue serie de TV de los 70 (spin-off directo del 'Hombre Nuclear') y tuvo reboot en televisión moderna. Figura femenina agente encubierta con mejoras cibernéticas de alto valor táctico.",
        medical: {
          status: "OPERATIVA",
          heartRate: "70 BPM",
          radiationLevel: "BAJA / TECNOLÓGICA",
          threatLevel: "BAJO",
          notes:
            "Capacidad táctica y control situacional sobresaliente. Nivel de amenaza: sólo si es provocada.",
        },
      },

      {
        imageUrl: "",
        videoUrl: "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/ET.mp4",
        name: "E.T.",
        debutYear: 1982,
        currentAge: 10,
        story:
          "Entidad extraterrestre no agresiva. Capacidad empática y posible bioenergía regenerativa. Busca contacto y protección.",
        powers:
          "Conexión empática con humanos, potencial curativo/regenerativo mediante energía biológica, habilidades telequinéticas ligeras y capacidad de comunicación no verbal profunda.",
        mediaHistory:
          "Protagonista de una de las películas de ciencia ficción más icónicas de los 80. Percibido como visitante pacífico perdido en la Tierra, más aliado que amenaza.",
        medical: {
          status: "DELICADO",
          heartRate: "ELEVADO PERO PACÍFICO",
          radiationLevel: "ENERGÍA CURATIVA",
          threatLevel: "BAJO",
          notes:
            "Extremadamente vulnerable a aislamiento y miedo. Prioridad: asistencia, no contención.",
        },
      },

      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/CAPITAN-PREMIER.mp4",
        name: "CAPITÁN PREMIERE",
        debutYear: 2020,
        currentAge: 30,
        story:
          "Héroe creado en 2020 por Alfonso Hernández Murcia como figura emblemática del Café Premiere. Protector local, símbolo de identidad cultural y resistencia comunitaria.",
        powers:
          "Presencia disuasiva, fortaleza física elevada, carisma social como factor estabilizador del territorio, capacidad de protección directa a civiles.",
        mediaHistory:
          "Figura icónica asociada al Café Premiere: representado como guardián local. Construido más como mito vivo/comunal que como producto de franquicia masiva, funciona como símbolo de identidad y defensa del espacio.",
        medical: {
          status: "VIGILANCIA ACTIVA",
          heartRate: "78 BPM",
          radiationLevel: "SIGNATURA ENERGÉTICA ESTABLE",
          threatLevel: "BAJO",
          notes:
            "Figura inspiracional. Se asocia al Café Premiere como punto seguro. Rol: defensa y presencia disuasiva.",
        },
      },

      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/STARMAN.mp4",
        name: "STAR MAN",
        debutYear: 1985,
        currentAge: 37,
        story:
          "Operador táctico equipado con tecnología estelar de origen desconocido. Capaz de generar y canalizar energía lumínica de alta densidad.",
        powers:
          "Proyección y canalización de energía luminosa/plasma estelar, descarga de alta densidad controlada, posible campo defensivo energético.",
        mediaHistory:
          "Arquetipo del 'héroe espacial armado con tecnología extraterrestre'. Encaja en la tradición de guerreros cósmicos en animación, cómic y cine ochentero con estética neon sci-fi.",
        medical: {
          status: "ESTABLE",
          heartRate: "72 BPM",
          radiationLevel: "EMISIÓN CÓSMICA CONTROLADA",
          threatLevel: "MEDIO",
          notes:
            "Fuente energética catalogada como 'plasma estelar'. Riesgo de sobrecarga si es forzado al límite.",
        },
      },

      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/ORION-EL-ATLANTE.mp4",
        name: "ORION EL ATLANTE",
        debutYear: 1992,
        currentAge: 140,
        story:
          "Guardián de linaje atlante. Fuerza sobrehumana en entornos de alta presión, adaptación anfibia total y memoria histórica de conflictos submarinos.",
        powers:
          "Fuerza física extrema especialmente bajo presión oceánica, respiración/operación total bajo el agua, resistencia monumental en combate cuerpo a cuerpo, conocimiento táctico ancestral.",
        mediaHistory:
          "Figura estilo 'guardián del reino submarino', heredero del tropo atlante. Cercano al imaginario de héroes acuáticos en cómic, animación y cine moderno de superhéroes centrados en reinos submarinos.",
        medical: {
          status: "ACTIVO",
          heartRate: "38 BPM EN REPOSO",
          radiationLevel: "ALTA DENSIDAD CELULAR SUBACUÁTICA",
          threatLevel: "ALTO",
          notes:
            "Potencial bélico elevado en combate cuerpo a cuerpo. Extremadamente territorial si percibe amenaza a dominios oceánicos.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/VECNA.mp4",
        name: "VECNA",
        debutYear: 2022,
        currentAge: "APROX. 35+ (forma humanoide original)",
        story:
          "Entidad humanoide transformada tras exposición a una dimensión paralela conocida como el Upside Down. Antiguamente humano (Henry Creel / Sujeto 001). Posee habilidades psíquicas extremas y una conexión directa con el entorno dimensional hostil.",
        powers:
          "Telequinesis avanzada, control mental, manipulación de recuerdos traumáticos, apertura de portales interdimensionales, levitación, percepción extrasensorial, conexión neuronal con criaturas del Upside Down, capacidad de matar a distancia mediante colapso neurológico.",
        mediaHistory:
          "Antagonista principal de la cuarta temporada de la serie 'Stranger Things' (Netflix). Revelado como el origen de múltiples eventos paranormales en Hawkins y como la mente maestra detrás del Upside Down.",
        medical: {
          status: "HOSTIL",
          heartRate: "IRREGULAR / DESCONOCIDO",
          radiationLevel: "INTERDIMENSIONAL",
          threatLevel: "EXTREMO",
          notes:
            "Cuerpo severamente mutado. Actividad cerebral fuera de parámetros humanos. Alta afinidad con energía psíquica. Neutralización convencional ineficaz.",
        },
      },
      {
        imageUrl: "",
        videoUrl:
          "https://pub-281a6aee3610400a861c3477a794a156.r2.dev/MARS-ATTACK.mp4",
        name: "MARCIANO (MARS ATTACKS)",
        debutYear: 1996,
        currentAge: 120,
        story:
          "Forma de vida marciana altamente agresiva con tecnología de desintegración. Motivación hostil, comportamiento burlón, cero intención diplomática.",
        powers:
          "Tecnología armada de alta energía (rayos desintegradores), crueldad estratégica, ausencia de empatía, comunicación burlona como herramienta psicológica.",
        mediaHistory:
          "Basado en la franquicia de cartas coleccionables 'Mars Attacks!' y llevado al cine como sátira sci-fi con marcianos de cráneo expuesto, actitud sádica y armas de rayos que vaporizan objetivos.",
        medical: {
          status: "HOSTIL",
          heartRate: "DESCONOCIDO / IRREGULAR",
          radiationLevel: "TECNOLOGÍA MARCIANA ARMADA",
          threatLevel: "EXTREMO",
          notes:
            "Extremadamente peligroso incluso sin provocación directa. Priorizar neutralización a distancia. No bajar la guardia ante señales de 'paz'.",
        },
      },
    ],
    [],
  );

  const [index, setIndex] = useState(0);

  // sync héroe actual al display
  useEffect(() => {
    const hero = slides[index];
    socket.emit("set_hero", {
      hero: {
        videoUrl: hero.videoUrl?.startsWith("http")
          ? hero.videoUrl
          : "/" + cleanPublic(hero.videoUrl || ""),
        imageUrl: hero.imageUrl?.startsWith("http")
          ? hero.imageUrl
          : "/" + cleanPublic(hero.imageUrl || ""),
        name: hero.name,
        debutYear: hero.debutYear, // usar un solo campo consistente
        currentAge: hero.currentAge,
        story: hero.story,
        medical: hero.medical,
        mediaHistory: hero.mediaHistory,
        powers: hero.powers,
      },
    });
  }, [index, slides]);

  const nextHero = () => {
    setIndex((prev) => (prev + 1 >= slides.length ? 0 : prev + 1));
  };

  const prevHero = () => {
    setIndex((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  };

  const showInfo = () => {
    socket.emit("show_info");

    socket.emit("play_sound", { type: "modal_open" });
  };

  const hideInfo = () => {
    socket.emit("hide_info");

    socket.emit("play_sound", { type: "modal_open" });
  };

  const active = slides[index];

  // componente helper para mostrar preview (imagen o video) en el marco
  const PreviewMedia = ({ slide }) => {
    if (slide.videoUrl) {
      return (
        <video
          src={slide.videoUrl}
          style={styles.phoneImage}
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }

    return (
      <img src={slide.imageUrl} alt={slide.name} style={styles.phoneImage} />
    );
  };

  return (
    <div style={styles.appShell}>
      <div style={styles.headerBar}>
        <div style={styles.headerTitle}>PANEL BIOMÉTRICO // SUJETO ACTIVO</div>
        <div style={styles.headerSub}>{active.name}</div>
      </div>

      <div style={styles.card}>
        {/* Bloque imagen / video tipo “FEED VISUAL DEL SUJETO” */}
        <div style={styles.feedBlock}>
          <div style={styles.feedHeader}>
            <span style={styles.feedLabel}>VISUAL FEED</span>
            <span style={styles.feedMeta}>ID #{index + 1}</span>
          </div>

          <div style={styles.phoneFrame}>
            <PreviewMedia slide={active} />
            <div style={styles.scanOverlay} />
            <div style={styles.cornerTL} />
            <div style={styles.cornerTR} />
            <div style={styles.cornerBL} />
            <div style={styles.cornerBR} />
          </div>
        </div>

        {/* Datos básicos del sujeto */}
        <div style={styles.infoBlock}>
          <div style={styles.infoRow}>
            <div style={styles.infoLabel}>NOMBRE:</div>
            <div style={styles.infoValue}>{active.name}</div>
          </div>
          <div style={styles.infoRow}>
            <div style={styles.infoLabel}>DEBUT:</div>
            <div style={styles.infoValue}>{active.debutYear}</div>
          </div>
          <div style={styles.infoRow}>
            <div style={styles.infoLabel}>EDAD ACTUAL:</div>
            <div style={styles.infoValue}>{active.currentAge}</div>
          </div>
        </div>

        {/* Controles */}
        <div style={styles.controlsBlock}>
          <div style={styles.row}>
            <button style={styles.btnNav} onClick={prevHero}>
              ⟵ ANTERIOR
            </button>
            <button style={styles.btnNav} onClick={nextHero}>
              SIGUIENTE ⟶
            </button>
          </div>

          <div style={styles.row}>
            <button style={styles.btnShow} onClick={showInfo}>
              MOSTRAR INFORMACIÓN
            </button>
            <button style={styles.btnHide} onClick={hideInfo}>
              OCULTAR INFORMACIÓN
            </button>
          </div>
          <div style={styles.footerStatus}>
            SUJETO {index + 1} / {slides.length}
          </div>
        </div>
      </div>
    </div>
  );
}

const neonGreen = "#4ade80";
const dangerRed = "#ef4444";
const panelBg = "#0a0f1a";
const cardBg = "#111827";

const styles = {
  appShell: {
    backgroundColor: panelBg,
    backgroundImage:
      "radial-gradient(circle at 20% 20%, rgba(0,255,128,0.07) 0%, rgba(0,0,0,0) 60%)",
    minHeight: "100vh",
    color: "#fff",
    fontFamily: "system-ui, sans-serif",
    padding: "4vh 3vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3vh",
  },

  headerBar: {
    textAlign: "center",
  },
  headerTitle: {
    color: neonGreen,
    fontSize: "clamp(0.6rem, 1vw, 1rem)",
    fontWeight: 600,
    letterSpacing: ".2em",
    textTransform: "uppercase",
  },
  headerSub: {
    fontSize: "clamp(1rem, 2vw, 2rem)",
    fontWeight: 700,
    letterSpacing: ".1em",
    textTransform: "uppercase",
    color: "#fff",
    marginTop: ".5rem",
  },

  card: {
    backgroundColor: cardBg,
    borderRadius: "1rem",
    border: `1px solid rgba(255,255,255,0.1)`,
    boxShadow: "0 0 120px rgba(0,0,0,0.9)",
    padding: "2vw",
    width: "clamp(320px, 50vw, 700px)",
    display: "grid",
    gap: "2vh",
  },

  feedBlock: {
    display: "flex",
    flexDirection: "column",
    gap: ".75rem",
  },
  feedHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "clamp(0.6rem, 1vw, 1rem)",
    fontWeight: 600,
    letterSpacing: ".15em",
    color: neonGreen,
  },
  feedLabel: {
    textTransform: "uppercase",
  },
  feedMeta: {
    color: "#94a3b8",
  },

  phoneFrame: {
    width: "clamp(180px, 20vw, 300px)",
    height: "clamp(320px, 40vw, 600px)",
    backgroundColor: "#000",
    borderRadius: ".75rem",
    border: `2px solid rgba(74,222,128,0.4)`,
    boxShadow: `0 0 2vw ${neonGreen}40`,
    overflow: "hidden",
    position: "relative",
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  phoneImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "contrast(1.1) brightness(1.1)",
  },

  scanOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    background:
      "repeating-linear-gradient(to bottom, rgba(0,255,128,0.07) 0px, rgba(0,255,128,0.00) 2px, rgba(0,0,0,0) 4px)",
    mixBlendMode: "screen",
    pointerEvents: "none",
  },

  cornerTL: hudCorner("top", "left"),
  cornerTR: hudCorner("top", "right"),
  cornerBL: hudCorner("bottom", "left"),
  cornerBR: hudCorner("bottom", "right"),

  infoBlock: {
    backgroundColor: "#0b1220",
    borderRadius: ".75rem",
    border: `1px solid rgba(255,255,255,0.08)`,
    padding: "1.5vh 1.5vw",
    display: "grid",
    gap: "1vh",
    fontSize: "clamp(0.8rem, 0.9vw, 1rem)",
    lineHeight: 1.5,
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    textTransform: "uppercase",
    letterSpacing: ".05em",
    fontWeight: 600,
    color: "#fff",
  },
  infoLabel: {
    color: "#94a3b8",
    fontSize: "clamp(0.7rem, 0.8vw, 0.9rem)",
  },
  infoValue: {
    color: "#fff",
    fontSize: "clamp(0.8rem, 1vw, 1.1rem)",
  },

  controlsBlock: {
    display: "grid",
    gap: "1rem",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    justifyContent: "center",
  },

  btnNav: {
    flex: 1,
    backgroundColor: "#1f2937",
    color: "#fff",
    borderRadius: ".5rem",
    border: `1px solid ${neonGreen}40`,
    boxShadow: `0 0 20px ${neonGreen}33`,
    fontSize: "clamp(0.7rem, 0.9vw, 1rem)",
    fontWeight: 600,
    letterSpacing: ".15em",
    textTransform: "uppercase",
    padding: "1vh 1vw",
    cursor: "pointer",
  },

  btnShow: {
    flex: 1,
    backgroundColor: "#052e16",
    color: neonGreen,
    borderRadius: ".5rem",
    border: `1px solid ${neonGreen}`,
    boxShadow: `0 0 25px ${neonGreen}66`,
    fontSize: "clamp(0.8rem, 1vw, 1.1rem)",
    fontWeight: 700,
    letterSpacing: ".15em",
    textTransform: "uppercase",
    padding: "1vh 1vw",
    cursor: "pointer",
  },

  btnHide: {
    flex: 1,
    backgroundColor: "#2a0a0a",
    color: dangerRed,
    borderRadius: ".5rem",
    border: `1px solid ${dangerRed}`,
    boxShadow: `0 0 25px ${dangerRed}66`,
    fontSize: "clamp(0.8rem, 1vw, 1.1rem)",
    fontWeight: 700,
    letterSpacing: ".15em",
    textTransform: "uppercase",
    padding: "1vh 1vw",
    cursor: "pointer",
  },

  footerStatus: {
    textAlign: "center",
    fontSize: "clamp(0.6rem, 0.8vw, 1rem)",
    color: "#94a3b8",
    letterSpacing: ".15em",
    textTransform: "uppercase",
    fontWeight: 500,
  },
};

function hudCorner(vSide, hSide) {
  const base = {
    position: "absolute",
    width: "2vw",
    height: "2vw",
    borderColor: neonGreen,
    borderStyle: "solid",
    pointerEvents: "none",
  };

  if (vSide === "top") {
    base.top = "0.5vw";
    base.borderTopWidth = "2px";
  } else {
    base.bottom = "0.5vw";
    base.borderBottomWidth = "2px";
  }

  if (hSide === "left") {
    base.left = "0.5vw";
    base.borderLeftWidth = "2px";
  } else {
    base.right = "0.5vw";
    base.borderRightWidth = "2px";
  }

  return base;
}

export default App;
