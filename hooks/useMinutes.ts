import { useTranslation } from "react-i18next";

export const useMinutes = () => {
  const { t } = useTranslation();

  return {
    minutes: [
      { _id: 0, name: "00:00" },
      { _id: 30, name: "00:30" },
      { _id: 60, name: "01:00" },
      { _id: 90, name: "01:30" },
      { _id: 120, name: "02:00" },
      { _id: 150, name: "02:30" },
      { _id: 180, name: "03:00" },
      { _id: 210, name: "03:30" },
      { _id: 240, name: "04:00" },
      { _id: 270, name: "04:30" },
      { _id: 300, name: "05:00" },
      { _id: 330, name: "05:30" },
      { _id: 360, name: "06:00" },
      { _id: 390, name: "06:30" },
      { _id: 420, name: "07:00" },
      { _id: 450, name: "07:30" },
      { _id: 480, name: "08:00" },
      { _id: 510, name: "08:30" },
      { _id: 540, name: "09:00" },
      { _id: 570, name: "09:30" },
      { _id: 600, name: "10:00" },
      { _id: 630, name: "10:30" },
      { _id: 660, name: "11:00" },
      { _id: 690, name: "11:30" },
      { _id: 720, name: "12:00" },
      { _id: 750, name: "12:30" },
      { _id: 780, name: "13:00" },
      { _id: 810, name: "13:30" },
      { _id: 840, name: "14:00" },
      { _id: 870, name: "14:30" },
      { _id: 900, name: "15:00" },
      { _id: 930, name: "15:30" },
      { _id: 960, name: "16:00" },
      { _id: 990, name: "16:30" },
      { _id: 1020, name: "17:00" },
      { _id: 1050, name: "17:30" },
      { _id: 1080, name: "18:00" },
      { _id: 1110, name: "18:30" },
      { _id: 1140, name: "19:00" },
      { _id: 1170, name: "19:30" },
      { _id: 1200, name: "20:00" },
      { _id: 1230, name: "20:30" },
      { _id: 1260, name: "21:00" },
      { _id: 1290, name: "21:30" },
      { _id: 1320, name: "22:00" },
      { _id: 1350, name: "22:30" },
      { _id: 1380, name: "23:00" },
      { _id: 1410, name: "23:30" },
      { _id: -1, name: t("closed") },
    ],
  };
};
