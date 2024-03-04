'use strict';

const FS = require('fs'),
  PATH = require('path'),
  SVGO = require('svgo'),
  filepath = PATH.resolve(__dirname, '../../src/assets/icons'),
  svgo = new SVGO({
    plugins: [
      {
        cleanupAttrs: true,
      },
      {
        removeDoctype: true,
      },
      {
        removeXMLProcInst: true,
      },
      {
        removeComments: true,
      },
      {
        removeMetadata: true,
      },
      {
        removeTitle: true,
      },
      {
        removeDesc: true,
      },
      {
        removeUselessDefs: true,
      },
      {
        removeEditorsNSData: true,
      },
      {
        removeEmptyAttrs: true,
      },
      {
        removeHiddenElems: true,
      },
      {
        removeEmptyText: true,
      },
      {
        removeEmptyContainers: true,
      },
      {
        removeViewBox: false,
      },
      {
        cleanupEnableBackground: false,
      },
      {
        convertStyleToAttrs: false,
      },
      {
        convertColors: false,
      },
      {
        convertPathData: false,
      },
      {
        convertTransform: false,
      },
      {
        removeUnknownsAndDefaults: false,
      },
      {
        removeNonInheritableGroupAttrs: false,
      },
      {
        removeUselessStrokeAndFill: false,
      },
      {
        removeUnusedNS: false,
      },
      {
        cleanupIDs: true,
      },
      {
        cleanupNumericValues: false,
      },
      {
        moveElemsAttrsToGroup: false,
      },
      {
        moveGroupAttrsToElems: false,
      },
      {
        collapseGroups: false,
      },
      {
        removeRasterImages: false,
      },
      {
        mergePaths: false,
      },
      {
        convertShapeToPath: false,
      },
      {
        sortAttrs: true,
      },
      {
        removeDimensions: false,
      },
      {
        removeAttrs: { attrs: '(width|height|stroke|fill)' },
      },
    ],
  });
let ids = [];

async function optimizeSvg(data, fileName) {
  //const svg = await outlineStroke(data);
  const result = await svgo.optimize(data);

  const id = fileName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
    .replace(/\.[^.]+$/, '');

  ids = [...ids, `'${id}'`];
  return result.data
    .replace(/xmlns="\S+"/g, '')
    .replace(/ +/g, ' ')
    .replace(/<svg/g, `<symbol id="${id}"`)
    .replace(/<\/svg/g, '<symbol');
}

async function getSymbol(filepath, fileName) {
  const data = FS.readFileSync(`${filepath}/${fileName}`, 'utf8');
  const symbol = await optimizeSvg(data, fileName);
  return symbol;
}

async function getSymbols(filepath) {
  return Promise.all(FS.readdirSync(filepath).map((fileName) => getSymbol(filepath, fileName)));
}

const spritePath = PATH.resolve(__dirname, '../../src/assets/symbol-defs.svg');
const typePath = PATH.resolve(__dirname, '../../src/shared/components/icon/icon.type.ts');
const examplesPath = PATH.resolve(__dirname, '../../src/app/example/components/icons/icons.component.html');

let defs = `<svg aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>`;

getSymbols(filepath).then((s) => {
  defs += `${s.join('\n')}</defs>
</svg>`;
  FS.writeFile(spritePath, defs, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('√ Icon sprite successfully created!');
  });

  const typeContent = `export type iconType = ${ids.join(' | ')};`;

  FS.writeFile(typePath, typeContent, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('√ Icon types successfully created!');
  });

  let examples = `<h1>Icons</h1><div class="d-flex f-10" style="flex-wrap: wrap">`;

  examples += ids
    .map(
      (id) =>
        `<div class="w-15 text-align-center p-6"><icon name="${id.replace(/'/g, '')}"></icon><div class="f-3">${id.replace(
          /'/g,
          '',
        )}</div></div>`,
    )
    .join('\n');

  examples += '</div>';

  examples += `<h2>Color</h2><div class="d-flex f-10" style="flex-wrap: wrap">`;

  examples += ids
    .map(
      (id) =>
        `<div class="w-10 text-green text-align-center p-6"><icon name="${id.replace(/'/g, '')}"></icon><div class="f-3">${id.replace(
          /'/g,
          '',
        )}</div></div>`,
    )
    .join('\n');

  examples += '</div>';

  FS.writeFile(examplesPath, examples, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('√ Icon examples successfully created!');
  });
});
