'use strict';

const TourSIMDataEstimate = (() => {
  const dayChoices = Object.freeze([3, 5, 7, 8, 10, 14, 30]);
  const maxDays = 365;
  const megabytesPerGigabyte = 1000;
  const reserveFactor = 1.25;
  const backgroundMb = 50;

  // Rates and model assumptions from the TourSIM research notes, sections 4–7.
  const musicMbPerHour = 72; // Spotify High at 160 kbit/s.
  const socialMbPerHour = 800; // TourSIM estimate for a feed with short videos.
  const videoMbPerHour = 700; // Netflix Medium can use up to 0.7 GB/hour.
  const videoHdMbPerHour = 3000; // Netflix HD can use up to 3 GB/hour.
  const callsMbPerHour = 1080; // Zoom 720p, estimated from both directions at 1.2 Mbit/s each.

  const dailyUsageMb = {
    basics: { light: 50, daily: 100 + 10, frequent: 150 + 20 },
    music: { none: 0, half: musicMbPerHour / 2, hour: musicMbPerHour, two: musicMbPerHour * 2 },
    social: { none: 0, quarter: socialMbPerHour / 4, half: socialMbPerHour / 2, hour: socialMbPerHour, two: socialMbPerHour * 2 },
    video: { none: 0, half: videoMbPerHour / 2, hour: videoMbPerHour, two: videoMbPerHour * 2, hdHour: videoHdMbPerHour },
    calls: { none: 0, quarter: callsMbPerHour / 4, half: callsMbPerHour / 2, hour: callsMbPerHour, two: callsMbPerHour * 2 },
    files: { wifi: 0, photos: 20 * 3, photosAndFile: 20 * 3 + 100, large: 500 }
  };
  const peopleCounts = { one: 1, two: 2, three: 3, four: 4 };

  const questions = Object.freeze(Object.fromEntries(
    Object.entries({ ...dailyUsageMb, people: peopleCounts }).map(([question, choices]) =>
      [question, Object.freeze(Object.keys(choices))])
  ));
  const maxDailyMbPerPerson = Object.values(dailyUsageMb).reduce(
    (total, choices) => total + Math.max(...Object.values(choices)), backgroundMb
  );
  const maxPeople = Math.max(...Object.values(peopleCounts));
  const maxFilterGb = Math.ceil(maxDailyMbPerPerson * maxPeople * maxDays * reserveFactor / megabytesPerGigabyte);

  function answerValue(answers, question, choices) {
    const choice = Object.hasOwn(answers, question) && answers[question];
    if (typeof choice !== 'string' || !Object.hasOwn(choices, choice)) {
      throw new RangeError(`Invalid answer for ${question}`);
    }
    return choices[choice];
  }

  function estimate(days, answers) {
    if (!Number.isInteger(days) || days < 1 || days > maxDays) {
      throw new RangeError(`Trip length must be between 1 and ${maxDays} days`);
    }
    if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
      throw new RangeError('Answers must be an object');
    }

    const people = answerValue(answers, 'people', peopleCounts);
    const dailyMbPerPerson = Object.entries(dailyUsageMb).reduce(
      (total, [question, choices]) => total + answerValue(answers, question, choices), backgroundMb
    );
    const dailyMb = dailyMbPerPerson * people;
    const tripMb = dailyMb * days;
    const totalMb = tripMb * reserveFactor;
    const totalGb = totalMb / megabytesPerGigabyte;
    return { days, people, dailyMb, tripMb, totalMb, totalGb };
  }

  return Object.freeze({ dayChoices, maxDays, maxFilterGb, questions, estimate });
})();

if (typeof module === 'object' && module.exports) {
  module.exports = TourSIMDataEstimate;
}
