import { reportAboutFailTest } from "./report";

export const iterateTest = async (invalidObjects: any, fn: any) => {
  for (let i = 0; i < invalidObjects.length; i++) {
    const resp = await fn(i);
    if (resp.status !== invalidObjects[i].statusCode) console.log(invalidObjects[i], resp.status);
    expect(resp.status).toEqual(invalidObjects[i].statusCode);
  }
};

export const iterateTestList = async (tests: any, filter: any, fn: Function, session: any) => {

  for (const test of tests) {
    filter.pageSize = test.pageSize.toString()
    const resp = await fn(session, test.id, filter);
    if (resp.status !== test.status) console.log(test, filter, resp.status);
    const length = resp.body.length || 0;
    expect(resp.status).toEqual(test.status);
    expect(length).toEqual(test.expect);
  }
}

interface ITest {
  filter: any;
  status: number;
  expect: number;
}

interface IParamsIterableTest {
  tests: ITest[];
  fn: any;
  session: string[];
}

export const iterateTestListV2 = async ({tests, fn, session}: IParamsIterableTest) => {

  for (const test of tests) {
    const resp = await fn(session, test.filter);
    if (resp.status !== test.status) {
      console.log(test, test.filter, resp.status, resp.body);
    }
    const length = resp.body.length || 0;
    expect(resp.status).toEqual(test.status);
    expect(length).toEqual(test.expect);
    
  }
}

interface TestParams {
  session: string[];
  tests: TestRead[];
  service: Function;
}

interface TestRead {
  id: string;
  status: number;
  expects: Expect[] | [];
}

interface Expect {
  field: string;
  value: any;
}

//tests: TestRead[], fn: Function, session: string[]
export const iterateTestFields = async (params: TestParams) => {
  const { session, tests, service } = params;

  for (const test of tests) {

    const resp = await service(session, test.id, test);
    
    if (resp.status !== test.status){ 
      reportAboutFailTest({
        received: resp.status, 
        expected: test.status, 
        information: resp.body, 
        test: test
      });
    }
    
    expect(resp.status).toEqual(test.status);
    for (const expectValue of test.expects) {
      
      expect(resp.body[expectValue.field]).toEqual(expectValue.value);
      if (resp.body[expectValue.field] != expectValue.value){
        reportAboutFailTest({
          received: resp.body[expectValue.field], 
          expected: expectValue.value, 
          information: expectValue.field, 
          test: test});
      }
      
    }
  }
};