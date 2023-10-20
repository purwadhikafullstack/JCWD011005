import { useEffect } from "react";

export function useRedirectOnInvalidDates(checkin, checkout) {
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (checkin < today || checkout < tomorrow || checkout < checkin || isNaN(checkin) || isNaN(checkout)) {

      window.history.back();
    }
  }, [checkin, checkout]);
}
