const { getAllFilePathsWithExtension, readFile } = require(`./fileSystem`);
const { readLine } = require(`./console`);

const { showComments } = require(`./modules/outputСonsole`);
const { searchSubcommand } = require(`./modules/util`);
const { searchTODOcomments } = require(`./modules/searchTodo`);

const { commandImportant } = require(`./modules/сommands/commandImportant`);
const { commandUser } = require(`./modules/сommands/commandUser`);
const { commandSort } = require(`./modules/сommands/commandSort`);
const { commandDate } = require(`./modules/сommands/commandDate`);

let todoComments;

/**
 * @returns {Array} Массив путей к файлам
 */
const getFilesPath = () => getAllFilePathsWithExtension(process.cwd(), `js`);
/**
 * @returns {Array} Массив найденых комментаиев
 */
const getComments = () => {
  if (todoComments === undefined) {
    const path = getFilesPath();
    return searchTODOcomments(path);
  }
};

function app() {
  const files = getFiles();
  todoComments = getComments();

  console.log(`Please, write your command!`);
  readLine(processCommand);
}

function getFiles() {
  const filePaths = getAllFilePathsWithExtension(process.cwd(), `js`);
  return filePaths.map(path => readFile(path));
}

app();

function processCommand(command) {
  let subcommand;
  
  commands = searchSubcommand(command);

  if (commands) {
    command = commands.command;
    subcommand = commands.subcommand;
  }

  switch (command) {
    case `exit`:
      process.exit(0);
      break;
    case `show`:
      showComments(todoComments);
      break;
    case `important`:
      commandImportant(todoComments);
      break;
    case `user`:
      commandUser(todoComments, subcommand);
      break;
    case `sort`:
      commandSort(todoComments, subcommand);
      break;
    case `date`:
      commandDate(todoComments, subcommand);
      break;
    default:
      console.log(`wrong command`);
      break;
  }
}

// TODO you can do it!
