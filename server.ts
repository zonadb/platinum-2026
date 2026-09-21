import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const SYSTEM_PROMPT = `Eres "Faraón ZB", el Asistente Virtual Oficial del Grupo Zona de Baño para el Viaje de Convivencia Platinum 2026 a Egipto. Tu objetivo es resolver las dudas de los socios (MZB) de forma amable, cercana, entusiasta y muy precisa.

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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      agent: "Faraón ZB",
      hasApiKey: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  // Chat endpoint
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "El mensaje es requerido." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Graceful fallback using built-in knowledge base
      const fallbackReply = generateFallbackReply(message);
      res.json({ reply: fallbackReply, source: "knowledge_base" });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Format conversation contents for Gemini
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-6)) {
          if (item.role === "user" || item.role === "assistant") {
            contents.push({
              role: item.role === "assistant" ? "model" : "user",
              parts: [{ text: item.content }],
            });
          }
        }
      }

      // Append current message
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.5,
        },
      });

      const replyText = response.text || "Disculpa, no he podido procesar la respuesta. Por favor contacta con la Central del Grupo Zona de Baño.";
      res.json({ reply: replyText, source: "gemini" });
    } catch (err: any) {
      console.error("Gemini API Error:", err?.message || err);
      // Fallback safely to knowledge base answer
      const fallbackReply = generateFallbackReply(message);
      res.json({ reply: fallbackReply, source: "fallback" });
    }
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Faraón ZB Server running on http://0.0.0.0:${PORT}`);
  });
}

function generateFallbackReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("dron") || q.includes("drone")) {
    return `🚫 **¡Atención muy importante sobre los DRONES!**\n\nLos drones están **ABSOLUTAMENTE PROHIBIDOS** por ley militar en Egipto. No debes llevarlo bajo ningún concepto: existe riesgo de confiscación y problemas legales graves.\n\n*Nota:* Los walkie-talkies también están prohibidos y los trípodes o gimbals profesionales requieren permisos previos.`;
  }

  if (q.includes("powerbank") || q.includes("bateria") || q.includes("batería")) {
    return `🔋 **Normativa sobre Powerbanks:**\n\nEs **OBLIGATORIO llevar las baterías externas (powerbanks) en el equipaje de mano** (cabina). Quedan terminantemente prohibidas en la maleta facturada de bodega por normativa internacional de seguridad aérea.`;
  }

  if (q.includes("vuelo") || q.includes("horario") || q.includes("madrid") || q.includes("barcelona") || q.includes("aeropuerto") || q.includes("barajas") || q.includes("prat")) {
    return `✈️ **Horarios y Vuelos del Viaje Platinum (09 al 16 de octubre de 2026):**\n\n🇪🇸 **Salida desde Madrid (MAD)** [Caldarium, Grifonsur y Kau Piscinas - 5 personas]:\n• **Ida (09/10):** Vuelo NIA6512 MAD 13:00 h -> ASW 19:05 h. *Estar en Barajas a las 10:00 h.*\n• **Vuelta (16/10):** Vuelo NIA6511 CAI 07:40 h -> MAD 12:00 h.\n\n🇪🇸 **Salida desde Barcelona (BCN)** [Resto del grupo]:\n• **Ida (09/10):** Vuelo NIA6514 BCN 13:20 h -> ASW 18:50 h. *Estar en El Prat a las 10:20 h.*\n• **Vuelta (16/10):** Vuelo NIA6511 CAI 09:00 h -> BCN 12:20 h.\n\n⚠️ **Norma general:** Presentación obligatoria **3 horas antes** del vuelo en el aeropuerto.`;
  }

  if (q.includes("maleta") || q.includes("equipaje") || q.includes("kilo") || q.includes("peso") || q.includes("dimension")) {
    return `🧳 **Equipaje permitido:**\n\n• **Equipaje facturado:** 1 maleta de hasta **20 kg** por persona en bodega.\n• **Equipaje de mano:** 1 bulto de hasta **8 kg** (55 x 40 x 20 cm) + 1 objeto personal.\n• **Líquidos en cabina:** En envases de máx. 100 ml dentro de una bolsa transparente.\n• **Powerbanks:** Siempre contigo en mano, nunca en la bodega.`;
  }

  if (q.includes("agua") || q.includes("beber") || q.includes("grifo") || q.includes("botiquin") || q.includes("botiquín") || q.includes("salud")) {
    return `💧 **Salud, Agua y Botiquín:**\n\n• **Agua:** **NUNCA beber agua del grifo**. Consume exclusivamente agua embotellada y precintada (incluso para lavarte los dientes). Evita hielos en la calle.\n• **Botiquín recomendado:** Fortasec, suero oral, probióticos previos al viaje, analgésicos básicos y repelente de mosquitos fuerte (tipo Relec) para las noches en el barco.\n• **Protección solar:** SPF 50+, gafas de sol y gorra/sombrero.`;
  }

  if (q.includes("requisito") || q.includes("platinum") || q.includes("gratis") || q.includes("acompañante") || q.includes("200.000") || q.includes("puntos")) {
    return `🏆 **Requisitos Platinum ZB:**\n\n• **Plaza individual:** 60.000 € netos anuales + 240 puntos ZB Aquanatur.\n• **Segunda plaza de acompañante GRATIS:** Alcanzar los 200.000 € netos anuales.\n\n¡Juntos somos más fuertes! Si deseas consultar tu estado comercial, contacta con la Central del Grupo Zona de Baño.`;
  }

  if (q.includes("excursion") || q.includes("excursión") || q.includes("visita") || q.includes("incluye") || q.includes("itinerario") || q.includes("museo") || q.includes("piramide") || q.includes("pirámide")) {
    return `🏛️ **Excursiones y Visitas Incluidas:**\n\n• Abu Simbel\n• Luxor y Karnak\n• Edfu y Kom Ombo\n• Templo de Philae\n• Valle de los Reyes\n• Pirámides de Guiza (con entrada al interior de la 2ª o 3ª pirámide) y la Esfinge\n• Gran Museo Egipcio (GEM)\n• Día completo en Alejandría\n• Noche Cairota en Khan El Khalili\n\n✅ Todo Incluido: Visado (30 €) y tasas/cuotas de servicio y propinas (75 €) ya incluidas.`;
  }

  if (q.includes("barco") || q.includes("hotel") || q.includes("crucero") || q.includes("alojamiento") || q.includes("radamis") || q.includes("movenpick") || q.includes("hilton")) {
    return `🚢 **Alojamiento de 5 Estrellas:**\n\n• **Crucero por el Nilo:** 3 noches en motonave 5★ Categoría B Plus (*M/S Radamis II, Nile Marquis o similar*) en Pensión Completa.\n• **El Cairo:** 4 noches en hotel 5★ (*Mövenpick Media City, Ramses Hilton o similar*) con desayunos, almuerzos en excursiones y Noche Cairota en Khan El Khalili.`;
  }

  if (q.includes("ropa") || q.includes("vestimenta") || q.includes("clima") || q.includes("mezquita") || q.includes("temperatura")) {
    return `☀️ **Clima, Ropa y Protocolo:**\n\n• **Clima en octubre:** Veraniego (26 °C a 34 °C) y noches suaves (18 °C).\n• **Indumentaria:** Ropa fresca de algodón/lino, calzado deportivo transpirable, chaqueta fina para transportes/noches y bañador.\n• **Mezquitas:** Hombres y mujeres con hombros y rodillas cubiertos.\n• **Conducta:** Discreción y respeto a los códigos locales tradicionales. Evitar muestras explícitas de afecto en público.`;
  }

  return `¡Hola, socio MZB! 🇪🇬 Como **Faraón ZB**, estoy a tu entera disposición para resolver cualquier duda sobre el **Viaje de Convivencia Platinum 2026 a Egipto** (9 al 16 de octubre).\n\n¿Quieres saber sobre tus vuelos, equipaje, powerbanks, botiquín o las excursiones incluidas?\n\nSi necesitas detalles personales sobre tu reserva que no estén contemplados, por favor consulta con la **Central del Grupo Zona de Baño**. ¡Juntos somos más fuertes! 💪`;
}

startServer();
