const { showComments } = require(`../outputСonsole`);
const { parseDateToNumber } = require(`../util`);
/**
 * @param {Array} arrComments
 * @param {String} subcommand
 */
const commandSort = (arrComments, subcommand) => {
  let newArr;

  switch (subcommand) {
    case `importance`:
      newArr = arrComments.slice().sort((commentA, commentB) => {
        if (commentA.importancePriority < commentB.importancePriority) return 1;
        if (commentA.importancePriority > commentB.importancePriority) return -1;
        if (commentA.importancePriority === commentB.importancePriority) return 0;
      });
      break;
    case `user`:
      newArr = arrComments
        .slice()
        .sort((commentA, commentB) => {
          let nameA = commentA.userName.toLowerCase();
          let nameB = commentB.userName.toLowerCase();

          if (nameA === nameB) return -1;
          return 1;
        })
      break;
    case `date`:
      newArr = arrComments.slice().sort((commentA, commentB) => {
        let dateA = parseDateToNumber(commentA.date);
        let dateB = parseDateToNumber(commentB.date);

        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
      });
      break;
    default:
      break;
  }

  showComments(newArr);
};

module.exports = {
  commandSort
};
