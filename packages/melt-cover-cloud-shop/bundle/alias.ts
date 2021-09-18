const path = require('path');
const tsConfig = require(path.resolve(process.cwd(),'./tsconfig.json'));
const tsConfigPath = tsConfig.compilerOptions.paths;
function getAlias(){
  let alias = {};
  for(let attr in tsConfigPath){
    const aliasKey = attr.replace(/\/\*$/,'');
    let [ aliasValue ] = tsConfigPath[attr];
    if(aliasValue === '*') aliasValue = 'src';
    else aliasValue = 'src/' + aliasValue.replace(/\/\*$/,'');
    alias[aliasKey] = path.resolve(process.cwd(),'.',aliasValue);
  }
  return alias;
}

export default getAlias;

// module.exports = getAlias;