async function getGeoLocation(ip) {
    console.log("Fetching geolocation for IP:", ip);
    try {
        if (
            !ip ||
            ip === "unknown" ||
            ip === "::1" ||
            ip.startsWith("127.") ||
            ip.startsWith("10.") ||
            ip.startsWith("192.168.")
        ) {
            return {
                country: "unknown",
                region: "unknown",
                city: "unknown",
            };
        }

        const response = await fetch(
            `https://ipapi.co/${encodeURIComponent(ip)}/json/`,
            { signal: AbortSignal.timeout(2000) }
        );

        if (!response.ok) {
            throw new Error("Geolocation lookup failed");
        }

        const data = await response.json();
        console.log("Geo lookup data:", data);

        if (data.error) {
            throw new Error("Geolocation provider returned an error");
        }

        return {
            country: data.country_name || "unknown",
            region: data.region || "unknown",
            city: data.city || "unknown",
        };
    } catch (error) {
        console.error("Geo lookup failed:", error.message);

        return {
            country: "unknown",
            region: "unknown",
            city: "unknown",
        };
    }
}

module.exports = getGeoLocation;