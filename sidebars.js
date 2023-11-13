/**
 *
 * @param {stirng[]} dirs
 * @returns {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
function autogenerateSidebarsConfig(dirs) {}

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  bagu: [
    {
      type: 'category',
      label: 'HTML CSS',
      items: [
        'bagu/html-css/html',
        'bagu/html-css/css',
        'bagu/html-css/bfc',
        'bagu/html-css/层叠上下文',
        'bagu/html-css/重排重绘',
      ],
    },
    {
      type: 'category',
      label: 'JS',
      items: [
        'bagu/js/FormData',
        'bagu/js/浮点数精度',
        'bagu/js/javascript-basis',
        'bagu/js/javascript-advanced',
        'bagu/js/v8',
        'bagu/js/regexp',
        'bagu/js/es6-plus',
      ],
    },
    {
      type: 'category',
      label: 'TS',
      items: ['bagu/ts/basis', 'bagu/ts/type-challenges'],
    },
    {
      type: 'category',
      label: 'Vue',
      items: ['bagu/vue/basis', 'bagu/vue/source-code'],
    },
    {
      type: 'category',
      label: 'React',
      items: [
        'bagu/react/component-base',
        'bagu/react/state-managemnet',
        'bagu/react/router',
        'bagu/react/hooks',
        'bagu/react/virtual-dom',
        'bagu/react/react-native',
        'bagu/react/other',
      ],
    },
    {
      type: 'category',
      label: '计算机网络',
      items: [
        'bagu/network/network-model',
        'bagu/network/http',
        'bagu/network/https',
        'bagu/network/tcp',
      ],
    },
    {
      type: 'category',
      label: '浏览器',
      items: [
        'bagu/browser/browser-security',
        'bagu/browser/event-mechanism',
        'bagu/browser/cache',
        'bagu/browser/event-loop',
        'bagu/browser/source-load',
        'bagu/browser/composition',
        'bagu/browser/vitals',
      ],
    },
    {
      type: 'category',
      label: '前端工程化',
      items: [
        'bagu/engineering/engineering',
        'bagu/engineering/eslint',
        'bagu/engineering/package-management-tool',
        'bagu/engineering/vite',
        'bagu/engineering/webpack',
        'bagu/engineering/micro-frontend',
      ],
    },
    {
      type: 'category',
      label: '代码篇',
      items: [
        'bagu/code/jsAchieve',
        'bagu/code/debounce-thorttle',
        'bagu/code/promise',
        'bagu/code/algorithm',
      ],
    },
    {
      type: 'category',
      label: '面经',
      items: [
        'bagu/interview/1',
        'bagu/interview/2',
        'bagu/interview/3',
        'bagu/interview/4',
        'bagu/interview/5',
        'bagu/interview/6',
        'bagu/interview/7',
        'bagu/interview/8',
        'bagu/interview/9',
        'bagu/interview/10',
        'bagu/interview/11',
      ],
    },
    {
      type: 'category',
      label: '其他',
      items: ['bagu/other/component-design', 'bagu/other/vuera-fullscreen'],
    },
  ],
  note: [
    {
      type: 'autogenerated',
      dirName: 'note',
    },
  ],
  learn: [
    {
      type: 'autogenerated',
      dirName: 'learn',
    },
  ],
}

module.exports = sidebars
