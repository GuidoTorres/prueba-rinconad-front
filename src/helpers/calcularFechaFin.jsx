import moment from "moment";

export const addDays = (date, daysToAdd, tareo) => {
  const WEEKEND = [moment().day("Friday").weekday()];
  let daysAdded = 0,
    momentDate = moment(new Date(date));

    if (tareo === "asociacion") {
      while (daysAdded < daysToAdd) {
        momentDate = momentDate.add(1, "days");
        if (!WEEKEND.includes(momentDate.weekday())) {
          daysAdded++;
          console.log(WEEKEND.includes(momentDate.weekday()));
        }
      }
    }

  if (tareo === "Lunes a sabado") {
    while (daysAdded < daysToAdd) {
      momentDate = momentDate.add(1, "days");
      if (!WEEKEND.includes(momentDate.weekday())) {
        daysAdded++;
        console.log(WEEKEND.includes(momentDate.weekday()));
      }
    }
  }

  if (tareo === "Mes cerrado") {
    // dias para los trabajdores que son jefes + 7 dias
    momentDate = momentDate.add(daysToAdd + 1, "days");
  }

  let fecha = momentDate._d?.toISOString().split("T")[0];
  return fecha;
};
