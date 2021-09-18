import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import styleImport from 'vite-plugin-style-import';
import { injectHtml } from 'vite-plugin-html';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import viteFchCssModulePlugin from './vite-fch-css-module-plugin';
import viteFchCssModulePlugin2 from './vite-fch-css-module-plugin2';
import getAlias from './bundle/alias';

try {
  const envLocalSuffix = '.development';
  const file = dotenv.parse(fs.readFileSync(`./enviroment/.env${envLocalSuffix}`), {
    debug: false
  });
  for (const key in file) {
    process.env[key] = file[key];
  }
} catch (e) {
  console.error(e);
}

// 读取全局变量配置
function getGlobalVars() {
  const globalVars = require(path.resolve(process.cwd(), './src/solution/assets/style/var.global.json'));
  return globalVars;
}

// 读取主题配置
function getModifyVars() {
  const modifyVars = path.resolve(process.cwd(), './src/solution/assets/style/var.modify.less');
  return modifyVars;
}

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  resolve: {
    alias: { ...(getAlias() as any), process: 'process/browser' }
  },
  define: {
    'process.env': process.env
  },
  css: {
    preprocessorOptions: {
      less: {
        globalVars: getGlobalVars(),
        modifyVars: {
          hack: `true; @import "${getModifyVars()}";`
        },
        javascriptEnabled: true
      }
    },
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
  server: {
    host: '0.0.0.0',
    open: false,
    port: Number(process.env.WBPACK_DEV_SERVER_PORT),
    proxy: {}
  },
  plugins: [
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name: string) => {
            return `antd/es/${name}/style/index`;
          }
        }
      ]
    }),
    viteFchCssModulePlugin(),
    viteFchCssModulePlugin2(),
    injectHtml({
      injectData: {
        htmlWebpackPlugin: {
          options: {
            isVite: true
          }
        },
        title: process.env.SITE_TITLE
      }
    }),
    reactRefresh()
  ]
});
