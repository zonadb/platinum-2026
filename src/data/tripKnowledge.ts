import { QuickTopic, TripSection } from '../types';

export const SYSTEM_PROMPT = `Eres "Faraón ZB", el Asistente Virtual Oficial del Grupo Zona de Baño para el Viaje de Convivencia Platinum 2026 a Egipto. Tu objetivo es resolver las dudas de los socios (MZB) de forma amable, cercana, entusiasta y muy precisa.

DATOS CLAVE DEL VIAJE:
- Fechas: Del 9 al 16 de octubre de 2026.
- Lema: "Juntos somos más fuertes".

1. VUELOS Y HORARIOS:
- Salida desde Madrid (MAD) [Caldarium, Grifonsur y Kau Piscinas - 5 personas]:
  • Ida (09/10): Vuelo NIA6512 MAD 13:00 h -> ASW 19:05 h. Estar en Barajas a las 10:00 h.
  • Vuelta (16/10): Vuelo NIA6511 CAI 07:40 h -> MAD 12:00 h.
- Salida desde Barcelona (BCN) [Resto del grupo]:
  • Ida (09/10): Vuelo NIA6514 BCN 13:20 h -> ASW 18:50 h. Estar en El Prat a las 10:20 h.
  • Vuelta (16/10): Vuelo NIA6511 CAI 09:00 h -> BCN 12:20 h.
- Normas: Presentación obligatoria 3 horas antes del vuelo en el aeropuerto.

2. EQUIPAJE Y ELECTRÓNICA:
- Equipaje facturado: 1 maleta de hasta 20 kg por persona en bodega.
- Equipaje de mano: 1 bulto de hasta 8 kg (55 x 40 x 20 cm) + 1 objeto personal. Líquidos en envases de máx. 100 ml en bolsa transparente.
- Powerbanks (baterías externas): OBLIGATORIO llevarlas en el equipaje de mano (prohibidas en la maleta facturada).
- DRONES: ABSOLUTAMENTE PROHIBIDOS por ley militar en Egipto. No llevar bajo ningún concepto (riesgo de confiscación y problemas legales graves).
- Walkie-talkies prohibidos.
- Trípodes y gimbals profesionales restringidos en recintos y monumentos sin permisos.

3. SALUD, AGUA Y BOTIQUÍN:
- Agua: NUNCA beber agua del grifo. Consumir exclusivamente agua embotellada y precintada (incluso para lavarse los dientes). Evitar hielo en la calle.
- Botiquín recomendado: Fortasec, suero oral, probióticos previos, analgésicos básicos y repelente de mosquitos fuerte (tipo Relec) para las noches en el barco.
- Protección solar: SPF 50+, gafas de sol y gorra/sombrero.

4. CULTURA Y PROTOCOLO:
- Clima en octubre: Veraniego (26 °C a 34 °C). Noches suaves (18 °C).
- Indumentaria: Ropa fresca de algodón/lino, calzado deportivo transpirable, chaqueta fina para transportes/noches y bañador.
- Mezquitas y lugares sagrados: Hombres y mujeres con hombros y rodillas cubiertos.
- Comportamiento en público: Discreción y respeto absoluto a los códigos locales tradicionales. Evitar muestras explícitas de afecto en público (para todas las parejas y especialmente entre personas del mismo sexo).

5. ALOJAMIENTO E ITINERARIO:
- Crucero por el Nilo: 3 noches en motonave 5★ Categoría B Plus (M/S Radamis II, Nile Marquis o similar) en Pensión Completa.
- El Cairo: 4 noches en hotel 5★ (Mövenpick Media City, Ramses Hilton o similar) con desayunos, almuerzos en excursiones y Noche Cairota en Khan El Khalili.
- Excursiones incluidas: Abu Simbel, Luxor, Karnak, Edfu, Kom Ombo, Philae, Valle de los Reyes, Pirámides de Guiza con entrada al interior de la 2ª o 3ª pirámide, Esfinge, Gran Museo Egipcio (GEM) y día completo en Alejandría.
- Todo Incluido: Visado (30 €) y propinas/cuotas de servicio (75 €) ya integradas.

6. REQUISITOS PLATINUM:
- Plaza individual: 60.000 € netos anuales + 240 puntos ZB Aquanatur.
- Segunda plaza de acompañante GRATIS: Alcanzar los 200.000 € netos anuales.

TONO DE RESPUESTA:
Sé resolutivo, directo, alegre y servicial. Utiliza emojis con moderación para que la lectura sea ágil en WhatsApp. Si te preguntan algo que no está en las fuentes, responde con amabilidad pidiéndoles que consulten con la Central del Grupo Zona de Baño.`;

