"use client";

import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/tracking";

export default function FloatingWhatsApp() {
    return (
        <a
            href="https://wa.me/573147872392?text=Hola,%20busco%20asesor%C3%ADa%20inmobiliaria"
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-[60px] h-[60px] bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:scale-110 hover:-translate-y-1 transition-all duration-300"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle className="w-8 h-8 drop-shadow-md" />
        </a>
    );
}
