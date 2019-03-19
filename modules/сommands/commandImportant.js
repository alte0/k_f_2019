const { showComments } = require(`../outputСonsole`);
/**
 * @param {Array} arr
 */
const commandImportant = arr => {
  const newArr = arr.filter(item => {
    return item.isImportance === true;
  });

  showComments(newArr);
};

module.exports = {
  commandImportant
};
