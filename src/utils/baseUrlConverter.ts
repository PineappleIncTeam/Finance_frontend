export function getCorrectBaseUrl() {
    if (typeof window !== "undefined") { // Используем двойные кавычки
        if (window.location.hostname === "localhost") {
            return "https://dev.freenance.store"; // Также двойные кавычки здесь
        }

        const envDomainName = window.location.hostname.split(".")[0];
        return `https://${envDomainName}.freenance.store`; // Используем шаблонные строки
    } else {
        return "https://dev.freenance.store"; // Двойные кавычки
    }
}