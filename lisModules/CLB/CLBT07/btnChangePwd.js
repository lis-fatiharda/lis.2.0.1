
export default async function btnChangePwd(dv) {
    const oldPaswordHashed1 = lis.encrypt(dv.oldPassword1);
    const oldPaswordHashed2 = lis.encrypt(dv.oldPassword2);

    if (oldPaswordHashed1 != oldPaswordHashed2) {
        throw new Error("Mevcut Şifre Tekrarı Doğru Değil!");
    }

    const newPaswordHashed = lis.encrypt(dv.newPassword);

    const ctrlUser = await lisusers.findOne({
        username: dv.userName,
        password: oldPaswordHashed2,
    });

    if (ctrlUser == null) {
        throw new Error("Mevcut Şifre Doğru Değil!");
    }

    await lisusers.updateOne(
        {
            username: dv.userName,
            password: oldPaswordHashed2,
        },
        {
            $set: {
                password: newPaswordHashed,
            },
        }
    );
}
