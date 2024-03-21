interface TestCase {
  id: string;
  status: number;
  expects: any[]; 
  model: any;
}

interface TestParametersCases{
  ids?: any[],
  model: any;
  attribute: string; 
  values: any[]; 
  status: number;
}

//
export function createTestCases(params: TestParametersCases): TestCase[] {

  const tests: TestCase[] = [];
  const { ids, model, attribute, values, status } = params;
  

  for (let i = 0; i < values.length; i++) {

    tests.push({
      id: getIdTestCase(ids, i),
      status: status,
      expects: [],
      model: { ...model, [attribute]: values[i] }
    });
  }

  return tests;
}

type ExpectationParam = {
  name: string;
  format: (value: any) => any;
};

type TestParameters = {
  ids?: any[];
  get: () => any;
  numCases: number;
  status: number;
  expects: ExpectationParam[];
};

interface Expectation {
  field: string;
  value: any;
}

interface TestCase {
  id: string;
  status: number;
  expects: (Expectation | any)[];
  model: any;
}

export function createTestCasesWithExpect(params: TestParameters): TestCase[] {
  
  const { get, numCases, status, expects, ids } = params;
  const tests: TestCase[] = [];

  for (let i = 0; i < numCases; i++) {
    const model = get();

    const expectations: Expectation[] = expects.map(({ name, format }) => ({
      field: name,
      value: format(model[name])
    }));

    const testCase: TestCase = {
      id: getIdTestCase(ids, i),
      status: status,
      expects: expectations,
      model: { ...model }
    };

    tests.push(testCase);
  }

  return tests;
}


const getIdTestCase = (ids: any, i: number) => {
  const idsLength = ids?.length || 0;
  let id = (i + 1).toString();
  if (ids && idsLength > 0) {
    const randomIndex = Math.floor(Math.random() * idsLength);
    id = ids[randomIndex].id;
  }
  return id;
}