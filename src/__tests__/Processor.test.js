import Processor from "../Processor/Processor";

describe("Processor unit tests", function () {
  describe("hashRuntimeByDate", function () {
    it("same media every weekday", function () {
      const medias = [
        {
          runtime: 60,
          dates: [
            "06/04/2020",
            "07/04/2020",
            "08/04/2020",
            "09/04/2020",
            "10/04/2020",
            "11/04/2020",
            "12/04/2020",
          ],
        },
      ];

      return Processor.hashRuntimeByDate(medias).then((results) => {
        expect(results).toEqual([
          { day: "1", average: 60 },
          { day: "2", average: 60 },
          { day: "3", average: 60 },
          { day: "4", average: 60 },
          { day: "5", average: 60 },
          { day: "6", average: 60 },
          { day: "7", average: 60 },
        ]);
      });
    });

    it("monday only", function () {
      const medias = [
        {
          runtime: 60,
          dates: ["06/04/2020"],
        },
      ];

      return Processor.hashRuntimeByDate(medias).then((results) => {
        expect(results).toEqual([{ day: "1", average: 60 }]);
      });
    });

    it("monday only", function () {
      const medias = [
        {
          runtime: 60,
          dates: ["06/04/2020"],
        },
        {
          runtime: 120,
          dates: ["13/04/2020"],
        },
        {
          runtime: 30,
          dates: ["30/12/2019"],
        },
      ];

      return Processor.hashRuntimeByDate(medias).then((results) => {
        expect(results).toEqual([{ day: "1", average: 70 }]);
      });
    });
  });
});
