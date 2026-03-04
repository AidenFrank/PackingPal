export function createCampingTemplate() {
  return {
    basicDetails: {
      title: "",
      location: "",
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
      people: 0,
    },
    packingList: {},
  };
}
