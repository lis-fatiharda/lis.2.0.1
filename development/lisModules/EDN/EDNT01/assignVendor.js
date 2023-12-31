export default async function (dv) {
    let listSelected = dv.lisedndocsList.filter((e) => e._selected == true);

    for (let i in listSelected) {
        let oliscustomer = await liscustomers.findOne({
            company: listSelected[i].company,
            taxnum: listSelected[i].taxnum,
            _deleted: false,
        });

        if (oliscustomer == null) return {
            return: false,
            taxnum: listSelected[i].taxnum,
        };

        await lisedndocs.updateOne(
            { _id: listSelected[i]._id },
            {
                $set: {
                    customer: oliscustomer.customer,
                    name1: oliscustomer.name1,
                },
            }
        );
    }
    return true;
}
