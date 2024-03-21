type TestReporteParameters = {
  received: any;
  expected: any;
  information: any,
  test: any
};

export const  reportAboutFailTest = (params: TestReporteParameters) => {
  const { received, expected, information, test } = params;
  console.log("-------------TEST INFORMATION FAILS------------");
  console.log("test: ", test);
  console.log(received, "!=", expected);
  console.log("information: ", information );
}