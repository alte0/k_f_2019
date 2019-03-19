const { showComments } = require(`../outputСonsole`);
const { parseDateToNumber } = require(`../util`);
/**
 * @param {Array} arrComments
 * @param {String} subcommand
 */
const commandDate = (arrComments, subcommand) => {
  const sortDate = parseDateToNumber(subcommand);

  const newArr = arrComments.filter(item => {
    return parseDateToNumber(item.date) >= sortDate;
  });

  showComments(newArr);
};

module.exports = {
  commandDate
};
