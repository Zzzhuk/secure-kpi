const {PythonShell} = require('python-shell');
module.exports = {
  async getA(numArr, mod)
  {
    const { success, err = '', results } = await new Promise(
      (resolve, reject) =>
      {
        PythonShell.runString(`print((${numArr[2]} - ${numArr[1]}) * pow(${numArr[1]} - ${numArr[0]}, -1, ${mod}) % ${mod})`, null,
          function (err, results)
          {
            if (err)
            {
              reject({ success: false, err });
            }

            console.log(`PythonShell results ${results}`);

            resolve({ success: true, results });
          }
        );
      }
    );

    if (! success)
    {
      console.log("Test Error: " + err);
      return;
    }
    return +results;
  },
  async getC(numArr, a, mod)
  {
    const { success, err = '', results } = await new Promise(
      (resolve, reject) =>
      {
        PythonShell.runString(`print((${numArr[1]} - ${numArr[0]} * ${a}) % ${mod})`, null,
          function (err, results)
          {
            if (err)
            {
              reject({ success: false, err });
            }

            console.log(`PythonShell results ${results}`);

            resolve({ success: true, results });
          }
        );
      }
    );

    if (! success)
    {
      console.log("Test Error: " + err);
      return;
    }
    return +results;
  }

}