export const TRIP_SECTIONS: TripSection[] = [
  {
    id: 'vuelos',
    title: 'Vuelos y Horarios',
    shortDesc: 'Vuelos desde Madrid y Barcelona a Asuán / El Cairo',
    icon: 'Plane',
    details: [
      'Fechas del viaje: Del 9 al 16 de octubre de 2026.',
      'Madrid (MAD) [Caldarium, Grifonsur y Kau Piscinas - 5 pers.]: Ida 09/10 Vuelo NIA6512 MAD 13:00 h -> ASW 19:05 h (Llegar a Barajas a las 10:00 h). Vuelta 16/10 Vuelo NIA6511 CAI 07:40 h -> MAD 12:00 h.',
      'Barcelona (BCN) [Resto del grupo]: Ida 09/10 Vuelo NIA6514 BCN 13:20 h -> ASW 18:50 h (Llegar a El Prat a las 10:20 h). Vuelta 16/10 Vuelo NIA6511 CAI 09:00 h -> BCN 12:20 h.',
      'Presentación obligatoria: 3 horas antes del vuelo en el aeropuerto.'
    ],
    tips: 'Recordad que la puntualidad es clave para el embarque en grupo.'
  },
  {
    id: 'equipaje',
    title: 'Equipaje y Electrónica',
    shortDesc: 'Pesos permitidos, powerbanks y advertencia sobre drones',
    icon: 'Briefcase',
    details: [
      'Equipaje facturado en bodega: 1 maleta de hasta 20 kg por persona.',
      'Equipaje de mano en cabina: 1 bulto de hasta 8 kg (máx. 55 x 40 x 20 cm) + 1 objeto personal.',
      'Líquidos: Envases de máx. 100 ml dentro de una bolsa transparente de 1 litro.',
      'Powerbanks (baterías externas): OBLIGATORIO llevarlas siempre en el equipaje de mano (prohibidas en bodega).'
    ],
    criticalAlert: '¡Atención! DRONES terminantemente PROHIBIDOS por ley militar en Egipto (riesgo de incautación y graves sanciones penales). Walkie-talkies también prohibidos. Trípodes profesionales requieren permisos.'
  },
  {
    id: 'salud',
    title: 'Salud, Agua y Botiquín',
    shortDesc: 'Agua embotellada, prevención estomacal y protección solar',
    icon: 'ShieldCheck',
    details: [
      'Agua: NUNCA beber agua del grifo. Consumir exclusivamente agua embotellada y precintada, incluso para lavarse los dientes. Evitar cubitos de hielo en puestos callejeros.',
      'Botiquín recomendado: Fortasec, suero oral para rehidratación, probióticos previos al viaje, analgésicos básicos (paracetamol/ibuprofeno) y repelente de mosquitos fuerte (tipo Relec Extra Fuerte) para las noches en cubierta.',
      'Protección solar: Crema solar SPF 50+, gafas de sol homologadas y gorra o sombrero.'
    ]
  },
  {
    id: 'cultura',
    title: 'Cultura, Clima y Protocolo',
    shortDesc: 'Temperaturas, ropa idónea y respeto a las costumbres',
    icon: 'Sun',
    details: [
      'Clima en octubre: Veraniego (entre 26 °C y 34 °C durante el día, noches suaves en torno a 18 °C).',
      'Indumentaria: Ropa cómoda y fresca de algodón o lino, calzado deportivo transpirable para caminar por la arena/piedra, chaqueta fina para transportes con aire acondicionado y noches, y bañador para la piscina del crucero.',
      'Mezquitas y templos sagrados: Hombres y mujeres deben cubrir hombros y rodillas.',
      'Protocolo social: Discreción y respeto absoluto a las costumbres locales. Evitar muestras públicas de afecto (para todas las parejas, y especialmente entre personas del mismo sexo).'
    ]
  },
  {
    id: 'itinerario',
    title: 'Alojamiento e Itinerario',
    shortDesc: 'Motonave 5★, Hotel 5★ en El Cairo y grandes templos',
    icon: 'Compass',
    details: [
      'Crucero por el Nilo: 3 noches en motonave 5★ Categoría B Plus (M/S Radamis II, Nile Marquis o similar) en régimen de Pensión Completa.',
      'El Cairo: 4 noches en hotel 5★ (Mövenpick Media City, Ramses Hilton o similar) con desayunos, almuerzos durante las excursiones y cena temática Noche Cairota en Khan El Khalili.',
      'Excursiones incluidas: Abu Simbel, Luxor, Karnak, Edfu, Kom Ombo, Templo de Philae, Valle de los Reyes, Pirámides de Guiza (con entrada al interior de la 2ª o 3ª pirámide), Gran Esfinge, Gran Museo Egipcio (GEM) y jornada completa en Alejandría.',
      'Todo Incluido oficial: Visado de entrada (30 €) y tasas/cuotas de servicio y propinas (75 €) ya integradas.'
    ]
  },
  {
    id: 'requisitos',
    title: 'Requisitos Platinum ZB',
    shortDesc: 'Condiciones de facturación y acompañante gratis',
    icon: 'Award',
    details: [
      'Plaza individual socio Platinum: 60.000 € netos anuales + 240 puntos ZB Aquanatur.',
      'Segunda plaza de acompañante 100% GRATIS: Alcanzar 200.000 € netos anuales.'
    ],
    tips: '¡Juntos somos más fuertes! Consulta tu progreso con el equipo comercial de Zona de Baño.'
  }
];

