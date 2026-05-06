"use client";

import { useState, useCallback } from "react";
import type { ChatMessage, AikoFlowState, AikoProfileState, RiskProfile, ChipOption } from "@/types";
import { mockProducts } from "@/lib/mock-data";

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  flowState: AikoFlowState;
  profileState: AikoProfileState;
  sendMessage: (content: string) => void;
  selectChip: (chipValue: string) => void;
}

// AIKO Chips por momento
const CHIPS = {
  welcome: [
    { id: "know-profile", label: "Ya se mi perfil inversor", value: "ya-se-mi-perfil" },
    { id: "discover-profile", label: "Ayudame a descubrirlo", value: "ayudame-a-descubrirlo" },
    { id: "explore-catalog", label: "Prefiero explorar el catalogo", value: "explorar-catalogo" },
    { id: "what-is-aiko", label: "Que es AIKO?", value: "que-es-aiko" },
  ],
  profileSelection: [
    { id: "conservador", label: "Conservador — prefiero no arriesgar", value: "conservador" },
    { id: "moderado", label: "Moderado — acepto algo de riesgo por mejor retorno", value: "moderado" },
    { id: "agresivo", label: "Agresivo — busco maximo rendimiento aunque implique mas riesgo", value: "agresivo" },
  ],
  refineQuestions: [
    { id: "yes-questions", label: "Si, haceme las preguntas", value: "si-preguntas" },
    { id: "no-questions", label: "No, mostrame opciones directamente", value: "no-preguntas" },
  ],
  riskTolerance: [
    { id: "no-risk", label: "Prefiero no arriesgar, aunque gane menos", value: "no-arriesgar" },
    { id: "some-risk", label: "Me animo a algo de riesgo si el retorno es mayor", value: "algo-riesgo" },
    { id: "high-risk", label: "Estoy dispuesto a asumir mas riesgo para ganar mas", value: "mas-riesgo" },
  ],
  investmentHorizon: [
    { id: "short", label: "En menos de 3 meses", value: "corto" },
    { id: "medium", label: "Entre 3 meses y un año", value: "mediano" },
    { id: "long", label: "En mas de un año", value: "largo" },
    { id: "unknown", label: "No lo se todavia", value: "no-se" },
  ],
  investmentObjective: [
    { id: "preserve", label: "Que mi plata no pierda valor", value: "preservar" },
    { id: "income", label: "Recibir algun ingreso periodico", value: "renta" },
    { id: "grow", label: "Hacer crecer el capital a largo plazo", value: "crecer" },
    { id: "unclear", label: "No tengo claro todavia", value: "no-claro" },
  ],
  afterExplain: [
    { id: "know-profile", label: "Ya se mi perfil inversor", value: "ya-se-mi-perfil" },
    { id: "discover-profile", label: "Ayudame a descubrirlo", value: "ayudame-a-descubrirlo" },
    { id: "explore-catalog", label: "Ver el catalogo", value: "explorar-catalogo" },
  ],
  afterSuggestions: [
    { id: "see-more", label: "Ver mas opciones", value: "ver-mas" },
    { id: "change-profile", label: "Cambiar perfil", value: "cambiar-perfil" },
    { id: "explore-catalog", label: "Ver catalogo completo", value: "explorar-catalogo" },
  ],
} as const;

// Mensaje de bienvenida con disclaimer
const WELCOME_MESSAGE = `¡Hola! Soy AIKO, el asistente de inversiones del banco.

Puedo ayudarte a encontrar opciones que se adapten a lo que buscas, segun tu perfil y objetivos.

Antes de arrancar, una aclaracion importante: todo lo que te comparto son sugerencias orientativas. No son asesoramiento financiero formal, y tanto AIKO como el banco no nos hacemos responsables por los resultados de las inversiones que decidas hacer. La decision final siempre es tuya.

¿Como preferis arrancar?`;

