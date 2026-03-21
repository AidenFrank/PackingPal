export function createCampingTemplate() {
  return {
    basicDetails: {
      title: "",
      location: {
        name: "",
        address: "",
      },
      travel: {
        method: "",
        distanceMiles: null,
        estimatedTravelTime: "",
        vehicle: "",
      },
      weather: {
        expectedHigh: null,
        expectedLow: null,
        conditions: "",
      },
      timeframe: {
        durationDays: null,
        durationNights: null,
        departDay: "",
        departTime: "",
        returnDay: "",
        returnTime: "",
        season: "",
        flexible: false,
      },
      people: [
        {
          name: "",
          role: "",
        },
      ],
      safety: {
        emergencyContacts: [],
      },
    },
    packingList: {},
  };
}
