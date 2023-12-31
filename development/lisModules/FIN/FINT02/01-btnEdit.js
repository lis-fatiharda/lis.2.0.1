export default async function (dv) {
    // Lock the document
    if (dv.reportList.filter((e) => e._selected == true).length > 0) {
        let selectedRow = dv.reportList.filter((e) => e._selected == true)[0];

        dv.lisfindocs = await lisfindocs.findById(selectedRow._id);

        

        dv.pCompany = selectedRow.company;
        dv.pDoctype = selectedRow.doctype;
        dv.pDocnum = selectedRow.docnum;
    } else {
      throw new Error("Lütfen Bir Satır Seçiniz");
    }

    await Finance.ctrlAuthorization(dv.lisfindocs, 1);

    let isLocked = await System.lock(
        dv.lisfindocs.company,
        "FINT02",
        dv.lisfindocs.doctype + dv.lisfindocs.docnum,
        global.sys_user
    );
    if (isLocked == true) {
        dv.lisDialog = "FINT02D02";
        dv.modi = 1;
    } else {
        dv.lisfindocs = {};
      throw new Error("Kilitli Belge!");
    }

    return dv;
}
