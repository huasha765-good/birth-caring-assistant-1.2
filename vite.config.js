import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { tmpdir } from 'os';
import { devLogger } from '@meituan-nocode/vite-plugin-dev-logger';
import {
  devHtmlTransformer,
  prodHtmlTransformer,
} from '@meituan-nocode/vite-plugin-nocode-html-transformer';
import react from '@vitejs/plugin-react-swc';

const CHAT_VARIABLE = process.env.CHAT_VARIABLE || '';
const PUBLIC_PATH = process.env.PUBLIC_PATH || '';
// GitHub Pages 仓库名，如果是用户主页则留空
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || '';

const isProdEnv = process.env.NODE_ENV === 'production';
// GitHub Pages 部署时使用仓库名作为 base path
let publicPath = PUBLIC_PATH + '/';
if (isProdEnv) {
  if (CHAT_VARIABLE) {
    publicPath = PUBLIC_PATH + '/' + CHAT_VARIABLE;
  } else if (GITHUB_REPO_NAME) {
    publicPath = '/' + GITHUB_REPO_NAME + '/';
  }
}
const outDir = (isProdEnv && CHAT_VARIABLE) ? 'build/' + CHAT_VARIABLE : 'build';

async function loadPlugins() {
  const plugins = isProdEnv
  ? CHAT_VARIABLE
    ? [react(), prodHtmlTransformer(CHAT_VARIABLE)]
    : [react()]
  : [
      devLogger({
        dirname: resolve(tmpdir(), '.nocode-dev-logs'),
        maxFiles: '3d',
      }),
      react(),
      devHtmlTransformer(CHAT_VARIABLE, 'internal'),
    ];

  if (process.env.NOCODE_COMPILER_PATH) {
    const { componentCompiler } = await import(process.env.NOCODE_COMPILER_PATH);
    plugins.push(componentCompiler());
  }
  return plugins;
}

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const plugins = await loadPlugins();
  
  return {
    server: {
      proxy: {
       "/websso": {
         target: process.env.NODE_ENV === "prod"? "https://nocode.sankuai.com": "https://nocode.ee.test.sankuai.com",
         changeOrigin: true,
         xfwd: true,
       },
      },
      host: '::',
      port: '8080',
      hmr: {
        overlay: false,
      },
    },
    plugins,
    base: publicPath,
    build: {
      outDir,
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
        {
          find: 'lib',
          replacement: resolve(__dirname, 'lib'),
        },
      ],
    },
  };
});
