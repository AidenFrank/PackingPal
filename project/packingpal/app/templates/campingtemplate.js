export function createCampingTemplate() {
  return {
    basicDetails: {
      title: "",
      location: {
        name: "",
        address: "",
        type: "",
      },
      travel: {
        method: "",
        distanceMiles: 0,
        estimatedTravelTime: "",
        vehicle: "",
      },
      weather: {
        expectedHigh: 0,
        expectedLow: 0,
        conditions: "",
      },
      timeframe: {
        durationDays: 0,
        durationNights: 0,
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
