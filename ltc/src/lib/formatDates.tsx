//  //unused function (not quite working) for formatting event dates for Add to calendar button
//  const formatDates = ({ eventDate }: { eventDate: EventDate }) => {
//     //function not quite working - does not correctly define the end date where there is a different end date to the start date in the second part of the eventDate.when string
//     //works for events.json data, does not work for actual api call where endTimeString defined on line 84 has a day and month specified
//     if (!eventDate) {
//       return {
//         startDate: "10/06/2024 09:00 AM",
//         endDate: "10/06/2024 11:00 AM",
//       };
//     }

//     let startTimeMatch = null;
//     let endTimeMatch = null;
//     let startTime = null;
//     let eventStartDate = null;
//     let eventEndDate = null;
//     let endTime = null;
//     let endDateString = null;
//     let startDateString = null;
//     const startMonthMatch = eventDate.start_date?.match(/^[A-Za-z]+/);

//     //handle making sure month abbrev is three chars long for parsing
//     if (startMonthMatch && startMonthMatch[0].length > 3) {
//       const truncEventStart = eventDate.start_date;
//       const startDateBeg = truncEventStart.slice(0, 3);
//       const startDateEnd = truncEventStart.slice(4);
//       eventStartDate = startDateBeg + startDateEnd;
//     } else if (startMonthMatch && startMonthMatch[0].length === 3) {
//       eventStartDate = startMonthMatch[0];
//     }
//     //update startTime
//     startTimeMatch = eventDate.when.match(/\d{2}:\d{2}/);
//     startTime = startTimeMatch?.[0];
//     startDateString = `${eventStartDate} ${startTime}`;
//     const startDateTime = parse(startDateString, "MMM d HH:mm", new Date());

//     //handle if there is an end time in eventDate.when, if not, create an endTime value (assumed +1hrs) and assign eventEndDate the same value as startDate
//     if (!/–/.test(eventDate.when)) {
//       startTimeMatch = eventDate.when.match(/\d{2}:\d{2}/);
//       startTime = startTimeMatch?.[0];
//       if (startTime) {
//         const parsedTime = parse(startTime, "HH:mm", new Date());
//         const endTimeString = addMinutes(parsedTime, 60).toString();
//         endTimeMatch = endTimeString.match(/\d{2}:\d{2}/);
//         endTime = endTimeMatch?.[0];
//       }
//       eventEndDate = eventStartDate;
//     } else {
//       //handle if there is a start and endTim in eventDate.when, split the string at the - and reassign values for parsing and formatting
//       let [startTimeString, endTimeString] = eventDate.when.split("–");
//       startTimeMatch = startTimeString.match(/\d{2}:\d{2}/);
//       startTime = startTimeMatch?.[0];
//       endTimeMatch = endTimeString.match(/\d{2}:\d{2}/);
//       endTime = endTimeMatch?.[0];
//       const endDateDayMatch = endTimeString.match(/\d{1,2} /);
//       const endDateDay = endDateDayMatch?.[0];
//       const endDateMonthMatch = endTimeString.match(/^[A-Za-z]+/g);
//       console.log(
//         endDateMonthMatch,
//         "endDateMonthMatch",
//         endTimeString,
//         "<<endTimeString",
//         thisEvent,
//         "<<thisEvent"
//       );
//       if (!endDateMonthMatch) {
//         if (startMonthMatch && startMonthMatch[0].length > 3) {
//           const truncEventStart = eventDate.start_date;
//           const startDateBeg = truncEventStart.slice(0, 3);
//           const startDateEnd = truncEventStart.slice(4);
//           eventStartDate = startDateBeg + startDateEnd;
//         } else if (startMonthMatch && startMonthMatch[0].length === 3) {
//           eventStartDate = startMonthMatch[0];
//         }
//         endDateString = `${eventStartDate} ${endTime}`;
//       }

//       let endDateMonth = endDateMonthMatch?.[0];
//       //iif there is a match for a seperate date in the endTimeString, format endDateString correctly for parsing
//       if (endDateDay && endDateMonth) {
//         if (endDateMonth.length <= 3) {
//           endDateString = `${endDateMonth} ${endDateDay} ${endTime}`;
//         } else {
//           endDateMonth = endDateMonth.slice(0, 3);
//           endDateString = `${endDateMonth} ${endDateDay} ${endTime}`;
//         }
//       }
//     }

//     endDateString = `${eventStartDate} ${endTime}`;
//     console.log(endDateString, "<<endDateString", thisEvent, "<<thisEvent");
//     //need to amend so
//     let endDateTime = parse(endDateString, "MMM d HH:mm", new Date());

//     const endFormatted = format(endDateTime, "MM/dd/yyyy hh:mm aa");

//     const startFormatted = format(startDateTime, "MM/dd/yyyy hh:mm aa");

//     return {
//       startDate: startFormatted,
//       endDate: endFormatted,
//     };
//   };
