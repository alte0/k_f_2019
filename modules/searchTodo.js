const { replaceInStr, cllearStrContent } = require(`./util`);
const { readFile } = require(`../fileSystem`);
const unknown = `Unknown`;
const initialCommentState = {
  isImportance: false,
  importancePriority: 0,
  userName: unknown,
  date: unknown,
  comment: unknown,
  fileName: unknown
};
/**
 * @param {Array} arrPath
 * @returns {Array} arrTodo
 */
const searchTODOcomments = arrPath => {
  const regexpNameFile = new RegExp(`/[A-Za-z]+?\.js`);
  const regexpToodoComment = /\/\/ TODO.+?$/gm;
  const regexpImportance = /!+/g;
  const regexpImportancePriority = /!/g;
  const regexpDate = /[0-9]{4}-[0-9]{2}-[0-9]{2}/i;
  const regexpUserName = /[a-zA-Z].+?;/;
  let arrTodo = [];

  arrPath.forEach(path => {
    let fileName = path.match(regexpNameFile)[0];
    fileName = replaceInStr(fileName, `/`, ``);

    let contentFile = readFile(path);
    let arrayContentFile = contentFile.match(regexpToodoComment);

    if (arrayContentFile !== null && arrayContentFile.length !== 0) {
      arrayContentFile.forEach(content => {
        content = content.replace(/\/\/ TODO /, ``);
        let isImportance = content.match(regexpImportance) ? true : false;

        let importancePriority = content.match(regexpImportancePriority);
        importancePriority = importancePriority ? importancePriority.length : 0;

        let userName = content.match(regexpUserName);
        if (userName !== null && userName.length !== 0) {
          userName = replaceInStr(userName[0], `;`, ``);
          content = content.replace(regexpUserName, ``);
        } else {
          ({ userName } = initialCommentState);
        }
        content = cllearStrContent(content);

        let date = content.match(regexpDate);
        if (date !== null && date.length !== 0) {
          date = date[0];
          content = content.replace(regexpDate, ``);
        } else {
          ({ date } = initialCommentState);
        }
        content = cllearStrContent(content);

        arrTodo.push(
          Object.assign({}, initialCommentState, {
            fileName,
            isImportance,
            userName,
            date,
            comment: content,
            importancePriority
          })
        );
      });
    }
  });

  return arrTodo;
};

module.exports = {
  searchTODOcomments
};
