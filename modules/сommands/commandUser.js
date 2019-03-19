const { showComments } = require(`../outputСonsole`);
/**
 * @param {Array} arr
 * @param {String} user
 */
const commandUser = (arr, userName) => {
  const regex = new RegExp(`^${userName}`, `i`);

  const newArr = arr.filter(item => {
    let result = item.userName.match(regex);
    
    if (result) {
      return result.index === 0;
    }
  });

  showComments(newArr);
};

module.exports = {
  commandUser
};
