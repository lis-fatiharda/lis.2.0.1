export default async function (plisfindocs, lis) {
    console.log("calcBalance ", plisfindocs);

    plisfindocs.hdebit = 0;
    plisfindocs.hcredit = 0;
    plisfindocs.ddebit = 0;
    plisfindocs.dcredit = 0;

    for (let i in plisfindocs.items) {
        console.log("satır: ", i);
        let myItem = plisfindocs.items[i];

        myItem.hdebit = myItem.ddebit * myItem.currate;
        myItem.hcredit = myItem.dcredit * myItem.currate;

        //

        myItem.dbalance = myItem.ddebit - myItem.dmatched;
        myItem.hbalance = myItem.hdebit - myItem.hmatched;

        console.log("--- ", myItem.ddebit, myItem.dmatched, myItem.dbalance);

        plisfindocs.finperiod = lis.getMonth(new Date(plisfindocs.docdate));

        plisfindocs.itemcount = plisfindocs.length;

        //

        plisfindocs.ddebit += myItem.ddebit;
        plisfindocs.dcredit += myItem.dcredit;

        plisfindocs.hdebit += myItem.hdebit;
        plisfindocs.hcredit += myItem.hcredit;

        //

        console.log("+++ ", plisfindocs.ddebit, myItem.ddebit);
    }

    plisfindocs.ddiff = plisfindocs.ddebit - plisfindocs.dcredit;

    console.log(
        "*** ",
        plisfindocs.ddiff,
        plisfindocs.ddebit,
        plisfindocs.dcredit
    );

    return plisfindocs;
}
