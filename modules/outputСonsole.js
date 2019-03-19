const { writeTextInConsole } = require(`./util`);
const unknown = `Unknown`;
const maxLengthColumns = {
  column1: 1,
  column2: 10,
  column3: 10,
  column4: 50,
  column5: 15
};
/**
 * @param {Array} arrLength
 * @param {Object} minLengthCol
 * @param {Object} maxLengthCol
 */
const calcLengthColumns = (arrLength, minLengthCol, maxLengthCol) => {
  arrLength.forEach((length, i) => {
    let column = `column` + (i + 2);

    if (length > minLengthCol[column]) {
      if (length > maxLengthCol[column]) {
        minLengthCol[column] = maxLengthCol[column];
      } else {
        minLengthCol[column] = length;
      }
    }
  })
}
/**
 * @param {String} str
 * @param {Object} minLengthCol
 * @param {Object} maxLengthCol
 * @return {String} maxLengthCol
 */
const formationRow = (str, minLengthCol, maxLengthCol) => {
  str = str === unknown ? `` : str;
  let strLength = str.length;
  if (strLength > maxLengthCol) {
    strLength = maxLengthCol;
    str = str.substr(0, maxLengthCol - 3) + `...`;
  }
  return `  ${str}${new Array(minLengthCol - strLength).fill(` `).join(``)}  `;
}
/**
 * @param {Array} arr
 */
const showComments = arr => {
  const minLengthColumns = {
    column1: 1,
    column2: 4,
    column3: 4,
    column4: 7,
    column5: 8
  };
  let tbody = ``;
  
  // Считаем макс длину в колонке
  arr.forEach(item => {
    let nameLength = item.userName.length;
    let dateLength = item.date.length;
    let commentLength = item.comment.length;
    let fileNameLength = item.fileName.length;
    let arrLength = [nameLength, dateLength, commentLength, fileNameLength];

    calcLengthColumns(arrLength, minLengthColumns, maxLengthColumns)
    
  });
  
  // 5 колонок * 4 пробела;
  // 4 вертикальных черты;
  const maxLine =
    minLengthColumns.column1 +
    minLengthColumns.column2 +
    minLengthColumns.column3 +
    minLengthColumns.column4 +
    minLengthColumns.column5 +
    5 * 4 +
    4;

  const thead = `  !  |` +
  `  user${new Array(minLengthColumns.column2 - 4).fill(` `).join(``)}  |` +
  `  date${new Array(minLengthColumns.column3 - 4).fill(` `).join(``)}  |` +
  `  comment${new Array(minLengthColumns.column4 - 7).fill(` `).join(``)}  |` +
  `  fileName${new Array(minLengthColumns.column5 - 8).fill(` `).join(``)}  \n`;
  const line = `${new Array(maxLine).fill(`-`).join(``)}\n`;
  const line2 = line;

  arr.forEach(item => {
    let column1 = `  ${item.isImportance === true ? `!` : ` `}  |`;
    let column2 = formationRow(item.userName, minLengthColumns.column2, maxLengthColumns.column2) + `|`;
    let column3 = formationRow(item.date, minLengthColumns.column3, maxLengthColumns.column3) + `|`;
    let column4 = formationRow(item.comment, minLengthColumns.column4, maxLengthColumns.column4) + `|`;
    let column5 = formationRow(item.fileName, minLengthColumns.column5, maxLengthColumns.column5) + `\n`;

    tbody = tbody + column1 + column2 + column3 + column4 + column5;
  });

  if (+tbody === 0) {
    writeTextInConsole(thead + line);
  } else {
    writeTextInConsole(thead + line + tbody + line2);
  }
};

module.exports = {
  showComments
};
