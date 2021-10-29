import A11yCheck, {ratio} from '../modules/A11yCheck';
import Message from '../modules/message';
import Shikisai from '../modules/Palette';

export default function check(ratio?: ratio) {
  const requireLevel: ratio = ratio || 'standard';
  const a11y = new A11yCheck(requireLevel);
  const shikisai = new Shikisai();

  new Message('running', `check ${a11y.ratioSetting}`);
}
