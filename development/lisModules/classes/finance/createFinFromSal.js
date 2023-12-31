
export default async function (plissaldocs) {
    const oliscustomers = await liscustomers.findOne({
        company: plissaldocs.company,
        customer: plissaldocs.customer,
        _deleted: false,
    });
    const olisaccounts = await lisaccounts.findOne({
        company: oliscustomers.company,
        acctype: oliscustomers.acctype,
        account: oliscustomers.account,
        _deleted: false,
    });
    if (olisaccounts == undefined) new Error("Cari Hesap Bulunamadı!");
    let olisfindocs = await lis.objectNew('lisfindocs');
    const olissal001 = await lissal001.findOne({
        company: plissaldocs.company,
        doctype: plissaldocs.doctype,
    });

    if (olissal001.findoctype.length <= 0)
      throw new Error("Muhasebe Belgesi Tanımlı Değil!");

    lis.objectMove(plissaldocs, olisfindocs);
    olisfindocs.doctype = olissal001.findoctype;
    olisfindocs.docnum = "";
    olisfindocs.saldoctype = plissaldocs.doctype;
    olisfindocs.saldocnum = plissaldocs.docnum;
    olisfindocs.docdate = plissaldocs.docdate;

    olisfindocs.items = [];

    for (let i in plissaldocs.items) {
        let mySalItem = plissaldocs.items[i];

        const olissal002 = await lissal002.findOne({
            company: plissaldocs.company,
            doctype: plissaldocs.doctype,
            itemtype: mySalItem.itemtype,
        });

        if (olissal002 == null) new Error(`Kalem Tipi Bulunamadı!`);
        const olisfin002 = await lisfin002.findOne({
            company: olissal002.company,
            postkey: olissal002.postkey,
        });

        if (olisfin002 == null) new Error("Muhasebe Belgesi Bulunamadı!");
        for (let k in olisfin002.items) {
            const myfin002_item = olisfin002.items[k];

            if (myfin002_item.acctype == "C") {
                if (olisfindocs.items.findIndex((x) => x.acctype == "C") > -1) {
                    let myRow = olisfindocs.items.findIndex(
                        (x) => x.acctype == "C"
                    );

                    if (myfin002_item.postway == 0) {
                        olisfindocs.items[myRow].ddebit +=
                            mySalItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs.items[myRow].dcredit +=
                            mySalItem[myfin002_item.valuefield];
                    }
                    await lis.runcode(myfin002_item.runcode)
                } else {
                    // create new lisfindocs_item
                    let olisfindocs_item = await lis.objectNew('lisfindocs.items');
                    //
                    lis.objectMove(myfin002_item, olisfindocs_item);
                    await lis.runcode(myfin002_item.runcode)
                    olisfindocs_item.acctype = olisaccounts.acctype;
                    olisfindocs_item.account = olisaccounts.account;
                    olisfindocs_item.glaccount = olisaccounts.glaccount;
                    olisfindocs_item.atext = olisaccounts.stext;

                    if (myfin002_item.postway == 0) {
                        olisfindocs_item.ddebit =
                            mySalItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs_item.dcredit =
                            mySalItem[myfin002_item.valuefield];
                    }

                    olisfindocs_item.currency = plissaldocs.currency;
                    olisfindocs_item.curdate = plissaldocs.curdate;
                    olisfindocs_item.currate = plissaldocs.currate;

                    olisfindocs.items.push(olisfindocs_item);
                }
            }
            if (myfin002_item.acctype == "G") {
                let myAccount = await this.fetchAccount(
                    mySalItem,
                    myfin002_item,
                    plissaldocs
                );

                if (
                    olisfindocs.items.findIndex((x) => x.account == myAccount) >
                    -1
                ) {
                    let myRow = olisfindocs.items.findIndex(
                        (x) => x.account == myAccount
                    );

                    if (myfin002_item.postway == 0) {
                        olisfindocs.items[myRow].ddebit +=
                            mySalItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs.items[myRow].dcredit +=
                            mySalItem[myfin002_item.valuefield];
                    }
                    await lis.runcode(myfin002_item.runcode)
                } else {
                    // create new lisfindocs_item
                    let olisfindocs_item = await lis.objectNew('lisfindocs.items');
                    //
                    lis.objectMove(myfin002_item, olisfindocs_item);
                    await lis.runcode(myfin002_item.runcode)
                    olisfindocs_item.acctype = "G";
                    olisfindocs_item.account = myAccount;
                    olisfindocs_item.glaccount = olisfindocs_item.account;

                    // fetch stext for account
                    let myAtext = await lisaccounts.findOne({
                        company: plissaldocs.company,
                        acctype: olisfindocs_item.acctype,
                        account: olisfindocs_item.account,
                    });
                    olisfindocs_item.atext = myAtext?.stext;
                    //-------------------------

                    if (myfin002_item.postway == 0) {
                        olisfindocs_item.ddebit =
                            mySalItem[myfin002_item.valuefield];
                    } else {
                        olisfindocs_item.dcredit =
                            mySalItem[myfin002_item.valuefield];
                    }
                    olisfindocs_item.currency = plissaldocs.currency;
                    olisfindocs_item.curdate = plissaldocs.curdate;
                    olisfindocs_item.currate = plissaldocs.currate;

                    if (mySalItem[myfin002_item.valuefield] > 0) {
                        olisfindocs.items.push(olisfindocs_item);
                    }
                }
            }
        }
    }

    olisfindocs = await this.calcBalanceOfDoc(olisfindocs, lis);

    return olisfindocs;
}
