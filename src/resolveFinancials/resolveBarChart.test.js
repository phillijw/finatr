import { resolveBarChart } from './index.js';
import startOfDay from 'date-fns/fp/startOfDay';

const testData = {
  transactions: [
    {
      id: `oasidjas1`,
      raccount: `account`,
      description: `description`,
      category: `resolveBarChart`,
      type: `income`,
      start: `2018-01-22`,
      rtype: `day`,
      cycle: 3,
      value: 150
    }
  ]
};

describe(`check resolveBarChart`, () => {
  it(`has all the correct original properties`, () => {
    let graphRange = {
      start: startOfDay('2018-01-01'),
      end: startOfDay('2019-01-01')
    };
    let resolvedTestData = resolveBarChart(testData.transactions, {
      graphRange
    });
    expect(resolvedTestData[0]).toHaveProperty('id', 'oasidjas1');
    expect(resolvedTestData[0]).toHaveProperty('raccount', 'account');
    expect(resolvedTestData[0]).toHaveProperty('description', 'description');
    expect(resolvedTestData[0]).toHaveProperty('type', 'income');
    expect(resolvedTestData[0]).toHaveProperty('category', 'resolveBarChart');
    expect(resolvedTestData[0]).toHaveProperty('start', '2018-01-22');
    expect(resolvedTestData[0]).toHaveProperty('rtype', 'day');
    expect(resolvedTestData[0]).toHaveProperty('cycle', 3);
    expect(resolvedTestData[0]).toHaveProperty('value', 150);
  });

  it(`has the new properties`, () => {
    let graphRange = {
      start: startOfDay('2018-01-01'),
      end: startOfDay('2018-02-01')
    };
    let resolvedTestData = resolveBarChart(testData.transactions, {
      graphRange
    });
    expect(resolvedTestData[0]).toHaveProperty('dailyRate', 50);
    expect(resolvedTestData[0]).toHaveProperty('maxHeight', 150);
    expect(resolvedTestData[0].stack).toEqual(
      expect.arrayContaining([expect.arrayContaining([0, 0])])
    );
    let stacked = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 150],
      [0, 0],
      [0, 0],
      [0, 150],
      [0, 0],
      [0, 0],
      [0, 150],
      [0, 0]
    ];
    expect(JSON.stringify(resolvedTestData[0].stack)).toBe(
      JSON.stringify(stacked)
    );
  });
});
