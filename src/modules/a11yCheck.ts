import Message from './message';

type userDefined = number;
type ratio = 'standard' | 'advance' | userDefined;

type ratioTable = {
  standard: {
    normalText: number;
    bigText: number;
  };
  advance: {
    normalText: number;
    bigText: number;
  };
};

interface a11yResult {
  normalText: boolean;
  boldText: boolean;
  bigText: boolean;
}

export default class a11yCheck {
  readonly ratioSetting: ratio;
  readonly ratioTable: ratioTable;
  constructor(ratio: ratio = 'standard') {
    this.ratioSetting = ratio;
    this.ratioTable = {
      standard: {
        normalText: 4.5,
        bigText: 3,
      },
      advance: {
        normalText: 7,
        bigText: 4.5,
      },
    };
  }

  check(color: string[]) {
    if (color.length === 2) {
      new Message('running', `a11y check... [${color[0]}:${color[1]}]`);
    } else if (color.length >= 2) {
      throw new Message('error', 'You can enter up to two colors.');
    } else {
      throw new Message('error', 'You can enter up to two colors.');
    }
  }
}
