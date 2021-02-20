// Server: 0 = Monday, 1 = Tuesday, 6 = Sunday
// Client: 0 = Sunday, 1 = Monday, 6 = Saturday
const convertToLocalWeekday = (weekday: number): number =>
    (weekday + 1) % 7;

export default convertToLocalWeekday;
