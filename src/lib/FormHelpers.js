/**
 * Date string for use with JS Date()
 * @param {string} date - Date string (YYYY-MM-DD)
 * @return {string} - Date string (YYYY/MM/DD)
**/
export function parseDate(date){
  if(!date){ return (new Date()).toString() };
  let slashed = date.replace(/-/g, '/');
  return new Date(slashed).toString();
}

/**
 * Date string for use with Date Input fields
 * @param {string} date - Date String
 * @return {string} - Date string (YYYY-MM-DD)
**/
export function dateInputDefault(date=null){
  date = date ? new Date(date) : new Date();
  let elements = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  let padded = elements.map((elem) =>  (elem < 10 ? ('0' + elem) : elem));
  return padded.join('-');
}