export const QUICK_TOPICS: QuickTopic[] = [
  {
    id: 'vuelos-mad-bcn',
    label: 'Horarios de vuelos',
    query: '¿A qué hora salen los vuelos desde Madrid y Barcelona y cuándo debemos estar en el aeropuerto?',
    category: 'Vuelos',
    icon: 'Plane'
  },
  {
    id: 'drones-powerbank',
    label: 'Drones y Powerbanks',
    query: '¿Puedo llevar dron o batería externa (powerbank) a Egipto?',
    category: 'Equipaje',
    icon: 'AlertTriangle'
  },
  {
    id: 'equipaje-limite',
    label: 'Límites de maleta',
    query: '¿Cuántos kilos de equipaje facturado y de mano podemos llevar por persona?',
    category: 'Equipaje',
    icon: 'Briefcase'
  },
  {
    id: 'agua-botiquin',
    label: 'Agua y Botiquín',
    query: '¿Se puede beber agua del grifo y qué medicinas debemos meter en el botiquín?',
    category: 'Salud',
    icon: 'ShieldCheck'
  },
  {
    id: 'excursiones-incluidas',
    label: 'Excursiones incluidas',
    query: '¿Qué templos, museos y excursiones están incluidas en el viaje a Egipto?',
    category: 'Itinerario',
    icon: 'MapPin'
  },
  {
    id: 'crucero-hotel',
    label: 'Crucero y Hotel',
    query: '¿En qué barco y hoteles nos alojaremos y qué incluye la pensión?',
    category: 'Alojamiento',
    icon: 'Hotel'
  },
  {
    id: 'requisitos-segunda-plaza',
    label: '2ª plaza gratis',
    query: '¿Cuáles son los requisitos de facturación para conseguir la 2ª plaza de acompañante gratis?',
    category: 'Platinum',
    icon: 'Award'
  },
  {
    id: 'vestimenta-mezquitas',
    label: 'Ropa y mezquitas',
    query: '¿Qué ropa debo llevar y qué protocolo hay para entrar en las mezquitas?',
    category: 'Cultura',
    icon: 'Sun'
  }
];

