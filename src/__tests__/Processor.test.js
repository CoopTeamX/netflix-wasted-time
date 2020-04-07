import moment from "moment";

import Processor from "../Processor/Processor";

describe("Processor unit tests", function () {
  describe("getLocale", function () {
    it("fr", function () {
      const medias = [
        {
          dates: [
            "06/04/2020",
            "07/04/2020",
            "08/04/2020",
            "09/04/2020",
            "10/04/2020",
            "11/04/2020",
            "12/04/2020",
            "13/04/2020"
          ]
        }
      ]
      expect(Processor.getLocale(medias)).toEqual("DD/MM/YYYY");
    });

    it("en", function () {
      const medias = [
        {
          dates: [
            "06/01/2020",
            "07/02/2020",
            "08/03/2020",
            "09/04/2020",
            "10/05/2020",
            "11/09/2020",
            "12/13/2020",
            "12/04/2020"
          ]
        }
      ]
      expect(Processor.getLocale(medias)).toEqual("MM/DD/YYYY");
    });
  });

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
            "19/04/2020",
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
          dates: ["13/04/2020"],
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

    it("with american date format", function() {
      const medias = [
        {
          runtime: 60,
          dates: [
            "04/06/2020",
            "04/07/2020",
            "04/08/2020",
            "04/09/2020",
            "04/10/2020",
            "04/11/2020",
            "04/19/2020",
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
    })
  });
});
