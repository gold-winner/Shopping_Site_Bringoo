const diacriticsMap: { base: string; letters: RegExp }[] = [
  {
    base: 'A',
    // eslint-disable-next-line max-len
    letters: /[A\u00C0-\u00C3\u00C5\u0100\u0102\u0104\u01CD\u01DE\u01E0\u01FA\u0200\u0202\u0226\u023A\u1E00\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u24B6\u2C6F\uFF21]/g,
  },
  { base: 'AA', letters: /\uA732/g },
  { base: 'AE', letters: /[\u00C4\u00C6\u01E2\u01FC]/g },
  { base: 'AO', letters: /\uA734/g },
  { base: 'AU', letters: /\uA736/g },
  { base: 'AV', letters: /[\uA738\uA73A]/g },
  { base: 'AY', letters: /\uA73C/g },
  { base: 'B', letters: /[B\u0181\u0182\u0243\u1E02\u1E04\u1E06\u24B7\uFF22]/g },
  { base: 'C', letters: /[C\u00C7\u0106\u0108\u010A\u010C\u0187\u023B\u1E08\u24B8\uA73E\uFF23]/g },
  { base: 'D', letters: /[D\u010E\u0110\u0189-\u018B\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u24B9\uA779\uFF24]/g },
  { base: 'DZ', letters: /[\u01C4\u01F1]/g },
  { base: 'Dz', letters: /[\u01C5\u01F2]/g },
  {
    base: 'E',
    // eslint-disable-next-line max-len
    letters: /[E\u00C8-\u00CB\u0112\u0114\u0116\u0118\u011A\u018E\u0190\u0204\u0206\u0228\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u24BA\uFF25]/g,
  },
  { base: 'F', letters: /[F\u0191\u1E1E\u24BB\uA77B\uFF26]/g },
  { base: 'G', letters: /[G\u011C\u011E\u0120\u0122\u0193\u01E4\u01E6\u01F4\u1E20\u24BC\uA77D\uA77E\uA7A0\uFF27]/g },
  { base: 'H', letters: /[H\u0124\u0126\u021E\u1E22\u1E24\u1E26\u1E28\u1E2A\u24BD\u2C67\u2C75\uA78D\uFF28]/g },
  {
    base: 'I',
    letters: /[I\u00CC-\u00CF\u0128\u012A\u012C\u012E\u0130\u0197\u01CF\u0208\u020A\u1E2C\u1E2E\u1EC8\u1ECA\u24BE\uFF29]/g,
  },
  { base: 'J', letters: /[J\u0134\u0248\u24BF\uFF2A]/g },
  { base: 'K', letters: /[K\u0136\u0198\u01E8\u1E30\u1E32\u1E34\u24C0\u2C69\uA740\uA742\uA744\uA7A2\uFF2B]/g },
  { base: 'L', letters: /[L\u0139\u013B\u013D\u013F\u0141\u023D\u1E36\u1E38\u1E3A\u1E3C\u24C1\u2C60\u2C62\uA746\uA748\uA780\uFF2C]/g },
  { base: 'LJ', letters: /\u01C7/g },
  { base: 'Lj', letters: /\u01C8/g },
  { base: 'M', letters: /[M\u019C\u1E3E\u1E40\u1E42\u24C2\u2C6E\uFF2D]/g },
  { base: 'N', letters: /[N\u00D1\u0143\u0145\u0147\u019D\u01F8\u0220\u1E44\u1E46\u1E48\u1E4A\u24C3\uA790\uA7A4\uFF2E]/g },
  { base: 'NJ', letters: /\u01CA/g },
  { base: 'Nj', letters: /\u01CB/g },
  {
    base: 'O',
    // eslint-disable-next-line max-len
    letters: /[O\u00D2-\u00D5\u00D8\u014C\u014E\u0150\u0186\u019F\u01A0\u01D1\u01EA\u01EC\u01FE\u020C\u020E\u022A\u022C\u022E\u0230\u1E4C\u1E4E\u1E50\u1E52\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u24C4\uA74A\uA74C\uFF2F]/g,
  },
  { base: 'OE', letters: /[\u00D6\u0152]/g },
  { base: 'OI', letters: /\u01A2/g },
  { base: 'OO', letters: /\uA74E/g },
  { base: 'OU', letters: /\u0222/g },
  { base: 'P', letters: /[P\u01A4\u1E54\u1E56\u24C5\u2C63\uA750\uA752\uA754\uFF30]/g },
  { base: 'Q', letters: /[Q\u024A\u24C6\uA756\uA758\uFF31]/g },
  { base: 'R', letters: /[R\u0154\u0156\u0158\u0210\u0212\u024C\u1E58\u1E5A\u1E5C\u1E5E\u24C7\u2C64\uA75A\uA782\uA7A6\uFF32]/g },
  { base: 'S', letters: /[S\u015A\u015C\u015E\u0160\u0218\u1E60\u1E62\u1E64\u1E66\u1E68\u1E9E\u24C8\u2C7E\uA784\uA7A8\uFF33]/g },
  { base: 'T', letters: /[T\u0162\u0164\u0166\u01AC\u01AE\u021A\u023E\u1E6A\u1E6C\u1E6E\u1E70\u24C9\uA786\uFF34]/g },
  { base: 'TZ', letters: /\uA728/g },
  {
    base: 'U',
    // eslint-disable-next-line max-len
    letters: /[U\u00D9-\u00DB\u0168\u016A\u016C\u016E\u0170\u0172\u01AF\u01D3\u01D5\u01D7\u01D9\u01DB\u0214\u0216\u0244\u1E72\u1E74\u1E76\u1E78\u1E7A\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u24CA\uFF35]/g,
  },
  { base: 'UE', letters: /\u00DC/g },
  { base: 'V', letters: /[V\u01B2\u0245\u1E7C\u1E7E\u24CB\uA75E\uFF36]/g },
  { base: 'VY', letters: /\uA760/g },
  { base: 'W', letters: /[W\u0174\u1E80\u1E82\u1E84\u1E86\u1E88\u24CC\u2C72\uFF37]/g },
  { base: 'X', letters: /[X\u1E8A\u1E8C\u24CD\uFF38]/g },
  { base: 'Y', letters: /[Y\u00DD\u0176\u0178\u01B3\u0232\u024E\u1E8E\u1EF2\u1EF4\u1EF6\u1EF8\u1EFE\u24CE\uFF39]/g },
  { base: 'Z', letters: /[Z\u0179\u017B\u017D\u01B5\u0224\u1E90\u1E92\u1E94\u24CF\u2C6B\u2C7F\uA762\uFF3A]/g },
  {
    base: 'a',
    // eslint-disable-next-line max-len
    letters: /[a\u00E0-\u00E3\u00E5\u0101\u0103\u0105\u01CE\u01DF\u01E1\u01FB\u0201\u0203\u0227\u0250\u1E01\u1E9A\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u24D0\u2C65\uFF41]/g,
  },
  { base: 'aa', letters: /\uA733/g },
  { base: 'ae', letters: /[\u00E4\u00E6\u01E3\u01FD]/g },
  { base: 'ao', letters: /\uA735/g },
  { base: 'au', letters: /\uA737/g },
  { base: 'av', letters: /[\uA739\uA73B]/g },
  { base: 'ay', letters: /\uA73D/g },
  { base: 'b', letters: /[b\u0180\u0183\u0253\u1E03\u1E05\u1E07\u24D1\uFF42]/g },
  { base: 'c', letters: /[c\u00E7\u0107\u0109\u010B\u010D\u0188\u023C\u1E09\u2184\u24D2\uA73F\uFF43]/g },
  { base: 'd', letters: /[d\u010F\u0111\u018C\u0256\u0257\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u24D3\uA77A\uFF44]/g },
  { base: 'dz', letters: /[\u01C6\u01F3]/g },
  {
    base: 'e',
    // eslint-disable-next-line max-len
    letters: /[e\u00E8-\u00EB\u0113\u0115\u0117\u0119\u011B\u01DD\u0205\u0207\u0229\u0247\u025B\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u24D4\uFF45]/g,
  },
  { base: 'f', letters: /[f\u0192\u1E1F\u24D5\uA77C\uFF46]/g },
  { base: 'g', letters: /[g\u011D\u011F\u0121\u0123\u01E5\u01E7\u01F5\u0260\u1D79\u1E21\u24D6\uA77F\uA7A1\uFF47]/g },
  { base: 'h', letters: /[h\u0125\u0127\u021F\u0265\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E96\u24D7\u2C68\u2C76\uFF48]/g },
  { base: 'hv', letters: /\u0195/g },
  {
    base: 'i',
    letters: /[i\u00EC-\u00EF\u0129\u012B\u012D\u012F\u0131\u01D0\u0209\u020B\u0268\u1E2D\u1E2F\u1EC9\u1ECB\u24D8\uFF49]/g,
  },
  { base: 'j', letters: /[j\u0135\u01F0\u0249\u24D9\uFF4A]/g },
  { base: 'k', letters: /[k\u0137\u0199\u01E9\u1E31\u1E33\u1E35\u24DA\u2C6A\uA741\uA743\uA745\uA7A3\uFF4B]/g },
  {
    base: 'l',
    letters: /[l\u013A\u013C\u013E\u0140\u0142\u017F\u019A\u026B\u1E37\u1E39\u1E3B\u1E3D\u24DB\u2C61\uA747\uA749\uA781\uFF4C]/g,
  },
  { base: 'lj', letters: /\u01C9/g },
  { base: 'm', letters: /[m\u026F\u0271\u1E3F\u1E41\u1E43\u24DC\uFF4D]/g },
  { base: 'n', letters: /[n\u00F1\u0144\u0146\u0148\u0149\u019E\u01F9\u0272\u1E45\u1E47\u1E49\u1E4B\u24DD\uA791\uA7A5\uFF4E]/g },
  { base: 'nj', letters: /\u01CC/g },
  {
    base: 'o',
    // eslint-disable-next-line max-len
    letters: /[o\u00F2-\u00F5\u00F8\u014D\u014F\u0151\u01A1\u01D2\u01EB\u01ED\u01FF\u020D\u020F\u022B\u022D\u022F\u0231\u0254\u0275\u1E4D\u1E4F\u1E51\u1E53\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u24DE\uA74B\uA74D\uFF4F]/g,
  },
  { base: 'oe', letters: /[\u00F6\u0153]/g },
  { base: 'oi', letters: /\u01A3/g },
  { base: 'ou', letters: /\u0223/g },
  { base: 'oo', letters: /\uA74F/g },
  { base: 'p', letters: /[p\u01A5\u1D7D\u1E55\u1E57\u24DF\uA751\uA753\uA755\uFF50]/g },
  { base: 'q', letters: /[q\u024B\u24E0\uA757\uA759\uFF51]/g },
  { base: 'r', letters: /[r\u0155\u0157\u0159\u0211\u0213\u024D\u027D\u1E59\u1E5B\u1E5D\u1E5F\u24E1\uA75B\uA783\uA7A7\uFF52]/g },
  { base: 's', letters: /[s\u015B\u015D\u015F\u0161\u0219\u023F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E9B\u24E2\uA785\uA7A9\uFF53]/g },
  { base: 'ss', letters: /\u00DF/g },
  { base: 't', letters: /[t\u0163\u0165\u0167\u01AD\u021B\u0288\u1E6B\u1E6D\u1E6F\u1E71\u1E97\u24E3\u2C66\uA787\uFF54]/g },
  { base: 'tz', letters: /\uA729/g },
  {
    base: 'u',
    // eslint-disable-next-line max-len
    letters: /[u\u00F9-\u00FB\u0169\u016B\u016D\u016F\u0171\u0173\u01B0\u01D4\u01D6\u01D8\u01DA\u01DC\u0215\u0217\u0289\u1E73\u1E75\u1E77\u1E79\u1E7B\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u24E4\uFF55]/g,
  },
  { base: 'ue', letters: /\u00FC/g },
  { base: 'v', letters: /[v\u028B\u028C\u1E7D\u1E7F\u24E5\uA75F\uFF56]/g },
  { base: 'vy', letters: /\uA761/g },
  { base: 'w', letters: /[w\u0175\u1E81\u1E83\u1E85\u1E87\u1E89\u1E98\u24E6\u2C73\uFF57]/g },
  { base: 'x', letters: /[x\u1E8B\u1E8D\u24E7\uFF58]/g },
  { base: 'y', letters: /[y\u00FD\u00FF\u0177\u01B4\u0233\u024F\u1E8F\u1E99\u1EF3\u1EF5\u1EF7\u1EF9\u1EFF\u24E8\uFF59]/g },
  { base: 'z', letters: /[z\u017A\u017C\u017E\u01B6\u0225\u0240\u1E91\u1E93\u1E95\u24E9\u2C6C\uA763\uFF5A]/g },
];

export const mlautsReplace: (value: string) => string = (str: string): string => {
  let permalink: string = str;
  for (const element of diacriticsMap) {
    permalink = permalink.replace(element.letters, element.base);
  }
  return permalink;
};