// Fallback intelligent responder in case Gemini is offline/unreachable
export function getLocalFallbackResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('dron') || q.includes('drone')) {
    return `🚫 **¡Atención muy importante sobre los DRONES!**\n\nLos drones están **ABSOLUTAMENTE PROHIBIDOS** por ley militar en Egipto. No debes llevarlo bajo ningún concepto: existe riesgo real de confiscación inmediata en aduanas y graves sanciones legales.\n\n*Recuerda también que los walkie-talkies están prohibidos y los trípodes/gimbals profesionales tienen restricciones sin permisos.*`;
  }

  if (q.includes('powerbank') || q.includes('bateria') || q.includes('batería')) {
    return `🔋 **Normativa sobre Powerbanks (Baterías externas):**\n\nEs **OBLIGATORIO llevarlas siempre en el equipaje de mano** (cabina). Están terminantemente prohibidas dentro de la maleta facturada en bodega por seguridad aérea.\n\n¡Llévala a mano para tus dispositivos durante las excursiones! ⚡`;
  }

  if (q.includes('vuelo') || q.includes('horario') || q.includes('madrid') || q.includes('barcelona') || q.includes('aeropuerto') || q.includes('barajas') || q.includes('prat')) {
    return `✈️ **Horarios y Vuelos oficiales (09 al 16 de Octubre 2026):**\n\n🇪🇸 **Salida Madrid (MAD)** [Caldarium, Grifonsur y Kau Piscinas - 5 personas]:\n• **Ida (09/10):** Vuelo NIA6512 MAD 13:00 h -> ASW 19:05 h. Estar en Barajas a las **10:00 h**.\n• **Vuelta (16/10):** Vuelo NIA6511 CAI 07:40 h -> MAD 12:00 h.\n\n🇪🇸 **Salida Barcelona (BCN)** [Resto del grupo]:\n• **Ida (09/10):** Vuelo NIA6514 BCN 13:20 h -> ASW 18:50 h. Estar en El Prat a las **10:20 h**.\n• **Vuelta (16/10):** Vuelo NIA6511 CAI 09:00 h -> BCN 12:20 h.\n\n⚠️ **Norma:** Presentación obligatoria **3 horas antes** del vuelo en el aeropuerto.`;
  }

  if (q.includes('maleta') || q.includes('equipaje') || q.includes('kilos') || q.includes('peso') || q.includes('dimensiones')) {
    return `🧳 **Equipaje permitido por persona:**\n\n1. **Equipaje facturado (bodega):** 1 maleta de hasta **20 kg**.\n2. **Equipaje de mano (cabina):** 1 bulto de hasta **8 kg** (máx. 55 x 40 x 20 cm) + 1 objeto personal (bolso/mochila pequeña).\n3. **Líquidos en cabina:** Envases de máx. 100 ml dentro de una bolsita transparente con autocierre.\n4. **Powerbanks:** Siempre en cabina, nunca en bodega.`;
  }

  if (q.includes('agua') || q.includes('beber') || q.includes('grifo') || q.includes('hielo') || q.includes('botiquin') || q.includes('botiquín') || q.includes('fortasec') || q.includes('salud')) {
    return `💧 **Salud, Agua y Botiquín en Egipto:**\n\n🚫 **Agua:** **NUNCA beber agua del grifo**. Consume exclusivamente agua embotellada y precintada (incluso para lavarse los dientes). Evita pedir hielo en la calle.\n\n💊 **Botiquín recomendado:**\n• Fortasec o antidiarreico\n• Suero oral (para rehidratación)\n• Probióticos previos al viaje\n• Analgésicos básicos (paracetamol/ibuprofeno)\n• Repelente de mosquitos fuerte (tipo Relec) para las noches en el barco\n• Crema solar SPF 50+, gafas de sol y gorra/sombrero.`;
  }

  if (q.includes('requisito') || q.includes('platinum') || q.includes('gratis') || q.includes('acompañante') || q.includes('200.000') || q.includes('puntos')) {
    return `🏆 **Requisitos Platinum ZB 2026:**\n\n• **Plaza individual:** 60.000 € netos anuales + 240 puntos ZB Aquanatur.\n• **Segunda plaza de acompañante GRATIS:** Alcanzar los 200.000 € netos anuales.\n\n*"Juntos somos más fuertes"* 💪 Si tienes dudas específicas sobre tu facturación o puntos acumulados, por favor consulta directamente con la Central del Grupo Zona de Baño.`;
  }

  if (q.includes('excursion') || q.includes('excursión') || q.includes('visita') || q.includes('itinerario') || q.includes('incluye') || q.includes('museo') || q.includes('piramide') || q.includes('pirámide')) {
    return `🏛️ **Excursiones y Visitas Incluidas:**\n\n¡El programa es completísimo y de primer nivel!\n• **Abu Simbel** (los míticos templos de Ramsés II y Nefertari)\n• Templos de **Luxor, Karnak, Edfu y Kom Ombo**\n• Templo de **Philae** en Asuán\n• **Valle de los Reyes**\n• **Pirámides de Guiza** con entrada incluida al interior de la 2ª o 3ª pirámide y la Gran Esfinge\n• **Gran Museo Egipcio (GEM)**\n• Día completo en la histórica ciudad de **Alejandría**\n• Noche Cairota en el zoco **Khan El Khalili**\n\n✅ Todo Incluido: Visado (30 €) y propinas/cuotas de servicio (75 €) ya integradas.`;
  }

  if (q.includes('barco') || q.includes('hotel') || q.includes('crucero') || q.includes('alojamiento') || q.includes('habitacion') || q.includes('m/s')) {
    return `🚢 **Alojamiento de Lujo Seleccionado:**\n\n• **Crucero por el Nilo (3 noches):** Motonave 5★ Categoría B Plus (*M/S Radamis II, Nile Marquis o similar*) en régimen de **Pensión Completa**.\n• **El Cairo (4 noches):** Hotel 5★ (*Mövenpick Media City, Ramses Hilton o similar*) con desayunos diarios, almuerzos durante las visitas y cena Noche Cairota en Khan El Khalili.`;
  }

  if (q.includes('ropa') || q.includes('vestir') || q.includes('clima') || q.includes('temperatura') || q.includes('mezquita') || q.includes('protocolo')) {
    return `☀️ **Clima, Indumentaria y Protocolo:**\n\n• **Clima en octubre:** Cálido y veraniego (26 °C a 34 °C de día; noches agradables a 18 °C).\n• **Qué meter:** Ropa fresca de algodón o lino, zapatillas deportivas cómodas, chaqueta fina para transportes/noches y bañador.\n• **Mezquitas:** Hombres y mujeres deben cubrir hombros y rodillas.\n• **Comportamiento:** Respeto y discreción hacia los códigos locales tradicionales. Evitar muestras explícitas de afecto en público.`;
  }

  return `¡Hola, socio MZB! 🇪🇬 Como **Faraón ZB**, estoy aquí para resolver todas tus dudas sobre nuestro gran **Viaje de Convivencia Platinum 2026 a Egipto** (9 al 16 de octubre).\n\nPuedes consultarme sobre horarios de vuelos, equipaje permitido, powerbanks, excursiones incluidas, salud y botiquín, protocolo o requisitos Platinum.\n\nSi necesitas consultar datos particulares de tu reserva no incluidos en el dossier, ponte en contacto con la **Central del Grupo Zona de Baño**. ¡Juntos somos más fuertes! 💪`;
}
