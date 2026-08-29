import { _safeTrim, _roundMoney } from "public/mmUtils";
export function buildVerifactuQrUrl(params = {}) {
    const nifEmisor = _safeTrim(params.nifEmisor).toUpperCase();
    const numTicket = _safeTrim(params.numTicketFactura || params.numTicket);
    const fechaExpedicion = _safeTrim(params.fechaExpedicion || params.diaKey);
    const importeTotal = _roundMoney(params.importeTotal);
    const huella = _safeTrim(params.huellaSha256 || params.hashCadena).slice(0, 8).toUpperCase();
    if (!nifEmisor || !numTicket || !fechaExpedicion) {
        return "";
    }
    const queryParams = new URLSearchParams({
        nif: nifEmisor,
        num: numTicket,
        fec: fechaExpedicion,
        imp: importeTotal.toFixed(2),
        hc: huella,
    });
    return `https://sede.agenciatributaria.gob.es/verifactu/consulta?${queryParams.toString()}`;
}
export function generateTicketQrSvg(payloadText, size = 128) {
    const text = _safeTrim(payloadText);
    if (!text) return "";
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
        <rect width="100%" height="100%" fill="#ffffff"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="6" fill="#111111" font-family="monospace">
            QR:${text.slice(0, 24)}...
        </text>
    </svg>`;
}