const EXPLAIN_AIKO = `Soy el asistente de inversiones del banco. Puedo ayudarte a entender que productos tenes disponibles, explicarte como funciona cada uno y sugerirte opciones segun tus objetivos y tolerancia al riesgo.

Lo que no hago es tomar decisiones por vos ni garantizar resultados — eso depende del mercado y de tu propia evaluacion. La ultima palabra siempre es tuya.

¿Como queres arrancar?`;

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [flowState, setFlowState] = useState<AikoFlowState>("welcome");
  const [profileState, setProfileState] = useState<AikoProfileState>({
    declaredProfile: null,
    inferredProfile: null,
    riskAnswer: null,
    horizonAnswer: null,
    objectiveAnswer: null,
    finalProfile: null,
  });
  const [isInitialized, setIsInitialized] = useState(false);

  const addMessage = useCallback((message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []);

  // Inicializar con mensaje de bienvenida
  const initializeChat = useCallback(() => {
    if (isInitialized) return;
    setIsInitialized(true);
    
    addMessage({
      role: "assistant",
      content: WELCOME_MESSAGE,
      contentType: "text",
      chips: CHIPS.welcome as unknown as ChipOption[],
    });
    setFlowState("awaiting-path-selection");
  }, [isInitialized, addMessage]);

  // Inicializar al montar
  if (!isInitialized) {
    initializeChat();
  }

  // Inferir perfil basado en respuestas
  const inferProfile = useCallback((risk: string, horizon: string, objective: string): RiskProfile => {
    // Logica de inferencia segun documento:
    // Conservador: "no arriesgar" + corto plazo, o "No se" en 2+ preguntas
    // Moderado: "algo de riesgo" o plazo mediano
    // Agresivo: "mas riesgo" + largo plazo

    const unknownCount = [horizon, objective].filter(v => v === "no-se" || v === "no-claro").length;
    
    if (unknownCount >= 2 || (risk === "no-arriesgar" && horizon === "corto")) {
      return "conservador";
    }
    
    if (risk === "mas-riesgo" && horizon === "largo") {
      return "agresivo";
    }
    
    if (risk === "algo-riesgo" || horizon === "mediano") {
      return "moderado";
    }
    
    // Default basado en riesgo
    if (risk === "no-arriesgar") return "conservador";
    if (risk === "mas-riesgo") return "agresivo";
    
    return "moderado";
  }, []);

  // Obtener productos por perfil
  const getProductsForProfile = useCallback((profile: RiskProfile) => {
    return mockProducts.filter((p) => {
      if (profile === "conservador") return p.risk === "bajo";
      if (profile === "moderado") return p.risk !== "alto";
      return true;
    });
  }, []);

  // Mostrar sugerencias de productos
  const showSuggestions = useCallback(async (profile: RiskProfile) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const profileLabels: Record<RiskProfile, string> = {
      conservador: "conservador",
      moderado: "moderado", 
      agresivo: "agresivo",
    };

    addMessage({
      role: "assistant",
      content: `Fijate que tengo algunas opciones que podrian ir bien para un perfil ${profileLabels[profile]}. Recorda que son sugerencias orientativas — los rendimientos son estimados y pueden variar segun el mercado.`,
      contentType: "text",
    });

    await new Promise((resolve) => setTimeout(resolve, 300));

    const products = getProductsForProfile(profile);
    for (const product of products.slice(0, 3)) {
      addMessage({
        role: "assistant",
        content: getProductDescription(product.type),
        contentType: "product-card",
        productId: product.id,
      });
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    addMessage({
      role: "assistant",
      content: "¿Queres ver mas opciones o explorar el catalogo completo?",
      contentType: "text",
      chips: CHIPS.afterSuggestions as unknown as ChipOption[],
    });

    setFlowState("conversation");
    setIsLoading(false);
  }, [addMessage, getProductsForProfile]);

  // Descripciones de productos segun tipo (voz AIKO)
  const getProductDescription = (type: string): string => {
    const descriptions: Record<string, string> = {
      "plazo-fijo": "El plazo fijo es la opcion mas simple: sabes de antemano cuanto podrias recibir al final del plazo y el riesgo es bajo. Eso si, el dinero queda inmovilizado hasta el vencimiento.",
      "fci": "Los fondos de liquidez te permiten tener el dinero trabajando y retirarlo cuando quieras, sin esperar un vencimiento. El rendimiento varia mes a mes — lo que ves es el historico reciente, no una promesa de lo que va a rendir.",
      "bono": "Este bono paga en dolares, lo que puede ser interesante si buscas cubrirte de la variacion cambiaria. Tiene mas riesgo que el plazo fijo y el precio puede fluctuar antes del vencimiento.",
      "accion": "Las acciones tienen mayor potencial de crecimiento, pero tambien mayor variacion: el precio puede subir bastante o bajar. Solo las sugiero si tenes horizonte largo y toleras que el valor fluctue en el camino.",
    };
    return descriptions[type] || "";
  };

  // Manejar seleccion de chip
  const selectChip = useCallback(async (chipValue: string) => {
    // Agregar respuesta del usuario
    const chipLabels: Record<string, string> = {
      "ya-se-mi-perfil": "Ya se mi perfil inversor",
      "ayudame-a-descubrirlo": "Ayudame a descubrirlo",
      "explorar-catalogo": "Prefiero explorar el catalogo",
      "que-es-aiko": "¿Que es AIKO?",
      "conservador": "Conservador",
      "moderado": "Moderado",
      "agresivo": "Agresivo",
      "si-preguntas": "Si, haceme las preguntas",
      "no-preguntas": "No, mostrame opciones directamente",
      "no-arriesgar": "Prefiero no arriesgar",
      "algo-riesgo": "Me animo a algo de riesgo",
      "mas-riesgo": "Estoy dispuesto a mas riesgo",
      "corto": "En menos de 3 meses",
      "mediano": "Entre 3 meses y un año",
      "largo": "En mas de un año",
      "no-se": "No lo se todavia",
      "preservar": "Que mi plata no pierda valor",
      "renta": "Recibir ingreso periodico",
      "crecer": "Hacer crecer el capital",
      "no-claro": "No tengo claro todavia",
      "si-correcto": "Si, es correcto",
      "prefiero-moderado": "Preferiria moderado",
      "prefiero-agresivo": "Preferiria agresivo",
      "prefiero-conservador": "Preferiria conservador",
      "ver-mas": "Ver mas opciones",
      "cambiar-perfil": "Cambiar perfil",
    };

    addMessage({
      role: "user",
      content: chipLabels[chipValue] || chipValue,
      contentType: "text",
    });

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 300));

    switch (flowState) {
      case "awaiting-path-selection":
        handlePathSelection(chipValue);
        break;
      case "self-declare-profile":
        handleSelfDeclare(chipValue as RiskProfile);
        break;
      case "ask-refine-questions":
        handleRefineDecision(chipValue);
        break;
      case "onboarding-risk":
        handleRiskAnswer(chipValue);
        break;
      case "onboarding-horizon":
        handleHorizonAnswer(chipValue);
        break;
      case "onboarding-objective":
        handleObjectiveAnswer(chipValue);
        break;
      case "profile-inferred":
        handleProfileConfirmation(chipValue);
        break;
      case "profile-contradiction":
        handleContradictionResolution(chipValue);
        break;
      case "explain-aiko":
        handlePathSelection(chipValue);
        break;
      case "conversation":
        handleConversation(chipValue);
        break;
    }

    setIsLoading(false);
  }, [flowState, addMessage, profileState, showSuggestions, inferProfile]);

  const handlePathSelection = useCallback((value: string) => {
    switch (value) {
      case "ya-se-mi-perfil":
        addMessage({
          role: "assistant",
          content: "¿Con cual de estos perfiles te identificas?",
          contentType: "text",
          chips: CHIPS.profileSelection as unknown as ChipOption[],
        });
        setFlowState("self-declare-profile");
        break;
      
      case "ayudame-a-descubrirlo":
        addMessage({
          role: "assistant",
          content: "Primera pregunta: cuando invertis, ¿como te sentis mas comodo?",
          contentType: "text",
          chips: CHIPS.riskTolerance as unknown as ChipOption[],
        });
        setFlowState("onboarding-risk");
        break;
      
      case "explorar-catalogo":
        addMessage({
          role: "assistant",
          content: "Sin problema. Te dejo explorar. Si en algun momento queres que te de una mano para elegir, avisame.",
          contentType: "text",
        });
        setFlowState("catalog-redirect");
        // En una implementacion real, redirigir al catalogo
        break;
      
      case "que-es-aiko":
        addMessage({
          role: "assistant",
          content: EXPLAIN_AIKO,
          contentType: "text",
          chips: CHIPS.afterExplain as unknown as ChipOption[],
        });
        setFlowState("explain-aiko");
        break;
    }
  }, [addMessage]);

  const handleSelfDeclare = useCallback((profile: RiskProfile) => {
    setProfileState(prev => ({ ...prev, declaredProfile: profile }));
    
    addMessage({
      role: "assistant",
      content: `Anotado, perfil ${profile}.

Si queres, puedo hacerte un par de preguntas rapidas para entender mejor que estas buscando y afinar las sugerencias. No es obligatorio — si preferis que arranque con las opciones de tu perfil directamente, tambien esta bien.`,
      contentType: "text",
      chips: CHIPS.refineQuestions as unknown as ChipOption[],
    });
    setFlowState("ask-refine-questions");
  }, [addMessage]);

  const handleRefineDecision = useCallback((value: string) => {
    if (value === "si-preguntas") {
      addMessage({
        role: "assistant",
        content: "Primera pregunta: cuando invertis, ¿como te sentis mas comodo?",
        contentType: "text",
        chips: CHIPS.riskTolerance as unknown as ChipOption[],
      });
      setFlowState("onboarding-risk");
    } else {
      // Usar perfil declarado directamente
      const profile = profileState.declaredProfile || "moderado";
      setProfileState(prev => ({ ...prev, finalProfile: profile }));
      showSuggestions(profile);
    }
  }, [addMessage, profileState.declaredProfile, showSuggestions]);

  const handleRiskAnswer = useCallback((value: string) => {
    setProfileState(prev => ({ ...prev, riskAnswer: value }));
    
    addMessage({
      role: "assistant",
      content: "Entendido. Segunda pregunta: ¿en cuanto tiempo pensas que podrias necesitar ese dinero?",
      contentType: "text",
      chips: CHIPS.investmentHorizon as unknown as ChipOption[],
    });
    setFlowState("onboarding-horizon");
  }, [addMessage]);

  const handleHorizonAnswer = useCallback((value: string) => {
    setProfileState(prev => ({ ...prev, horizonAnswer: value }));
    
    addMessage({
      role: "assistant",
      content: "Ultima pregunta: ¿que es lo que mas te importa de esta inversion?",
      contentType: "text",
      chips: CHIPS.investmentObjective as unknown as ChipOption[],
    });
    setFlowState("onboarding-objective");
  }, [addMessage]);

  const handleObjectiveAnswer = useCallback((value: string) => {
    const newProfileState = { ...profileState, objectiveAnswer: value };
    setProfileState(newProfileState);
    
    const inferredProfile = inferProfile(
      newProfileState.riskAnswer || "algo-riesgo",
      newProfileState.horizonAnswer || "mediano",
      value
    );
    
    setProfileState(prev => ({ ...prev, inferredProfile }));

    // Verificar contradiccion con perfil declarado
    if (profileState.declaredProfile && profileState.declaredProfile !== inferredProfile) {
      // Hay contradiccion
      const profileLabels: Record<RiskProfile, string> = {
        conservador: "conservador",
        moderado: "moderado",
        agresivo: "agresivo",
      };
      
      addMessage({
        role: "assistant",
        content: `Fijate algo interesante: te definiste como ${profileLabels[profileState.declaredProfile]}, pero por lo que me contaste — ${getRiskDescription(newProfileState.riskAnswer)} y ${getHorizonDescription(newProfileState.horizonAnswer)} — las preguntas me dan un perfil mas ${profileLabels[inferredProfile]}.

No hay una respuesta correcta, las dos son validas. ¿Con cual preferis que trabaje?`,
        contentType: "text",
        chips: [
          { id: "declared", label: `Con el que declare — ${profileLabels[profileState.declaredProfile]}`, value: `usar-${profileState.declaredProfile}` },
          { id: "inferred", label: `Con el que me sugirio AIKO — ${profileLabels[inferredProfile]}`, value: `usar-${inferredProfile}` },
          { id: "explain", label: "Explicame la diferencia", value: "explicar-diferencia" },
        ],
      });
      setFlowState("profile-contradiction");
    } else {
      // No hay contradiccion o no habia perfil declarado
      const profileLabels: Record<RiskProfile, string> = {
        conservador: "conservador: priorizas no arriesgar y tener el dinero disponible en el corto plazo",
        moderado: "moderado: buscas un balance entre seguridad y rentabilidad",
        agresivo: "agresivo: estas dispuesto a mayor riesgo por mayor potencial de ganancia",
      };
      
      addMessage({
        role: "assistant",
        content: `Con lo que me contaste, tu perfil seria ${profileLabels[inferredProfile]}.

¿Te reconoces en ese perfil o lo cambiarias?`,
        contentType: "text",
        chips: [
          { id: "correct", label: "Si, es correcto", value: "si-correcto" },
          { id: "prefer-mod", label: "Preferiria moderado", value: "prefiero-moderado" },
          { id: "prefer-agg", label: "Preferiria agresivo", value: "prefiero-agresivo" },
          { id: "prefer-cons", label: "Preferiria conservador", value: "prefiero-conservador" },
        ].filter(c => c.value !== `prefiero-${inferredProfile}` && c.value !== "si-correcto" || c.value === "si-correcto"),
      });
      setFlowState("profile-inferred");
    }
  }, [addMessage, profileState, inferProfile]);

  const getRiskDescription = (risk: string | null): string => {
    const descriptions: Record<string, string> = {
      "no-arriesgar": "preferis no arriesgar",
      "algo-riesgo": "aceptas algo de riesgo",
      "mas-riesgo": "buscas mas riesgo",
    };
    return descriptions[risk || ""] || "";
  };

  const getHorizonDescription = (horizon: string | null): string => {
    const descriptions: Record<string, string> = {
      "corto": "necesitas el dinero pronto",
      "mediano": "tu horizonte es de mediano plazo",
      "largo": "tenes horizonte largo",
      "no-se": "no estas seguro del plazo",
    };
    return descriptions[horizon || ""] || "";
  };

  const handleProfileConfirmation = useCallback((value: string) => {
    let finalProfile: RiskProfile;
    
    if (value === "si-correcto") {
      finalProfile = profileState.inferredProfile || "moderado";
    } else if (value.startsWith("prefiero-")) {
      finalProfile = value.replace("prefiero-", "") as RiskProfile;
      addMessage({
        role: "assistant",
        content: `Anotado, ${finalProfile}. Lo tengo en cuenta para las sugerencias.`,
        contentType: "text",
      });
    } else {
      finalProfile = profileState.inferredProfile || "moderado";
    }
    
    setProfileState(prev => ({ ...prev, finalProfile }));
    showSuggestions(finalProfile);
  }, [addMessage, profileState.inferredProfile, showSuggestions]);

  const handleContradictionResolution = useCallback((value: string) => {
    if (value === "explicar-diferencia") {
      const declared = profileState.declaredProfile;
      const inferred = profileState.inferredProfile;
      
      addMessage({
        role: "assistant",
        content: `Te cuento:

El perfil que declaraste (${declared}) implica ${getProfileExplanation(declared)}

El perfil que inferi (${inferred}) ${getProfileExplanation(inferred)}

Dado que me dijiste que ${getHorizonDescription(profileState.horizonAnswer)}, un perfil ${declared} podria implicar un riesgo ${declared === "agresivo" ? "mayor al que queres asumir" : "diferente al que buscas"}. Pero la decision es tuya.

¿Con cual seguimos?`,
        contentType: "text",
        chips: [
          { id: "use-declared", label: `Con el ${declared} igual`, value: `usar-${declared}` },
          { id: "use-inferred", label: `Con el ${inferred}`, value: `usar-${inferred}` },
          { id: "use-moderate", label: "Con el moderado, como punto medio", value: "usar-moderado" },
        ],
      });
    } else if (value.startsWith("usar-")) {
      const profile = value.replace("usar-", "") as RiskProfile;
      setProfileState(prev => ({ ...prev, finalProfile: profile }));
      
      addMessage({
        role: "assistant",
        content: "Entendido.",
        contentType: "text",
      });
      
      showSuggestions(profile);
    }
  }, [addMessage, profileState, showSuggestions]);

  const getProfileExplanation = (profile: RiskProfile | null): string => {
    const explanations: Record<RiskProfile, string> = {
      agresivo: "estar dispuesto a que el valor de tu inversion suba y baje bastante, a cambio de un mayor potencial de crecimiento. Es mas adecuado cuando el dinero que invertis no lo vas a necesitar por un buen tiempo.",
      conservador: "prioriza no perder capital y tener liquidez disponible pronto, aunque el rendimiento sea menor.",
      moderado: "busca un balance entre seguridad y rendimiento, aceptando cierta volatilidad por mejores retornos.",
    };
    return explanations[profile || "moderado"];
  };

  const handleConversation = useCallback((value: string) => {
    switch (value) {
      case "ver-mas":
        const profile = profileState.finalProfile || "moderado";
        const products = getProductsForProfile(profile);
        const remaining = products.slice(3);
        
        if (remaining.length > 0) {
          addMessage({
            role: "assistant",
            content: "Aca tenes mas opciones:",
            contentType: "text",
          });
          remaining.forEach(product => {
            addMessage({
              role: "assistant",
              content: getProductDescription(product.type),
              contentType: "product-card",
              productId: product.id,
            });
          });
        } else {
          addMessage({
            role: "assistant",
            content: "Ya te mostre todas las opciones para tu perfil. ¿Queres ver el catalogo completo o cambiar tu perfil?",
            contentType: "text",
            chips: [
              { id: "catalog", label: "Ver catalogo completo", value: "explorar-catalogo" },
              { id: "change", label: "Cambiar perfil", value: "cambiar-perfil" },
            ],
          });
        }
        break;
      
      case "cambiar-perfil":
        addMessage({
          role: "assistant",
          content: "¿Con cual de estos perfiles te identificas?",
          contentType: "text",
          chips: CHIPS.profileSelection as unknown as ChipOption[],
        });
        setFlowState("self-declare-profile");
        setProfileState({
          declaredProfile: null,
          inferredProfile: null,
          riskAnswer: null,
          horizonAnswer: null,
          objectiveAnswer: null,
          finalProfile: null,
        });
        break;
      
      case "explorar-catalogo":
        addMessage({
          role: "assistant",
          content: "Te dejo explorar el catalogo. Si en algun momento queres que te de una mano, avisame.",
          contentType: "text",
        });
        break;
    }
  }, [addMessage, profileState.finalProfile, getProductsForProfile]);

  // Manejar mensaje de texto libre
  const sendMessage = useCallback((content: string) => {
    addMessage({
      role: "user",
      content,
      contentType: "text",
    });

    setIsLoading(true);
    
    setTimeout(async () => {
      const lowerContent = content.toLowerCase();
      
      // Detectar intenciones
      if (lowerContent.includes("transferencia") || lowerContent.includes("pago") || lowerContent.includes("debito")) {
        addMessage({
          role: "assistant",
          content: "Eso esta fuera de lo que puedo hacer desde aca — soy el asistente de inversiones y no tengo acceso a tus operaciones bancarias generales.\n\nPara transferencias, podes ir directo al homebanking.",
          contentType: "text",
          chips: [{ id: "back", label: "Volver a inversiones", value: "volver-inversiones" }],
        });
      } else if (lowerContent.includes("garantiza") || lowerContent.includes("seguro") || lowerContent.includes("ganancia segura")) {
        addMessage({
          role: "assistant",
          content: "Ninguna inversion tiene resultado garantizado — eso incluye todo lo que te sugiero aca.\n\nLo que hago es mostrarte opciones que historicamente se comportaron de cierta manera y que se ajustan a tu perfil. Pero el resultado final depende del mercado, y puede ser distinto al estimado.\n\nLa decision es tuya, y te recomiendo tomarte el tiempo que necesites antes de elegir.",
          contentType: "text",
          chips: [
            { id: "continue", label: "Entendido, seguimos", value: "entendido" },
            { id: "catalog", label: "Ver el catalogo", value: "explorar-catalogo" },
          ],
        });
      } else if (lowerContent.includes("gracias") || lowerContent.includes("listo") || lowerContent.includes("chau")) {
        addMessage({
          role: "assistant",
          content: "Cuando quieras seguir explorando, estoy aca.\n¡Hasta la proxima!",
          contentType: "text",
        });
      } else if (lowerContent.includes("fci") || lowerContent.includes("fondo")) {
        addMessage({
          role: "assistant",
          content: "Un fondo comun de inversion es un fondo donde vos y otros inversores ponen dinero, y un equipo de profesionales decide como invertirlo colectivamente.\n\nLa ventaja es que con poco capital accedes a una cartera diversificada, sin tener que comprar activos uno por uno. Los hay de distintos perfiles: algunos muy conservadores, otros mas agresivos.\n\nEl rendimiento depende de como le vaya al fondo — no es fijo ni garantizado.\n\n¿Queres que te muestre los fondos disponibles?",
          contentType: "text",
          chips: [
            { id: "show", label: "Si, mostrame", value: "mostrar-fci" },
            { id: "other", label: "Tengo otra pregunta", value: "otra-pregunta" },
            { id: "no", label: "No, gracias", value: "no-gracias" },
          ],
        });
      } else if (lowerContent.includes("plazo fijo")) {
        const plazoFijos = mockProducts.filter(p => p.type === "plazo-fijo");
        addMessage({
          role: "assistant",
          content: "Te cuento sobre los plazos fijos:",
          contentType: "text",
        });
        plazoFijos.forEach(product => {
          addMessage({
            role: "assistant",
            content: getProductDescription(product.type),
            contentType: "product-card",
            productId: product.id,
          });
        });
      } else if (lowerContent.includes("bono")) {
        const bonos = mockProducts.filter(p => p.type === "bono");
        addMessage({
          role: "assistant",
          content: "Te cuento sobre los bonos disponibles:",
          contentType: "text",
        });
        bonos.forEach(product => {
          addMessage({
            role: "assistant",
            content: getProductDescription(product.type),
            contentType: "product-card",
            productId: product.id,
          });
        });
      } else if (lowerContent.includes("accion") || lowerContent.includes("acciones")) {
        const acciones = mockProducts.filter(p => p.type === "accion");
        addMessage({
          role: "assistant",
          content: "Te cuento sobre las acciones:",
          contentType: "text",
        });
        acciones.forEach(product => {
          addMessage({
            role: "assistant",
            content: getProductDescription(product.type),
            contentType: "product-card",
            productId: product.id,
          });
        });
      } else {
        // Mensaje no entendido
        addMessage({
          role: "assistant",
          content: "No entendi bien lo que me queres decir. ¿Me podes contar un poco mas que estas buscando?",
          contentType: "text",
          chips: [
            { id: "invest", label: "Quiero invertir", value: "quiero-invertir" },
            { id: "question", label: "Tengo una duda", value: "tengo-duda" },
            { id: "catalog", label: "Ver el catalogo", value: "explorar-catalogo" },
          ],
        });
      }
      
      setIsLoading(false);
    }, 600 + Math.random() * 400);
  }, [addMessage]);

  return {
    messages,
    isLoading,
    flowState,
    profileState,
    sendMessage,
    selectChip,
  };
}
