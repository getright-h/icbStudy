import { dataToEsm } from '@rollup/pluginutils';
import { Result, LazyResult, Root } from 'postcss';
const cssLangs = '\\.(scss|less|styl|stylus|pcss|postcss)($|\\?)';
const cssLangRE = new RegExp(cssLangs);
const cssModuleRE = new RegExp(`\\.module${cssLangs}`);
const modulesOptions: any = { localsConvention: 'camelCaseOnly' };

async function compileCSS(id: any, code: string | { toString(): string } | Result | LazyResult | Root) {
  let modules;
  const postcssPlugins: any = [];
  postcssPlugins.unshift(
    (await import('postcss-modules')).default({
      ...modulesOptions,
      getJSON(cssFileName: any, _modules: any, outputFileName: any) {
        modules = _modules;
        if (modulesOptions && typeof modulesOptions.getJSON === 'function') {
          modulesOptions.getJSON(cssFileName, _modules, outputFileName);
        }
      }
    })
  );

  const postcssResult = await (await import('postcss')).default(postcssPlugins).process(code, {
    to: id,
    from: id,
    map: {
      inline: false,
      annotation: false
    }
  });

  return {
    ast: postcssResult,
    modules,
    code: postcssResult.css
  };
}

export let exportModules: undefined;

export default function viteFchCssModulePlugin() {
  const name = 'vite-fch-css-module-plugin';
  return {
    name,
    async transform(raw: any, id: any) {
      if (cssLangRE.test(id) && !id.includes('node_modules') && !cssModuleRE.test(id)) {
        // 获取模块化后的css源代码 以及 模块化的对象名
        const { code: css, modules } = await compileCSS(id, raw);
        // 使用dataToEsm将模块化对象转化为字符串
        const modulesCode = modules && dataToEsm(modules, { namedExports: true, preferConst: true });
        // 导出模块话后的字符串给后置的插件使用
        exportModules = modulesCode;
        return {
          code: css,
          map: { mappings: '' }
        };
      }
      return undefined;
    }
  };
}
