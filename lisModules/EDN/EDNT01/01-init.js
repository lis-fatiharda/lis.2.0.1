
export default async function (dv) {
  dv.lissaldocsPrototype = new lissaldocs(lissaldocs.prototype.schema.tree);
  //--
  dv.sc.companyOpts = await lisbas001.find({
    _deleted: false,
  });
  dv.sc.busareaOpts = await lisbas003.find({
    _deleted: false,
    company: dv.sc.company,
  });
  //*** Inventory supDocuments */
  dv.sc.plantOpts = await lisbas002.find({
    company: dv.sc.company,
    _deleted: false,
  });

  dv.sc.warehouseOpts = await lisinv003.find({
    company: dv.sc.company,
    _deleted: false,
  });

  dv.sc.stockplaceOpts = await lisinv004.find({
    company: dv.sc.company,
    _deleted: false,
  });
  //*** */
  dv.sc.doctypeOpts = await lissal001.find({
    company: dv.sc.company,
    _deleted: false,
  });

  dv.sc.projectOpts = await liscrm003.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.customerOpts = await liscustomers.find({
    company: dv.sc.company,
    _deleted: false,
  });
  dv.sc.salDeptOpts = await lissal003.find({
    company: dv.sc.company,
    _deleted: false,
  });

  //*** */
  dv.sc.docitemtypeOpts = await lissal002
    .find({
      company: dv.sc.company,
      _deleted: false,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
  //*** */
  let tmpSkunits = await lisbas007.find(
    { company: dv.sc.company, unittype: 0, _deleted: false },
    { unit: 1 }
  );

  dv.sc.skunitOpts = [];
  tmpSkunits.forEach((e) => {
    dv.sc.skunitOpts.push(e.unit);
  });

  //*** fetch currencies */
  let tmpCurrencyOpts = await lisbas007.find(
    { company: dv.sc.company, unittype: 1, _deleted: false },
    { unit: 1 }
  );

  dv.sc.currencyOpts = [];
  tmpCurrencyOpts.forEach((e) => {
    dv.sc.currencyOpts.push(e.unit);
  });

  //*** Pay types */
  dv.sc.paytypeOpts = await lisbas011
    .find({
      company: dv.sc.company,
      _deleted: false,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

  return dv;
}
