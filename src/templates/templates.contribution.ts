import { registerTemplate } from '../market/register';
import { ClassicVertical } from './ClassicVertical';
import { TowColumns } from './TowColumns';
import { Sider } from './Sider';
import { MixTowColumns } from './MixTowColumns';
import { Symmetry } from './Symmetry';
import { SymmetryTowColumns } from './SymmetryTowColumns';
import { FullSider } from './FullSider';
import Banner from './banner';

registerTemplate({
  name: 'ClassicVertical',
  title: '经典垂直',
  template: ClassicVertical,
});

registerTemplate({
  name: 'TowColumns',
  title: '双栏',
  template: TowColumns,
});

registerTemplate({
  name: 'Sider',
  title: '侧边栏',
  template: Sider
})

registerTemplate({
  name: 'MixTowColumns',
  title: '混合双栏',
  template: MixTowColumns
})

registerTemplate({
  name: 'Symmetry',
  title: '对称',
  template: Symmetry
})

registerTemplate({
  name: 'SymmetryTowColumns',
  title: '对称双栏',
  template: SymmetryTowColumns
})

registerTemplate({
  name: 'FullSider',
  title: '全页侧边栏',
  home: 'full',
  margin: 0.5,
  template: FullSider
})

registerTemplate({
  name: 'Banner',
  title: '横幅',
  home: 'keepBottom',
  margin: [1, 0, 1, 0],
  template: Banner
})