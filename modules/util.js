/**
 * @param {String} command
 * @returns {Object} - Объект с командой и подкомандой
 */
const searchSubcommand = command => {
  const arrRegex = [
    { regex: /^user/i, regexName: `user` },
    { regex: /^sort/i, regexName: `sort` },
    { regex: /^date/i, regexName: `date` }
  ];
  let subcommand;

  for (let i = 0; i < arrRegex.length; i++) {
    let searchCommand = command.search(arrRegex[i].regex);

    if (searchCommand !== -1) {
      subcommand = command.replace(arrRegex[i].regex, ``).trim();
      command = arrRegex[i].regexName;
      break;
    }
  }

  return { command, subcommand };
};
/**
 * @param {String} text
 */
const writeTextInConsole = (text = `======> Result command!`) => {
  console.log(text);
};
/**
 * @param {String} str строка для замены
 * @param {String} strReplace что заменяем
 * @param {String} strInReplace на что заменяем
 * @returns {String} строку
 */
const replaceInStr = (str, strReplace, strInReplace) => {
  return str.replace(strReplace, strInReplace);
};
/**
 * @param {String} str
 * @returns {String}
 */
const cllearStrContent = str => {
  str = replaceInStr(str, /^;+/, ``);
  return replaceInStr(str, /^ +/, ``);
};
/**
 * @param {String} str парсит строку в число (дату)
 * @returns {Number} число, если NaN возврашает 0
 */
const parseDateToNumber = str => {
  str = Date.parse(str);
  if (isNaN(str)) {
    return 0;
  }
  return str;
};

module.exports = {
  searchSubcommand,
  writeTextInConsole,
  replaceInStr,
  cllearStrContent,
  parseDateToNumber
};
