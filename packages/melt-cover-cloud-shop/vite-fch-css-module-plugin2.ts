import { exportModules } from './vite-fch-css-module-plugin';
const cssLangs = '\\.(scss|less|styl|stylus|pcss|postcss)($|\\?)';
const cssLangRE = new RegExp(cssLangs);
const cssModuleRE = new RegExp(`\\.module${cssLangs}`);

export default function viteTransformCSSModulesPlugin2() {
  const name = 'vite-fch-css-module-plugin2';
  return {
    enforce: 'post',
    name,
    async transform(css: any, id: any) {
      if (cssLangRE.test(id) && !id.includes('node_modules') && !cssModuleRE.test(id)) {
        const startStr = 'const css = ';
        const cssCodeStartIndex = css.indexOf(startStr);
        const cssCodeEndIndex = css.indexOf('updateStyle(id, css)');
        const cssStr = css.slice(cssCodeStartIndex + startStr.length, cssCodeEndIndex);
        const pathIdx = id.indexOf('/src/');
        const str = id.slice(pathIdx, id.length);
        return [
          `import.meta.hot = __vite__createHotContext('${str}');`,
          'import { updateStyle, removeStyle } from "/@vite/client"',
          `const id = ${JSON.stringify(id)}`,
          `const css = ${cssStr}`,
          'updateStyle(id, css)',
          // css modules exports change on edit so it can't self accept
          `${exportModules || 'import.meta.hot.accept()\nexport default css'}`,
          'import.meta.hot.prune(() => removeStyle(id))'
        ].join('\n');
      }
      return undefined;
    }
  };
}
